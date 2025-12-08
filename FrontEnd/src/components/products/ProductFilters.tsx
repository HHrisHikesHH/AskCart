import React, { useState } from 'react';
import { Card, Row, Col, Select, Checkbox, Space, Button, Typography, Collapse } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ProductFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    priceRange: null,
    categories: [],
    sortBy: 'featured',
  });

  const handlePriceChange = (value) => {
    const updated = { ...filters, priceRange: value };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const handleCategoryChange = (category, checked) => {
    const updated = checked
      ? { ...filters, categories: [...filters.categories, category] }
      : { ...filters, categories: filters.categories.filter((c) => c !== category) };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const handleSortChange = (value) => {
    const updated = { ...filters, sortBy: value };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const items = [
    {
      key: 'price',
      label: 'Price Range',
      children: (
        <Space direction="vertical">
          <Select
            placeholder="Select price range"
            style={{ width: '100%' }}
            onChange={handlePriceChange}
            options={[
              { label: 'Under $50', value: 'under-50' },
              { label: '$50 - $100', value: '50-100' },
              { label: '$100 - $500', value: '100-500' },
              { label: 'Over $500', value: 'over-500' },
            ]}
          />
        </Space>
      ),
    },
    {
      key: 'category',
      label: 'Categories',
      children: (
        <Space direction="vertical">
          {['Electronics', 'Clothing', 'Books', 'Home', 'Sports'].map((cat) => (
            <Checkbox
              key={cat}
              checked={filters.categories.includes(cat)}
              onChange={(e) => handleCategoryChange(cat, e.target.checked)}
            >
              {cat}
            </Checkbox>
          ))}
        </Space>
      ),
    },
    {
      key: 'sort',
      label: 'Sort By',
      children: (
        <Select
          value={filters.sortBy}
          onChange={handleSortChange}
          style={{ width: '100%' }}
          options={[
            { label: 'Featured', value: 'featured' },
            { label: 'Price: Low to High', value: 'price-asc' },
            { label: 'Price: High to Low', value: 'price-desc' },
            { label: 'Newest', value: 'newest' },
            { label: 'Most Popular', value: 'popular' },
          ]}
        />
      ),
    },
  ];

  return (
    <Card
      style={{
        borderRadius: '8px',
        position: 'sticky',
        top: '20px',
      }}
      title={
        <Space>
          <FilterOutlined />
          <span>Filters</span>
        </Space>
      }
    >
      <Collapse items={items} accordion />
      <Button
        type="primary"
        block
        style={{ marginTop: '16px' }}
        onClick={() => {
          setFilters({
            priceRange: null,
            categories: [],
            sortBy: 'featured',
          });
          onFilterChange?.({ priceRange: null, categories: [], sortBy: 'featured' });
        }}
      >
        Clear Filters
      </Button>
    </Card>
  );
};

export default ProductFilters;
