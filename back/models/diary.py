from sqlalchemy import Column, String, Integer, DateTime, func, Text, ForeignKey, PickleType
from database.connection import Base, engine
from sqlalchemy.orm import relationship



class Diary(Base):
    __tablename__ = "diary"

    id = Column(Integer, primary_key=True, index=True)
    location = Column(String(25), nullable=False)
    title = Column(String(20), nullable=False)
    description = Column(String(100), nullable=False)
    content = Column(PickleType)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    created_at = Column(DateTime(6), default=func.utc_timestamp(), nullable=False)
    updated_at = Column(DateTime(6), default=func.utc_timestamp(), onupdate=func.utc_timestamp(), nullable=False)

    user = relationship("User", back_populates="diary")

