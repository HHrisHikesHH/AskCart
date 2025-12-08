import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Spin } from 'antd';
import { useAuth } from '../../contexts/AuthContext';

export default function LogoutPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        message.success('Logged out successfully');
        navigate('/login');
      } catch (error) {
        message.error('Logout failed');
        navigate('/login');
      }
    };

    handleLogout();
  }, [logout, navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Spin size="large" />
    </div>
  );
}
