from sqlalchemy.orm import Session, load_only
from models.diary import Diary
from models.user import User
from schemas import diary


def diary_get(db: Session, location: str, user_id: int ) -> Diary:
    return db.query(Diary).filter(Diary.location == location, Diary.user_id == user_id).first()


def diary_create(db: Session, req: diary.DiaryCreate) -> Diary:
    db_obj = Diary(
        user_id=req.user_id,
        location=req.location,
        title=req.title,
        description=req.description,
        content=req.mapList,
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def diary_list_get(db: Session, user_id: int, skip: int, limit: int) -> Diary:
    return db.query(Diary.id, Diary.location, Diary.title, User.nickname)\
        .join(User, Diary.user_id == User.id)\
        .filter(Diary.user_id == user_id)\
        .offset(skip * limit).limit(limit) \
        .all()