from fastapi.responses import JSONResponse
from fastapi import HTTPException
import pymysql
from database import basic

class Save():

    async def get_location(location):
        try:
            conn = await basic()
            curs = conn.cursor(pymysql.cursors.DictCursor)

            save_location_sql = f''' SELECT * FROM save WHERE location = '{location}' '''
            curs.execute(save_location_sql)
            save_location = curs.fetchone()

            card_location_sql = f''' SELECT * FROM card WHERE location = '{location}' '''
            curs.execute(card_location_sql)
            card_location = curs.fetchone()

            conn.close()

            if save_location:
                return True

            if card_location:
                return True

            return False


        except Exception as e:
            # print(e)
            raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다."})



    async def save(data):
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