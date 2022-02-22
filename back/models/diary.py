from fastapi.responses import JSONResponse
from fastapi import HTTPException
import pymysql
from database import basic

class Diary():

    async def diary_save(data):
        try:
            conn = await basic()
            curs = conn.cursor(pymysql.cursors.DictCursor)
            sql = f''' INSERT INTO card SET user_id = {data.user_id}, content = '{data.list}'; '''
            curs.execute(sql)
            conn.commit()
            conn.close()
            return True

        except Exception as e:
            # print(e)
            raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다."})
