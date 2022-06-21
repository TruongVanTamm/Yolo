import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '../Layout/Grid';
import logo from '../../Asset/images/Logo.png';

const footerAboutLink = [
  {
    display: 'Giới thiệu',
    path: '/about',
  },
  {
    display: 'Liên hệ',
    path: '/about',
  },
  {
    display: 'Tuyển dụng',
    path: '/about',
  },
  {
    display: 'Tin tức',
    path: '/about',
  },
  {
    display: 'Hệ thống cửa hàng',
    path: '/about',
  },
];

const footerCustomeLink = [
  {
    display: 'Chính sách đổi trả',
    path: '/about',
  },
  {
    display: 'Chính sách bảo hành',
    path: '/about',
  },
  {
    display: 'Chính sách hoàn tiền',
    path: '/about',
  },
];
const Footer = () => {
  return (
    <footer className="container footer">
      <Grid
        col={4}
        mdCol={2}
        smCol={1}
        gap={10}
      >
        <div className="">
          <div className="footer__title">Tổng đài hỗ trợ</div>
          <div className="footer__content">
            <p>
              Liên hệ đặt hàng: <strong>0399817202</strong>
            </p>
            <p>
              Thắc mắc đơn hàng: <strong>0399817202</strong>
            </p>
            <p>
              Góp ý, khiếu nại: <strong>0399817202</strong>
            </p>
          </div>
        </div>
        <div>
          <div className="footer__title">Về Yolo</div>
          <div className="footer__content">
            {footerAboutLink.map((item, index) => {
              return (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              );
            })}
          </div>
        </div>

        <div>
          <div className="footer__title">Chăm sóc khách hàng</div>
          <div className="footer__content">
            {footerCustomeLink.map((item, index) => {
              return (
                <p key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </p>
              );
            })}
          </div>
        </div>

        <div className="footer__about">
          <p>
            <Link to="/">
              <img
                src={logo}
                alt=""
                className="footer__logo"
              />
            </Link>
          </p>
          <p>
            Hướng đến mục tiêu mang lại niềm vui ăn mặc mỗi ngày cho hàng triệu
            người tiêu dùng Việt. Hãy cùng Yolo hướng đến một cuộc sống năng
            động, tích cực hơn."Đặt sự hài lòng của khách hàng là ưu tiên số 1
            trong mọi suy nghĩ hành động của mình” là sứ mệnh, là triết lý,
            chiến lược.. luôn cùng YOLO tiến bước
          </p>
        </div>
      </Grid>
      <Grid
        col={1}
        mdCol={1}
        smCol={1}
      >
        <div className="footer__end">
          <span>
            @ Bản quyền thuộc về <strong>Yolo.vn</strong> All right reserved
          </span>
        </div>
      </Grid>
    </footer>
  );
};

export default Footer;
