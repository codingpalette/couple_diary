from typing import Optional
from pydantic import BaseModel


class DiarySaveBase(BaseModel):
    pass

    class Config:
        orm_mode = True
