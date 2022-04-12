from sqlalchemy import Column, String, Integer, DateTime, func, Text, ForeignKey
from database.connection import Base
from sqlalchemy.orm import relationship




class DiarySave(Base):
    __tablename__ = "diary_save"

    id = Column(Integer, primary_key=True, index=True)
    location = Column(String(30), nullable=False)
    content = Column(Text)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    created_at = Column(DateTime(6), default=func.utc_timestamp(), nullable=False)

    user = relationship("User", back_populates="diary_save")
