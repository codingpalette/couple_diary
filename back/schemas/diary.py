from typing import Optional
from pydantic import BaseModel

class DiaryBase(BaseModel):
    pass

    class Config:
        orm_mode = True