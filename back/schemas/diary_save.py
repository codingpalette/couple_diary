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
    lat: int
    lng: int

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
    description: Optional[str]
    mapList: Optional[List[MapList]]

