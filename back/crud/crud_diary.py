from fastapi import HTTPException
from sqlalchemy.orm import Session, load_only
from models.diary import Diary
from models.user import User
from schemas import diary


def diary_get(db: Session, location: str, user_id: int ) -> Diary:
    return db.query(Diary).filter(Diary.location == location, Diary.user_id == user_id).first()

def diary_get2(db: Session, id: int, location: str, user_id: int) -> Diary:
    return db.query(Diary).filter(Diary.id != id, Diary.location == location, Diary.user_id == user_id).first()

def diary_get_id(db: Session, id: int) -> Diary:
    return db.query(Diary).filter(Diary.id == id).first()

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

def diary_modify(db: Session, req: diary.DiaryModify) -> Diary:
    item = db.query(Diary).filter(Diary.id == req.id).first()
    item.location = req.location
    item.title = req.title
    item.description = req.description
    item.content = req.mapList
    db.commit()
    db.refresh(item)
    return item

def diary_list_get(db: Session, user_id: int, skip: int, limit: int) -> Diary:
    return db.query(Diary.id, Diary.location, Diary.title, Diary.description, Diary.created_at, User.nickname)\
        .join(User, Diary.user_id == User.id)\
        .filter(Diary.user_id == user_id) \
        .order_by(Diary.id.desc()) \
        .offset(skip * limit).limit(limit) \
        .all()

def diary_modify_get(db: Session, id: int) -> Diary:
    return db.query(Diary).filter(Diary.id == id).first()

def diary_delete(db: Session, id: int) -> Diary:
    item = diary_get_id(db, id)
    if item is None:
        raise HTTPException(status_code=402,  detail={"result": "fail", "message": "삭제할 다이어리가 존재하지 않습니다."})
    else:
        db.delete(item)
        db.commit()
        return item