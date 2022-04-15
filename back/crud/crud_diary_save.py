from typing import Any, Dict, Optional, Union
from sqlalchemy.orm import Session, load_only
from models.diary_save import DiarySave
import schemas


class CRUDDiarySave():

    def get_id(self, db: Session):
        return db.query(DiarySave).filter(DiarySave.id == 5).first()

    def diary_save_create(self, db: Session, req: schemas.DiarySaveCreate) -> DiarySave:
        db_obj = DiarySave(
            user_id=req.user_id,
            location=req.location,
            description=req.description,
            content=req.mapList,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def diary_list_get(self, db: Session, user_id: int, skip: int, limit: int):
        return db.query(DiarySave)\
            .filter(DiarySave.user_id == user_id) \
            .order_by(DiarySave.id.desc())\
            .offset(skip).limit(limit)\
            .options(load_only("id", "user_id", "description"))\
            .all()




diary_save = CRUDDiarySave()
