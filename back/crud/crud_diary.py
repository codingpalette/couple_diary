from sqlalchemy.orm import Session, load_only
from models.diary import Diary
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder
import schemas


def diary_location_get(db: Session, req: schemas.DiaryLocationGet) -> Diary:
    return db.query(Diary).filter(Diary.location == req.location, Diary.user_id == req.user_id).first()

def diary_create(db: Session, req: schemas.DiaryCreate) -> Diary:
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