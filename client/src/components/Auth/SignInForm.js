import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from 'react-alert';
const SignInForm = () => {
  const alert = useAlert();
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
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        
        'Mật khẩu yêu cầu 8 ký tự, chứa ít nhất một chữ cái và một số '
      ),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('/user/login', { ...values });

        localStorage.setItem('firstLogin', true);

        window.location.href = '/';
      } catch (err) {
        alert.show(
          <div style={{ fontSize: '12px' }}>{err.response.data.msg }</div>
        );
      }
    },
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

          <Link to="/forgot_password">Forgot your password?</Link>
          <button type="submit"> Tiếp tục </button>
        </div>
      </form>
    </section>
  );
};

export default SignInForm;
