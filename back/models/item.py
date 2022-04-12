from sqlalchemy import Column, String, Integer, DateTime, func, Text, ForeignKey
from database.connection import Base, engine
from sqlalchemy.orm import relationship



class Item(Base):
    __tablename__ = "item"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(String)
    created_at = Column(DateTime(6), default=func.utc_timestamp())



