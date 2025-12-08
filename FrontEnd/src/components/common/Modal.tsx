
import { Modal as AntModal } from 'antd';

const Modal = ({
  visible,
  title,
  children,
  onOk,
  onCancel,
  okText = 'OK',
  cancelText = 'Cancel',
  ...props
}) => {
  return (
    <AntModal
      open={visible}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      {...props}
    >
      {children}
    </AntModal>
  );
};

export default Modal;
