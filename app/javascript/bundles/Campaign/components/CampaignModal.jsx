import React, { Component, Fragment } from "react";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";

export default class CampaignModal extends Component {
  showModal() {
    const { isOpen, handleSubmit, hideModal } = this.props;

    if (isOpen) {
      return (
        <Modal
          size="lg"
          show={isOpen}
          onHide={hideModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="w-100 text-center"></Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Container>
              <Row className="d-flex flex-column">
                <h3>How do you want to proceed?</h3>
                <p>
                  You have 2 options for how to proceed depending on what you
                  need.
                </p>
                <Col>
                  <Button
                    className="btn-lg d-flex align-items-center justify-content-center next-btn"
                    onClick={handleSubmit}
                    value={"insertion_order"}
                  >
                    Order an IO for Managed Services
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="btn-lg d-flex align-items-center justify-content-center next-btn"
                    onClick={handleSubmit}
                    value={"recommendation"}
                  >
                    Submit for Self Service Recomendations
                  </Button>
                </Col>
              </Row>
            </Container>
          </Modal.Body>

          <Modal.Footer>
            <div onClick={hideModal}>Cancel</div>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return null;
    }
  }

  render() {
    return <Fragment>{this.showModal()}</Fragment>;
  }
}
