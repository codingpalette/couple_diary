
from fastapi import APIRouter, File, UploadFile, HTTPException
from pydantic import BaseModel
from typing import List
# from httpx import AsyncClient
import httpx
from config import conf
import json

config = conf()


class RemoveType(BaseModel):
    id: str

router = APIRouter(
    prefix="/image",
)


@router.get('')
def image_get():
    return {"result": "success", "message": "image get 테스트 성공!"}


@router.post('/upload')
async def image_upload(file: UploadFile = File(...)):

    try:
        contents = await file.read()
        headers = {'Authorization': config['Authorization']}
        files = {'file': contents}

        r = httpx.post(f'https://api.cloudflare.com/client/v4/accounts/{config["IMAGE_ACCOUNT_ID"]}/images/v1', headers=headers, files=files)

        return {
            "result": "success",
            "message": "이미지 저장에 성공 했습니다",
            "data": {
                "id": json.loads(r.text)["result"]["id"],
                "url": json.loads(r.text)["result"]["variants"][0]
            }
        }
    except:
        raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다."})
        # return {"result": "fail", "message": "디비 조회에 실패 했습니다."}

@router.post('/remove')
async def image_remove(data: RemoveType):
    try:
        headers = {'Authorization': config['Authorization']}
        r = httpx.delete(f'https://api.cloudflare.com/client/v4/accounts/{config["IMAGE_ACCOUNT_ID"]}/images/v1/{data.id}', headers=headers)

        return {
            "result": "success",
            "message": "이미지 삭제에 성공 했습니다",
        }

    except:
        raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다."})

