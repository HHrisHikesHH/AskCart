
import { Button as AntButton } from 'antd';

const Button = ({
  variant = 'primary',
  size = 'middle',
  children,
  fullWidth = false,
  ...props
}: any) => {
  let type: any = 'primary';
  if (variant === 'secondary') type = 'default';
  if (variant === 'danger') type = 'primary';
  if (variant === 'dashed') type = 'dashed';

  let danger = false;
  if (variant === 'danger') danger = true;

  return (
    <AntButton
      type={type}
      size={size as any}
      danger={danger}
      block={fullWidth}
      {...props}
    >
      {children}
    </AntButton>
  );
};

export default Button;
