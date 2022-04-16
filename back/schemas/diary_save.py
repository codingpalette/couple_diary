from typing import Optional, List
from pydantic import BaseModel


class DiarySaveBase(BaseModel):
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


class DiarySaveCreate(DiarySaveBase):
    user_id: Optional[int]
    location: Optional[str]
    title: Optional[str]
    description: Optional[str]
    mapList: Optional[List[MapList]]

class DiarySaveModify(DiarySaveCreate):
    id: Optional[int]

