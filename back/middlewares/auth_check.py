from starlette.requests import Request
from fastapi.responses import JSONResponse
from functions import token


async def access_control(request: Request, call_next):
    # 미들웨어 시작 header 에서 쿠기를 가져온다
    # print('미들웨어 시작')
    url = request.url.path
    cookies = request.cookies
    check_list = ['/api/user/check']
    try:
        # if url.startswith('/api/user/check'):
        if url in check_list:
            access_token = cookies.get("access_token")
            refresh_token = cookies.get("refresh_token")
            # print("access_token", access_token)
            # access_token, refresh_token 으로 토큰 검증을 한다.
            token_check = await token.token_check(access_token, refresh_token)
            if not token_check:

                return JSONResponse(status_code=201, content={"result": "fail", "message": "인증실패"})
            else:
                request.state.access_token = token_check
                return await call_next(request)
                # response.set_cookie(key="access_token", value=token_check)
                # print('end')
                # return response
        else:
            response = await call_next(request)
            return response

    except:
        return False
