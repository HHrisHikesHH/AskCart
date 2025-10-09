from fastapi import APIRouter, Depends, HTTPException
from shared.db import get_db
from .crud.product import create_product, get_product
from .schemas.product import Product, ProductCreate

router = APIRouter(prefix="/products", tags=["products"])

@router.post("/", response_model=Product)
async def create_product_route(product: ProductCreate, db = Depends(get_db)):
    return await create_product(db, product)

@router.get("/{product_id}", response_model=Product)
async def read_product(product_id: int, db = Depends(get_db)):
    db_product = await get_product(db, product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product