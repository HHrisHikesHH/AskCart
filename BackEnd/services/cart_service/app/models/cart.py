from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from backend.shared.db import Base
import datetime

class Cart(Base):
	__tablename__ = "carts"
	id = Column(Integer, primary_key=True, index=True)
	user_id = Column(String, index=True)
	created_at = Column(DateTime, default=datetime.datetime.utcnow)
	items = relationship("CartItem", back_populates="cart")

class CartItem(Base):
	__tablename__ = "cart_items"
	id = Column(Integer, primary_key=True, index=True)
	cart_id = Column(Integer, ForeignKey("carts.id"))
	product_id = Column(Integer)
	quantity = Column(Integer)
	cart = relationship("Cart", back_populates="items")
