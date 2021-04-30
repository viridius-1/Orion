import React, {Component} from "react";
import {Form} from "react-bootstrap";

import FormUtils from "../../../common/FormUtils";

export default class CampaignBasicsFormFragment extends Component {
  constructor(props) {
    super(props);
  }

  formId = 'campaign_basics_form';

  render() {
    return (
      <div>
        <h3 className="form-title">Campaign Basics</h3>
        <div className="row">
          <div className="col-6">
            <div className="form-v2">
              <Form noValidate
                    id={this.formId}
                    validated={this.props.validated}
                    onSubmit={this.props.handleSubmit}
                    onKeyPress={() => FormUtils.submitEnter(event, this.formId, this.props.handleSubmit)}>
                <Form.Group controlId="name">
                  <Form.Label className="label-v2">Campaign Name</Form.Label>
                  <Form.Control className="input-v2"
                                required
                                name="name"
                                type="text"
                                onChange={this.props.handleChange}
                                value={this.props.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    Campaign Name is required
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="website">
                  <Form.Label className="label-v2">Destination URL</Form.Label>
                  <Form.Control className="input-v2"
                                required
                                name="website"
                                type="url"
                                onChange={this.props.handleChange}
                                value={this.props.website}/>
                  <Form.Control.Feedback type="invalid">
                    Destination URL is invalid
                  </Form.Control.Feedback>
                </Form.Group>


                <div className="row">
                  <Form.Group controlId="start_date" className="col-6">
                    <Form.Label className="label-v2">Start Date</Form.Label>
                    <Form.Control className="input-v2"
                                  required
                                  type="date"
                                  name='start_date'
                                  onChange={this.props.handleChange}
                                  value={this.props.start_date}
                    />

                    <Form.Control.Feedback type="invalid">
                      Start Date is required
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="end_date" className="col-6">
                    <Form.Label className="label-v2">End Date</Form.Label>
                    <Form.Control className="input-v2"
                                  required
                                  type="date"
                                  name='end_date'
                                  onChange={this.props.handleChange}
                                  value={this.props.end_date}
                    />
                    <Form.Control.Feedback type="invalid">
                      End Date is required
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="form-group">
                  <button className="btn btn-secondary-v2" type="cancel" onClick={this.props.handleCancel}>Cancel</button>
                  <button className="btn btn-primary-v2 float-right" type="submit" style={{width: "61%"}}>
                    Continue
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
