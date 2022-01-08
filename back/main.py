from typing import Optional

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles


class SPAStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope):
        response = await super().get_response(path, scope)
        if response.status_code == 404:
            response = await super().get_response('.', scope)
        return response

def create_app():

    app = FastAPI()

    @app.get("/test")
    def read_root():
        return {"Hello": "World"}


    @app.get("/items/{item_id}")
    def read_item(item_id: int, q: Optional[str] = None):
        return {"item_id": item_id, "q": q}


    app.mount("/", SPAStaticFiles(directory="public", html=True), name="public")

    return app

app = create_app()