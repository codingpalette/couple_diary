from typing import Optional
from pydantic import BaseModel


class UserBase(BaseModel):
    # pass
    login_id: str

    class Config:
        orm_mode = True


class UserLoginId(UserBase):
    pass


class UserNickname(UserBase):
    nickname: str


class UserCreate(UserBase):
    nickname: str
    level: Optional[int] = None
    password: str


class UserLogin(UserBase):
    password: str


class UserTokenUpdate(UserBase):
    refresh_token: str
