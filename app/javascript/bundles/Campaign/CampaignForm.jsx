import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from './components/Step';
import CampaignBasicsFormFragment from './components/CampaignBasicsFormFragment';
import CampaignGoalsFormFragment from './components/CampaignGoalsFormFragment';
import FormUtils from '../../common/FormUtils';
import CampaignAudienceFormFragment from './components/CampaignAudienceFormFragment';
import CampaignAffinitiesFormFragment from './components/CampaignAffinitiesFormFragment';

function getAffinityKeys(object) {
  const output = [];

  /* eslint-disable-next-line */
  for (const key in object) {
    output.push(key);
  }
  return output;
}

export default class CampaignForm extends Component {
  constructor(props) {
    super(props);
    this.state = this._initialState();
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { current_step: currentStep } = this.state;
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      this.setState({ validated: true });
    } else if (currentStep < 4) {
      this.setState({
        current_step: currentStep + 1,
        validated: false,
      });
    } else {
      this._submitForm(event);
    }
  }

  handleCancel = (event) => {
    event.preventDefault();

    const { current_step: currentStep } = this.state;
    if (currentStep === 1) {
      window.history.back();
    } else {
      this.setState({
        current_step: currentStep - 1,
      });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSelectChange = (selectedOption, { name }) => {
    this.setState({ [name]: selectedOption });
  }

  handleSwitchChange = (switchOption, { name }) => {
    var result = !this.state[name];

    this.setState({ [name]: result });
  }

  handleCreatableSelectInputChange = (value, { name }) => {
    this.setState({
      [name]: value,
    });
  }

  handleCreatableSelectKeyDown = (event, name, nameInput) => {
    switch (event.key) {
      case 'Enter':
      case 'Tab':

        this.setState((prevState) => ({
          [name]: [...prevState[name], FormUtils.buildOption(prevState[nameInput])],
          [nameInput]: '',
        }));
        event.preventDefault();
        break;
      default:
    }
  }

  handleRangeChange = (event, range, name) => {
    event.preventDefault();
    this.setState({ [name]: range });
  }

  onSelectButtonPressed = (event) => {
    event.preventDefault();

    this.setState((prevState) => ({
      [event.target.name]: !prevState[event.target.name],
    }));
  }

  onAffinityChecked = (checked) => {
    this.setState({
      affinities: this._getAffinities(checked),
      affinities_checked: checked,
    });
  }

  onCloseAffinity = (key) => {
    const { affinities_checked: affinitiesChecked } = this.state;

    const checked = affinitiesChecked;
    const index = checked.indexOf(key);
    if (index !== -1) {
      checked.splice(index, 1);
    }
    this.onAffinityChecked(checked);
  }

  _getSubmitBody(event) {
    const {
      male_selected: maleSelected,
      age_range_male: ageRangeMale,
      female_selected: femaleSelected,
      age_range_female: ageRangeFemale,
      goal,
      kpi,
      geography,
      geo_fence
    } = this.state;

    const { token } = this.props;

    const submitState = {
      ...this.state,
      age_range_female: femaleSelected ? ageRangeFemale : null,
      age_range_male: maleSelected ? ageRangeMale : null,
      geography: geography?.map((option) => option.value),
      geo_fence: geo_fence?.map((option) => option.value),
      goal: goal?.value,
      kpi: kpi?.value,
    };

    const body = JSON.stringify({
      authenticity_token: token,
      campaign: submitState,
      request_type: event.target.value,
    });
    return body;
  }

  _submitForm(event) {
    let method = 'POST';
    const {
      advertiser: {
        id: advertiserId,
      },
      campaign: {
        id: campaignId,
      },
      new: isNew,
    } = this.props;
    let path = `/vendors/${advertiserId}/campaigns`;

    if (!isNew) {
      method = 'PUT';
      path = `/vendors/${advertiserId}/campaigns/${campaignId}`;
    }

    const requestOptions = {
      body: this._getSubmitBody(event),
      headers: { 'Content-Type': 'application/json' },
      method,
    };

    fetch(path, requestOptions)
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url;
        }
      });
  }

  _initialState() {
    const {
      campaign: {
        name,
        campaign_url: campaignUrl,
        start_date: startDate,
        end_date: endDate,
        goal,
        kpi,
        conversion_rate: conversionRate,
        average_order_value: averageOrderValue,
        target_cpa: targetCpa,
        target_roas: targetRoas,
        budget,
        pixel_notes,
        age_range_male: ageRangeMale,
        age_range_female: ageRangeFemale,
        household_income: householdIncome,
        geography,
        geo_fence,
        footfall_analysis: footfallAnalysis,
        crm_data: crmData,
        contextual_targeting: contextualTargeting,
        brand_safety: brandSafety,
        targeting_notes: targetingNotes,
        affinities,
      },
    } = this.props;

    const initialState = {
      affinities: affinities || {},
      age_range_female: ageRangeFemale || [18, 99],
      age_range_male: ageRangeMale || [18, 99],
      average_order_value: averageOrderValue || '',
      budget: budget || '',
      pixel_notes: pixel_notes || '',
      campaign_url: campaignUrl || 'https://',
      conversion_rate: conversionRate || '',
      end_date: endDate || '',
      female_selected: !!ageRangeFemale,
      geography: geography ? FormUtils.buildOptions(geography) : [],
      geography_input: '',
      geo_fence: geo_fence ? FormUtils.buildOptions(geo_fence) : [],
      geo_fence_input: '',
      footfall_analysis: footfallAnalysis,
      crm_data: crmData,
      contextual_targeting: contextualTargeting,
      brand_safety: brandSafety,
      targeting_notes: targetingNotes,
      goal: goal ? FormUtils.buildOption(goal) : null,
      household_income: householdIncome || [50, 500],
      kpi: kpi ? FormUtils.buildOption(kpi) : null,
      male_selected: !!ageRangeMale,
      name: name || '',
      start_date: startDate || '',
      target_cpa: targetCpa || '',
      target_roas: targetRoas || '',
    };

    initialState.affinities_checked = getAffinityKeys(initialState.affinities);

    initialState.current_step = 1;

    return initialState;
  }

  _getAffinities(checked) {
    const { data_providers_key_value: dataProvidersKeyValue } = this.props;

    const output = {};

    /* eslint-disable-next-line */
    for (const key of checked) {
      output[key] = dataProvidersKeyValue[key];
    }
    return output;
  }

  _getStepFragment() {
    const {
      data_providers: dataProviders,
      options,
    } = this.props;

    const {
      affinities,
      affinities_checked: affinitiesChecked,
      age_range_female: ageRangeFemale,
      age_range_male: ageRangeMale,
      average_order_value: averageOrderValue,
      budget,
      pixel_notes,
      campaign_url: campaignUrl,
      conversion_rate: conversionRate,
      current_step: currentStep,
      end_date: endDate,
      female_selected: femaleSelected,
      geography,
      geography_input: geographyInput,
      geo_fence,
      geo_fence_input: geoFenceInput,
      footfall_analysis: footfallAnalysis,
      crm_data: crmData,
      contextual_targeting: contextualTargeting,
      brand_safety: brandSafety,
      targeting_notes: targetingNotes,
      goal,
      household_income: householdIncome,
      kpi,
      male_selected: maleSelected,
      name,
      start_date: startDate,
      target_cpa: targetCpa,
      target_roas: targetRoas,
      validated,
    } = this.state;

    switch (currentStep) {
      case 1:
        return (
          <CampaignBasicsFormFragment
            validated={validated}
            name={name}
            campaign_url={campaignUrl}
            start_date={startDate}
            end_date={endDate}
            handleCancel={this.handleCancel}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        );
      case 2:
        return (
          <CampaignGoalsFormFragment
            validated={validated}
            goal={goal}
            kpi={kpi}
            options={options}
            conversion_rate={conversionRate}
            average_order_value={averageOrderValue}
            target_cpa={targetCpa}
            target_roas={targetRoas}
            budget={budget}
            pixel_notes={pixel_notes}
            handleCancel={this.handleCancel}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            handleSelectChange={this.handleSelectChange}
          />
        );
      case 3:
        return (
          <CampaignAudienceFormFragment
            validated={validated}
            options={options}
            male_selected={maleSelected}
            female_selected={femaleSelected}
            age_range_male={ageRangeMale}
            age_range_female={ageRangeFemale}
            household_income={householdIncome}
            geography={geography}
            geography_input={geographyInput}
            geo_fence={geo_fence}
            geo_fence_input={geoFenceInput}
            footfall_analysis={footfallAnalysis}
            crm_data={crmData}
            contextual_targeting={contextualTargeting}
            brand_safety={brandSafety}
            targeting_notes={targetingNotes}
            handleCancel={this.handleCancel}
            handleSubmit={this.handleSubmit}
            handleSelectChange={this.handleSelectChange}
            handleRangeChange={this.handleRangeChange}
            onSelectButtonPressed={this.onSelectButtonPressed}
            handleCreatableSelectKeyDown={this.handleCreatableSelectKeyDown}
            handleCreatableSelectInputChange={this.handleCreatableSelectInputChange}
            handleSwitchChange={this.handleSwitchChange}
            handleChange={this.handleChange}
          />
        );

      case 4:
        return (
          <CampaignAffinitiesFormFragment
            data_providers={dataProviders}
            affinities={affinities}
            affinities_checked={affinitiesChecked}
            onAffinityChecked={this.onAffinityChecked}
            handleCancel={this.handleCancel}
            handleSubmit={this.handleSubmit}
            onCloseAffinity={this.onCloseAffinity}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const { current_step: currentStep } = this.state;

    return (
      <div className="form-v2">
        <Step step={currentStep} />
        <hr className="w-100" />
        {this._getStepFragment()}
      </div>
    );
  }
}

CampaignForm.propTypes = {
  advertiser: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  campaign: PropTypes.shape({
    affinities: PropTypes.objectOf(PropTypes.object),
    age_range_female: PropTypes.arrayOf(PropTypes.number),
    age_range_male: PropTypes.arrayOf(PropTypes.number),
    average_order_value: PropTypes.number,
    budget: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    campaign_url: PropTypes.string,
    conversion_rate: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    end_date: PropTypes.string,
    geography: PropTypes.arrayOf(PropTypes.string),
    geo_fence: PropTypes.arrayOf(PropTypes.string),
    footfall_analysis: PropTypes.bool,
    crm_data: PropTypes.bool,
    contextual_targeting: PropTypes.bool,
    brand_safety: PropTypes.bool,
    targeting_notes: PropTypes.string,
    goal: PropTypes.string,
    household_income: PropTypes.arrayOf(PropTypes.number),
    id: PropTypes.number,
    kpi: PropTypes.string,
    name: PropTypes.string,
    start_date: PropTypes.string,
    status: PropTypes.string,
    target_cpa: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    target_roas: PropTypes.number,
    pixel_notes: PropTypes.string,
  }).isRequired,
  data_providers: PropTypes.arrayOf(PropTypes.object).isRequired,
  data_providers_key_value: PropTypes.objectOf(PropTypes.object).isRequired,
  new: PropTypes.bool.isRequired,
  options: PropTypes.shape({
    goal_options: PropTypes.arrayOf(PropTypes.string),
    kpi_options: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  token: PropTypes.string.isRequired
};
