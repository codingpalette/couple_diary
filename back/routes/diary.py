from fastapi import APIRouter
from fastapi.responses import JSONResponse
from typing import List
from pydantic import BaseModel
from models.diary import Diary

class DiarySaveType(BaseModel):
    user_id: int
    list: List = []

router = APIRouter(
    prefix="/diary"
)

@router.get('')
async def diary_get():
    return True


@router.post('')
async def diary_save(data: DiarySaveType):

    result = await Diary.diary_save(data)
    if result:
        return JSONResponse(status_code=200, content={"result": "success", "message": "다이어리 저장에 성공 했습니다."})
    else:
        return JSONResponse(status_code=401, content={"result": "fail", "message": "다이어리 저장에 실패 했습니다."})
