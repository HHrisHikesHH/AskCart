from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship
from backend.shared.db import Base
import datetime

class Order(Base):
	__tablename__ = "orders"
	id = Column(Integer, primary_key=True, index=True)
	user_id = Column(String, index=True)
	status = Column(String, default="pending")
	total_amount = Column(Float)
	created_at = Column(DateTime, default=datetime.datetime.utcnow)
	items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
	__tablename__ = "order_items"
	id = Column(Integer, primary_key=True, index=True)
	order_id = Column(Integer, ForeignKey("orders.id"))
	product_id = Column(Integer)
	quantity = Column(Integer)
	price = Column(Float)
	order = relationship("Order", back_populates="items")
