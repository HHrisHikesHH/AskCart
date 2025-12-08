import React from 'react';
import { Typography, Space, Avatar } from 'antd';

const { Paragraph } = Typography;

const MessageBubble = ({ message, isUser = false, timestamp }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '16px',
        paddingBottom: '8px',
      }}
    >
      <Space
        direction="vertical"
        size={0}
        style={{
          maxWidth: '70%',
          alignItems: isUser ? 'flex-end' : 'flex-start',
        }}
      >
        <div
          style={{
            backgroundColor: isUser ? '#1890ff' : '#f5f5f5',
            color: isUser ? '#fff' : '#000',
            padding: '8px 12px',
            borderRadius: '8px',
            wordWrap: 'break-word',
          }}
        >
          <Paragraph style={{ margin: 0, color: 'inherit' }}>
            {message}
          </Paragraph>
        </div>
        {timestamp && (
          <small style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
            {timestamp}
          </small>
        )}
      </Space>
    </div>
  );
};

export default MessageBubble;
