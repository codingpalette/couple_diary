from typing import Optional
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from routes import user, image, diary
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.middleware.cors import CORSMiddleware
from middlewares.auth_check import access_control


class SPAStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope):
        response = await super().get_response(path, scope)
        if response.status_code == 404:
            response = await super().get_response('.', scope)
        return response

def create_app():

    app = FastAPI()

    origins = [
        'http://localhost:3000'
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
    def read_root():
        return {"Hello": "World"}


    @app.get("/items/{item_id}")
    def read_item(item_id: int, q: Optional[str] = None):
        return {"item_id": item_id, "q": q}


    app.include_router(user.router, tags=["user"], prefix="/api")
    app.include_router(image.router, tags=["image"], prefix="/api")
    app.include_router(diary.router, tags=["diary"], prefix="/api")

    app.mount("/", SPAStaticFiles(directory="public", html=True), name="public")

    return app

app = create_app()