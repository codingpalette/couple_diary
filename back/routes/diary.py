from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.connection import get_db
from schemas import diary
from crud import crud_diary, crud_user

router = APIRouter(
    prefix="/diary"
)

@router.get('')
def diary_get(nickname: str, location: str, db: Session = Depends(get_db)):
    """
    :param nickname:
    :param location:
    :param db:
    :return:
    """

    user_info = crud_user.user_nickname_get(db, nickname)
    if not user_info:
        raise HTTPException(status_code=400, detail="조회를 할 수 없습니다.")
    else:
        diary_info = crud_diary.diary_get(db, location, user_info.id)
        if diary_info:
            return diary_info
        else:
            raise HTTPException(status_code=400, detail="존재하지 않는 다이어리 입니다.")


@router.post('', response_model=diary.DiaryCreate)
def diary_create(req: diary.DiaryCreate, db: Session = Depends(get_db)):
    """
    :param req:
    :param db:
    :return:
    """
    diary_info = crud_diary.diary_get(db, req.location, req.user_id)
    if diary_info:
        raise HTTPException(status_code=400, detail="이미 존재하는 주소 입니다.")
    else:
        return crud_diary.diary_create(db, req)

@router.put('', response_model=diary.DiaryModify)
def diary_modify(req: diary.DiaryModify, db: Session = Depends(get_db)):
    """
    :param req:
    :param db:
    :return:
    """
    diary_info = crud_diary.diary_get2(db, req.id, req.location, req.user_id)
    if diary_info:
        raise HTTPException(status_code=400, detail="이미 존재하는 주소 입니다.")
    else:
        return crud_diary.diary_modify(db, req)

@router.get('/list')
def diary_list_get(user_id: int, skip: int, limit: int, db: Session = Depends(get_db)):
    """
    :param user_id:
    :param skip:
    :param limit:
    :param db:
    :return:
    """
    return crud_diary.diary_list_get(db, user_id, skip, limit)

@router.get('/modify')
def diary_modify_get(id:int, db: Session = Depends(get_db)):
    """
    :param id:
    :param db:
    :return:
    """
    info = crud_diary.diary_modify_get(db, id)
    if info:
        return info
    else:
        raise HTTPException(status_code=400, detail="저장된 다이어리가 없습니다.")

