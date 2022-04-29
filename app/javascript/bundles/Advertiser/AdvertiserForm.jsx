import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import PropTypes from 'prop-types';
import FormUtils from '../../common/FormUtils';
import NumberInput from '../../components/NumberInput';

let industryOptions = [];
let businessTypeOptions = [];
let mediaMixOptions = [];

function handleCancel(event) {
  event.preventDefault();
  window.history.back();
}

export default class AdvertiserForm extends Component {
  constructor(props) {
    super(props);

    this._initSelectOptions();
    this.state = this._initialState();
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      advertiser: {
        agency_id: agencyId,
        id,
      },
      new: isNew,
    } = this.props;

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      let method = 'POST';
      let path = `/agencies/${agencyId}/vendors`;

      if (!isNew) {
        method = 'PUT';
        path = `/vendors/${id}`;
      }
      const requestOptions = {
        body: this._getSubmitBody(),
        headers: { 'Content-Type': 'application/json' },
        method,
      };

      fetch(path, requestOptions)
        .then((response) => {
          if (response.redirected) {
            window.location.href = response.url;
          }
        });
    }
    this.setState({ validated: true });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  updateState = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  handleSelectChange = (selectedOption, { name }) => {
    this.setState({ [name]: selectedOption });
  }

  _getSubmitBody() {
    const { token } = this.props;
    const submitState = { ...this.state };
    const {
      industry,
      business_type: businessType,
      current_media_mix: currentMediaMix,
    } = submitState;
    submitState.industry = industry?.value;
    submitState.business_type = businessType?.value;
    submitState.current_media_mix = currentMediaMix?.map((option) => option.value);

    const body = JSON.stringify({
      advertiser: submitState,
      authenticity_token: token,
    });
    return body;
  }

  _initSelectOptions() {
    const {
      business_type_options: businessTypeOptionsProp,
      industry_options: industryOptionsProp,
      media_mix_options: mediaMixOptionsProp,
    } = this.props;

    industryOptions = FormUtils.buildOptions(industryOptionsProp);
    businessTypeOptions = FormUtils.buildOptions(businessTypeOptionsProp);
    mediaMixOptions = FormUtils.buildOptions(mediaMixOptionsProp);
  }

  _initialState() {
    const {
      advertiser: {
        name,
        industry,
        website_url: websiteUrl,
        monthly_unique_visitors: monthlyUniqueVisitors,
        business_type: businessType,
        current_media_mix: currentMediaMix,
        annual_revenue: annualRevenue,
      },
    } = this.props;

    return {
      annual_revenue: annualRevenue || '',
      business_type: businessType ? FormUtils.buildOption(businessType) : '',
      current_media_mix: currentMediaMix ? FormUtils.buildOptions(currentMediaMix) : [],
      industry: industry ? FormUtils.buildOption(industry) : '',
      monthly_unique_visitors: monthlyUniqueVisitors || '',
      name: name || '',
      website_url: websiteUrl || 'https://',
    };
  }

  render() {
    const {
      annual_revenue: annualRevenue,
      name,
      industry,
      website_url: websiteUrl,
      monthly_unique_visitors: monthlyUniqueVisitors,
      business_type: businessType,
      current_media_mix: currentMediaMix,
      validated,
    } = this.state;

    return (
      <div>
        <h3 className="form-title">Advertiser Profile</h3>
        <div className="row">
          <div className="col-6">
            <div className="form-v2">
              <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label className="label-v2">Advertiser Name</Form.Label>
                  <Form.Control
                    className="input-v2"
                    required
                    name="name"
                    type="text"
                    onChange={this.handleChange}
                    value={name}
                  />
                  <Form.Control.Feedback type="invalid">
                    Advertiser Name is required
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="industry">
                  <Form.Label className="label-v2">Industry</Form.Label>
                  <Select
                    className="selectV2"
                    classNamePrefix="selectV2"
                    options={industryOptions}
                    name="industry"
                    onChange={this.handleSelectChange}
                    value={industry}
                  />
                </Form.Group>

                <Form.Group controlId="website_url">
                  <Form.Label className="label-v2">Website URL</Form.Label>
                  <Form.Control
                    className="input-v2"
                    required
                    name="website_url"
                    type="url"
                    onChange={this.handleChange}
                    value={websiteUrl}
                  />
                  <Form.Control.Feedback type="invalid">
                    Website URL is invalid
                  </Form.Control.Feedback>
                </Form.Group>

                <NumberInput
                  name="annual_revenue"
                  label="Annual Revenue"
                  handleChange={this.updateState}
                  value={annualRevenue}
                />

                <NumberInput
                  name="monthly_unique_visitors"
                  label="Monthly Unique Visitors"
                  handleChange={this.updateState}
                  value={monthlyUniqueVisitors}
                />

                <Form.Group controlId="business_type">
                  <Form.Label className="label-v2">Business Type</Form.Label>
                  <Select
                    className="selectV2"
                    classNamePrefix="selectV2"
                    options={businessTypeOptions}
                    name="business_type"
                    onChange={this.handleSelectChange}
                    value={businessType}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label-v2">Current Media Mix</Form.Label>
                  <Select
                    className="multiSelectV2"
                    classNamePrefix="multiSelectV2"
                    options={mediaMixOptions}
                    onChange={this.handleSelectChange}
                    name="current_media_mix"
                    value={currentMediaMix}
                    isMulti
                    menuPlacement="top"
                  />
                </Form.Group>
                <div className="form-group">
                  <button className="btn btn-primary-v2 float-right" type="submit" style={{ width: '61%' }}>
                    Finish
                  </button>
                  <button className="btn btn-secondary-v2" type="button" onClick={handleCancel}>Cancel</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdvertiserForm.propTypes = {
  advertiser: PropTypes.shape({
    agency_id: PropTypes.number,
    annual_revenue: PropTypes.number,
    business_type: PropTypes.string,
    current_media_mix: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.number,
    industry: PropTypes.string,
    monthly_unique_visitors: PropTypes.number,
    name: PropTypes.string,
    website_url: PropTypes.string,
  }).isRequired,
  business_type_options: PropTypes.arrayOf(PropTypes.string).isRequired,
  industry_options: PropTypes.arrayOf(PropTypes.string).isRequired,
  media_mix_options: PropTypes.arrayOf(PropTypes.string).isRequired,
  new: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};
