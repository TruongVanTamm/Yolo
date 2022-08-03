import React, { useContext} from 'react';
import RoutesWrap from '../../router/routes';
import Footer from '../Footer/Footer';
import Header from '../Navbar/Header';
import ProductViewModal from '../ProductsView/ProductViewModal';
import { GlobalState } from '../../GlobalState';
const SetupLayout = () => {
  const state = useContext(GlobalState);
  const [theme] = state.theme;
  return (
    <div>
      <Header />
      <div className="container" id={theme}>
        <div className="main">
            <RoutesWrap></RoutesWrap>
        </div>
      </div>
      {/* <ProductViewModal></ProductViewModal> */}
      <Footer></Footer>
    </div>
  );
};

export default SetupLayout;
