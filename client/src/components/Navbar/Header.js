import axios from 'axios';
import React, { useContext, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../Asset/images/Logo-2.png';
import logoAdmin from '../../Asset/images/logoAdmin.png';
import { GlobalState } from '../../GlobalState';
import Tippy from '@tippyjs/react';
import TippyStyle from '../utils/TippyStyle';
const mainNav = [
  {
    display: 'Trang chủ',
    path: '/',
  },
  {
    display: 'Sản phẩm',
    path: '/catalog',
  },
  {
    display: 'Phụ kiện',
    path: '/accessories',
  },
  {
    display: 'Liên hệ',
    path: '/contact',
  },
];
const Header = () => {
  const { pathname } = useLocation();
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const activeNav = mainNav.findIndex((e) => e.path === pathname);
  const headerRef = useRef(null);
  const menuLeft = useRef(null);
  const menuToggle = () => {
    menuLeft.current.classList.toggle('active');
  };
  const logoutUser = async () => {
    await axios.get('/user/logout');

    localStorage.removeItem('firstLogin');

    window.location.href = '/signin';
  };
  const adminRouter = () => {
    return (
      <>
        <div className="header__menu__right__item header__menu__item" title="Tạo sản phẩm ">
            <Link to="/create_product">
              <i className="bx bx-list-plus"></i>
            </Link>
        </div>
        <div className="header__menu__right__item header__menu__item" title="Danh mục sản phẩm ">
            <Link to="/category">
              <i className="bx bxs-category"></i>
            </Link>
        </div>
      </>
    );
  };
  const loggedRouter = () => {
    return (
      <>
      <li>
          <Link to="/profile">Thông tin khách hàng</Link>
        </li>
        <li>
          <Link to="/history">Lịch sử đơn hàng</Link>
        </li>
        <li>
          <Link
            to="/"
            onClick={logoutUser}
          >
            Đăng xuất
          </Link>
        </li>
      </>
    );
  };
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    });
    return () => window.addEventListener('scroll');
  }, []);
  return (
    <div
      className="header"
      ref={headerRef}
    >
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            {isAdmin ? (
              <img
                src={logoAdmin}
                alt=""
                className="header__logo__admin"
              />
            ) : (
              <img
                src={logo}
                alt=""
                className="header__logo__user"
              />
            )}
          </Link>
        </div>
        <div className="header__menu">
          <div
            className="header__menu__mobile-toggle"
            onClick={menuToggle}
          >
            <i className="bx bx-menu"></i>
          </div>
          <div
            className="header__menu__left "
            ref={menuLeft}
          >
            <div
              className="header__menu__left-close"
              onClick={menuToggle}
            >
              <i className="bx bx-chevron-left"></i>
            </div>

            {mainNav.map((item, index) => {
              return (
                <div
                  className={`header__menu__left__item header__menu__item ${
                    index === activeNav ? 'active' : ''
                  }`}
                  key={index}
                  onClick={menuToggle}
                >
                  <Link to={item.path}>
                    <span className="header__menu__item">{item.display}</span>
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="header__menu__right">
            {isAdmin && adminRouter()}
            <div className="header__menu__right__item header__menu__item" title='Giỏ hàng'>
              <span className="header__menu__right__item__quantity">
                {cart.length}
              </span>
                <Link to="/cart">
                  <i className="bx bx-cart"></i>
                </Link>
            </div>
            <div
              className="header__menu__right__item header__menu__item header__menu__right__user-option" 
            >
              <i className="bx bx-user"></i>
              <div
                className="header__menu__right__item__user-option"
              >
                <ul className="header__menu__right__item__user-option__list">
                  {isLogged ? (
                    loggedRouter()
                  ) : (
                    <li>
                      <Link to="/signin">Đăng nhập</Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            {/* <div className="header__menu__right__item header__menu__item">
              <i className="bx bx-search"></i>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
