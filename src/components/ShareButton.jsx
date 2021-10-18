// React
import React, { useState } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Bootstrap
import { Modal } from 'react-bootstrap';

// Services
import copy from 'clipboard-copy';

// Styles
import {
  IconBtn,
} from '../styles/Styled';

function ShareButton({ foodDrink, id }) {
  const [showModal, setShowModal] = useState(false);

  /* Controlar modal */
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <IconBtn
        type="button"
        className="details-share-btn"
        data-testid="share-btn"
        onClick={ () => {
          copy(`http://localhost:3000/${foodDrink}/${id}`);
          handleShowModal();
        } }
      >
        <i className="uil uil-share-alt icon" />
      </IconBtn>

      {/* Modal */}
      <Modal show={ showModal } onHide={ handleCloseModal }>
        <Modal.Header closeButton>
          Link copiado!
        </Modal.Header>
      </Modal>
    </>
  );
}

ShareButton.propTypes = {
  foodDrink: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default ShareButton;
