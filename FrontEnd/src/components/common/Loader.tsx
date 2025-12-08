
import { Spin, Skeleton, Space } from 'antd';

const Loader = ({ message = 'Loading...', fullPage = false, count = 3 }) => {
  if (fullPage) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Spin size="large" tip={message} />
      </div>
    );
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} active paragraph={{ rows: 3 }} />
      ))}
    </Space>
  );
};

export default Loader;
