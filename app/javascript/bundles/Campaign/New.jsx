import React, { Component } from "react";

import CampaignBasic from "./components/CampaignBasic";
import CampaignGoal from "./components/CampaignGoal";
import CampaignAudience from "./components/CampaignAudience";

export default class New extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      name: "",
      url: "",
      goal: "",
      kpi: "",
      cpa_goal: "",
      roas_goal: "",
      budget: "",
      geography: [],
      flight_start_date: null,
      flight_end_date: null,
      audiences: [],
      coversion_rate: "",
      aov: "",
      gender: { male: false, female: false },
      age_range: [18, 99],
      education: "",
      parental_status: "",
      data_providers: "",
      income: [50, 500],
      errors: {
        name: "",
        url: "",
        goal: "",
        kpi: "",
        cpa_goal: "",
        roas_goal: "",
        budget: "",
        geography: "",
        flight_start_date: "null",
        flight_end_date: "null",
        audiences: "",
        coversion_rate: "",
        aov: "",
        gender: "",
        age_range: "",
        education: "",
        parental_status: "",
        data_providers: "",
      },
    };
  }

  handleInputTags = (tags, key) => {
    this.setState({ [key]: tags });
  };

  handleOnClick = (key, data, option) => {
    this.setState({
      [key]: { ...this.state.gender, [data]: option ? false : true },
    });
  };

  handleRange = (event, range) => {
    event.preventDefault();
    let key = event.target.parentElement.ariaLabel;

    this.setState({ [key]: range });
  };

  handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    let errors = this.state.errors;

    this.setState({ errors, [name]: value });
  };

  nextStep = () => {
    const { step } = this.state;

    this.setState({
      step: step + 1,
    });
  };

  prevStep = () => {
    const { step } = this.state;

    this.setState({
      step: step - 1,
    });
  };

  redirectTo = () => {
    const { company } = this.props;
    const url = `/agencies/${company.agency_id}/clients/${company.id}/campaigns`;

    window.location.assign(url);
  };

  handleDateNumSelect = (key, event) => {
    this.setState({ [key]: event });
  };

  handleCreationFlow(state) {
    const { step, data_providers, ...fields } = this.state;

    const {
      errors,
      name,
      url,
      flight_start_date,
      flight_end_date,
      goal,
      kpi,
      cpa_goal,
      roas_goal,
      budget,
      coversion_rate,
      aov,
      gender,
      age_range,
      income,
      education,
      parental_status,
      geography,
    } = fields;

    const {
      goal_options,
      kpi_options,
      education_options,
      parental_options,
    } = this.props;

    if (step == 0) {
      return (
        <CampaignBasic
          fields={{ errors, name, url, flight_start_date, flight_end_date }}
          handleDateNumSelect={this.handleDateNumSelect}
          handleInputChange={this.handleInputChange}
        />
      );
    } else if (step == 1) {
      return (
        <CampaignGoal
          fields={{
            errors,
            goal,
            kpi,
            cpa_goal,
            roas_goal,
            budget,
            coversion_rate,
            aov,
          }}
          goalOptions={goal_options}
          kpiOptions={kpi_options}
          handleInputChange={this.handleInputChange}
        />
      );
    } else if (step == 2) {
      return (
        <CampaignAudience
          fields={{
            errors,
            gender,
            age_range,
            income,
            education,
            parental_status,
            geography,
          }}
          educationOptions={education_options}
          parentOptions={parental_options}
          genderOptions={gender}
          handleInputChange={this.handleInputChange}
          handleRange={this.handleRange}
          handleOnClick={this.handleOnClick}
          handleInputTags={this.handleInputTags}
        />
      );
    } else {
      return (
        <DataProvider dataProviders={data_providers} prevStep={this.prevStep} />
      );
    }
  }

  render() {
    const { page_type } = this.props;
    const { step } = this.state;

    return (
      <div className="container campaigns">
        <div className="row">
          <div className="col col-12">
            <h1 className="h3 mb-4">
              {page_type == "Edit" ? "Edit Campaign" : "Campaign Setup"}
            </h1>
            <div className="card campaign-card">
              <div className="card-body d-flex flex-column campaign-card-body">
                {/* Render step comp here */}

                <hr></hr>

                {this.handleCreationFlow(this.state)}

                <div className="row mt-5">
                  <div className="col-6 d-flex justify-content-between btn-section">
                    <div
                      className="btn-lg d-flex align-items-center justify-content-center back-btn"
                      onClick={step == 0 ? this.redirectTo : this.prevStep}
                    >
                      {step == 0 ? "Cancel" : "Back"}
                    </div>
                    <div
                      className="btn-lg d-flex align-items-center justify-content-center next-btn"
                      onClick={this.nextStep}
                    >
                      Continue to Goal
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
