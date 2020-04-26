import React from 'react';
import classNames from 'classnames';

interface ModalProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onCancel: () => void;
  onOk: () => void;
  visible: boolean;
}

interface FooterProps {
  onOk: () => void;
  onCancel: () => void;
}

const DefaultFooter: React.FC<FooterProps> = ({ onOk, onCancel }) => {
  return (
    <>
      <button className="modal-cancel" onClick={onCancel}>
        取消
      </button>
      <button className="modal-ok" onClick={onOk}>
        确定
      </button>
    </>
  );
};

const Modal: React.FC<ModalProps> = ({
  children,
  header,
  footer,
  visible,
  onCancel,
  onOk,
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
          <div className="modal-footer">
            {footer || <DefaultFooter onOk={onOk} onCancel={onCancel} />}
          </div>
          <button className="modal-close" onClick={onCancel}>
            <i className="iconfont icon-close" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
