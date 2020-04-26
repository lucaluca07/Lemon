import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import './style.less';

interface FnProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const Index: React.FC<FnProps> = ({
  header,
  footer,
  children,
  onOk,
  visible,
  onCancel,
}) => {
  return ReactDOM.createPortal(
    <Modal
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      header={header}
      footer={footer}
    >
      {children}
    </Modal>,
    document.body,
  );
};
export default Index;
