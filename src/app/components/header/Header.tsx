import React from 'react';
import './Header.scss';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__logo">LOGO</div>
      <nav className="header__nav">
        <a href="#home" className="header__link">TRANG CHỦ</a>
        <a href="#info" className="header__link">THÔNG TIN</a>
        <a href="#search" className="header__link">TÌM KIẾM</a>
      </nav>
      <div className="header__actions">
        <button className="header__login-btn">ĐĂNG NHẬP</button>
        <div className="header__icon-menu">
          <span className="header__icon">☰</span>
          <span className="header__icon-user">👤</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
