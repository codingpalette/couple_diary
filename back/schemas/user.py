from typing import Optional
from pydantic import BaseModel


class UserBase(BaseModel):
    # pass
    email: str

    class Config:
        orm_mode = True

class UserEmail(UserBase):
    pass

class UserNickname(UserBase):
    nickname: str

class UserCreate(UserBase):
    nickname: str
    level: Optional[int] = None
    password: str


class UserLogin(UserBase):
    password: str
