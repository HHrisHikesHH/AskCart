from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from .models.product import Product as ProductModel
from .schemas.product import ProductCreate

async def create_product(db: AsyncSession, product: ProductCreate):
    db_product = ProductModel(**product.model_dump())
    db.add(db_product)
    await db.commit()
    await db.refresh(db_product)
    return db_product

async def get_product(db: AsyncSession, product_id: int):
    result = await db.execute(select(ProductModel).filter(ProductModel.id == product_id))
    return result.scalar_one_or_none()

# Add update/delete similarly