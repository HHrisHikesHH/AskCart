import React, { useState, useRef, useEffect } from 'react';
import { Layout, Input, Button, Space, Spin, Card, Empty } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import aiAPI from '../api/ai';
import MessageBubble from '../components/common/MessageBubble';
import { useUI } from '../contexts/UIContext';

const { Content } = Layout;

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { showError } = useUI();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage;
    setInputMessage('');
    setMessages((prev) => [...prev, { text: userMsg, isUser: true }]);
    setLoading(true);

    try {
      const response = await aiAPI.chat(userMsg);
      setMessages((prev) => [
        ...prev,
        { text: response.data.response, isUser: false },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, I could not process that request.', isUser: false },
      ]);
      showError('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Content style={{ padding: '24px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <h1>AI Shopping Assistant</h1>

        <Card
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            marginBottom: '16px',
          }}
        >
          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              marginBottom: '16px',
              paddingRight: '8px',
            }}
          >
            {messages.length === 0 ? (
              <Empty
                description="Start a conversation"
                style={{ marginTop: '50px' }}
              />
            ) : (
              messages.map((msg, idx) => (
                <MessageBubble
                  key={idx}
                  message={msg.text}
                  isUser={msg.isUser}
                  timestamp={new Date().toISOString()}
                />
              ))
            )}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Spin />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <Space.Compact style={{ width: '100%' }}>
            <Input
              placeholder="Ask me anything about products..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={loading}
              style={{ padding: '8px 12px' }}
              size="large"
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              loading={loading}
              size="large"
            >
              Send
            </Button>
          </Space.Compact>
        </Card>
      </Content>
    </Layout>
  );
};

export default AIChat;
