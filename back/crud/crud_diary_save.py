from typing import Any, Dict, Optional, Union

from sqlalchemy.orm import Session

from crud.base import CRUDBase
from models.diary_save import DiarySave

from schemas.diary_save import DiarySaveBase


class CRUDDiarySave():

    def get_id(self, db: Session):
        return db.query(DiarySave).filter(DiarySave.id == 1).first()


diary_save = CRUDDiarySave()
