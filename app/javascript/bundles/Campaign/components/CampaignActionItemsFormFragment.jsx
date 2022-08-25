import React, {Component} from 'react';
import {Form} from 'react-bootstrap';

export default class CampaignActionItemsFormFragment extends Component {
  constructor(props) {
    super(props);
    this.state = this._initialState();
  }

  _initialState() {
    const {
      campaignId,
      crmData,
      brandSafety,
      contextualTargeting,
      crmDataChecked,
      brandSafetyText,
      contextualTargetingText,
      isCreativeUploaded
    } = this.props;

    const initialState = {
      campaign_id: campaignId,
      crm_data: crmData,
      brand_safety: brandSafety,
      contextual_targeting: contextualTargeting,
      crm_data_checked: crmDataChecked || '',
      brand_safety_text: brandSafetyText || '',
      contextual_targeting_text: contextualTargetingText || '',
      is_creative_uploaded: isCreativeUploaded || '',
      validated: false
    };

    return initialState;
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleChangeCheckbox = (event) => {
    this.setState({[event.target.name]: event.target.checked});
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
      body: this._getSubmitBody(event),
      headers: {'Content-Type': 'application/json'},
      method: 'PUT'
    };

    if (form.checkValidity() === false) {
      event.stopPropagation();
      this.setState({validated: true});
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
      headers: {'Content-Type': 'application/json'},
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
      crm_data_checked,
      brand_safety_text,
      contextual_targeting_text,
      is_creative_uploaded
    } = this.state;

    const submitState = {
      crm_data_checked,
      brand_safety_text,
      contextual_targeting_text,
      is_creative_uploaded
    };

    const {token} = this.props;

    const body = JSON.stringify({
      authenticity_token: token,
      campaign: submitState,
      request_type: event.target.value,
    });

    return body;
  }

  render() {
    const {
      crm_data,
      brand_safety,
      contextual_targeting,
      crm_data_checked,
      brand_safety_text,
      contextual_targeting_text,
      is_creative_uploaded,
      validated
    } = this.state;
     const {
       campaignType: campaign_type,
       selectCreativeUploadTab
     } = this.props;
    return (
      <div style={{padding: '0 40px'}}>
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
                    {crm_data &&
                      <Form.Group controlId="crm_data_checked" className="col-md-6">
                        <Form.Check
                          type="checkbox"
                          id="crm_data"
                          name="crm_data_checked"
                          style={{paddingLeft: 0}}
                          label={(<><b>CRM Data</b> - Please log into <a href="https://sso.liveramp.com/"
                                                                         target="_blank">LiveRamp</a> to upload your CRM
                            list and to publish your audience to the DSP(s). If you do not have a Peer39 account, please
                            request one from your Version2 Campaign Specialist.</>)}
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
                        <Form.Label className="label-v2 default-position">
                          <li><b>Brand Safety</b> - Please log into <a href="https://app.peer39.com/login"
                                                                       target="_blank">Peer39</a> to create and access
                            Brand Safety tracking and measurement pixels. If you do not have a Peer39 account, please
                            request one from your Version2 Campaign Specialist.
                          </li>
                        </Form.Label>
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
                        <Form.Label className="label-v2 default-position">
                          <li><b>Contextual Targeting</b> - Please log into <a href="https://app.peer39.com/login"
                                                                               target="_blank">Peer39</a> to upload your
                            keyword list and to publish your audience to your DSP(s). If you do not have a Peer39
                            account, please request one from your Version2 Campaign Specialist.
                          </li>
                        </Form.Label>
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
                    {campaign_type === 'self_service_auto_setup' &&
                      <Form.Group controlId="is_creative_uploaded_cbx" className="col-md-6">
                        <Form.Check
                          type="checkbox"
                          id="is_creative_uploaded"
                          name="is_creative_uploaded"
                          style={{paddingLeft: 0}}
                          required
                          defaultChecked={is_creative_uploaded}
                          onChange={this.handleChangeCheckbox}
                        />
                        <a className='checkbox-text' onClick={selectCreativeUploadTab}><b>Upload Creative</b></a>
                        <Form.Control.Feedback type="invalid">
                          Creative needs to uploaded
                        </Form.Control.Feedback>
                      </Form.Group>
                    }
                    <div className="form-group col-md-6">
                      <button className="btn btn-secondary-v2" type="button" onClick={this.handleSave}>Save</button>
                      <button className="btn btn-primary-v2 float-right" type="submit" style={{width: '61%'}}>Complete
                      </button>
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
