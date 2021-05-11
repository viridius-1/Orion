import React, {Component} from "react";
import {Button, Modal, Container, Row, Col} from "react-bootstrap";

export default class CampaignModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal size="lg"
             show={true}
             backdrop="static"
             keyboard={false}>
        <Modal.Body>

          <h3>How do you want to proceed?</h3>
          <p>You have 2 options for how to proceed depending on what you need</p>
          <Button className="btn btn-primary btn-primary-v2"
                  onClick={this.props.handleSubmit}
                  value={"insertion_order"}>
            Order an IO for Managed Services
          </Button>
          <Button className="btn btn-primary btn-primary-v2 float-right"
                  onClick={this.props.handleSubmit}
                  value={"recommendation"}>
            Submit for Self Service Recommendations
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <div className="hide-modal" onClick={this.props.closeModal}>
            Cancel
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
