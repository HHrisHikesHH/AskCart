from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from backend.shared.db import Base
import datetime

class Payment(Base):
    __tablename__ = "payments"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer)
    status = Column(String, default="pending")
    amount = Column(Float)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
