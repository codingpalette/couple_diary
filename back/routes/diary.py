from typing import Optional
from fastapi import APIRouter, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from starlette.requests import Request
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from typing import List
from pydantic import BaseModel
from models.diary import Diary
from database.connection import get_db
import schemas
import crud

router = APIRouter(
    prefix="/diary"
)

@router.get('')
def diary_get(req: schemas.DiaryBase, db: Session = Depends(get_db)):
    return True

@router.get('/{nickname}/{location}')
def diary_get(nickname: str, location: str, db: Session = Depends(get_db)):
    print(nickname)
    print(location)
    return True


# @router.post('')
# async def diary_save(data: DiarySaveType):
#
#     result = await Diary.diary_save(data)
#     if result:
#         return JSONResponse(status_code=200, content={"result": "success", "message": "다이어리 저장에 성공 했습니다."})
#     else:
#         return JSONResponse(status_code=401, content={"result": "fail", "message": "다이어리 저장에 실패 했습니다."})
