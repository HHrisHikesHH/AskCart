
import { Result } from 'antd';

const EmptyState = ({
  title = 'No Data',
  description = 'No data available',
  status = 'info',
  extra = null,
}: any) => {
  return (
    <Result
      status={status as any}
      title={title}
      subTitle={description}
      extra={extra}
      style={{ paddingTop: '50px', paddingBottom: '50px' }}
    />
  );
};

export default EmptyState;
