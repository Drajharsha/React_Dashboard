import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import "../../stylesheets/surveymodal.css"

export const SurveySelectorModal = (props) => {
  const [isOpen, setOpen] = React.useState(true);
  const showModal = () => setOpen(true);
  const hideModal = () => setOpen(false);

  const inputHandler = (event) => {
    props.handleInput(event);
    hideModal();
  }
  return (
    <Modal
      backdrop="static"
      show={isOpen}
      onHide={hideModal}>
      <div id="survey-modal-container">
        <div id="survey-modal">
          <Modal.Header id="modal-header">
            <Modal.Title>Choose Survey</Modal.Title>
          </Modal.Header>
          <Modal.Body id="modal-body">
            Please Select a Survey from the Selections Below
          </Modal.Body>
          <Modal.Body id="button-container">
            <button class="survey-modal-button" variant="primary" value="ML_READINESS" onClick={(event) => inputHandler(event)}>Machine Learning Readiness </button>
            <button class="survey-modal-button" variant="primary" value="STUDENT_SURVEY_UCI" onClick={(event) => inputHandler(event)}> University of California Irvine</button>
            <button class="survey-modal-button" variant="primary" value="STUDENT_SURVEY_SBC" onClick={(event) => inputHandler(event)}>Sweet Briar College</button>
          </Modal.Body>
        </div>
      </div>
    </Modal>
  );
};

