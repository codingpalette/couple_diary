from fastapi import APIRouter
from fastapi.responses import JSONResponse
from typing import List
from pydantic import BaseModel
from models.save import Save


class SaveType(BaseModel):
    user_id: int
    location: str
    description: str
    mapList: List = []

router = APIRouter(
    prefix="/save"
)

@router.get('')
async def diary_get():
    return True

@router.post('')
async def save(data: SaveType):
    print(data)
    location_check = await Save.get_location(data.location)
    print('location_check', location_check)
    if location_check:
        return JSONResponse(status_code=401, content={"result": "fail", "message": "이미 사용중인 주소 입니다."})
    else:
        print('생성가능')
        return True