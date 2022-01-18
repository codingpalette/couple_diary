
from fastapi import APIRouter, File, UploadFile
from typing import List




router = APIRouter(
    prefix="/image",
)


@router.get('')
def image_get():
    return {"result": "success", "message": "image get 테스트 성공!"}


@router.post('/upload')
def image_upload(file: UploadFile = File(...)):
    print(file)



    return {"result": "success", "message": "image get 테스트 성공!"}