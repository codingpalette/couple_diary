from typing import Optional
from fastapi import APIRouter, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from starlette.requests import Request
from sqlalchemy.orm import Session
from database.connection import get_db
from crud import crud_user
import schemas

import bcrypt
from functions import token
from config import conf
import jwt
import json
# from fastapi.responses import JSONResponse



router = APIRouter(
    prefix="/user",
)


# 유저 인증
@router.get('/check')
def user_check(request: Request):
    config = conf()
    key = config['TOKEN_KEY']
    access_token = request.state.access_token
    decode = jwt.decode(access_token, key, algorithms=['HS256'])
    content = {"result": "success", "message": "유저인증에 성공했습니다.", "data": decode}
    response = JSONResponse(content=content)
    response.set_cookie(key="access_token", value=access_token)
    return response

# 유저 생성
@router.post('')
def user_create(req: schemas.UserCreate, db: Session = Depends(get_db)):
    user_login_id_info = crud_user.get_user_by_login_id(db, req)
    # json_compatible_item_data = jsonable_encoder(user_info)
    # print(json_compatible_item_data)
    if user_login_id_info:
        return JSONResponse(status_code=401, content={"result": "fail", "message": "이미 존재하는 아이디 입니다"})
    user_nickname_info = crud_user.get_user_by_nickname(db, req)
    if user_nickname_info:
        return JSONResponse(status_code=401, content={"result": "fail", "message": "이미 존재하는 닉네임 입니다"})
    hashed_password = bcrypt.hashpw(req.password.encode('utf-8'), bcrypt.gensalt())
    save_password = hashed_password.decode('utf-8')
    req.password = save_password
    save_user = crud_user.user_create(db, req)
    if save_user:
        return JSONResponse(status_code=200, content={"result": "success", "message": "회원가입에 성공 했습니다"})
    else:
        return JSONResponse(status_code=401, content={"result": "fail", "message": "회원가입에 실패 했습니다"})

    # return crud.user.user_create(db, req)

@router.post('/login')
def user_login(req: schemas.UserLogin, db: Session = Depends(get_db)):
    user_login_id_info = crud_user.get_user_by_login_id(db, req)
    if not user_login_id_info:
        return JSONResponse(status_code=401, content={"result": "fail", "message": "존재하지 않는 아이디 입니다"})
    else:
        password_check = bcrypt.checkpw(req.password.encode('utf-8'), user_login_id_info.password.encode('utf-8'))
        if not password_check:
            return JSONResponse(status_code=401, content={"result": "fail", "message": "비밀번호가 틀립니다"})
        else:
            access_token = token.create_token('access_token', user_login_id_info)
            refresh_token = token.create_token('refresh_token', user_login_id_info)
            token_update = crud_user.token_update(db, req, refresh_token)
            if token_update:
                content = {"result": "success", "message": "로그인 성공"}
                response = JSONResponse(content=content)
                response.set_cookie(key="access_token", value=access_token)
                response.set_cookie(key="refresh_token", value=refresh_token)
                return response
            else:
                return JSONResponse(status_code=401, content={"result": "fail", "message": "로그인에 실패 했습니다"})

@router.post('/logout')
def user_logout(request: Request, db: Session = Depends(get_db)):
    cookies = request.cookies
    crud_user.user_logout(db, cookies.get("refresh_token"))
    content = {"result": "success", "message": "로그아웃 성공"}
    response = JSONResponse(content=content)
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return response

@router.get('/test')
def user_test():
    print('222')
    return {"result": "ok"}

@router.get('/test2')
def user_test2(id: int):
    print(333)
    print(id)
    return True