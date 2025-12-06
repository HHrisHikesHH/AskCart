CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    sku VARCHAR(255),
    price DOUBLE PRECISION,
    currency VARCHAR(10),
    stock_quantity INTEGER,
    category_id VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    version BIGINT
);
