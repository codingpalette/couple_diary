from typing import Optional
from fastapi import APIRouter, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from database.connection import get_db
import schemas
import crud
import bcrypt
from functions import token
# from fastapi.responses import JSONResponse
# from starlette.requests import Request
# from models.user import User
# from pydantic import BaseModel
# import bcrypt
# import jwt
# from functions import token
#
# from config import conf
#
# class CreateType(BaseModel):
#     email: str
#     nickname: str
#     password: str
#     # description: Optional[str] = None
#     # price: float
#     # tax: Optional[float] = None
#
# class LoginType(BaseModel):
#     email: str
#     password: str
#
# class DeleteType(BaseModel):
#     email: str
#
#
router = APIRouter(
    prefix="/user",
)

# 유저 생성
@router.post('')
def user_create(req: schemas.UserCreate, db: Session = Depends(get_db)):
    user_email_info = crud.user.get_user_by_email(db, req)
    # json_compatible_item_data = jsonable_encoder(user_info)
    # print(json_compatible_item_data)
    if user_email_info:
        return JSONResponse(status_code=401, content={"result": "fail", "message": "이미 존재하는 아이디 입니다"})
    user_nickname_info = crud.user.get_user_by_nickname(db, req)
    if user_nickname_info:
        return JSONResponse(status_code=401, content={"result": "fail", "message": "이미 존재하는 닉네임 입니다"})
    hashed_password = bcrypt.hashpw(req.password.encode('utf-8'), bcrypt.gensalt())
    save_password = hashed_password.decode('utf-8')
    req.password = save_password
    save_user = crud.user.user_create(db, req)
    if save_user:
        return JSONResponse(status_code=200, content={"result": "success", "message": "회원가입에 성공 했습니다"})
    else:
        return JSONResponse(status_code=401, content={"result": "fail", "message": "회원가입에 실패 했습니다"})

    # return crud.user.user_create(db, req)

@router.post('/login')
def user_login(req: schemas.UserLogin, db: Session = Depends(get_db)):
    user_email_info = crud.user.get_user_by_email(db, req)
    if not user_email_info:
        return JSONResponse(status_code=401, content={"result": "fail", "message": "존재하지 않는 아이디 입니다"})
    else:
        password_check = bcrypt.checkpw(req.password.encode('utf-8'), user_email_info.password.encode('utf-8'))
        if not password_check:
            return JSONResponse(status_code=401, content={"result": "fail", "message": "비밀번호가 틀립니다"})
        else:
            access_token = token.create_token('access_token', user_email_info)
            refresh_token = token.create_token('refresh_token')
            token_update = crud.user.token_update(db, req, refresh_token)
            if token_update:
                content = {"result": "success", "message": "로그인 성공"}
                response = JSONResponse(content=content)
                response.set_cookie(key="access_token", value=access_token)
                response.set_cookie(key="refresh_token", value=refresh_token)
                return response
            else:
                return JSONResponse(status_code=401, content={"result": "fail", "message": "로그인에 실패 했습니다"})

#
# @router.get('')
# def user_get():
#     return {"result": "success", "message": "테스트 성공!"}
#
#
# @router.get('/check')
# def user_check(request: Request):
#     config = conf()
#     key = config['TOKEN_KEY']
#     access_token = request.state.access_token
#
#     decode = jwt.decode(access_token, key, algorithms=['HS256'])
#     content = {"result": "success", "message": "유저인증에 성공했습니다.", "data": {"id": decode['id'],"email": decode['email'], "nickname": decode['nickname'], "level": decode["level"] }}
#     response = JSONResponse(content=content)
#     response.set_cookie(key="access_token", value=access_token)
#     return response
#
#
#
# @router.post('')
# async def user_create(item: CreateType):
#     user_info = await User.user_email_get(item.email)
#     if user_info:
#         return JSONResponse(status_code=401, content={"result": "fail", "message": "이미 존재하는 아이디 입니다"})
#     else:
#         hashed_password = bcrypt.hashpw(item.password.encode('utf-8'), bcrypt.gensalt())
#         save_password = hashed_password.decode('utf-8')
#         item.password = save_password
#         return await User.user_create(item)
#
# @router.post('/login')
# async def user_login(item: LoginType):
#     user_info = await User.user_email_get(item.email)
#     if not user_info:
#         return JSONResponse(status_code=401, content={"result": "fail", "message": "존재하지 않는 아이디 입니다"})
#     else:
#         password_check = bcrypt.checkpw(item.password.encode('utf-8'), user_info['password'].encode('utf-8'))
#         if not password_check:
#             return JSONResponse(status_code=401, content={"result": "fail", "message": "비밀번호가 틀립니다"})
#         else:
#             access_token = token.create_token('access_token', user_info)
#             refresh_token = token.create_token('refresh_token')
#             token_update = await User.token_update(refresh_token, user_info['id'])
#             if token_update:
#                 content = {"result": "success", "message": "로그인 성공"}
#                 response = JSONResponse(content=content)
#                 response.set_cookie(key="access_token", value=access_token)
#                 response.set_cookie(key="refresh_token", value=refresh_token)
#                 return response
#             else:
#                 return JSONResponse(status_code=401, content={"result": "fail", "message": "로그인에 실패했습니다"})
#
# @router.post('/logout')
# async def user_logout(request: Request):
#     # print('로그아웃 시작')
#     # print(request.cookies)
#     cookies = request.cookies
#     delete_token = await User.user_logout(cookies.get("refresh_token"))
#     if delete_token:
#         content = {"result": "success", "message": "로그아웃 성공"}
#         response = JSONResponse(content=content)
#         response.delete_cookie("access_token")
#         response.delete_cookie("refresh_token")
#         return response
#     else:
#         return JSONResponse(status_code=401, content={"result": "fail", "message": "로그아웃에 실패했습니다"})
#
#
# @router.delete('')
# async def user_delete(item: DeleteType):
#     return await User.user_delete(item.email)
#
#
# @router.get('/test')
# async def user_get2():
#     aa = await User.get_username(1)
#     return {"result": "success", "message": "222222"}