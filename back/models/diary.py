from sqlalchemy import Column, String, Integer, DateTime, func, Text, ForeignKey
from database.connection import Base, engine
from sqlalchemy.orm import relationship



class Diary(Base):
    __tablename__ = "diary"

    id = Column(Integer, primary_key=True, index=True)
    location = Column(String(25), nullable=False)
    title = Column(String(20), nullable=False)
    description = Column(String(100), nullable=False)
    content = Column(Text)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    created_at = Column(DateTime(6), default=func.utc_timestamp(), nullable=False)
    updated_at = Column(DateTime(6), default=func.utc_timestamp(), onupdate=func.utc_timestamp(), nullable=False)

    user = relationship("User", back_populates="diary")


# class Diary():
#
#     async def diary_save(data):
#         try:
#             conn = await basic()
#             curs = conn.cursor(pymysql.cursors.DictCursor)
#             sql = f''' INSERT INTO card SET user_id = {data.user_id}, content = '{data.list}'; '''
#             curs.execute(sql)
#             conn.commit()
#             conn.close()
#             return True
#
#         except Exception as e:
#             # print(e)
#             raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다."})
