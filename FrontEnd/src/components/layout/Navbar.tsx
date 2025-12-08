import type { ReactNode } from 'react';
import { useState } from 'react';
import { Layout, Input, Badge, Menu, Avatar, Dropdown, Button, Space, Drawer } from 'antd';
import { ShoppingCartOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const [searchValue, setSearchValue] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchValue)}`);
      setSearchValue('');
    }
  };

  const userMenuItems: any = [
    {
      key: 'profile',
      label: 'Profile',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'orders',
      label: 'My Orders',
      onClick: () => navigate('/orders'),
    },
    {
      key: 'divider',
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Logout',
      onClick: () => logout(),
    },
  ];

  const mobileMenuItems = [
    {
      key: 'home',
      label: 'Home',
      onClick: () => {
        navigate('/');
        setDrawerVisible(false);
      },
    },
    {
      key: 'products',
      label: 'Products',
      onClick: () => {
        navigate('/products');
        setDrawerVisible(false);
      },
    },
    {
      key: 'ai-chat',
      label: 'AI Chat',
      onClick: () => {
        navigate('/ai');
        setDrawerVisible(false);
      },
    },
    {
      key: 'cart',
      label: 'Cart',
      onClick: () => {
        navigate('/cart');
        setDrawerVisible(false);
      },
    },
  ];

  return (
    <>
      <Header
        style={{
          background: '#fff',
          padding: '0 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1890ff',
          }}
          onClick={() => navigate('/')}
        >
          🛒 AskCart
        </div>

        {/* Desktop Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            flex: 1,
            marginLeft: '48px',
          }}
          className="desktop-nav"
        >
          <Input
            placeholder="Search products..."
            prefix={null}
            style={{ width: '300px' }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
            allowClear
          />

          <Button type="text" onClick={() => navigate('/products')}>
            Browse
          </Button>
          <Button type="text" onClick={() => navigate('/ai')}>
            Ask AI
          </Button>
        </div>

        <Space size="large" style={{ display: 'flex', alignItems: 'center' }}>
          {/* Cart Badge */}
          <Badge
            count={itemCount}
            style={{ backgroundColor: '#ff4d4f' }}
            onClick={() => navigate('/cart')}
          >
            <Button
              type="text"
              icon={<ShoppingCartOutlined />}
              style={{ fontSize: '18px' }}
            />
          </Badge>

          {/* User Menu */}
          {isAuthenticated ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Avatar
                icon={<UserOutlined />}
                style={{ backgroundColor: '#1890ff', cursor: 'pointer' }}
              />
            </Dropdown>
          ) : (
            <Space>
              <Button type="primary" onClick={() => navigate('/login')}>
                Login
              </Button>
            </Space>
          )}

          {/* Mobile Menu */}
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(true)}
            style={{ display: 'none' }}
            className="mobile-menu-btn"
          />
        </Space>
      </Header>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Menu items={mobileMenuItems} style={{ border: 'none' }} />
        {!isAuthenticated && (
          <Space direction="vertical" style={{ width: '100%', marginTop: '16px' }}>
            <Button
              type="primary"
              block
              onClick={() => {
                navigate('/login');
                setDrawerVisible(false);
              }}
            >
              Login
            </Button>
            <Button
              block
              onClick={() => {
                navigate('/register');
                setDrawerVisible(false);
              }}
            >
              Register
            </Button>
          </Space>
        )}
      </Drawer>
    </>
  );
};

export default Navbar;
