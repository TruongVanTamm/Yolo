import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import Helmet from '../components/Notice/Helmet';
import CheckBox from '../components/CheckBox.js';
import productData from '../Asset/fake-data/product';
import category from '../Asset/fake-data/category';
import colors from '../Asset/fake-data/product-color';
import size from '../Asset/fake-data/product-size';
import Button from '../components/Button/Button';
import InfinityList from '../components/Catalog/InfinityList';
import ButtonSTT from '../components/Button/ButtonSTT';
import NoProduct from '../components/NotFound/NoProduct';
import { GlobalState } from '../GlobalState';
import Loading from '../components/Notice/Loading';

const Catalog = () => {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products
  const [notFound, setNotFound] = useState(false);

  // const productList = productData.getAllProducts();

  // const [products, setProducts] = useState(productList);

  // const filterSelect = (type, checked, item) => {
  //   if (checked) {
  //     switch (type) {
  //       case 'CATEGORY':
  //         setFilter({
  //           ...filter,
  //           category: [...filter.category, item.categorySlug],
  //         });
  //         break;
  //       case 'COLOR':
  //         setFilter({
  //           ...filter,
  //           color: [...filter.color, item.color],
  //         });
  //         break;
  //       case 'SIZE':
  //         setFilter({
  //           ...filter,
  //           size: [...filter.size, item.size],
  //         });
  //         break;
  //       default:
  //     }
  //   } else {
  //     switch (type) {
  //       case 'CATEGORY':
  //         const newCategory = filter.category.filter(
  //           (e) => e !== item.categorySlug
  //         );
  //         setFilter({
  //           ...filter,
  //           category: newCategory,
  //         });
  //         break;
  //       case 'COLOR':
  //         const newColor = filter.color.filter((e) => e !== item.color);
  //         setFilter({
  //           ...filter,
  //           color: newColor,
  //         });
  //         break;
  //       case 'SIZE':
  //         const newSize = filter.size.filter((e) => e !== item.size);
  //         setFilter({
  //           ...filter,
  //           size: newSize,
  //         });
  //         break;
  //       default:
  //     }
  //   }
  // };

  // const updateProducts = useCallback(() => {
  //   let temp = productList;

  //   if (filter.category.length > 0) {
  //     temp = temp.filter((e) => filter.category.includes(e.categorySlug));
  //   }

  //   if (filter.color.length > 0) {
  //     temp = temp.filter((e) => {
  //       const check = e.colors.find((color) => filter.color.includes(color));
  //       return check !== undefined;
  //     });
  //   }

  //   if (filter.size.length > 0) {
  //     temp = temp.filter((e) => {
  //       const check = e.size.find((size) => filter.size.includes(size));
  //       return check !== undefined;
  //     });
  //   }

  //   setProducts(temp);
  // }, [filter, productList]);

  // useEffect(() => {
  //   updateProducts();
  // }, [updateProducts]);

  // const filterRef = useRef(null);

  // const showHideFilter = () => {
  //   filterRef.current.classList.toggle('active');
  // };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  const NotFound = useCallback(() => {
    if (products.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [products]);
  useEffect(() => {
    NotFound();
  }, [NotFound]);
  // const colorList = products.map((item) => item.colors);
  // const ArrayColor = [];
  // colorList.map((item) => ArrayColor.push(...item));
  // const temp1 = new Set(ArrayColor);
  // const FilterColor = [...temp1];

  // const catalogList = products.map((item) => item.categorySlug);
  // const FilterCategory = [];
  // catalogList.map((item) => FilterCategory.push(item));

  // const sizeList = products.map((item) => item.size);
  // const ArraySize = [];
  // sizeList.map((item) => ArraySize.push(...item));
  // const temp2 = new Set(ArraySize);
  // const FilterSize = [...temp2];
  return (
    <>
      <Helmet title="Sản phẩm">
        <div className="catalog">
          {/* <div
            className="catalog__filter"
            ref={filterRef}
          >
            <div
              className="catalog__filter__close"
              onClick={() => showHideFilter()}
            >
              <i className="bx bx-up-arrow-alt"></i>
            </div>
            <div className="catalog__filter__widget">
              <div className="catalog__filter__widget__title">
                danh mục sản phẩm
              </div>
              <div className="catalog__filter__widget__content">
                {category.map((item, index) => (
                  <div
                    key={index}
                    className="catalog__filter__widget__content__item"
                  >
                    <CheckBox
                      label={item.display}
                      // onChange={(input) =>
                      //   filterSelect('CATEGORY', input.checked, item)
                      // }
                      checked={filter.category.includes(item.categorySlug)}
                      hideLabel={
                        FilterCategory.includes(item.categorySlug)
                          ? ''
                          : 'filter'
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="catalog__filter__widget">
              <div className="catalog__filter__widget__title">màu sắc</div>
              <div className="catalog__filter__widget__content">
                {colors.map((item, index) => (
                  <div
                    key={index}
                    className="catalog__filter__widget__content__item"
                  >
                    <CheckBox
                      label={item.display}
                      // onChange={(input) =>
                      //   filterSelect('COLOR', input.checked, item)
                      // }
                      checked={filter.color.includes(item.color)}
                      hideLabel={
                        FilterColor.includes(item.color) ? '' : 'filter'
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="catalog__filter__widget">
              <div className="catalog__filter__widget__title">kích cỡ</div>
              <div className="catalog__filter__widget__content">
                {size.map((item, index) => (
                  <div
                    key={index}
                    className="catalog__filter__widget__content__item"
                  >
                    <CheckBox
                      label={item.display}
                      // onChange={(input) =>
                      //   filterSelect('SIZE', input.checked, item)
                      // }
                      checked={filter.size.includes(item.size)}
                      hideLabel={FilterSize.includes(item.size) ? '' : 'filter'}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="catalog__filter__widget">
              <div className="catalog__filter__widget__content catalog__filter__widget__content__btnfilter">
                <Button
                  size="sm"
                  onClick={showHideFilter}
                >
                  Lọc
                </Button>
              </div>
              <div className="catalog__filter__widget__content">
                <Button
                  size="sm"
                  onClick={clearFilter}
                >
                  xóa bộ lọc
                </Button>
              </div>
            </div>
          </div>
          <div className="catalog__filter__toggle">
            <Button
              size="sm"
              onClick={() => showHideFilter()}
            >
              bộ lọc
            </Button>
          </div> */}
          <div className="catalog__content">
            <InfinityList data={products}></InfinityList>
            {products.length === 0 && <Loading></Loading>}
            {/* <div className="catalog__content__not-found">
              {notFound ? <NoProduct></NoProduct> : null}
            </div> */}
          </div>
        </div>
      </Helmet>
      <ButtonSTT></ButtonSTT>
    </>
  );
};

export default Catalog;
