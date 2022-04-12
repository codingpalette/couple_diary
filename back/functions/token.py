from fastapi import HTTPException
import datetime
import jwt
from config import conf

config = conf()

def create_token(type, user_info, renewal = False):
    key = config['TOKEN_KEY']
    alg = 'HS256'
    if type == "access_token":
        # days->날짜 hours->시간, minutes->분, seconds->초
        if not renewal:
            payload = {
                "id": user_info.id,
                "email": user_info.email,
                "nickname": user_info.nickname,
                "level": user_info.level,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
            }
        else:
            payload = {
                "id": user_info['id'],
                "email": user_info['email'],
                "nickname": user_info['nickname'],
                "level": user_info['level'],
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
            }
    else:
        payload = {
            "id": user_info.id,
            "email": user_info.email,
            "nickname": user_info.nickname,
            "level": user_info.level,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=14)
        }
    return jwt.encode(payload=payload, key=key, algorithm=alg)

async def token_check(access_token, refresh_token):
    try:
        key = config['TOKEN_KEY']
        # access_token 으로 검사를 하고 맞으면 통과 기간이 지났으면 refresh_token 으로 검사를 해준다.
        jwt.decode(access_token, key, algorithms=['HS256'])
        return access_token
    except jwt.ExpiredSignatureError:
        # refresh_token 으로 실제 디비에 refresh_token의 유저를 가져온다
        try:
            key = config['TOKEN_KEY']
            # db 에 있는 토큰을 가져올 경우 refresh_token의 검사를 하고 기간이 지나면 실패한다
            # 성공일 경우 새로운 access_token 을 발급해 준다.
            # print('갱신 시작')
            decode = jwt.decode(refresh_token, key, algorithms=['HS256'])
            return create_token('access_token', decode, True)
        except jwt.ExpiredSignatureError:
            return False


    except Exception as e:
        print(e)
        return False