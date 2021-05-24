import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CampaignModal = ({ closeModal, handleSubmit }) => (
  <Modal
    size="lg"
    show
    backdrop="static"
    keyboard={false}
  >
    <Modal.Body>

      <h3>How do you want to proceed?</h3>
      <p>You have 2 options for how to proceed depending on what you need</p>
      <Button
        className="btn btn-primary btn-primary-v2"
        onClick={handleSubmit}
        value="insertion_order"
      >
        Order an IO for Managed Services
      </Button>
      <Button
        className="btn btn-primary btn-primary-v2 float-right"
        onClick={handleSubmit}
        value="recommendation"
      >
        Submit for Self Service Recommendations
      </Button>
    </Modal.Body>
    <Modal.Footer>
      <div
        className="hide-modal"
        onClick={closeModal}
        aria-hidden="true"
      >
        Cancel
      </div>
    </Modal.Footer>
  </Modal>
);

CampaignModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default CampaignModal;
