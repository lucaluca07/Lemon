import React, { useState } from 'react';
import classNames from 'classnames';

const TopBar: React.FC = () => {
  const [active, setActive] = useState(false);
  return (
    <div className="top-bar">
      <div className="left-control">
        <i className="iconfont icon-open" />
        <label className={classNames('search', { 'search-active': active })}>
          <i className="iconfont icon-search" />
          <input
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            placeholder="快速搜索"
            className="search-input"
            type="text"
          />
          {active && <i className="iconfont icon-close" />}
        </label>
      </div>
      <div className="right-control">
        <i className="iconfont icon-plus" />
        <i className="iconfont icon-notification" />
        <i className="iconfont icon-settings--fill" />
      </div>
    </div>
  );
};

export default TopBar;
