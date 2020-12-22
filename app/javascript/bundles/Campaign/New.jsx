import React, { Component, Fragment } from "react";
import NumericInput from "react-numeric-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import AudienceFields from "./components/AudienceFields";
import CreateCampaign from "./components/CreateCampaign";
import { showErrorStyles, showLabel } from "./common/";

export default class New extends Component {
  constructor(props) {
    super(props);

    const { campaign, campaign_audiences } = this.props;

    const {
      name,
      url,
      goal,
      kpi,
      cpa_goal,
      roas_goal,
      budget,
      geography,
      flight_start_date,
      flight_end_date,
    } = campaign;

    this.state = {
      name: name || "",
      url: url || "",
      goal: goal || "",
      kpi: kpi || "",
      cpa_goal: cpa_goal || "",
      roas_goal: roas_goal || "",
      budget: budget || "",
      geography: geography || "",
      flight_start_date: new Date(flight_start_date) || new Date(),
      flight_end_date: new Date(flight_end_date) || new Date(),
      audiences: campaign_audiences || [],
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

  handleDateNumSelect = (key, event) => {
    this.setState({ [key]: event });
  };

  showInput(key, value, errors, goals, kpis) {
    if (key == "cpa_goal" || key == "budget" || key == "roas_goal") {
      return (
        <NumericInput
          className={showErrorStyles(errors[key])}
          name={`${key}`}
          min={1}
          onChange={(event) => this.handleDateNumSelect(key, event)}
          value={value}
        />
      );
    } else if (key == "flight_start_date" || key == "flight_end_date") {
      return (
        <DatePicker
          className={showErrorStyles(errors[key])}
          name={`${key}`}
          onSelect={(event) => this.handleDateNumSelect(key, event)}
          selected={value}
        />
      );
    } else if (key == "goal" || key == "kpi") {
      const obj = key == "goal" ? goals : kpis;

      return (
        <select
          className={showErrorStyles(errors[key])}
          name={`${key}`}
          onSelect={this.handleInputChange}
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
          onChange={this.handleInputChange}
          value={value}
        />
      );
    }
  }

  showError(key, errors) {
    if (key == "name") {
      return (
        errors.name.length > 0 && (
          <span className="error-msg">{errors.name}</span>
        )
      );
    }
  }

  showCampaignForm(formFields, goal, kpi) {
    const { errors, audiences, ...fields } = formFields;

    return Object.entries(fields).map(([key, value]) => {
      return (
        <div className="col col-6">
          <div className={`form-group ${key}`} key={key}>
            <label key={key}>{showLabel(key)}</label>
            {this.showInput(key, value, errors, goal, kpi)}
            {this.showError(key, errors)}
          </div>
        </div>
      );
    });
  }

  setAudienceState = (data) => {
    event.preventDefault();

    this.setState({ audiences: data });
  };

  setErrorMessages = (errors) => {
    this.setState({ errors });
  };

  render() {
    const {
      page_type,
      company,
      is_client,
      goal_options,
      kpi_options,
      audiences,
      campaign,
      campaign_audiences,
    } = this.props;

    return (
      <div className="container-fluid campaigns">
        <div className="row">
          <div className="col col-12">
            <h1 className="h5 mb-4">
              {page_type == "Edit" ? "Edit Campaign" : "Create Campaign"}
            </h1>
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
                      audiences={audiences}
                      audienceState={this.state.audiences}
                      setAudienceState={this.setAudienceState}
                    />
                    <CreateCampaign
                      company={company}
                      isClient={is_client}
                      stateProps={this.state}
                      setErrorMessages={this.setErrorMessages}
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
