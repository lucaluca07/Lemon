import * as React from 'react';
import classnames from 'classnames';
import './layout.less';

export interface LayoutProps {
  aside: React.ReactNode;
  main: React.ReactNode;
  header: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Layout: React.SFC<LayoutProps> = ({
  aside,
  main,
  header,
  className,
  style,
}) => {
  const [visible, setVisible] = React.useState(false);

  const classString = React.useMemo(() => {
    return classnames('l-layout', { className });
  }, [className]);

  const asideClassString = React.useMemo(() => {
    return classnames('l-layout-aside', { 'l-layout-aside-visible': visible });
  }, [visible]);
  const maskClassString = React.useMemo(() => {
    return classnames('l-layout-mask', { 'l-layout-mask-visible': visible });
  }, [visible]);

  return (
    <div className={classString} style={style}>
      <header className="l-layout-header">
        <div className="l-layout-header-inner">
          <div
            className="l-layout-visible-btn"
            onClick={() => {
              setVisible(true);
            }}
          >
            显
          </div>
          <div className="l-layout-header-content">{header}</div>
        </div>
      </header>
      <article className="l-layout-article">
        <aside className={asideClassString}>{aside}</aside>
        <main className="l-layout-main">{main}</main>
        <div className={maskClassString} onClick={() => setVisible(false)} />
      </article>
    </div>
  );
};

export default Layout;
