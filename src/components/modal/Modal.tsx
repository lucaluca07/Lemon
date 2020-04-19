import React from 'react';

interface ModalProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children, header, footer }) => {
  return (
    <div className="modal-root">
      <div className="modal-mask" />
      <div className="modal-warp">
        <div className="modal">
          <div className="modal-header">{header}</div>
          <div className="modal-header">{children}</div>
          <div className="modal-footer">{footer}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
