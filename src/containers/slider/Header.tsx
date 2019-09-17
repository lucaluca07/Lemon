import * as React from 'react';
import Avatar from '../../components/avatar';

const Header: React.SFC = () => {
  return (
    <header className="slider-header">
      <div className="slider-userinfo">
        <Avatar src="https://profile-photo.s3.cn-north-1.amazonaws.com.cn/files/avatar/50705/MTAxNDExNzYzNzM1emY0Yzc0/avatar.png?v=93be45f191e645a99c67b205dcadb379"/>
        <span className="slider-username">星河</span>
      </div>

      <div>search</div>
    </header>
  )
}

export default Header;