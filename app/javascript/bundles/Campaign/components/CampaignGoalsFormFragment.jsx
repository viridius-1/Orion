import React, {Component} from "react";
import {Form} from "react-bootstrap";
import FormUtils from "../../../common/FormUtils";
import Select from "react-select";

export default class CampaignGoalsFormFragment extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  formId = 'campaign_goals_form';

  render() {
    return (
      <div>
        <h3 className="form-title">Campaign Goals</h3>
        <div className="row">
          <div className="col-6">
            <div className="form-v2">
              <Form noValidate
                    id={this.formId}
                    validated={this.props.validated}
                    onSubmit={this.props.handleSubmit}
                    onKeyPress={() => FormUtils.submitEnter(event, this.formId, this.props.handleSubmit)}>

                <Form.Group controlId="goal">
                  <Form.Label className="label-v2">Overall Goal</Form.Label>
                  <Select className="selectV2"
                          classNamePrefix='selectV2'
                          options={FormUtils.buildOptions(this.props.options.goal_options)}
                          name='goal'
                          onChange={this.props.handleSelectChange}
                          value={this.props.goal}
                  />
                </Form.Group>
                <Form.Group controlId="kpi">
                  <Form.Label className="label-v2">KPI</Form.Label>
                  <Select className="selectV2"
                          classNamePrefix='selectV2'
                          options={FormUtils.buildOptions(this.props.options.kpi_options)}
                          name='kpi'
                          onChange={this.props.handleSelectChange}
                          value={this.props.kpi}
                  />
                </Form.Group>
                <Form.Group controlId="conversion_rate">
                  <Form.Label className="label-v2">Conversion Rate</Form.Label>
                  <Form.Control className="input-v2 left"
                                required
                                name="conversion_rate"
                                type="number"
                                onKeyDown={FormUtils.blockNonNum}
                                onChange={this.props.handleChange}
                                value={this.props.conversion_rate}
                  />
                  <div className="input-v2-append"><span>%</span></div>
                  <Form.Control.Feedback type="invalid">
                    Conversion Rate is required
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="aov">
                  <Form.Label className="label-v2">AOV</Form.Label>
                  <Form.Control className="input-v2 right"
                                required
                                name="aov"
                                type="number"
                                onKeyDown={FormUtils.blockNonNum}
                                onChange={this.props.handleChange}
                                value={this.props.aov}
                  />
                  <div className="input-v2-prepend"><span>$</span></div>
                  <Form.Control.Feedback type="invalid">
                    AOV is required
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="target_cpa">
                  <Form.Label className="label-v2">Target CPA</Form.Label>
                  <Form.Control className="input-v2 right"
                                required
                                name="target_cpa"
                                type="number"
                                onKeyDown={FormUtils.blockNonNum}
                                onChange={this.props.handleChange}
                                value={this.props.target_cpa}
                  />
                  <div className="input-v2-prepend"><span>$</span></div>
                  <Form.Control.Feedback type="invalid">
                    Target CPA is required
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="target_roas">
                  <Form.Label className="label-v2">Target ROAS</Form.Label>
                  <Form.Control className="input-v2 left"
                                required
                                name="target_roas"
                                type="number"
                                onKeyDown={FormUtils.blockNonNum}
                                onChange={this.props.handleChange}
                                value={this.props.target_roas}
                  />
                  <div className="input-v2-append"><span>%</span></div>
                  <Form.Control.Feedback type="invalid">
                    Target ROAS is required
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="budget">
                  <Form.Label className="label-v2">Budget</Form.Label>
                  <Form.Control className="input-v2 right"
                                required
                                name="budget"
                                type="number"
                                onKeyDown={FormUtils.blockNonNum}
                                onChange={this.props.handleChange}
                                value={this.props.budget}
                  />
                  <div className="input-v2-prepend"><span>$</span></div>
                  <Form.Control.Feedback type="invalid">
                    Budget is required
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="form-group">
                  <button className="btn btn-secondary-v2" type="cancel" onClick={this.props.handleCancel}>Back</button>
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
