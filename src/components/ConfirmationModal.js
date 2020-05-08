import React from "react";
import Modal from "react-modal";

const ConfirmationModal = ({ isOpen, closeModal, onRemove }) => {
  return (
    <Modal
      className="modal"
      appElement={document.getElementById("root")}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Confirmation Modal"
    >
      <h3 className="modal__title">Remove this expense?</h3>
      <div className="modal__options">
        <button className="button button--confirmation" onClick={onRemove}>
          Yes
        </button>
        <button className="button button--confirmation" onClick={closeModal}>
          No
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
