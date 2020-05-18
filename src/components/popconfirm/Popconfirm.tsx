import React, { useMemo } from 'react';
import Popover from 'src/components/popover';
import Button from 'src/components/button';

interface IProps {
  title: React.ReactNode;
  okText?: string;
  cancelText?: string;
  okType?:
    | 'link'
    | 'primary'
    | 'default'
    | 'ghost'
    | 'dashed'
    | 'danger'
    | 'icon';
  cancelType?:
    | 'link'
    | 'primary'
    | 'default'
    | 'ghost'
    | 'dashed'
    | 'danger'
    | 'icon';
  style?: React.CSSProperties;
  onOk?: () => void;
  onCancel?: () => void;
}

const Popconfirm: React.FC<IProps> = ({
  style,
  title,
  okText = '确定',
  cancelText = '取消',
  okType = 'primary',
  cancelType,
  children,
  onOk,
  onCancel,
}) => {
  const content = useMemo(() => {
    return (
      <div className="popconfirm-content">
        <div className="popconfirm-title">{title}</div>
        <div className="popconfirm-buttons">
          <Button
            style={{ marginRight: 8 }}
            type={cancelType}
            data-popover-hide
            onClick={onCancel}
            size="small"
          >
            {cancelText}
          </Button>
          <Button size="small" data-popover-hide type={okType} onClick={onOk}>
            {okText}
          </Button>
        </div>
      </div>
    );
  }, [title, okText, cancelText, okType, cancelType, onCancel, onOk]);
  return (
    <Popover style={style} content={content}>
      {children}
    </Popover>
  );
};

export default Popconfirm;
