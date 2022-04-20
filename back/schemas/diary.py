from typing import Optional, List
from pydantic import BaseModel


class DiaryBase(BaseModel):
    pass

    class Config:
        orm_mode = True

class Images(BaseModel):
    id: str
    url: str

class Position(BaseModel):
    lat: float
    lng: float

class MapList(BaseModel):
    contentText: str
    diaryTitle: str
    date: str
    fullAddr: str
    images: List[Images]
    position: Position

class DiaryLocationGet(DiaryBase):
    user_id: Optional[int]
    location: Optional[str]

class DiaryCreate(DiaryBase):
    user_id: Optional[int]
    location: Optional[str]
    title: Optional[str]
    description: Optional[str]
    mapList: Optional[List[MapList]]

class DiaryModify(DiaryCreate):
    id: Optional[int]