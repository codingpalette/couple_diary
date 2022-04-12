from typing import Any, Dict, Optional, Union

from sqlalchemy.orm import Session

from crud.base import CRUDBase
from models.user import User
from schemas.user import UserEmail, UserNickname, UserCreate, UserLogin, UserTokenUpdate

class CRUDUser(CRUDBase[User, UserCreate, UserLogin]):

    def get_user_by_email(self, db: Session, req: UserEmail) -> User:
        return db.query(User).filter(User.email == req.email).first()

    def get_user_by_nickname(self, db: Session, req: UserNickname) -> User:
        return db.query(User).filter(User.nickname == req.nickname).first()

    def user_create(self, db: Session, req: UserCreate) -> User:
        db_obj = User(
            email=req.email,
            nickname=req.nickname,
            password=req.password
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def token_update(self, db: Session, user: UserEmail, refresh_token: str) -> User:
        item = self.get_user_by_email(db, user)
        item.refresh_token = refresh_token
        db.commit()
        db.refresh(item)
        return item

    def user_logout(self, db: Session, refresh_token: str) -> User:
        item = db.query(User).filter(User.refresh_token == refresh_token).first()
        if item:
            item.refresh_token = None
            db.commit()
            db.refresh(item)
        return item


user = CRUDUser(User)