import React, { Component } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ObjectiveFormFragment from './ObjectiveFormFragment';

export default class CampaignGoalsFormFragment extends Component {
  constructor(props) {
    super(props);

    this.state = { activeTab: props.objectives.length > 1 ? '' : 'objective-0' }

    if (props.objectives.length === 0) {
      this.props.objectives.push(this.newObjective())
    }
  }

  changeSelected = (selectedKey) => {
    this.setState({activeTab: selectedKey})
  }

  addNewObjective = () => {
    const {
      objectives: objectives
    } = this.props

    objectives.push(this.newObjective())
    this.setState({activeTab: `objective-${objectives.length - 1}`})
  }

  newObjective = () => {
    return {
      media_channel: '',
      goal: '',
      kpi: '',
      start_date: '',
      end_date: ''
    }
  }

  deleteObjective = (event) => {
    const {
      objectives: objectives
    } = this.props

    const objective = objectives[event.target.value]
    objective._destroy = '1'
    this.forceUpdate()
  }

  render() {
    const {
      average_order_value: averageOrderValue,
      budget,
      conversion_rate: conversionRate,
      goal,
      handleCancel,
      handleChange,
      handleSelectChange,
      handleSubmit,
      kpi,
      pixel_notes,
      options,
      target_cpa: targetCpa,
      target_roas: targetRoas,
      objectives: objectives
    } = this.props;

    const {
      activeTab
    } = this.state

    return (
      <div>
        <h3 className="form-title">Objectives</h3>
        <div className="row">
          <div className="col-lg-7 col-md-12">
            <div className="form-v2">
              <Accordion key="ObjectivesAccordion" activeKey={activeTab} className="mb-3" onSelect={this.changeSelected}>
                {objectives.map((objective, i) => (
                  !objective._destroy &&
                  <Card key={`card-objective-${i}`} style={{overflow: 'visible'}}>
                    <Card.Header key={`card-header-objective-${i}`}>
                      <Accordion.Toggle
                        key={`toggle-objective-${i}`}
                        eventKey={`objective-${i}`}
                        variant="link"
                        as={Button}
                        >
                        {anyErrorsFor(objective) ? errorIcon(objective) : `${objective.media_channel || 'New Objective'}`}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse key={`collapse-objective-${i}`} eventKey={`objective-${i}`}>
                      <Card.Body key={`card-body-objective-${i}`}>
                        <ObjectiveFormFragment objective={objective} options={options} />
                        <button value={i} className="btn btn-secondary-v2" onClick={this.deleteObjective}>Delete</button>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
              </Accordion>
              <div className="form-group">
                <button className="btn btn-secondary-v2 col-lg-3 col-md-6" type="button" onClick={handleCancel}>Back</button>
                <button className="btn btn-secondary-v2 col-lg-3 col-md-6" type="button" onClick={this.addNewObjective} style={{ margin: '0 23px' }}>Add Another</button>
                <button className="btn btn-primary-v2 col-lg-5 col-md-6" onClick={handleSubmit}>
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    function errorIcon(objective) {
      return <span><i className="fas fa-solid fa-exclamation error-color"></i> {`${objective.media_channel || 'New Objective'}`}</span>
    }

    function anyErrorsFor(objective) {
      return Object.keys(objective.errors || []).length > 0
    }

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
  pixel_notes: PropTypes.string,
  objectives: PropTypes.arrayOf(PropTypes.object)
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
