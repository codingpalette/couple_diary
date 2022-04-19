from typing import Any, Dict, Optional, Union

from sqlalchemy.orm import Session


from models.user import User
from schemas.user import UserLoginId, UserNickname, UserCreate, UserLogin, UserTokenUpdate

def get_user_by_nickname(db: Session, req: UserNickname) -> User:
    return db.query(User).filter(User.nickname == req.nickname).first()

def user_nickname_get(db: Session, nickname: str) -> User:
    return db.query(User).filter(User.nickname == nickname).first()

def get_user_by_login_id(db: Session, req: UserLoginId) -> User:
    return db.query(User).filter(User.login_id == req.login_id).first()


def user_create(db: Session, req: UserCreate) -> User:
    db_obj = User(
        login_id=req.login_id,
        nickname=req.nickname,
        password=req.password
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def token_update(db: Session, user: UserLoginId, refresh_token: str) -> User:
    item = get_user_by_login_id(db, user)
    item.refresh_token = refresh_token
    db.commit()
    db.refresh(item)
    return item

def user_logout(db: Session, refresh_token: str) -> User:
    item = db.query(User).filter(User.refresh_token == refresh_token).first()
    if item:
        item.refresh_token = None
        db.commit()
        db.refresh(item)
    return item
