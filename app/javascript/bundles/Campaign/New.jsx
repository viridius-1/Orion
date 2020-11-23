import React, { Component, Fragment } from "react";
import NumericInput from "react-numeric-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AudienceFields from "./components/AudienceFields";
import CreateCampaign from "./components/CreateCampaign";
import { showErrorStyles, showLabel } from "./common/";

export default class New extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      url: "",
      goal: "",
      kpi: "",
      cpa_goal: "",
      roas_goal: "",
      budget: "",
      geography: "",
      flight_start_date: new Date(),
      flight_end_date: new Date(),
      audiences: [],
      errors: {
        name: "",
        url: "",
        goal: "",
        kpi: "",
        cpa_goal: "",
        roas_goal: "",
        budget: "",
        geography: "",
        flight_start_date: "",
        flight_end_date: "",
      },
    };
  }

  handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    let errors = this.state.errors;

    this.setState({ errors, [name]: value });
  };

  handleDateSelect = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    this.setState({ errors, [name]: value });
  };

  showInput(key, value, errors, goals, kpis) {
    if (key == "cpa_goal" || key == "budget" || key == "roas_goal") {
      return (
        <NumericInput
          className={showErrorStyles(errors[key])}
          name={`${key}`}
          min={1}
          onChange={(event) => this.handleInputChange}
        />
      );
    } else if (key == "flight_start_date" || key == "flight_end_date") {
      return (
        <DatePicker
          className={showErrorStyles(errors[key])}
          name={`${key}`}
          onSelect={(event) => this.handleDateSelect}
          selected={value}
        />
      );
    } else if (key == "goal" || key == "kpi") {
      const obj = key == "goal" ? goals : kpis;

      return (
        <select
          className={showErrorStyles(errors[key])}
          name={`${key}`}
          onSelect={(event) => this.handleInputChange}
        >
          {obj.map((goal) => {
            return <option>{goal}</option>;
          })}
        </select>
      );
    } else {
      return (
        <input
          className={showErrorStyles(errors[key])}
          name={`${key}`}
          onChange={(event) => this.handleInputChange}
        />
      );
    }
  }

  showCampaignForm(formFields, goal, kpi) {
    const { errors, categories, audiences, ...fields } = formFields;

    return Object.entries(fields).map(([key, value]) => {
      return (
        <div className="col col-6">
          <div className={`form-group ${key}`} key={key}>
            <label key={key}>{showLabel(key)}</label>
            {this.showInput(key, value, errors, goal, kpi)}
          </div>
        </div>
      );
    });
  }

  setAudienceState = (data) => {
    event.preventDefault();

    this.setState({ audiences: data });
  };

  render() {
    const { company, is_client, goal_options, kpi_options } = this.props;

    return (
      <div className="container-fluid campaigns">
        <div className="row">
          <div className="col col-12">
            <h1 className="h5 mb-4">Create Campaign</h1>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col col-12">
                    <p className="light-text">
                      Please enter the details of your new campaign
                    </p>
                  </div>
                </div>
                <form>
                  <div className="row">
                    {this.showCampaignForm(
                      this.state,
                      goal_options,
                      kpi_options
                    )}
                    <AudienceFields
                      audiences={this.props}
                      audienceState={this.state.audiences}
                      setAudienceState={this.setAudienceState}
                    />

                    <CreateCampaign
                      company={company}
                      isClient={is_client}
                      stateProps={this.state}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
