from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.connection import get_db
from schemas import diary
from crud import crud_diary

router = APIRouter(
    prefix="/diary"
)

@router.post('', response_model=diary.DiaryCreate)
def diary_create(req: diary.DiaryCreate, db: Session = Depends(get_db)):
    diary_info = crud_diary.diary_location_get(db, req)
    if diary_info:
        raise HTTPException(status_code=400, detail="이미 존재하는 주소 입니다.")
    else:
        return crud_diary.diary_create(db, req)

@router.get('/list')
def diary_list_get(user_id: int, skip: int, limit: int, db: Session = Depends(get_db)):
    return crud_diary.diary_list_get(db, user_id, skip, limit)