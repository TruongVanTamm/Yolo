import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
const ProductView = (props) => {
  const state = useContext(GlobalState);
  const addCart = state.userAPI.addCart;
  const [previewImg, setPreviewImg] = useState(props.image01);
  const [descriptionExpand, setDescriptionExpand] = useState(false);
  const handleProductDescriptionClick = () => {
    setDescriptionExpand(!descriptionExpand);
    if (descriptionExpand === true) {
      window.scrollTo(0, 500);
    } else {
      window.scrollTo(0, 1000);
    }
  };
  const navigate = useNavigate();
  const goToCart=()=>{
    navigate("/cart");
  }
  useEffect(() => {
    setPreviewImg(props.image01);
  }, [props]);
  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(props.image01)}
          >
            <img
              src={props.image01}
              alt=""
            />
          </div>
          <div
            className="product__images__list__item"
            onClick={() => setPreviewImg(props.image02)}
          >
            <img
              src={props.image02}
              alt=""
            />
          </div>
        </div>

        <div className="product__images__main">
          <img
            src={previewImg}
            alt=""
          />
        </div>
        <div
          className={`product__description ${
            descriptionExpand ? 'expand ' : ''
          }`}
        >
          <div className="product__description__title">Chi tiết sản phẩm</div>
          <div
            className="product__description__content"
            dangerouslySetInnerHTML={{ __html: props.description }}
          ></div>
          <div className="product__description__toggle">
            <Button
              size="sm"
              onClick={handleProductDescriptionClick}
            >
              {descriptionExpand ? 'Ẩn bớt' : 'Xem thêm'}
            </Button>
          </div>
        </div>
      </div>
      <div className="product__info">
        <div className="product__info__title">{props.name}</div>
        <div className="product__info__item">
          <span className="product__info__item__price">{props.price}</span>
        </div>
        <div className="product__info__item">
          <span className="product__info__item__title">Màu sắc</span>
          <span className="product__info__item__list">
            {props.color.map((item, index) => {
              return (
                <div
                  className={`product__info__item__list__item `}
                  key={index}
                 
                >
                  <div className={`circle bg-${item}`}></div>
                </div>
              );
            })}
          </span>
        </div>
        <div className="product__info__item">
          <span className="product__info__item__title">Kích cỡ</span>
          <span className="product__info__item__list">
            {props.size.map((item, index) => {
              return (
                <div
                  className={`product__info__item__list__item`}
                  key={index}
                
                >
                  <div className="product__info__item__list__item__size">
                    {item}
                  </div>
                </div>
              );
            })}
          </span>
        </div>
        <div className="product__info__item">
          <span className="product__info__item__title"> Số sản phẩm đã bán: {props.sold} </span>
        </div>
        <div className="product__info__item">
          <Button
            size="sm"
            onClick={() => addCart(props)}
          >
            thêm vào giỏ hàng
          </Button>
          <Button
            size="sm"
            onClick={() => addCart(props)}
          >
           Mua ngay
          </Button>
        </div>
      </div>
      <div
        className={`product__description  mobile ${
          descriptionExpand ? 'expand ' : ''
        }`}
      >
        <div className="product__description__title">Chi tiết sản phẩm</div>
        <div
          className="product__description__content"
          dangerouslySetInnerHTML={{ __html: props.description }}
        ></div>
        <div className="product__description__toggle">
          <Button
            size="sm"
            onClick={handleProductDescriptionClick}
          >
            {descriptionExpand ? 'Ẩn bớt' : 'Xem thêm'}
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default ProductView;
