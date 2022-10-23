import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FormUtils from '../../../common/FormUtils';
import OrionForm from '../../../components/OrionForm';
import NumberInput from '../../../components/NumberInput';
import SelectInput from "../../../components/SelectInput";
import InputLabel from "../../../components/InputLabel";

export default class ObjectiveFormFragment extends Component {
  constructor(props) {
    super(props);

    const {
      objective,
      options: {
        objective_field_mapping: fieldMapping
      }
    } = props

    this.state = { 
      goal_options: fieldMapping['goal_options'][objective.media_channel] || [],
      kpi_options: fieldMapping['kpi_options'][objective.goal] || [],
      fields: fieldMapping['field_options'][objective.kpi] || []
    }
  }

  handleSelectChange = (selectedOption, { name }) => {
    const {
      objective
    } = this.props

    objective[name] = selectedOption.value

    if (['media_channel', 'goal', 'kpi'].includes(name)) {
      this.refreshOptions()
    } else {
      this.forceUpdate()
    }
  }

  handleChange = (event) => {
    const {
      objective
    } = this.props

    objective[event.target.name] = event.target.value
    this.forceUpdate()
  }

  updateAttribute = (name, value) => {
    const {
      objective
    } = this.props

    objective[name] = value
    this.forceUpdate()
  }

  handleNumberChange = (event) => {
    const {
      objective
    } = this.props

    let number = event.target.value.replaceAll(',', '').replaceAll('-', '')

    // limit to 2 decimal places
    let [wholePart, decimalPart] = number.split('.')
    if (decimalPart) {
      decimalPart = decimalPart.substring(0, 2)
      number = `${wholePart}.${decimalPart}`
    }

    // js can't handle parsing of huge numbers
    if (number.length >= 16) {
      event.preventDefault()
      return
    }

    if (number === '') {
      objective[event.target.name] = ''
      this.forceUpdate()
      return
    }

    if (Number(number) !== 0 && !Number(number)) {
      event.preventDefault()
      return
    }

    if (Number(number) < 0) {
      objective[event.target.name] = '0'
      this.forceUpdate()
      return
    }

    objective[event.target.name] = number
    this.forceUpdate()
  }

  handlePercentageChange = (event) => {
    const {
      objective
    } = this.props

    if (Number(event.target.value) >= 100) {
      objective[event.target.name] = '100'
      this.forceUpdate()
      return
    }

    if (Number(event.target.value) < 0) {
      objective[event.target.name] = '0'
      this.forceUpdate()
      return
    }

    objective[event.target.name] = event.target.value
    this.forceUpdate()
  }

  handleDecimalPercentageChange = (event) => {
    const {
      objective
    } = this.props

    let [wholePart, decimalPart] = event.target.value.split('.')

    if (Number(event.target.value) >= 100) {
      objective[event.target.name] = '100'
      this.forceUpdate()
      return
    }

    if (Number(event.target.value) < 0) {
      objective[event.target.name] = '0'
      this.forceUpdate()
      return
    }

    if (decimalPart) {
      decimalPart = decimalPart.substring(0, 2)
    }

    let result = decimalPart ? `${wholePart}.${decimalPart}` : wholePart

    objective[event.target.name] = result
    this.forceUpdate()
  }

  refreshOptions = () => {
    const {
      objective,
      options: {
        objective_field_mapping: fieldMapping
      }
    } = this.props

    const goalOptions = fieldMapping["goal_options"][objective.media_channel] || []
    if (!goalOptions.includes(objective.goal)) {
      objective.goal = ''
    }

    const kpiOptions = fieldMapping["kpi_options"][objective.goal] || []
    if (!kpiOptions.includes(objective.kpi)) {
      objective.kpi = ''
    }

    const fields = fieldMapping["field_options"][objective.kpi] || []

    this.setState({
      goal_options: goalOptions,
      kpi_options: kpiOptions,
      fields: fields,
    })

    this.forceUpdate()
  }

