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
    const initialState = {};
    const campaign = this.props.campaign;
    initialState.name = campaign.name ? campaign.name : "";
    initialState.website = campaign.website ? campaign.website : "";
    initialState.start_date = campaign.start_date ? campaign.start_date : "";
    initialState.end_date = campaign.end_date ? campaign.end_date : "";
    initialState.goal = campaign.goal ? FormUtils.buildOption(campaign.goal) : null;
    initialState.kpi = campaign.kpi ? FormUtils.buildOption(campaign.kpi) : null;
    initialState.conversion_rate = campaign.conversion_rate ? campaign.conversion_rate : "";
    initialState.aov = campaign.aov ? campaign.aov : "";
    initialState.target_cpa = campaign.target_cpa ? campaign.target_cpa : "";
    initialState.target_roas = campaign.target_roas ? campaign.target_roas : "";
    initialState.budget = campaign.budget ? campaign.budget : "";
    initialState.male_selected = !!campaign.age_range_male;
    initialState.age_range_male = campaign.age_range_male ? campaign.age_range_male : [18, 99];
    initialState.female_selected = !!campaign.age_range_female;
    initialState.age_range_female = campaign.age_range_female ? campaign.age_range_female : [18, 99];
    initialState.household_income = campaign.household_income ? campaign.household_income : [50, 500];
    initialState.education = campaign.education ? FormUtils.buildOption(campaign.education) : "";
    initialState.parental_status = campaign.parental_status ? FormUtils.buildOption(campaign.parental_status) : "";
    initialState.geography = campaign.geography ? FormUtils.buildOptions(campaign.geography.split()) : "";
    initialState.geography_input = "";
    initialState.affinities = campaign.affinities ? campaign.affinities : {};
    initialState.affinities_checked = this._getAffinityKeys(initialState.affinities);

    initialState.current_step = 4;

    return initialState;
  }

  _getAffinityKeys = (object) => {
    const output = [];
    for (const key in object) {
      output.push(key);
    }
    console.log(output);
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
    let {client, campaign} = this.props;
    let path = `/agencies/${client.agency_id}/clients/${client.id}/campaigns`;


    if (!this.props.new) {
      method = 'PUT';
      path = `/agencies/${client.agency_id}/clients/${client.id}/campaigns/${campaign.id}`;
    }

    console.log(path);
    console.log(method);
    const requestOptions = {
      method,
      headers: {'Content-Type': 'application/json'},
      body: this._getSubmitBody()
    };

    console.log(requestOptions);
    fetch(path, requestOptions)
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url;
        }
      });
  };

  _getSubmitBody() {
    const submitState = this.state;
    submitState.goal = submitState.goal?.value;
    submitState.kpi = submitState.kpi?.value;
    submitState.education = submitState.education?.value;
    submitState.parental_status = submitState.parental_status?.value;
    submitState.geography = submitState.geography?.map((option) => {
      return option.value
    }).toString();


    console.log(submitState);
    const body = JSON.stringify({
      campaign: submitState,
      authenticity_token: this.props.token
    });
    return body;
  }

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
    console.log(this.state.affinities_checked);
    this.setState({affinities_checked: checked, affinities: this._getAffinities(checked)}, () => {
      console.log(this.state.affinities_checked);
      console.log(this.state.affinities);
    })
  };

  _getAffinities = (checked) => {
    const output = {};
    for (const key of checked) {
      output[key] = this.props.data_providers_key_value[key];
    }
    return output;
  };

  _getStepFragment = () => {
    switch (this.state.current_step) {
      case 1:
        return (<CampaignBasicsFormFragment validated={this.state.validated}
                                            name={this.state.name}
                                            website={this.state.website}
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
                                           aov={this.state.aov}
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