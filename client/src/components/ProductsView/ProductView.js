import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { GlobalState } from '../../GlobalState';
import { useNavigate } from 'react-router-dom';
import { useAlert, types } from 'react-alert';

const ProductView = (props) => {
  const navigate = useNavigate();
  const alert = useAlert();
  const state = useContext(GlobalState);
  const addCart = state.userAPI.addCart;
  const [previewImg, setPreviewImg] = useState(props.image01);
  const [descriptionExpand, setDescriptionExpand] = useState(false);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [added, setAdded] = useState({});
  const handleProductDescriptionClick = () => {
    if (descriptionExpand) {
      window.scrollTo(0, 0);
    }
    setDescriptionExpand(!descriptionExpand);
  };

  useEffect(() => {
    setPreviewImg(props.image01);
    setColor(undefined);
    setSize(undefined);
  }, [props]);
  useEffect(() => {
    setAdded({ ...props, color, size });
  }, [color, size, props]);
  // console.log(added);
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
          <div className="product__description__title">Chi ti???t s???n ph???m</div>
          <div
            className="product__description__content"
            dangerouslySetInnerHTML={{ __html: props.description }}
          ></div>
          <div className="product__description__toggle">
            <Button
              size="sm"
              onClick={handleProductDescriptionClick}
            >
              {descriptionExpand ? '???n b???t' : 'Xem th??m'}
            </Button>
          </div>
        </div>
      </div>
      <div className="product__info">
        <div className="product__info__title">{props.name}</div>
        <div className="product__info__item">
          <span className="product__info__item__title">Gi?? ti???n</span>
          <span className="product__info__item__price">${props.price}</span>
        </div>
        <div className="product__info__item">
          <span className="product__info__item__title">M??u s???c</span>
          <span className="product__info__item__list">
            {props.color.map((item, index) => {
              return (
                <div
                  className={`product__info__item__list__item ${
                    color === item ? 'active' : ''
                  }`}
                  key={index}
                  onClick={() => setColor(item)}
                >
                  <div className={`circle bg-${item}`}></div>
                </div>
              );
            })}
          </span>
        </div>
        <div className="product__info__item">
          <span className="product__info__item__title">K??ch c???</span>
          <span className="product__info__item__list">
            {props.size.map((item, index) => {
              return (
                <div
                  className={`product__info__item__list__item ${
                    size === item ? 'active' : ''
                  }`}
                  onClick={() => setSize(item)}
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
          <span className="product__info__item__title">
            S??? s???n ph???m ???? b??n: {props.sold}{' '}
          </span>
        </div>
        <div className="product__info__item">
          <Button
            size="sm"
            icon="bx bx-cart-add"
            animate={true}
            onClick={() => {
              if (size !== undefined && color !== undefined) {
                addCart(added);
              } else {
                alert.show(
                  <div style={{ fontSize: '12px' }}>
                    Vui l??ng ch???n m??u v?? k??ch th?????c
                  </div>,
                  { type: types.ERROR }
                );
              }
            }}
          >
            th??m v??o gi??? h??ng
          </Button>
          <Button
            size="sm"
            icon="bx bx-cart-add"
            animate={true}
            o    onClick={() => {
              if (size !== undefined && color !== undefined) {
                addCart(added);
                return navigate('/cart')
              } else {
                alert.show(
                  <div style={{ fontSize: '12px'}}>
                    Vui l??ng ch???n m??u v?? k??ch th?????c
                  </div>,
                  { type: types.ERROR }
                );
              }
            }}
          >
            Mua ngay
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
