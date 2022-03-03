import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export default class CampaignActionItemsFormFragment extends Component {
  constructor(props) {
    super(props);
    this.state = this._initialState();
  }

  _initialState() {
    const {
      campaignId,
      footfallAnalysis,
      crmData,
      brandSafety,
      contextualTargeting,
      footfallAnalysisText,
      crmDataChecked,
      brandSafetyText,
      contextualTargetingText
    } = this.props;

    const initialState = {
      campaign_id: campaignId,
      footfall_analysis: footfallAnalysis,
      crm_data: crmData,
      brand_safety: brandSafety,
      contextual_targeting: contextualTargeting,
      footfall_analysis_text: footfallAnalysisText || '',
      crm_data_checked: crmDataChecked || '',
      brand_safety_text: brandSafetyText || '',
      contextual_targeting_text: contextualTargetingText || '',
      validated: false
    };

    return initialState;
  }

  completeActionItems = (event) => {
    const {
      campaign_id
    } = this.state;
    
    console.log(event.currentTarget);
    
    const requestOptions = {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET'
    };

    const completeActionItems = `/campaigns/${campaign_id}/complete_action_items`

    fetch(completeActionItems, requestOptions)
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url;
        } 
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      this.setState({ validated: true });
    } else {
      this._submitForm(event);
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChangeCheckbox = (event) => {
    this.setState({ [event.target.name]: event.target.checked })
  }

  _submitForm(event) {
    const {
      campaign_id
    } = this.state;

    const requestOptions = {
      body: this._getSubmitBody(event),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT'
    };

    const saveActionItemsUrl = `/campaigns/${campaign_id}/action_items`

    fetch(saveActionItemsUrl, requestOptions)
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url;
        } 
      });
  }

  _getSubmitBody(event) {
    const {
      footfall_analysis_text,
      crm_data_checked,
      brand_safety_text,
      contextual_targeting_text
    } = this.state;
    
    const submitState = {
      footfall_analysis_text,
      crm_data_checked,
      brand_safety_text,
      contextual_targeting_text
    };

    const { token } = this.props;

    const body = JSON.stringify({
      authenticity_token: token,
      campaign: submitState,
      request_type: event.target.value,
    });

    return body;
  }

  render() {
    const {
      footfall_analysis,
      crm_data,
      brand_safety,
      contextual_targeting,
      footfall_analysis_text,
      crm_data_checked,
      brand_safety_text,
      contextual_targeting_text,
      validated
    } = this.state;

    return (  
      <div style={{ padding: '0 40px' }}>
        <div className="row">
          <div className="col-12 grid-item">
            <div className="row">
              <div className="col-12 grid-item">
                <ul style={{paddingLeft: '0px'}}>
                  <Form 
                    noValidate
                    id={this.formId}
                    validated={validated}
                    onSubmit={this.handleSubmit}
                  >
                    {footfall_analysis && 
                      <Form.Group controlId="footfall_analysis_text" className="col-md-6">
                        <Form.Label className="label-v2 default-position"><li>Footfall Analysis - Please add your point(s) of destination here.</li></Form.Label>
                        <Form.Control
                          className="input-v2 textarea"
                          name="footfall_analysis_text"
                          type="text"
                          as="textarea"
                          rows={3}
                          required
                          value={footfall_analysis_text}
                          onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Footfall Analysis is required
                        </Form.Control.Feedback>
                      </Form.Group>
                    }
                    {crm_data &&
                      <Form.Group controlId="crm_data_checked" className="col-md-6">
                        <Form.Label className="label-v2 default-position"><li>CRM Data -  Please upload your 1st party data into Liveramp through the Data Onboarding tab. If you don't have a Liveramp account, your Version2 campaign specialist will create one for you following the completion of your first submitted Self Service Auto Setup. To upload your 1st party data, remember to include your campaign name and description of the audience in the document title. Please format your document like this.</li></Form.Label>
                        <Form.Check 
                          type="checkbox" 
                          id="crm_data"
                          name="crm_data_checked"
                          label="Please confirm"
                          required
                          defaultChecked={crm_data_checked}
                          onChange={this.handleChangeCheckbox}
                        />
                        <Form.Control.Feedback type="invalid">
                          CRM Data is required
                        </Form.Control.Feedback>
                      </Form.Group>
                    }
                    {brand_safety &&
                      <Form.Group controlId="brand_safety_text" className="col-md-6">
                        <Form.Label className="label-v2 default-position"><li>Brand Safety - Please add the sites or content categories that you'd like to have negatively targeted here.</li></Form.Label>
                        <Form.Control
                          className="input-v2 textarea"
                          name="brand_safety_text"
                          type="text"
                          as="textarea"
                          rows={3}
                          required
                          value={brand_safety_text}
                          onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Brand Safety is required
                        </Form.Control.Feedback>
                      </Form.Group>
                    }
                    {contextual_targeting &&
                      <Form.Group controlId="contextual_targeting_text" className="col-md-6">
                        <Form.Label className="label-v2 default-position"><li>Contextual Targeting - Please add the sites or content categories that you'd like to have targeted here.</li></Form.Label>
                        <Form.Control
                          className="input-v2 textarea"
                          name="contextual_targeting_text"
                          type="text"
                          as="textarea"
                          rows={3}
                          required
                          value={contextual_targeting_text}
                          onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Contextual Targeting is required
                        </Form.Control.Feedback>
                      </Form.Group>
                    }
                    <div className="form-group col-md-6">
                      <button className="btn btn-secondary-v2" type="submit">Save</button>
                      <button className="btn btn-primary-v2 float-right" onClick={this.completeActionItems} type="button" style={{ width: '61%' }}>Complete</button>
                    </div>
                  </Form>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}