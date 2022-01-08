import pymysql
from config import conf



async def basic():
    config = conf()
    try:
        conn = pymysql.connect(
            host=config['HOST'],
            user=config['USERNAME'],
            password=config['PASSWORD'],
            db=config['DATABASE'],
            charset='utf8'
        )
        return conn
    except Exception as e:
        # print(e)
        return False