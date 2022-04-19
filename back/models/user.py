from sqlalchemy import Column, String, Integer, DateTime, func
from database.connection import Base, engine
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    login_id = Column(String(30), unique=True, index=True, nullable=False)
    nickname = Column(String(30), unique=True, index=True, nullable=False)
    level = Column(Integer, default=1, nullable=False)
    password = Column(String(250), nullable=False)
    refresh_token = Column(String(250))
    created_at = Column(DateTime(6), default=func.utc_timestamp(), nullable=False)
    updated_at = Column(DateTime(6), default=func.utc_timestamp(), onupdate=func.utc_timestamp(), nullable=False)
    deleted_at = Column(DateTime(6))

    diary = relationship("Diary", back_populates="user")
    diary_save = relationship("DiarySave", back_populates="user")

