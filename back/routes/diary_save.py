from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from database.connection import get_db
import schemas
import crud
import json



router = APIRouter(
    prefix="/diary_save"
)

@router.get('')
def diary_get(save_id: int, db: Session = Depends(get_db)):
    return crud.diary_save.get_id(db, save_id)

@router.post('', response_model=schemas.DiarySaveModify)
def diary_save_create(req: schemas.DiarySaveCreate, db: Session = Depends(get_db)):
    return crud.diary_save.diary_save_create(db, req)

@router.put('', response_model=schemas.DiarySaveModify)
def diary_save_modify(req: schemas.DiarySaveModify, db: Session = Depends(get_db)):
    return crud.diary_save.diary_save_modify(db, req)

@router.delete('')
def diary_save_delete(id: int, db: Session = Depends(get_db)):
    return crud.diary_save.diary_save_delete(db, id)

@router.get('/list')
def diary_save_list_get(user_id: int, skip: int, limit: int, db: Session = Depends(get_db)):
    return crud.diary_save.diary_list_get(db, user_id, skip, limit)


@router.get('/{nickname}/{location}')
def diary_get(nickname: str, location: str, db: Session = Depends(get_db)):
    print(nickname)
    print(location)
    return True
