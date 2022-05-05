from sqlalchemy.orm import Session, load_only
from models.diary_save import DiarySave
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder
from schemas import diary_save


def get_id(self, db: Session, id: int) -> DiarySave:
    return db.query(DiarySave).filter(DiarySave.id == id).first()

def diary_save_create(self, db: Session, req: diary_save.DiarySaveCreate) -> DiarySave:
    db_obj = DiarySave(
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

def diary_save_modify(self, db: Session, req: diary_save.DiarySaveModify) -> DiarySave:
    item = self.get_id(db, req.id)
    item.location = req.location
    item.title = req.title
    item.description = req.description
    item.content = req.mapList
    db.commit()
    db.refresh(item)
    return item

def diary_save_delete(self, db: Session, id: int) -> DiarySave:
    item = self.get_id(db, id)
    if item is None:
        raise HTTPException(status_code=402,  detail={"result": "fail", "message": "삭제할 다이어리가 존재하지 않습니다."})
    else:
        db.delete(item)
        db.commit()
        return item

def diary_list_get(self, db: Session, user_id: int, skip: int, limit: int) -> DiarySave:
    return db.query(DiarySave) \
        .filter(DiarySave.user_id == user_id) \
        .order_by(DiarySave.id.desc()) \
        .offset(skip * limit).limit(limit) \
        .options(load_only("id", "user_id", "title", "description")) \
        .all()


