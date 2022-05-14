from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from database.connection import get_db
from schemas import diary_save
from crud import crud_diary_save
import json



router = APIRouter(
    prefix="/diary_save"
)

@router.get('')
def diary_get(save_id: int, db: Session = Depends(get_db)):
    info = crud_diary_save.get_id(db, save_id)
    if info:
        return info
    else:
        raise HTTPException(status_code=400, detail="저장된 다이어리가 없습니다.")

@router.post('')
def diary_save_create(req: diary_save.DiarySaveCreate, db: Session = Depends(get_db)):
    print('2222')
    # return True
    return crud_diary_save.diary_save_create(db, req)

@router.put('', response_model=diary_save.DiarySaveModify)
def diary_save_modify(req: diary_save.DiarySaveModify, db: Session = Depends(get_db)):
    return crud_diary_save.diary_save_modify(db, req)

@router.delete('')
def diary_save_delete(id: int, db: Session = Depends(get_db)):
    return crud_diary_save.diary_save_delete(db, id)

@router.get('/list')
def diary_save_list_get(user_id: int, skip: int, limit: int, db: Session = Depends(get_db)):
    return crud_diary_save.diary_list_get(db, user_id, skip, limit)


@router.get('/{nickname}/{location}')
def diary_get(nickname: str, location: str, db: Session = Depends(get_db)):
    print(nickname)
    print(location)
    return True
