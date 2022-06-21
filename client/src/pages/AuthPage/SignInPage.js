import React from 'react';
import Modal from 'react-modal';
import SignIn from '../../components/Auth/SignIn';
Modal.setAppElement('#root')
const customStyles = {
    overlay: {
        backgroundColor: '#4267b2',
    },
    content:{
        backgroundColor: 'transparent',
        border: 'none',
        height: '100vh',
        width: '100%',
        inset: '0',
        borderRadius: '0',
    }
  };
const SigInPage = () => {
  return (
    <Modal isOpen={true} contentLabel="Example Modal"  style={customStyles}  preventScroll={true}>
      <SignIn></SignIn>
    </Modal>
  );
};

export default SigInPage;
