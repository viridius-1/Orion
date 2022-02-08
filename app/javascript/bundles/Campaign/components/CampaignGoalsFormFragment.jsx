import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import PropTypes from 'prop-types';
import FormUtils from '../../../common/FormUtils';

import OrionForm from '../../../components/OrionForm';

export default class CampaignGoalsFormFragment extends Component {
  render() {
    const {
      average_order_value: averageOrderValue,
      budget,
      conversion_rate: conversionRate,
      errors,
      goal,
      handleCancel,
      handleChange,
      handleSelectChange,
      handleSubmit,
      kpi,
      pixel_notes,
      options: {
        goal_options: goalOptions,
        kpi_options: kpiOptions,
      },
      target_cpa: targetCpa,
      target_roas: targetRoas,
    } = this.props;

    return (
      <div>
        <h3 className="form-title">Objectives</h3>
        <div className="row">
          <div className="col-6">
            <div className="form-v2">
              <OrionForm
                formId="campaign_goals_form"
                handleSubmit={handleSubmit}
                errors={errors}
              >
                <Form.Group controlId="goal">
                  <Form.Label className="label-v2">Overall Goal</Form.Label>
                  <Select
                    className="selectV2"
                    classNamePrefix="selectV2"
                    options={FormUtils.buildOptions(goalOptions)}
                    name="goal"
                    onChange={handleSelectChange}
                    value={goal}
                  />
                </Form.Group>
                <Form.Group controlId="kpi">
                  <Form.Label className="label-v2">KPI</Form.Label>
                  <Select
                    className="selectV2"
                    classNamePrefix="selectV2"
                    options={FormUtils.buildOptions(kpiOptions)}
                    name="kpi"
                    onChange={handleSelectChange}
                    value={kpi}
                  />
                </Form.Group>
                <Form.Group controlId="conversion_rate">
                  <Form.Label className="label-v2">Conversion Rate</Form.Label>
                  <Form.Control
                    className="input-v2 left"
                    required
                    name="conversion_rate"
                    type="number"
                    onKeyDown={FormUtils.blockNonNum}
                    onChange={handleChange}
                    value={conversionRate}
                  />
                  <div className="input-v2-append"><span>%</span></div>
                </Form.Group>

                <Form.Group controlId="average_order_value">
                  <Form.Label className="label-v2">AOV</Form.Label>
                  <Form.Control
                    className="input-v2 right"
                    required
                    name="average_order_value"
                    type="number"
                    onKeyDown={FormUtils.blockNonNum}
                    onChange={handleChange}
                    value={averageOrderValue}
                  />
                  <div className="input-v2-prepend"><span>$</span></div>
                </Form.Group>

                <Form.Group controlId="target_cpa">
                  <Form.Label className="label-v2">Target CPA</Form.Label>
                  <Form.Control
                    className="input-v2 right"
                    required
                    name="target_cpa"
                    type="number"
                    onKeyDown={FormUtils.blockNonNum}
                    onChange={handleChange}
                    value={targetCpa}
                  />
                  <div className="input-v2-prepend"><span>$</span></div>
                </Form.Group>

                <Form.Group controlId="target_roas">
                  <Form.Label className="label-v2">Target ROAS</Form.Label>
                  <Form.Control
                    className="input-v2 left"
                    required
                    name="target_roas"
                    type="number"
                    onKeyDown={FormUtils.blockNonNum}
                    onChange={handleChange}
                    value={targetRoas}
                  />
                  <div className="input-v2-append"><span>%</span></div>
                </Form.Group>
                <Form.Group controlId="budget">
                  <Form.Label className="label-v2">Budget</Form.Label>
                  <Form.Control
                    className="input-v2 right"
                    required
                    name="budget"
                    type="number"
                    onKeyDown={FormUtils.blockNonNum}
                    onChange={handleChange}
                    value={budget}
                  />
                  <div className="input-v2-prepend"><span>$</span></div>
                </Form.Group>
                <Form.Group controlId="pixel_notes">
                  <Form.Label className="label-v2 default-position">Pixel Notes</Form.Label>
                  <Form.Control
                    className="input-v2 textarea"
                    required
                    name="pixel_notes"
                    type="text"
                    as="textarea"
                    onChange={handleChange}
                    value={pixel_notes}
                  />
                </Form.Group>
                <div className="form-group">
                  <button className="btn btn-secondary-v2" type="button" onClick={handleCancel}>Back</button>
                  <button className="btn btn-primary-v2 float-right" type="submit" style={{ width: '61%' }}>
                    Continue
                  </button>
                </div>
              </OrionForm>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CampaignGoalsFormFragment.propTypes = {
  average_order_value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  budget: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  conversion_rate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  errors: PropTypes.object,
  goal: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  handleCancel: PropTypes.func,
  handleChange: PropTypes.func,
  handleSelectChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  kpi: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  options: PropTypes.shape({
    goal_options: PropTypes.arrayOf(PropTypes.string),
    kpi_options: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  target_cpa: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  target_roas: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  pixel_notes: PropTypes.string
};

CampaignGoalsFormFragment.defaultProps = {
  average_order_value: undefined,
  budget: undefined,
  conversion_rate: undefined,
  goal: undefined,
  handleCancel: undefined,
  handleChange: undefined,
  handleSelectChange: undefined,
  handleSubmit: undefined,
  kpi: undefined,
  target_cpa: undefined,
  target_roas: undefined,
  pixel_notes: undefined
};
