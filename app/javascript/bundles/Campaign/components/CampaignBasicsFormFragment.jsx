import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import Select from 'react-select';

import FormUtils from '../../../common/FormUtils';

export default class CampaignBasicsFormFragment extends Component {
  constructor(props) {
    super(props);

    this.formId = 'campaign_basics_form';
  }

  render() {
    const {
      advertiser_id: advertiserId,
      hide_advertiser: hideAdvertiser,
      campaign_type: campaignType,
      campaign_url: campaignUrl,
      handleSelectChange,
      handleCancel,
      handleChange,
      handleSubmit,
      name,
      options: {
        advertiser_options: advertiserOptions,
        campaign_type_options: campaignTypeOptions
      },
      validated,
    } = this.props;

    return (
      <div>
        <h3 className="form-title">Flight</h3>
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
                <div className={hideAdvertiser ? "hidden" : ""}>
                  <Form.Group controlId="advertiser_id">
                    <Form.Label className="label-v2">Advertiser</Form.Label>
                    <Select
                      className="selectV2"
                      classNamePrefix="selectV2"
                      options={advertiserOptions}
                      name="advertiser_id"
                      onChange={handleSelectChange}
                      value={advertiserId}
                    />
                  </Form.Group>
                </div>
                <Form.Group controlId="campaign_type">
                  <Form.Label className="label-v2">Campaign Purpose</Form.Label>
                  <Select
                    className="selectV2"
                    classNamePrefix="selectV2"
                    options={campaignTypeOptions}
                    name="campaign_type"
                    onChange={handleSelectChange}
                    value={campaignType}
                  />
                </Form.Group>
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
  advertiser_id: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
  }),
  campaign_type: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  hide_advertiser: PropTypes.bool,
  options: PropTypes.shape({
    goal_options: PropTypes.arrayOf(PropTypes.string),
    kpi_options: PropTypes.arrayOf(PropTypes.string),
    advertiser_options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number
    }))
  }).isRequired,
  campaign_url: PropTypes.string,
  handleCancel: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  name: PropTypes.string,
  validated: PropTypes.bool,
};

CampaignBasicsFormFragment.defaultProps = {
  advertiser_id: undefined,
  hide_advertiser: undefined,
  campaign_url: undefined,
  name: undefined,
  validated: undefined,
};
