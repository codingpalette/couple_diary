from typing import Optional
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from starlette.requests import Request
from models.user import User
from pydantic import BaseModel
import bcrypt
import jwt
from functions import token

from config import conf

class CreateType(BaseModel):
    email: str
    name: str
    password: str
    # description: Optional[str] = None
    # price: float
    # tax: Optional[float] = None

class LoginType(BaseModel):
    email: str
    password: str

class DeleteType(BaseModel):
    email: str


router = APIRouter(
    prefix="/user",
)

@router.get('')
def user_get():
    return {"result": "success", "message": "테스트 성공!"}


@router.get('/check')
def user_check(request: Request):
    config = conf()
    key = config['TOKEN_KEY']
    access_token = request.state.access_token

    decode = jwt.decode(access_token, key, algorithms=['HS256'])
    content = {"result": "success", "message": "유저인증에 성공했습니다.", "data": {"email": decode['email'], "name": decode['name'], "level": decode["level"] }}
    response = JSONResponse(content=content)
    response.set_cookie(key="access_token", value=access_token)
    return response



@router.post('')
async def user_create(item: CreateType):
    user_info = await User.user_email_get(item.email)
    if user_info:
        return JSONResponse(status_code=401, content={"result": "fail", "message": "이미 존재하는 아이디 입니다"})
    else:
        hashed_password = bcrypt.hashpw(item.password.encode('utf-8'), bcrypt.gensalt())
        save_password = hashed_password.decode('utf-8')
        item.password = save_password
        return await User.user_create(item)

@router.post('/login')
async def user_login(item: LoginType):
    user_info = await User.user_email_get(item.email)
    if not user_info:
        return JSONResponse(status_code=401, content={"result": "fail", "message": "존재하지 않는 아이디 입니다"})
    else:
        password_check = bcrypt.checkpw(item.password.encode('utf-8'), user_info['password'].encode('utf-8'))
        if not password_check:
            return JSONResponse(status_code=401, content={"result": "fail", "message": "비밀번호가 틀립니다"})
        else:
            access_token = token.create_token('access_token', user_info)
            refresh_token = token.create_token('refresh_token')
            token_update = await User.token_update(refresh_token, user_info['id'])
            if token_update:
                content = {"result": "success", "message": "로그인 성공"}
                response = JSONResponse(content=content)
                response.set_cookie(key="access_token", value=access_token)
                response.set_cookie(key="refresh_token", value=refresh_token)
                return response
            else:
                return JSONResponse(status_code=401, content={"result": "fail", "message": "로그인에 실패했습니다"})

@router.post('logout')
async def user_logout(request: Request):
    # print('로그아웃 시작')
    # print(request.cookies)
    cookies = request.cookies
    delete_token = await User.user_logout(cookies.get("refresh_token"))
    if delete_token:
        content = {"result": "success", "message": "로그아웃 성공"}
        response = JSONResponse(content=content)
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response
    else:
        return JSONResponse(status_code=401, content={"result": "fail", "message": "로그아웃에 실패했습니다"})


@router.delete('')
async def user_delete(item: DeleteType):
    return await User.user_delete(item.email)


@router.get('/test')
async def user_get2():
    aa = await User.get_username(1)
    return {"result": "success", "message": "222222"}