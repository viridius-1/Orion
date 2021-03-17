import React, { Component, Fragment } from "react";

import CampaignBasic from "./CampaignBasic";
import CampaignGoal from "./CampaignGoal";
import CampaignAudience from "./CampaignAudience";
import DataProvider from "./DataProvider";

export default class QuestionsAnswers extends Component {
  handleCreationFlow() {
    const {
      currentStep,
      currentState,
      handleDateNumSelect,
      redirectTo,
      handleInputChange,
      resetDataProvider,
      handleInputTags,
      handleOnClick,
      handleRange,
      options,
      getAudiences,
      setSelectedAudiences,
    } = this.props;

    const {
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
    } = currentState;

    const {
      goal_options,
      kpi_options,
      education_options,
      parental_options,
      data_provider_options,
      income_options,
    } = options;

    if (currentStep == 0) {
      return (
        <CampaignBasic
          fields={{ name, url, flight_start_date, flight_end_date }}
          handleDateNumSelect={handleDateNumSelect}
          handleInputChange={handleInputChange}
        />
      );
    } else if (currentStep == 1) {
      return (
        <CampaignGoal
          fields={{
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
          handleInputChange={handleInputChange}
        />
      );
    } else if (currentStep == 2) {
      return (
        <CampaignAudience
          fields={{
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
          incomeOptions={income_options}
          handleInputChange={handleInputChange}
          handleRange={handleRange}
          handleOnClick={handleOnClick}
          handleInputTags={handleInputTags}
        />
      );
    } else {
      return (
        <DataProvider
          fields={{ data_providers, audiences }}
          selectedAudiences={selectedAudiences}
          dataProviderOptions={data_provider_options}
          resetDataProvider={resetDataProvider}
          getAudiences={getAudiences}
          setSelectedAudiences={setSelectedAudiences}
          handleInputTags={handleInputTags}
        />
      );
    }
  }

  render() {
    return this.handleCreationFlow();
  }
}
