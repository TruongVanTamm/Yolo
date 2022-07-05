import React from 'react';
import ProductView from './ProductView';
import Modal from 'react-modal';
import Button from '../Button/Button';
Modal.setAppElement('#root');
const customStyles = {
  overlay: {
    zIndex: 1000,
    backgroundColor: '#808080',
  },

};
const ProductViewModal = (props) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <Button
        size="sm"
        onClick={openModal}
      >
        Xem
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        preventScroll={true}
        shouldCloseOnEsc={true}
      >
        <div
          style={{
            width: '100%',
            height: '60px',
            backgroundColor:"#4267b2",
            fontSize:' 2rem',
            color:'#fff',
            display: 'flex',
            alignItems:'center',
            justifyContent: 'spaceBetween'

          }} 
        >
          <span style={{marginLeft:'20px',textTransform:'capitalize'}}>{props.name}</span>
          <div
            style={{
              fontSize: '3.5rem',
              position: 'absolute',
              height: '60px',
              right: '20px',
              top: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems:'center',
            }}
            onClick={closeModal}
          >
            <i className="bx bx-x"></i>
          </div>
        </div>
        <div style={{ paddingRight: "20px", paddingLeft: "20px",paddingTop: "10px"}}>
          <ProductView
            id={props.id}
            price={props.price}
            old_price={props.old_price}
            discount={props.discount}
            image01={props.image01}
            image02={props.image02}
            checked={props.checked}
            color={props.color}
            size={props.size}
            description={props.description}
            sold={props.sold}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProductViewModal;
