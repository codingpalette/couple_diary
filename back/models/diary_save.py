from sqlalchemy import Column, String, Integer, DateTime, func, Text, ForeignKey, PickleType
from database.connection import Base
from sqlalchemy.orm import relationship




class DiarySave(Base):
    __tablename__ = "diary_save"

    id = Column(Integer, primary_key=True, index=True)
    location = Column(String(25), nullable=False)
    title = Column(String(20))
    description = Column(String(100))
    content = Column(PickleType)
    user_id = Column(Integer, ForeignKey("user.id", ondelete='CASCADE'), nullable=False)
    created_at = Column(DateTime(6), default=func.utc_timestamp(), nullable=False)
    updated_at = Column(DateTime(6), default=func.utc_timestamp(), onupdate=func.utc_timestamp(), nullable=False)

    user = relationship("User", back_populates="diary_save")
