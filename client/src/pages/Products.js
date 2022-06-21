import React, { useContext, useEffect, useState } from 'react';
import Helmet from '../components/Notice/Helmet';
import Section, { SectionBody, SectionTitle } from '../components/Layout/Section';
import Grid from '../components/Layout/Grid';
import ProductCard from '../components/Card/ProductCard';
import { useParams } from 'react-router-dom';
import ProductView from '../components/ProductsView/ProductView'
import { GlobalState } from '../GlobalState';
const Product = () => {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const params = useParams();
  const [detailProduct, setDetailProduct] = useState([]);
  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
  }, [params.id, products]);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [detailProduct]);
  if (detailProduct.length === 0) return null;
  return (
    <Helmet title={detailProduct.title}>
      <Section>
        <SectionBody>
          <ProductView
            id={detailProduct._id}
            name={detailProduct.title}
            price={detailProduct.price}
            old_price={detailProduct.old_price}
            discount={detailProduct.discount}
            image01={detailProduct.image01.url}
            image02={detailProduct.image02.url}
            checked={detailProduct.checked}
            color={detailProduct.color}
            size={detailProduct.size}
            description={detailProduct.description}
            sold={detailProduct.sold}
          />
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <Grid
            col={6}
            mdCol={3}
            smCol={2}
            gap={20}
          >
            {products.map((item, index) => {
              return item.category === detailProduct.category ? (
                <ProductCard
                  id={item._id}
                  key={index}
                  name={item.title}
                  price={item.price}
                  old_price={item.old_price}
                  discount={item.discount}
                  slug={item.slug}
                  image01={item.image01.url}
                  image02={item.image02.url}
                />
              ) : null;
            })}
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default Product;
