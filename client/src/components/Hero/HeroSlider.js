import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';

const HeroSlider = (props) => {
  const data = props.data;
  const { t } = useTranslation();
  const timeOut = props.timeOut ? props.timeOut : 3000;
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = useCallback(() => {
    const index = activeSlide + 1 === data.length ? 0 : activeSlide + 1;
    setActiveSlide(index);
  }, [activeSlide, data]);
  const prevSlide = () => {
    const index = activeSlide - 1 < 0 ? data.length - 1 : activeSlide - 1;
    setActiveSlide(index);
  };
  useEffect(() => {
    if (props.auto) {
      const slideAuto = setInterval(() => {
        nextSlide();
      }, timeOut);
      return () => {
        clearInterval(slideAuto);
      };
    }
  }, [nextSlide, timeOut, props]);
  return (
    <div className="hero-slider">
      {data.map((item, index) => {
        return (
          <HeroSliderItem
            key={index}
            item={item}
            active={index === activeSlide}
          ></HeroSliderItem>
        );
      })}
      {props.control ? (
        <div className="hero-slider__control">
          <div
            className="hero-slider__control__item"
            onClick={prevSlide}
          >
            <i className="bx bx-chevron-left"></i>
          </div>
          <div className="hero-slider__control__item">
            <div className="index">
              {activeSlide + 1}/{data.length}
            </div>
          </div>
          <div
            className="hero-slider__control__item"
            onClick={nextSlide}
          >
            <i className="bx bx-chevron-right"></i>
          </div>
        </div>
      ) : null}
    </div>
  );
};

HeroSlider.propTypes = {
  data: PropTypes.array.isRequired,
  control: PropTypes.bool,
  auto: PropTypes.bool,
  timeOut: PropTypes.number,
};
const HeroSliderItem = (props) => {
  const { t } = useTranslation();
  return (
    <div className={`hero-slider__item ${props.active ? 'active' : ''}`}>
      <div className="hero-slider__item__info">
        <div
          className={`hero-slider__item__info__title color-${props.item.color}`}
        >
          <span>{t(props.item.title)}</span>
        </div>
        <div className="hero-slider__item__info__description">
          <span>{t(props.item.description)}</span>
        </div>
        <div className="hero-slider__item__info__btn">
          <Link to={props.item._id}>
            <Button
              backgroundColor={props.item.color}
              icon="bx bxs-right-arrow"
              animate={true}
              // size='sm'
            >
              {t('Xem chi tiết')}
            </Button>
          </Link>
        </div>
      </div>
      <div className="hero-slider__item__img">
        <div className={`shape bg-${props.item.color}`}></div>
        <img
          src={props.item.image01.url}
          alt=""
        />
      </div>
    </div>
  );
};
export default HeroSlider;
