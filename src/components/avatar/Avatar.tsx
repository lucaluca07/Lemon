import classnames from 'classnames';
import * as React from 'react';

import './avatar.less';

export interface AvatarProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Avatar: React.SFC<AvatarProps> = ({
  src,
  alt = '头像',
  className,
  style
}) => {
  const [visible, setVisible] = React.useState(true);

  const classString = React.useMemo(() => {
    return classnames('l-avatar', { className });
  }, [className]);

  return (
    <div style={style} className={classString}>
      {visible && <img onError={() => setVisible(false)} src={src} alt={alt} />}
    </div>
  );
};

export default Avatar;
