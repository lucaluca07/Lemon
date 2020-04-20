import React from 'react';
import classNames from 'classnames';

interface ModalProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onCancel: () => void;
  visible: boolean;
}

const Modal: React.FC<ModalProps> = ({
  children,
  header,
  footer,
  visible,
  onCancel,
}) => {
  return (
    <div className="modal-root">
      <div
        className={classNames('modal-mask', { 'modal-mask-hide': !visible })}
      />
      <div
        onClick={onCancel}
        className={classNames('modal-warp', { 'modal-hide': !visible })}
      >
        <div onClick={(e) => e.stopPropagation()} className="modal">
          {header && <div className="modal-header">{header}</div>}
          <div className="modal-content">{children}</div>
          {footer && <div className="modal-footer">{footer}</div>}
          <button className="modal-close" onClick={onCancel}>
            <i className="iconfont icon-close" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
