from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.connection import get_db
import schemas
import crud



router = APIRouter(
    prefix="/diary_save"
)

@router.get('')
def diary_get(db: Session = Depends(get_db)):
    return crud.diary_save.get_id(db)

@router.post('')
def diary_save_create(req: schemas.DiarySaveCreate, db: Session = Depends(get_db)):
    print(req)
    crud.diary_save.diary_save_create(db, req)
    return True

@router.get('/list')
def diary_save_list_get(user_id: int, skip: int, limit: int, db: Session = Depends(get_db)):
    print(user_id)
    print(skip)
    print(limit)
    aa = crud.diary_save.diary_list_get(db, user_id, skip, limit)
    print(aa)
    return aa

@router.get('/{nickname}/{location}')
def diary_get(nickname: str, location: str, db: Session = Depends(get_db)):
    print(nickname)
    print(location)
    return True
