import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const { Title, Text } = Typography;

export default function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '24px',
        padding: '48px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        textAlign: 'center'
      }}>
        <Title level={1} style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '16px'
        }}>
          Welcome to AskCart
        </Title>
        
        <Text style={{ fontSize: '18px', color: '#64748b', display: 'block', marginBottom: '32px' }}>
          Hello, <strong>{user?.username}</strong>! 👋
        </Text>

        <div style={{ 
          background: '#f8fafc', 
          padding: '20px', 
          borderRadius: '12px', 
          marginBottom: '32px',
          textAlign: 'left'
        }}>
          <Text strong style={{ color: '#334155' }}>Your Account Details:</Text>
          <div style={{ marginTop: '12px' }}>
            <div style={{ marginBottom: '8px' }}>
              <Text type="secondary">Email: </Text>
              <Text strong>{user?.email}</Text>
            </div>
            <div>
              <Text type="secondary">User ID: </Text>
              <Text strong>{user?.id}</Text>
            </div>
          </div>
        </div>

        <Button 
          type="primary" 
          size="large" 
          onClick={handleLogout}
          style={{
            width: '100%',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            fontSize: '16px',
            fontWeight: 600,
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)'
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
