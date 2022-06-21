import React from 'react';
import PropTypes from 'prop-types';

const AlertLike = (props) => {
  return (
    <>
      <div className={`alert-like ${props.activeAlert ? 'activeAlert' : ''}`}>
        <div className="alert-like__wrapper">
          <h2 className="alert-like__wrapper__title">
            Tuyệt Vời !<i className="bx bx-x"></i>
          </h2>
          <p className="alert-like__wrapper__info">
            Bạn vừa thêm sản phẩm vào mục yêu thích thành công,{' '}
            <strong>bấm vào đây</strong> để tới trang yêu thích
          </p>
        </div>
      </div>
      <div className={`alert-unlike ${props.activeAlert ? ' ' : props.reset}`}>
        <div className="alert-unlike__wrapper">
          <h2 className="alert-unlike__wrapper__title">
            Thông báo !<i className="bx bx-x"></i>
          </h2>
          <p className="alert-unlike__wrapper__info">
            Bạn vừa bỏ sản phẩm khỏi mục yêu thích
          </p>
        </div>
      </div>
    </>
  );
};

AlertLike.propTypes = {
  activeAlert: PropTypes.bool,
};

export default AlertLike;
