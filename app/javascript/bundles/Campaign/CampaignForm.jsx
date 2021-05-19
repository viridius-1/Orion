import React, {Component} from "react";
import Step from "./components/Step";
import CampaignBasicsFormFragment from './components/CampaignBasicsFormFragment'
import CampaignGoalsFormFragment from "./components/CampaignGoalsFormFragment";
import FormUtils from "../../common/FormUtils";
import CampaignAudienceFormFragment from "./components/CampaignAudienceFormFragment";
import CampaignAffinitiesFormFragment from "./components/CampaignAffinitiesFormFragment";

export default class CampaignForm extends Component {
  constructor(props) {
    super(props);
    this.state = this._initialState();
  }

  _initialState() {
    const {
      name,
      campaign_url,
      start_date,
      end_date,
      goal,
      kpi,
      conversion_rate,
      average_order_value,
      target_cpa,
      target_roas,
      budget,
      age_range_male,
      age_range_female,
      household_income,
      education,
      parental_status,
      geography,
      affinities
    } = this.props.campaign;

    const initialState = {
      name: name ? name : "",
      campaign_url: campaign_url ? campaign_url : "",
      start_date: start_date ? start_date : "",
      end_date: end_date ? end_date : "",
      goal: goal ? FormUtils.buildOption(goal) : null,
      kpi: kpi ? FormUtils.buildOption(kpi) : null,
      conversion_rate: conversion_rate ? conversion_rate : "",
      average_order_value: average_order_value ? average_order_value : "",
      target_cpa: target_cpa ? target_cpa : "",
      target_roas: target_roas ? target_roas : "",
      budget: budget ? budget : "",
      male_selected: !!age_range_male,
      age_range_male: age_range_male ? age_range_male : [18, 99],
      female_selected: !!age_range_female,
      age_range_female: age_range_female ? age_range_female : [18, 99],
      household_income: household_income ? household_income : [50, 500],
      education: education ? FormUtils.buildOption(education) : null,
      parental_status: parental_status ? FormUtils.buildOption(parental_status) : null,
      geography: geography ? FormUtils.buildOptions(geography) : [],
      geography_input: "",
      affinities: affinities ? affinities : {},
    };

    initialState.affinities_checked = this._getAffinityKeys(initialState.affinities);

    initialState.current_step = 1;

    return initialState;
  }

