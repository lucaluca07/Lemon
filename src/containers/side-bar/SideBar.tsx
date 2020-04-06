import * as React from 'react';

const list = ['收件箱', '今天', '未来7天'];

const SideBar: React.FC = () => {
  return (
    <div className="side-bar">
      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
