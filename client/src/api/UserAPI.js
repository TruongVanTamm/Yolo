import { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import axios from 'axios';
function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(false);
  const [users, setUsers] = useState(false);
  const alert = useAlert();
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get('/user/infor', {
            headers: { Authorization: token },
          });
          setUser(res.data);
          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

          setCart(res.data.cart);
        } catch (err) {
          alert.show(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [token, alert]);
  useEffect(() => {
    if (isAdmin) {
      const getUsers = async () => {
        try {
          const res = await axios.get('/user/all_infor', {
            headers: { Authorization: token },
          });
          setUsers(res.data);
          setIsLogged(true);
        } catch (err) {
          alert.show(err.response.data.msg);
        }
      };
      getUsers();
    }
    else{
      
    }
  }, [token, alert,isAdmin]);
  const addCart = async (product) => {
    if (!isLogged)
      return alert.show(
        <div style={{ fontSize: '12px' }}>Bạn phải đăng nhập để mua hàng !</div>
      );
    const check = cart.every((item) => {
      return item.id !== product.id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
      await axios.patch(
        '/user/addcart',
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
    } else {
      alert('Sản phẩm đã có trong giỏ hàng !');
    }
  };
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    user: [user, setUser],
    users: [users, setUsers],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory],
  };
}

export default UserAPI;
