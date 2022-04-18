from typing import Optional
from fastapi import FastAPI, Depends
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from routes import user, image, diary, diary_save
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.middleware.cors import CORSMiddleware
from middlewares.auth_check import access_control

from sqlalchemy.orm import Session
from database.connection import get_db, Base, engine



class SPAStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope):
        response = await super().get_response(path, scope)
        if response.status_code == 404:
            response = await super().get_response('.', scope)
        return response

def create_app():

    Base.metadata.create_all(bind=engine)

    app = FastAPI()

    origins = [
        'http://localhost:3000',
        'https://nyamo.co.kr',
        'https://www.nyamo.co.kr',
    ]

    app.add_middleware(middleware_class=BaseHTTPMiddleware, dispatch=access_control)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )



    @app.get("/test")
    def read_root(db: Session = Depends(get_db)):
        print(db)
        return {"Hello": "World"}


    @app.get("/items/{item_id}")
    def read_item(item_id: int, q: Optional[str] = None):
        return {"item_id": item_id, "q": q}


    app.include_router(user.router, tags=["user"], prefix="/api")
    app.include_router(image.router, tags=["image"], prefix="/api")
    app.include_router(diary.router, tags=["diary"], prefix="/api")
    app.include_router(diary_save.router, tags=["diary_save"], prefix="/api")
    # app.include_router(save.router, tags=["save"], prefix="/api")

    app.mount("/", StaticFiles(directory="public", html=True))

    @app.exception_handler(404)
    async def not_found(request, exc):
        return FileResponse('public/index.html')

    return app

app = create_app()