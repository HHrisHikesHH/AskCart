from sqlalchemy import Column, Integer, String, DateTime
from backend.shared.db import Base
import datetime

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    message = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
