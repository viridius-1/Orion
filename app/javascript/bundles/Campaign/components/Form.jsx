import React, { Component } from "react";
import axios from "axios";

import QuestionsAnswers from "./QuestionsAnswers";
import CampaignModal from "./CampaignModal";

export default class Form extends Component {
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
      income: "",
      data_providers: "",
      isOpen: false,
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

  resetDataProvider = () => {
    this.setState({ audiences: [] });
  };

  setSelectedAudiences = (values) => {
    event.preventDefault();

    this.setState({
      selectedAudiences: values,
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

  redirectTo = () => {
    const { currentCompany } = this.props;
    const url = `/agencies/${currentCompany.agency_id}/clients/${currentCompany.id}/campaigns`;

    window.location.assign(url);
  };

  handleDateNumSelect = (key, event) => {
    this.setState({ [key]: event });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { currentCompany } = this.props;
    const postUrl = `/agencies/${currentCompany.agency_id}/clients/${currentCompany.id}/campaigns`;

    const {
      errors,
      selectedAudiences,
      name,
      url,
      flight_start_date,
      flight_end_date,
      goal,
      kpi,
      cpa_goal,
      roas_goal,
      budget,
      geography,
    } = this.state;

    let request_type = event.target.value;

    axios.post(postUrl, {
      name,
      url,
      flight_start_date,
      flight_end_date,
      audience: selectedAudiences,
      request_type: request_type,
      agency_id: currentCompany.agency_id,
      client_id: currentCompany.id,
      advertiser_id: null,
    });

    window.location.assign(postUrl);
  };

  showModal = (event) => {
    event.preventDefault();

    this.setState({ isOpen: true });
  };

  hideModal = (event) => {
    event.preventDefault;

    this.setState({ isOpen: false });
  };

  checkState() {
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
      coversion_rate,
      aov,
      gender,
      age_range,
      education,
      parental_status,
      selectedAudiences,
      income,
      data_providers,
    } = this.state;

    const stepOne =
      this.props.currentStep == 0 && name.length > 1 && url.length > 1;
    const stepTwo =
      this.props.currentStep == 1 && goal.length > 1 && kpi.length > 1;
    const stepThree =
      (this.props.currentStep == 2 && gender["male"]) ||
      (gender["female"] && income.length > 1 && geography.length > 1);
    const stepFour =
      (this.props.currentStep == 2 && gender["male"]) ||
      (gender["female"] && income.length > 1 && geography.length > 1);

    if (
      stepOne ||
      stepTwo ||
      stepThree ||
      stepFour ||
      selectedAudiences.length >= 1
    ) {
      return false;
    } else {
      return true;
    }
  }

  continue = (event) => {
    event.preventDefault();

    this.props.nextStep();
  };

  back = (event) => {
    event.preventDefault();

    this.props.prevStep();
  };

  showStep(step) {
    return (
      <img
        src={require(`../../../../assets/images/star_step_${step + 1}.svg`)}
      />
    );
  }

  render() {
    const { currentStep, options } = this.props;
    let stateKey = Object.keys(this.state)[currentStep];

    return (
      <div className="container campaigns">
        <div className="row">
          <div className="col col-12">
            <h1 className="h3 mb-4">Campaign Setup</h1>
            <div className="card campaign-card">
              <div className="card-body d-flex flex-column campaign-card-body">
                {this.showStep(currentStep)}

                <hr className="w-100" />

                <QuestionsAnswers
                  currentStep={currentStep}
                  currentState={this.state}
                  handleDateNumSelect={this.handleDateNumSelect}
                  redirectTo={this.redirectTo}
                  handleInputChange={this.handleInputChange}
                  resetDataProvider={this.resetDataProvider}
                  setSelectedAudiences={this.setSelectedAudiences}
                  getAudiences={this.getAudiences}
                  handleInputTags={this.handleInputTags}
                  handleOnClick={this.handleOnClick}
                  handleRange={this.handleRange}
                  options={options}
                />

                <div className="row mt-5">
                  <div className="col-6 d-flex justify-content-between btn-section">
                    <div
                      className="btn-lg d-flex align-items-center justify-content-center back-btn"
                      onClick={currentStep == 0 ? this.redirectTo : this.back}
                    >
                      {currentStep == 0 ? "Cancel" : "Back"}
                    </div>
                    <button
                      className="btn-lg d-flex align-items-center justify-content-center next-btn"
                      onClick={
                        currentStep == 3 ? this.showModal : this.continue
                      }
                      disabled={this.checkState()}
                    >
                      {currentStep == 3 ? "Finish" : "Continue"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CampaignModal
          isOpen={this.state.isOpen}
          handleSubmit={this.handleSubmit}
          hideModal={this.hideModal}
        />
      </div>
    );
  }
}