  _getAffinityKeys = (object) => {
    const output = [];
    for (const key in object) {
      output.push(key);
    }
    return output;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      this.setState({validated: true});
    } else if (this.state.current_step < 4) {
      this.setState({
        current_step: this.state.current_step + 1,
        validated: false
      });
    } else {
      this._submitForm(event);
    }
  };

  _submitForm = (event) => {
    let method = 'POST';
    let {advertiser, campaign} = this.props;
    let path = `/advertisers/${advertiser.id}/campaigns`;


    if (!this.props.new) {
      method = 'PUT';
      path = `/advertisers/${advertiser.id}/campaigns/${campaign.id}`
    }

    const requestOptions = {
      method,
      headers: {'Content-Type': 'application/json'},
      body: this._getSubmitBody(event)
    };

    fetch(path, requestOptions)
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url;
        }
      });
  };

  _getSubmitBody = (event) => {
    const {
      male_selected,
      age_range_male,
      female_selected,
      age_range_female,
      goal,
      kpi,
      education,
      parental_status,
      geography
    } = this.state;

    const submitState = {
      ...this.state,
      age_range_male: male_selected ? age_range_male : null,
      age_range_female: female_selected ? age_range_female : null,
      goal: goal?.value,
      kpi: kpi?.value,
      education: education?.value,
      parental_status: parental_status?.value,
      geography: geography?.map(option => option.value)
    };

    const body = JSON.stringify({
      campaign: submitState,
      request_type: event.target.value,
      authenticity_token: this.props.token
    });
    return body;
  };

  handleCancel = event => {
    event.preventDefault();
    if (this.state.current_step === 1) {
      window.history.back();
    } else {
      this.setState({
        current_step: this.state.current_step - 1
      });
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => {
      console.log(this.state);
    });
  };

  handleSelectChange = (selectedOption, {name}) => {
    this.setState({[name]: selectedOption});
  };

  handleCreatableSelectInputChange = (value, {name}) => {
    this.setState({
      [name]: value
    });
  };

  handleCreatableSelectKeyDown = (event, name, name_input) => {
    switch (event.key) {
      case 'Enter':
      case 'Tab':

        this.setState({
          [name]: [...this.state[name], FormUtils.buildOption(this.state[name_input])],
          [name_input]: ''
        });
        event.preventDefault();
    }
  };

  handleRangeChange = (event, range, name) => {
    event.preventDefault();
    this.setState({[name]: range});
  };

  onSelectButtonPressed = (event) => {
    event.preventDefault();

    this.setState({
      [event.target.name]: !this.state[event.target.name]
    });
  };

  onAffinityChecked = (checked) => {
    console.log(checked);
    this.setState({
      affinities_checked: checked,
      affinities: this._getAffinities(checked)
    });
  };

  onCloseAffinity = (key) => {
    const checked = this.state.affinities_checked;
    const index = checked.indexOf(key);
    if (index !== -1) {
      checked.splice(index, 1);
    }
    this.onAffinityChecked(checked);
  };

  _getAffinities = (checked) => {
    const output = {};
    for (const key of checked) {
      console.log(key);
      output[key] = this.props.data_providers_key_value[key];
    }
    console.log(output);
    return output;
  };

  _getStepFragment = () => {
    switch (this.state.current_step) {
      case 1:
        return (<CampaignBasicsFormFragment validated={this.state.validated}
                                            name={this.state.name}
                                            campaign_url={this.state.campaign_url}
                                            start_date={this.state.start_date}
                                            end_date={this.state.end_date}
                                            handleCancel={this.handleCancel}
                                            handleSubmit={this.handleSubmit}
                                            handleChange={this.handleChange}
        />);
      case 2:
        return (<CampaignGoalsFormFragment validated={this.state.validated}
                                           goal={this.state.goal}
                                           kpi={this.state.kpi}
                                           options={this.props.options}
                                           conversion_rate={this.state.conversion_rate}
                                           average_order_value={this.state.average_order_value}
                                           target_cpa={this.state.target_cpa}
                                           target_roas={this.state.target_roas}
                                           budget={this.state.budget}
                                           handleCancel={this.handleCancel}
                                           handleSubmit={this.handleSubmit}
                                           handleChange={this.handleChange}
                                           handleSelectChange={this.handleSelectChange}

        />);
      case 3:
        return (<CampaignAudienceFormFragment validated={this.state.validated}
                                              options={this.props.options}
                                              male_selected={this.state.male_selected}
                                              female_selected={this.state.female_selected}
                                              age_range_male={this.state.age_range_male}
                                              age_range_female={this.state.age_range_female}
                                              household_income={this.state.household_income}
                                              education={this.state.education}
                                              parental_status={this.state.parental_status}
                                              geography={this.state.geography}
                                              geography_input={this.state.geography_input}
                                              handleCancel={this.handleCancel}
                                              handleSubmit={this.handleSubmit}
                                              handleSelectChange={this.handleSelectChange}
                                              handleRangeChange={this.handleRangeChange}
                                              onSelectButtonPressed={this.onSelectButtonPressed}
                                              handleCreatableSelectKeyDown={this.handleCreatableSelectKeyDown}
                                              handleCreatableSelectInputChange={this.handleCreatableSelectInputChange}

        />);
        ;
      case 4:
        return (<CampaignAffinitiesFormFragment data_providers={this.props.data_providers}
                                                affinities={this.state.affinities}
                                                affinities_checked={this.state.affinities_checked}
                                                onAffinityChecked={this.onAffinityChecked}
                                                handleCancel={this.handleCancel}
                                                handleSubmit={this.handleSubmit}
                                                onCloseAffinity={this.onCloseAffinity}
        />);
    }
  };

  render() {
    return (
      <div className="form-v2">
        <Step step={this.state.current_step}/>
        <hr className="w-100"/>
        {this._getStepFragment()}
      </div>
    );
  }
}