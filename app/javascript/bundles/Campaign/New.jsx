import React, { Component } from "react";
import axios from "axios";

import CampaignBasic from "./components/CampaignBasic";
import CampaignGoal from "./components/CampaignGoal";
import CampaignAudience from "./components/CampaignAudience";
import DataProvider from "./components/DataProvider";

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
      coversion_rate: "",
      aov: "",
      gender: { male: false, female: false },
      age_range: [18, 99],
      education: "",
      parental_status: "",
      audiences: [],
      selectedAudiences: [],
      income: [50, 500],
      data_providers: "",
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
        coversion_rate: "",
        aov: "",
        gender: "",
        age_range: "",
        education: "",
        parental_status: "",
        data_providers: "",
        audiences: "",
      },
    };
  }

  resetAudiences = () => {
    this.setState({ audiences: [] });
  };

  setSelectedAudiences = (values) => {
    event.preventDefault();
    let selectedAudiences = this.state.selectedAudiences;

    this.setState({
      selectedAudiences: selectedAudiences.concat([
        { [values.label]: values.key },
      ]),
    });
  };

  getAudiences = (key, value) => {
    axios.get(`/audiences/${value}`).then((response) => {
      const { audiences, status } = response.data;
      let audienceState = this.state.audiences;

      if (key == "data_provider" && status == 200) {
        this.setState({ data_provider: value, audiences: audiences });
      } else if (key == "audience" && status == 200) {
        return audiences;
      } else {
        return 400;
      }
    });
  };

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

  handleSubmit = () => {
    const { company } = this.props;
    const url = `/agencies/${company.agency_id}/clients/${company.id}/campaigns`;
    const { errors, audiences, ...campaign } = this.state;

    axios.post(url, { campaign });

    window.location.assign(url);
  };

  handleDateNumSelect = (key, event) => {
    this.setState({ [key]: event });
  };

  handleCreationFlow(state) {
    const { step, ...fields } = this.state;

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
      audiences,
      data_providers,
      selectedAudiences,
    } = fields;

    const {
      goal_options,
      kpi_options,
      education_options,
      parental_options,
      data_provider_options,
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
        <DataProvider
          fields={{ errors, data_providers, audiences }}
          selectedAudiences={selectedAudiences}
          dataProviderOptions={data_provider_options}
          getAudiences={this.getAudiences}
          resetAudiences={this.resetAudiences}
          setSelectedAudiences={this.setSelectedAudiences}
        />
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
                      onClick={step == 3 ? this.handleSubmit : this.nextStep}
                    >
                      {step == 3 ? "Finish" : "Continue"}
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
