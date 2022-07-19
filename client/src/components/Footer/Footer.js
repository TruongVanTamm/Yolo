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
          <div className="footer__title">Hỗ trợ khách hàng</div>
          <div className="footer__content">
            <p>
              Hotline: <a href="tel:0399817202">0399817202</a>
              <br />
              (1000 đ/phút, 8-21h kể cả T7, CN)
            </p>
            <p>Các câu hỏi thường gặp</p>
            <p>Gửi yêu cầu hỗ trợ</p>
            <p>Hướng dẫn đặt hàng</p>
            <p>Phương thức vận chuyển</p>
            <p>Chính sách đổi trả</p>
            <p>Hướng dẫn trả góp</p>
            <p>Chính sách hàng nhập khẩu</p>
            <p>Hỗ trợ khách hàng: anhtamqwer79@gmail.com</p>
            <p>Báo lỗi bảo mật: anhtamqwer79@gmail.com</p>
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
