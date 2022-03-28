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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChangeCheckbox = (event) => {
    this.setState({ [event.target.name]: event.target.checked })
  }

  handleComplete = (event) => {
    event.preventDefault();
    this._submitComplete(event);
  }

  _submitComplete(event) {
    const {
      campaign_id
    } = this.state;

    const form = event.currentTarget;  
    const completeActionItems = `/campaigns/${campaign_id}/complete_action_items`
    const requestOptions = {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET'
    };

    if (form.checkValidity() === false) {
      event.stopPropagation();
      this.setState({ validated: true });
    } else {
      fetch(completeActionItems, requestOptions)
        .then((response) => {
          if (response.redirected) {
            window.location.href = response.url;
          } 
        });
    }
  }

  handleSave = (event) => {
    event.preventDefault();
    this._submitForm(event);
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
                    onSubmit={this.handleComplete}
                  >
                    {footfall_analysis && 
                      <Form.Group controlId="footfall_analysis_text" className="col-md-6">
                        <Form.Label className="label-v2 default-position"><li><b>Footfall Analysis</b> - Your Version2 Campaign Specialist will work with you and <a href="https://www.placed.com/ui/login" target="_blank">Placed</a> on creating an account and providing you tracking pixels for visitation measurement.</li></Form.Label>
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
                        <Form.Check
                          type="checkbox"
                          id="crm_data"
                          name="crm_data_checked"
                          style={{paddingLeft:0}}
                          label={(<><b>CRM Data</b> - Please log into <a href="https://sso.liveramp.com/" target="_blank">LiveRamp</a> to upload your CRM list and to publish your audience to the DSP(s). If you do not have a Peer39 account, please request one from your Version2 Campaign Specialist.</>)}
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
                        <Form.Label className="label-v2 default-position"><li><b>Brand Safety</b> - Please log into <a href="https://app.peer39.com/login" target="_blank">Peer39</a> to create and access Brand Safety tracking and measurement pixels. If you do not have a Peer39 account, please request one from your Version2 Campaign Specialist.</li></Form.Label>
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
                        <Form.Label className="label-v2 default-position"><li><b>Contextual Targeting</b> - Please log into <a href="https://app.peer39.com/login" target="_blank">Peer39</a> to upload your keyword list and to publish your audience to your DSP(s). If you do not have a Peer39 account, please request one from your Version2 Campaign Specialist.</li></Form.Label>
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
                      <Form.Group controlId="contextual_targeting_text" className="col-md-6">
                        <Form.Label className="label-v2 default-position">* Please keep in mind these campaign add-ons may incur an additional fee. Please reference your current MSA or consult with your Version2 Campaign Specialist for details.</Form.Label>
                      </Form.Group>
                    <div className="form-group col-md-6">
                      <button className="btn btn-secondary-v2" type="button" onClick={this.handleSave}>Save</button>
                      <button className="btn btn-primary-v2 float-right" type="submit" style={{ width: '61%' }}>Complete</button>
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
