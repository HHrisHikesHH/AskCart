import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Row, Col, Empty } from 'antd';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, loading, onAddToCart, columns = { xs: 1, sm: 2, md: 3, lg: 4 } }) => {
  if (!loading && (!products || products.length === 0)) {
    return <Empty description="No products found" style={{ marginTop: '50px', marginBottom: '50px' }} />;
  }

  return (
    <Row gutter={[16, 16]}>
      {products?.map((product) => (
        <Col key={product.id} xs={columns.xs} sm={columns.sm} md={columns.md} lg={columns.lg}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;
