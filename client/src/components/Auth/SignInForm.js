import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import {axiosInstance } from '../../config'
const SignInForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Vui lòng nhập trường này')
        .matches(
          // eslint-disable-next-line
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          'Địa chỉ email không hợp lệ'
        ),
      password: Yup.string()
        .required('Vui lòng nhập trường này')
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
          'Mật khẩu yêu cầu 7-19 ký tự, chứa ít nhất một chữ cái, một số và một ký tự đặc biệt'
        ),
    }),
    onSubmit: async (values)=>{
      try {
        await axiosInstance.post('/user/login', { ...values});
  
        localStorage.setItem('firstLogin', true);
  
        window.location.href = '/';
      } catch (err) {
        alert(err.response.data.msg);
      }
    }
  });
  return (
    <section>
      <form
        className="infoform"
        onSubmit={formik.handleSubmit}
      >
        <label> Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email "
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && (
          <p className="errorMsg"> {formik.errors.email} </p>
        )}

        <label> Mật khẩu </label>
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Mật khảu"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.errors.password && (
          <p className="errorMsg"> {formik.errors.password} </p>
        )}
        <div className="infoform__control">
          <Link
            to="/signup"
            className="infoform__control__btn"
          >
            Đăng kí
          </Link>

          <button type="submit"> Tiếp tục </button>
        </div>
      </form>
    </section>
  );
};

export default SignInForm;
