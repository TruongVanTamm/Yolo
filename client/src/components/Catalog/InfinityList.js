import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '../Layout/Grid';
import ProductCard from '../Card/ProductCard';
import { GlobalState } from '../../GlobalState';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import Loading from '../Notice/Loading';

const InfinityList = (props) => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async () => {
    const res = await axios.get(`/api/products`);
    return res.data.products;
  };
  const fetchData = async () => {
    const productFromServer = await fetchProducts();
    setProducts([...products, ...productFromServer]);
    setHasMore(false);
  };
  return (
    <>
      <InfiniteScroll
        dataLength={products.length}
        next={fetchData}
        hasMore={hasMore}
      >
        {
          <Grid
            col={8}
            mdCol={3}
            smCol={2}
            gap={20}
          >
            {products.map((products, index) => {
              const public_id = {
                public_id_1: products.image01.public_id,
                public_id_2: products.image02.public_id,
              };
              return (
                <ProductCard
                  key={index}
                  id={products._id}
                  public_id={public_id}
                  name={products.title}
                  price={products.price}
                  old_price={products.old_price}
                  discount={products.discount}
                  image01={products.image01.url}
                  image02={products.image02.url}
                  checked={products.checked}
                  color={products.color}
                  size={products.size}
                  sold={products.sold}
                  isAdmin={isAdmin}
                  deleteProduct={props.deleteProduct}
                  handleCheck={props.handleCheck}
                  checkAll={props.checkAll}
                  deleteAll={props.deleteAll}
                />
              );
            })}
          </Grid>
        }
      </InfiniteScroll>
    </>
  );
};

InfinityList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default InfinityList;
