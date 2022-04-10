from typing import Any, Dict, Optional, Union

from sqlalchemy.orm import Session

from crud.base import CRUDBase
from models.user import User
from schemas.user import UserEmail, UserNickname, UserCreate, UserLogin

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


user = CRUDUser(User)