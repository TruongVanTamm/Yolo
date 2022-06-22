import React, { useState, useContext, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import Loading from '../Notice/Loading';
const CreateProduct = () => {
  const [price, setPrice] = useState(0);
  const initialStateMemo = useMemo(() => {
    return {
      product_id: '',
      title: '',
      price: price,
      description: '',
      category: '',
      old_price: 0,
      discount: 0,
      _id: '',
      color: '',
      size: '',
    };
  }, [price]);
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialStateMemo);
  const [categories] = state.categoriesAPI.categories;
  const [image01, setImage01] = useState(false);
  const [image02, setImage02] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const navigate = useNavigate();
  const param = useParams();
  const [products] = state.productsAPI.products;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.productsAPI.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImage01(product.image01);
          setImage02(product.image02);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialStateMemo);
      setImage01(false);
      setImage02(false);
    }
  }, [param.id, products, initialStateMemo]);
  useEffect(() => {
    setPrice((product.old_price * product.discount) / 100);
  }, [product.old_price, product.discount]);
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      const file = e.target.files[0];
      if (!file) return alert('File not exist.');

      if (file.size > 1024 * 1024) return alert('Size too large!');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return alert('File format is incorrect.');

      let formData = new FormData();
      formData.append('file', file);
      setLoading(true);
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: token,
        },
      });
      setLoading(false);
      setImage01(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const handleUpload2 = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      const file = e.target.files[0];
      if (!file) return alert('File not exist.');

      if (file.size > 1024 * 1024)
        // 1mb
        return alert('Size too large!');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        // 1mb
        return alert('File format is incorrect.');

      let formData = new FormData();
      formData.append('file', file);
      setLoading(true);
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: token,
        },
      });
      setLoading(false);
      setImage02(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("You're not an admin");
      setLoading(true);
      await axios.post(
        '/api/destroy',
        { public_id: image01.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImage01(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const handleDestroy2 = async () => {
    try {
      if (!isAdmin) return alert("You're not an admin");
      setLoading(true);
      await axios.post(
        '/api/destroy',
        { public_id: image02.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImage02(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const images = { image01, image02 };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  useEffect(() => {
    setPrice(product.old_price - (product.old_price * product.discount) / 100);
  }, [product.old_price, product.discount, product, price]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert('Bạn không có quyền này');
      if (!image01) return alert('No Image ');

      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, ...images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          '/api/products',
          { ...product, ...images },
          {
            headers: { Authorization: token },
          }
        );
      }
      setCallback(!callback);
      navigate('/');
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: image01 ? 'block' : 'none',
  };

  const styleUpload2 = {
    display: image02 ? 'block' : 'none',
  };

  return (
    <div className="create_product">
      <div className="create_product__upload">
        <input
          type="file"
          name="file"
          id="file_up"
          onChange={handleUpload}
        />
        {loading ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          <div
            id="file_img"
            style={styleUpload}
          >
            <img
              src={image01 ? image01.url : ''}
              alt=""
            />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>
      <div className="create_product__upload">
        <input
          type="file"
          name="file_2"
          id="file_up_2"
          onChange={handleUpload2}
        />
        {loading ? (
          <div id="file_img_2">
            <Loading />
          </div>
        ) : (
          <div
            id="file_img_2"
            style={styleUpload2}
          >
            <img
              src={image02 ? image02.url : ''}
              alt=""
            />
            <span onClick={handleDestroy2}>X</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <h1>Thông tin sản phẩm</h1>
        <div className="row">
          <label htmlFor="product_id">ID </label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
            onChange={handleChangeInput}
            disabled={onEdit}
          />
        </div>

        <div className="row">
          <label htmlFor="title">Tên</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={product.title}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="discount">Giảm giá (%)</label>
          <input
            type="number"
            name="discount"
            id="discount"
            value={product.discount}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="old_price">Giá cũ ($)</label>
          <input
            type="number"
            name="old_price"
            id="old_price"
            value={product.old_price}
            onChange={handleChangeInput}
          />
        </div>
        <div
          className="row"
          style={{ position: 'relative' }}
        >
          <label htmlFor="price">Giá ($)</label>
          <input
            type="number"
            name="price"
            id="price"
            value={product.price}
            onChange={handleChangeInput}
          />
          {product.discount !== 0 && product.old_price !== 0 ? (
            <div className="hint-price">
              <i className="bx bxs-bulb"></i>
              <span>{Math.ceil(price)}</span>
            </div>
          ) : null}
        </div>
        <div className="row">
          <label htmlFor="color">Màu sắc</label>
          <input
            type="string"
            name="color"
            id="color"
            value={product.color}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="size">Kích cỡ </label>
          <input
            type="string"
            name="size"
            id="size"
            value={product.size}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="description">Mô tả</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={product.description}
            rows="5"
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="categories">Danh mục: </label>
          <select
            name="category"
            value={product.category}
            onChange={handleChangeInput}
          >
            <option value="">Chọn danh mục cho sản phẩm</option>
            {categories.map((category) => (
              <option
                value={category._id}
                key={category._id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">{onEdit ? 'Cập nhật' : 'Tạo'}</button>
      </form>
    </div>
  );
};

export default CreateProduct;