  render() {
    const {
      objective,
      options: {
        media_channel_options: mediaChannelOptions
      },
      handleSubmit
    } = this.props

    const {
      goal_options: goalOptions,
      kpi_options: kpiOptions,
      fields: fields
    } = this.state

    let impressions = ''

    if (objective.budget && objective.desired_dcpm) {
      impressions = Math.round(objective.budget / objective.desired_dcpm * 1000).toLocaleString('en', {useGrouping: true})
    }

    return (
      <OrionForm
        formId={`objective-form-${objective.id || 0}`}
        errors={objective.errors || {}}
        handleSubmit={handleSubmit}
      >
        <SelectInput
          name="media_channel"
          label="Media Channel"
          options={FormUtils.buildOptions(mediaChannelOptions)}
          handleChange={this.handleSelectChange}
          value={{ label: objective.media_channel, value: objective.media_channel }}
        />
        {objective.media_channel &&
          <SelectInput
            name="goal"
            label="Overall Goal"
            options={FormUtils.buildOptions(goalOptions)}
            handleChange={this.handleSelectChange}
            value={{ label: objective.goal, value: objective.goal }}
          />
        }
        {objective.goal &&
          <SelectInput
            name="kpi"
            label="KPI"
            options={FormUtils.buildOptions(kpiOptions)}
            handleChange={this.handleSelectChange}
            value={{ label: objective.kpi, value: objective.kpi }}
          />
        }
        <div className="row" inputwrapper="true" key="date_wrapper">
        { objective.kpi &&
        <Form.Group controlId="start_date" className="col-6" title="Date your campaign is scheduled to launch">
          <InputLabel label="Start Date" tooltip="Date your campaign is scheduled to launch"/>
          <Form.Control
            className="input-v2"
            required
            type="date"
            name="start_date"
            onChange={this.handleChange}
            value={objective.start_date || ''}
          />
        </Form.Group>
        }
        { objective.kpi &&
        <Form.Group controlId="end_date" className="col-6" title="Date your campaign is scheduled to end">
          <InputLabel label="End Date" tooltip="Date your campaign is scheduled to end"/>
          <Form.Control
            className="input-v2"
            required
            type="date"
            name="end_date"
            onChange={this.handleChange}
            value={objective.end_date || ''}
          />
        </Form.Group>
        }
        </div>
        <div className="row" inputwrapper="true" key="budget_wrapper">
        {fields.includes('budget') &&
          <NumberInput
            name="budget"
            label="Budget"
            tooltip="Your desired spend for this campaign"
            handleChange={this.updateAttribute}
            value={objective.budget}
            allowDecimal={true}
            className="col-6"
            prepend="$"
          />
        }
        {fields.includes('desired_dcpm') &&
          <NumberInput
            name="desired_dcpm"
            label="Desired dCPM"
            tooltip="Your target cost per thousand impressions; note: this may not be possible due to reach and targeting requirements"
            handleChange={this.updateAttribute}
            value={objective.desired_dcpm}
            allowDecimal={true}
            className="col-6"
            prepend="$"
          />
        }
        </div>
        {(fields.includes('budget') && fields.includes('desired_dcpm')) &&
        <Form.Group controlId="impressions" title="Projected impressions based on desired dCPM and Budget">
          <InputLabel label="Impressions" tooltip="Projected impressions based on desired dCPM and Budget"/>
          <Form.Control
            className="input-v2"
            name="impressions"
            disabled
            type="text"
            value={impressions}
            />
        </Form.Group>
        }
        {fields.includes('target_ctr') &&
        <Form.Group controlId="target_ctr">
          <Form.Label className="label-v2">Click Through Rate</Form.Label>
          <Form.Control
            className="input-v2 left"
            name="target_ctr"
            type="number"
            step="0.01"
            onKeyDown={FormUtils.blockE}
            onChange={this.handleDecimalPercentageChange}
            value={objective.target_ctr || ''}
            />
          <div className="input-v2-append"><span>%</span></div>
        </Form.Group>
        }
        {fields.includes('video_completion_rate') &&
        <Form.Group controlId="video_completion_rate">
          <Form.Label className="label-v2">Video Completion Rate</Form.Label>
          <Form.Control
            className="input-v2 left"
            name="video_completion_rate"
            type="number"
            onKeyDown={FormUtils.blockNonNum}
            onChange={this.handlePercentageChange}
            value={objective.video_completion_rate || ''}
            />
          <div className="input-v2-append"><span>%</span></div>
        </Form.Group>
        }

        {fields.includes('average_order_value') &&
          <NumberInput
            name="average_order_value"
            label="Average Order Value"
            handleChange={this.updateAttribute}
            value={objective.average_order_value}
            allowDecimal={true}
            prepend="$"
          />
        }
        {fields.includes('target_cpa') &&
          <NumberInput
            name="target_cpa"
            label="Cost Per Acquisition Goal"
            handleChange={this.updateAttribute}
            value={objective.target_cpa}
            allowDecimal={true}
            prepend="$"
          />
        }
        {fields.includes('target_roas') &&
          <NumberInput
            name="target_roas"
            label="Return on Ad Spend Goal"
            handleChange={this.updateAttribute}
            value={objective.target_roas}
          />
        }
        {fields.includes('pixel_notes') &&
        <Form.Group controlId="pixel_notes">
          <Form.Label className="label-v2 default-position">Pixel Notes</Form.Label>
          <Form.Control
            className="input-v2 textarea"
            required
            name="pixel_notes"
            type="text"
            as="textarea"
            onChange={this.handleChange}
            value={objective.pixel_notes || ''}
            />
        </Form.Group>
        }
        {objective.kpi &&
        <Form.Group controlId="objective_notes">
          <Form.Label className="label-v2 default-position">Objective Notes</Form.Label>
          <Form.Control
            className="input-v2 textarea"
            name="objective_notes"
            type="text"
            as="textarea"
            onChange={this.handleChange}
            value={objective.objective_notes || ''}
          />
          </Form.Group>
        }
      </OrionForm>
    )
  }
}

ObjectiveFormFragment.propTypes = {
  objective: PropTypes.object,
  options: PropTypes.shape({
    goal_options: PropTypes.arrayOf(PropTypes.string),
    kpi_options: PropTypes.arrayOf(PropTypes.string),
    mapping_options: PropTypes.object,
  }).isRequired,
  errors: PropTypes.object
}
