import React from 'react';
import Modal from 'react-modal';
import SignUp from '../../components/Auth/Signup';
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
const SignUpPage = () => {
  return (
    <Modal isOpen={true} contentLabel="Example Modal"  style={customStyles}  preventScroll={true}>
      <SignUp></SignUp>
    </Modal>
  );
};

export default SignUpPage;
