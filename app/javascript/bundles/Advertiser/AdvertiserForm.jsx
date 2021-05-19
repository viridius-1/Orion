import React, {Component} from "react";
import {Form} from 'react-bootstrap';
import Select from "react-select";
import FormUtils from '../../common/FormUtils'

let industry_options = [];
let business_type_options = [];
let media_mix_options = [];
export default class AdvertiserForm extends Component {
  constructor(props) {
    super(props);
    this._initSelectOptions();
    this.state = this._initialState();
  }

  _initialState() {
    const {
      name,
      industry,
      website_url,
      monthly_unique_visitors,
      business_type,
      current_media_mix
    } = this.props.advertiser;

    return {
      name: name ? name : "",
      industry: industry ? FormUtils.buildOption(industry) : "",
      website_url: website_url ? website_url : "",
      monthly_unique_visitors: monthly_unique_visitors ? monthly_unique_visitors : "",
      business_type: business_type ? FormUtils.buildOption(business_type) : "",
      current_media_mix: current_media_mix ? FormUtils.buildOptions(current_media_mix) : []
    }
  }

  _initSelectOptions() {
    industry_options = FormUtils.buildOptions(this.props.industry_options);
    business_type_options = FormUtils.buildOptions(this.props.business_type_options);
    media_mix_options = FormUtils.buildOptions(this.props.media_mix_options);
  }

  _getSubmitBody() {
    const submitState = {...this.state};
    const {industry, business_type, current_media_mix} = submitState;
    submitState.industry = industry?.value;
    submitState.business_type = business_type?.value;
    submitState.current_media_mix = current_media_mix?.map((option) => {
      return option.value
    });

    const body = JSON.stringify({
      advertiser: submitState,
      authenticity_token: this.props.token
    });
    return body;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {

      let method = 'POST';
      let path = `/agencies/${this.props.advertiser.agency_id}/advertisers`;


      if (!this.props.new) {
        method = 'PUT';
        path = `/agencies/${this.props.advertiser.agency_id}/advertisers/${this.props.advertiser.id}`
      }
      const requestOptions = {
        method,
        headers: {'Content-Type': 'application/json'},
        body: this._getSubmitBody()
      };

      fetch(path, requestOptions)
        .then((response) => {
          console.log(response);
          if (response.redirected) {
            window.location.href = response.url;
          }
        }).catch((response) => {
        console.log(response);
      });
    }
    this.setState({validated: true});
  };

  handleCancel = event => {
    event.preventDefault();
    window.history.back();
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSelectChange = (selectedOption, {name}) => {
    this.setState({[name]: selectedOption});
  };

  render() {
    const {name, industry, website_url, monthly_unique_visitors, business_type, current_media_mix} = this.state;

    return (
      <div>
        <h3 className="form-title">Advertiser Profile</h3>
        <div className="row">
          <div className="col-6">
            <div className="form-v2">
              <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label className="label-v2">Advertiser Name</Form.Label>
                  <Form.Control className="input-v2"
                                required
                                name="name"
                                type="text"
                                onChange={this.handleChange}
                                value={name}/>
                  <Form.Control.Feedback type="invalid">
                    Advertiser Name is required
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="industry">
                  <Form.Label className="label-v2">Industry</Form.Label>
                  <Select className="selectV2"
                          classNamePrefix='selectV2'
                          options={industry_options}
                          name='industry'
                          onChange={this.handleSelectChange}
                          value={industry}
                  />
                </Form.Group>

                <Form.Group controlId="website_url">
                  <Form.Label className="label-v2">Website URL</Form.Label>
                  <Form.Control className="input-v2"
                                required
                                name="website_url"
                                type="url"
                                onChange={this.handleChange}
                                value={website_url}/>
                  <Form.Control.Feedback type="invalid">
                    Website URL is invalid
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="monthly-unique-visitors">
                  <Form.Label className="label-v2">Monthly Unique Visitors</Form.Label>
                  <Form.Control className="input-v2"
                                required
                                name="monthly_unique_visitors"
                                onKeyDown={FormUtils.blockNonNum}
                                type="number"
                                onChange={this.handleChange}
                                value={monthly_unique_visitors}/>
                  <Form.Control.Feedback type="invalid">
                    Monthly Unique visitors required
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="business_type">
                  <Form.Label className="label-v2">Business Type</Form.Label>
                  <Select className="selectV2"
                          classNamePrefix='selectV2'
                          options={business_type_options}
                          name='business_type'
                          onChange={this.handleSelectChange}
                          value={business_type}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label-v2">Current Media Mix</Form.Label>
                  <Select className="multiSelectV2"
                          classNamePrefix='multiSelectV2'
                          options={media_mix_options}
                          onChange={this.handleSelectChange}
                          name="current_media_mix"
                          value={current_media_mix}
                          isMulti
                          menuPlacement="top"
                  />
                </Form.Group>
                <div className="form-group">
                  <button className="btn btn-primary-v2 float-right" type="Submit" style={{width: "61%"}}>Finish
                  </button>
                  <button className="btn btn-secondary-v2" type="cancel" onClick={this.handleCancel}>Cancel</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}