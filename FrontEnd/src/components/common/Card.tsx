
import { Card as AntCard } from 'antd';

const Card = ({
  title,
  children,
  hoverable = false,
  bordered = true,
  ...props
}) => {
  return (
    <AntCard
      title={title}
      hoverable={hoverable}
      bordered={bordered}
      {...props}
    >
      {children}
    </AntCard>
  );
};

export default Card;
