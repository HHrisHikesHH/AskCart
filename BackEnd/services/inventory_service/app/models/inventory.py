from sqlalchemy import Column, Integer, ForeignKey
from backend.shared.db import Base

class Inventory(Base):
	__tablename__ = "inventory"
	id = Column(Integer, primary_key=True, index=True)
	product_id = Column(Integer)
	stock = Column(Integer)
	reserved = Column(Integer, default=0)
