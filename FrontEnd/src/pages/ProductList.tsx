import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Pagination, Spin, Empty, Button, Space } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import productsAPI from '../api/products';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import Loader from '../components/common/Loader';
import { useCart } from '../contexts/CartContext';
import { useUI } from '../contexts/UIContext';

const { Content } = Layout;

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const { addItem } = useCart();
  const { showSuccess, showError } = useUI();

  const pageSize = 12;
  const search = searchParams.get('search');
  const category = searchParams.get('category');

  // Build query params
  const queryParams = {
    page,
    limit: pageSize,
    ...(search && { search }),
    ...(category && { category }),
    ...filters,
  };

  const { data, isLoading } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => productsAPI.getAll(queryParams).then((res) => res.data),
  });

  const handleAddToCart = async (productId) => {
    try {
      await addItem(productId, 1);
      showSuccess('Added to cart!');
    } catch (err) {
      showError('Failed to add to cart');
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  if (isLoading && page === 1) {
    return (
      <Layout>
        <Content style={{ padding: '24px' }}>
          <Loader />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <Row gutter={[24, 24]}>
          {/* Filters Sidebar */}
          <Col xs={24} lg={6} style={{ display: isLoading ? 'none' : 'block' }}>
            <ProductFilters onFilterChange={handleFilterChange} />
          </Col>

          {/* Products Grid */}
          <Col xs={24} lg={18}>
            <Space direction="vertical" style={{ width: '100%' }}>
              {isLoading ? (
                <Loader />
              ) : data?.products && data.products.length > 0 ? (
                <>
                  <ProductGrid
                    products={data.products}
                    loading={isLoading}
                    onAddToCart={handleAddToCart}
                    columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
                    <Pagination
                      current={page}
                      pageSize={pageSize}
                      total={data.total || 0}
                      onChange={setPage}
                      showSizeChanger={false}
                      style={{ marginTop: '24px' }}
                    />
                  </div>
                </>
              ) : (
                <Empty
                  description="No products found"
                  style={{ marginTop: '50px', marginBottom: '50px' }}
                />
              )}
            </Space>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ProductList;
