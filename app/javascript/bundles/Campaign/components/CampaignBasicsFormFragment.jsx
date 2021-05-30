import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import FormUtils from '../../../common/FormUtils';

export default class CampaignBasicsFormFragment extends Component {
  constructor(props) {
    super(props);

    this.formId = 'campaign_basics_form';
  }

  render() {
    const {
      campaign_url: campaignUrl,
      end_date: endDate,
      handleCancel,
      handleChange,
      handleSubmit,
      name,
      start_date: startDate,
      validated,
    } = this.props;

    return (
      <div>
        <h3 className="form-title">Campaign Basics</h3>
        <div className="row">
          <div className="col-6">
            <div className="form-v2">
              <Form
                noValidate
                id={this.formId}
                validated={validated}
                onSubmit={handleSubmit}
                onKeyPress={(event) => FormUtils.submitEnter(event, this.formId, handleSubmit)}
              >
                <Form.Group controlId="name">
                  <Form.Label className="label-v2">Campaign Name</Form.Label>
                  <Form.Control
                    className="input-v2"
                    required
                    name="name"
                    type="text"
                    onChange={handleChange}
                    value={name}
                  />
                  <Form.Control.Feedback type="invalid">
                    Campaign Name is required
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="campaign_url">
                  <Form.Label className="label-v2">Campaign URL</Form.Label>
                  <Form.Control
                    className="input-v2"
                    required
                    name="campaign_url"
                    type="url"
                    onChange={handleChange}
                    value={campaignUrl}
                  />
                  <Form.Control.Feedback type="invalid">
                    Campaign URL is invalid
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="row">
                  <Form.Group controlId="start_date" className="col-6">
                    <Form.Label className="label-v2">Start Date</Form.Label>
                    <Form.Control
                      className="input-v2"
                      required
                      type="date"
                      name="start_date"
                      onChange={handleChange}
                      value={startDate}
                    />

                    <Form.Control.Feedback type="invalid">
                      Start Date is required
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="end_date" className="col-6">
                    <Form.Label className="label-v2">End Date</Form.Label>
                    <Form.Control
                      className="input-v2"
                      required
                      type="date"
                      name="end_date"
                      onChange={handleChange}
                      value={endDate}
                    />
                    <Form.Control.Feedback type="invalid">
                      End Date is required
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="form-group">
                  <button className="btn btn-secondary-v2" type="button" onClick={handleCancel}>Cancel</button>
                  <button className="btn btn-primary-v2 float-right" type="submit" style={{ width: '61%' }}>
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

CampaignBasicsFormFragment.propTypes = {
  campaign_url: PropTypes.string,
  end_date: PropTypes.string,
  handleCancel: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  name: PropTypes.string,
  start_date: PropTypes.string,
  validated: PropTypes.bool,
};

CampaignBasicsFormFragment.defaultProps = {
  campaign_url: undefined,
  end_date: undefined,
  name: undefined,
  start_date: undefined,
  validated: undefined,
};
