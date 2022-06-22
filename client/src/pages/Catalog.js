import React, { useCallback, useState, useEffect, useContext } from 'react';
import Helmet from '../components/Notice/Helmet';
import InfinityList from '../components/Catalog/InfinityList';
import ButtonSTT from '../components/Button/ButtonSTT';
import NoProduct from '../components/NotFound/NoProduct';
import { GlobalState } from '../GlobalState';
import Loading from '../components/Notice/Loading';
import axios from 'axios';

const Catalog = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [notFound, setNotFound] = useState(false);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
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
  console.log(products.length);
  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };
  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };
  const deleteAll = () => {
    products.forEach((product) => {
      const public_id = {
        public_id_1: product.image01.public_id,
        public_id_2: product.image02.public_id,
      };
      if (product.checked) deleteProduct(product._id, public_id);
    });
  };

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios.post(
        '/api/destroy',
        { ...public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteProduct = axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });

      await destroyImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <>
      <Helmet title="Sản phẩm">
        <div className="catalog">
          <div className="catalog__content">
            {isAdmin &&
              (products.length !== 0 ? (
                <div className="catalog__content__delete-all">
                  <span>Select all</span>
                  <input
                    type="checkbox"
                    checked={isCheck}
                    onChange={checkAll}
                  />

                  <button
                    onClick={deleteAll}
                    className={isCheck ? '' : 'show'}
                  >
                    Delete ALL
                  </button>
                </div>
              ) : null)}
            <InfinityList
              data={products}
              handleCheck={handleCheck}
              deleteAll={deleteAll}
              checkAll={checkAll}
              deleteProduct={deleteProduct}
            ></InfinityList>
            <div className="catalog__content__not-found">
              {notFound ? <NoProduct></NoProduct> : null}
            </div>
          </div>
        </div>
      </Helmet>
      <ButtonSTT></ButtonSTT>
    </>
  );
};

export default Catalog;
