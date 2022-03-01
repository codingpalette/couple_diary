from fastapi.responses import JSONResponse
from fastapi import HTTPException
import pymysql
from database import basic


class User():
    async def get_username(username):
        try:
            conn = await basic()
            curs = conn.cursor(pymysql.cursors.DictCursor)
            sql = '''SELECT * FROM user WHERE id = %s;'''
            curs.execute(sql,username)
            # print('10초 시작')
            # time.sleep(10)
            # print('10초 끝')
            data = curs.fetchone()
            conn.close()
            return data
        except Exception as e:
            raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다."})
            # return {"result": "fail", "message": "디비 조회에 실패 했습니다."}

    async def user_email_get(email):
        try:
            conn = await basic()
            curs = conn.cursor(pymysql.cursors.DictCursor)
            sql = ''' SELECT * FROM user WHERE email = %s; '''
            curs.execute(sql, email)
            data = curs.fetchone()
            conn.close()
            return data

        except Exception as e:
            # print(e)
            raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다."})

    async def user_create(item):
        try:
            conn = await basic()
            curs = conn.cursor(pymysql.cursors.DictCursor)
            sql = ''' INSERT INTO user (email, nickname, password) VALUES(%s, %s, %s) ; '''
            curs.execute(sql, (item.email, item.nickname, item.password))
            conn.commit()
            conn.close()
            return {"result": "success", "message": "회원가입에 성공했습니다"}

        except Exception as e:
            # print(e)
            raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다."})

    async def token_update(refresh_token, id):
        try:
            conn = await basic()
            curs = conn.cursor(pymysql.cursors.DictCursor)
            sql = ''' UPDATE user SET refresh_token = %s WHERE id = %s; '''
            curs.execute(sql, (refresh_token, id))
            conn.commit()
            conn.close()
            return True

        except Exception as e:
            # print(e)
            raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다."})

    async def get_refresh_token(refresh_token):
        try:
            conn = await basic()
            curs = conn.cursor(pymysql.cursors.DictCursor)
            sql = '''SELECT id, email, nickname, level, refresh_token FROM user WHERE refresh_token = %s;'''
            curs.execute(sql, refresh_token)
            data = curs.fetchone()
            conn.close()
            return data
        except Exception as e:
            # print(e)
            raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다."})


    async def user_logout(token):
        try:
            conn = await basic()
            curs = conn.cursor(pymysql.cursors.DictCursor)
            sql = ''' UPDATE `user` SET refresh_token = null WHERE refresh_token = %s; '''
            curs.execute(sql, token)
            conn.commit()
            conn.close()
            return True
        except Exception as e:
            # print(e)
            raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다."})

    async def user_delete(email):
        try:
            conn = await basic()
            curs = conn.cursor(pymysql.cursors.DictCursor)
            sql = ''' UPDATE user SET deletedAt = NOW() WHERE email = %s; '''
            curs.execute(sql, email)
            conn.commit()
            conn.close()
            return {"result": "success", "message": "회원삭제 성공했습니다"}
        except Exception as e:
            # print(e)
            raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다."})