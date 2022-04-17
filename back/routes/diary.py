from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.connection import get_db
import schemas
from crud import crud_diary

router = APIRouter(
    prefix="/diary"
)

@router.post('')
def diary_create(req: schemas.DiaryCreate, db: Session = Depends(get_db)):
    diary_info = crud_diary.diary_location_get(db, req)
    if diary_info:
        raise HTTPException(status_code=400, detail="이미 존재하는 주소 입니다.")
    else:
        return crud_diary.diary_create(db, req)