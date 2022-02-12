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

    this._submitForm(event);
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

  handleSwitchChange = (_switchOption, { name }) => {
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
      advertiser_id: advertiserId,
      campaign_type: campaignType,
      male_selected: maleSelected,
      age_range_male: ageRangeMale,
      female_selected: femaleSelected,
      age_range_female: ageRangeFemale,
      geo_fence: geoFence,
      goal,
      kpi,
      geography,
      campaign: {
        objectives: objectives
      }
    } = this.state;

    const { token } = this.props;

    const submitState = {
      ...this.state,
      age_range_female: femaleSelected ? ageRangeFemale : null,
      age_range_male: maleSelected ? ageRangeMale : null,
      campaign_type: campaignType?.value,
      geography: geography?.map((option) => option.value),
      geo_fence: geoFence?.map((option) => option.value),
      goal: goal?.value,
      kpi: kpi?.value,
      advertiser_id: advertiserId?.value,
      objectives_attributes: objectives
    };

    const body = JSON.stringify({
      authenticity_token: token,
      campaign: submitState,
      request_type: event.target.value,
    });
    return body;
  }

  _submitForm(event) {
    const {
      campaign: {
        id: campaignId
      }
    } = this.state;

    const requestOptions = {
      body: this._getSubmitBody(event),
      headers: { 'Content-Type': 'application/json' },
      method: campaignId ? 'PUT' : 'POST',
    };

    const { current_step: currentStep } = this.state;
    const saveCampaignUrl = campaignId ? `/campaigns/${campaignId}?step=${currentStep}` : '/campaigns'

    fetch(saveCampaignUrl, requestOptions)
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url;
        } else if (response.ok){
          response.json().then((data) => {
            this.setState({
              campaign: data,
              current_step: currentStep + 1,
              errors: {}
            });
          });
        } else {
          response.json().then((data) => {
            this.setState({campaign: data})
          });
        }
      });
  }

  _initialState() {
    const {
      campaign,
      campaign: {
        id: id,
        advertiser_id: advertiserId,
        name,
        campaign_type: campaignType,
        campaign_url: campaignUrl,
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
        objectives
      },
      options: {
        advertiser_options: advertiserOptions,
        campaign_type_options: campaignTypeOptions
      },
      hide_advertiser: hideAdvertiser,
      current_step: currentStep
    } = this.props;

    const initialState = {
      campaign: campaign,
      advertiser_id: FormUtils.buildEnumOption(advertiserId, advertiserOptions),
      hide_advertiser: hideAdvertiser || false,
      affinities: affinities || {},
      age_range_female: ageRangeFemale || [18, 99],
      age_range_male: ageRangeMale || [18, 99],
      average_order_value: averageOrderValue || '',
      budget: budget || '',
      pixel_notes: pixel_notes || '',
      campaign_url: campaignUrl || 'https://',
      campaign_type: FormUtils.buildEnumOption(campaignType, campaignTypeOptions),
      conversion_rate: conversionRate || '',
      female_selected: !!ageRangeFemale,
      geography: geography ? FormUtils.buildOptions(geography) : [],
      geography_input: '',
      geo_fence: geo_fence ? FormUtils.buildOptions(geo_fence) : [],
      geo_fence_input: '',
      footfall_analysis: footfallAnalysis,
      crm_data: crmData,
      contextual_targeting: contextualTargeting,
      brand_safety: brandSafety,
      targeting_notes: targetingNotes || '',
      goal: goal ? FormUtils.buildOption(goal) : null,
      household_income: householdIncome || [50, 500],
      kpi: kpi ? FormUtils.buildOption(kpi) : null,
      male_selected: !!ageRangeMale,
      name: name || '',
      target_cpa: targetCpa || '',
      target_roas: targetRoas || '',
      current_step: currentStep || 1
    };

    initialState.affinities_checked = getAffinityKeys(initialState.affinities);

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
      advertiser_id: advertiserId,
      hide_advertiser: hideAdvertiser,
      affinities_checked: affinitiesChecked,
      age_range_female: ageRangeFemale,
      age_range_male: ageRangeMale,
      average_order_value: averageOrderValue,
      budget,
      pixel_notes,
      campaign_type: campaignType,
      campaign_url: campaignUrl,
      conversion_rate: conversionRate,
      current_step: currentStep,
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
      target_cpa: targetCpa,
      target_roas: targetRoas,
      validated,
      campaign: {
        objectives: objectives,
        errors: errors
      }
    } = this.state;

    switch (currentStep) {
      case 1:
        return (
          <CampaignBasicsFormFragment
            errors={errors || {}}
            advertiser_id={advertiserId}
            campaign_type={campaignType}
            hide_advertiser={hideAdvertiser}
            options={options}
            name={name}
            campaign_url={campaignUrl}
            handleSelectChange={this.handleSelectChange}
            handleCancel={this.handleCancel}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        );
      case 2:
        return (
          <CampaignGoalsFormFragment
            errors={errors}
            options={options}
            objectives={objectives}
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
  campaign: PropTypes.shape({
    objectives: PropTypes.arrayOf(PropTypes.object),
    advertiser_id: PropTypes.number,
    affinities: PropTypes.objectOf(PropTypes.object),
    age_range_female: PropTypes.arrayOf(PropTypes.number),
    age_range_male: PropTypes.arrayOf(PropTypes.number),
    average_order_value: PropTypes.number,
    budget: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    campaign_type: PropTypes.string,
    campaign_url: PropTypes.string,
    conversion_rate: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
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
    status: PropTypes.string,
    target_cpa: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    target_roas: PropTypes.number,
    pixel_notes: PropTypes.string,
  }).isRequired,
  current_step: PropTypes.number,
  hide_advertiser: PropTypes.bool,
  data_providers: PropTypes.arrayOf(PropTypes.object).isRequired,
  data_providers_key_value: PropTypes.objectOf(PropTypes.object).isRequired,
  options: PropTypes.shape({
    campaign_type_options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })),
    goal_options: PropTypes.arrayOf(PropTypes.string),
    kpi_options: PropTypes.arrayOf(PropTypes.string),
    media_channel_options: PropTypes.arrayOf(PropTypes.string),
    advertiser_options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number
    }))
  }).isRequired,
  token: PropTypes.string.isRequired,
};
