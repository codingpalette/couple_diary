from typing import Any, Dict, Optional, Union
from sqlalchemy.orm import Session
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



diary_save = CRUDDiarySave()
