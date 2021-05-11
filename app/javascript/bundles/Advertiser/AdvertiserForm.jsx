import React, {Component} from "react";
import {Form} from 'react-bootstrap';
import Select from "react-select";
import FormUtils from '../../common/FormUtils'

let industry_options = [];
let customer_target_options = [];
let media_mix_options = [];
export default class AdvertiserForm extends Component {
  constructor(props) {
    super(props);
    this._initSelectOptions();
    this.state = this._initialState();
  }

  _initialState() {
    const initialState = {};
    const advertiser = this.props.advertiser;
    initialState.name = advertiser.name ? advertiser.name : "";
    initialState.industry = advertiser.industry ? FormUtils.buildOption(advertiser.industry) : null;
    initialState.website = advertiser.website ? advertiser.website : "";
    initialState.monthly_unique_visitors = advertiser.monthly_unique_visitors ? advertiser.monthly_unique_visitors : "";
    initialState.customer_target = advertiser.customer_target ? FormUtils.buildOption(advertiser.customer_target) : null;
    initialState.current_media_mix = advertiser.current_media_mix ? FormUtils.buildOptions(advertiser.current_media_mix.split(',')) : null;

    return initialState;
  }

  _initSelectOptions() {
    industry_options = FormUtils.buildOptions(this.props.industry_options);
    customer_target_options = FormUtils.buildOptions(this.props.customer_target_options);
    media_mix_options = FormUtils.buildOptions(this.props.media_mix_options);
  }

  _getSubmitBody() {
    const submitState = this.state;
    submitState.industry = submitState.industry?.value;
    submitState.customer_target = submitState.customer_target?.value;
    submitState.current_media_mix = submitState.current_media_mix?.map((option) => {
      return option.value
    }).toString();

    const body = JSON.stringify({
      client: submitState,
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
      let path = `/agencies/${this.props.advertiser.agency_id}/clients`;


      if (!this.props.new) {
        method = 'PUT';
        path = `/agencies/${this.props.advertiser.agency_id}/clients/${this.props.advertiser.id}`
      }
      const requestOptions = {
        method,
        headers: {'Content-Type': 'application/json'},
        body: this._getSubmitBody()
      };

      fetch(path, requestOptions)
        .then((response) => {
          if (response.redirected) {
            window.location.href = response.url;
          }
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
      const {name, industry, website, monthly_unique_visitors, customer_target, current_media_mix} = this.state;

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

                <Form.Group controlId="website">
                  <Form.Label className="label-v2">Website URL</Form.Label>
                  <Form.Control className="input-v2"
                                required
                                name="website"
                                type="url"
                                onChange={this.handleChange}
                                value={website}/>
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

                <Form.Group controlId="customer_target">
                  <Form.Label className="label-v2">Business Type</Form.Label>
                  <Select className="selectV2"
                          classNamePrefix='selectV2'
                          options={customer_target_options}
                          name='customer_target'
                          onChange={this.handleSelectChange}
                          value={customer_target}
                  />
                </Form.Group>

                <Form.Group controlId="business_type">
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
                  <button className="btn btn-primary-v2 float-right" type="Submit" style={{width: "61%"}}>Finish</button>
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