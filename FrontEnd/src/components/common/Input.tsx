
import { Input as AntInput, Space } from 'antd';

const Input = ({
  prefix,
  suffix,
  error,
  errorMessage,
  fullWidth = true,
  ...props
}) => {
  const hasError = error && errorMessage;

  return (
    <Space direction="vertical" style={{ width: fullWidth ? '100%' : 'auto' }}>
      <AntInput
        prefix={prefix}
        suffix={suffix}
        status={hasError ? 'error' : ''}
        style={{ width: fullWidth ? '100%' : 'auto' }}
        {...props}
      />
      {hasError && (
        <span style={{ color: '#ff4d4f', fontSize: '12px' }}>
          {errorMessage}
        </span>
      )}
    </Space>
  );
};

export default Input;
