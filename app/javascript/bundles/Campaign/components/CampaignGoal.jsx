import React, { Component, Fragment } from "react";

import { showErrorStyles } from "../common/";

export default class CampaignGoal extends Component {
  showInput(key, value, errors, rest) {
    const { handleInputChange, goalOptions, kpiOptions } = rest;

    let keyNames = {
      goal: "Overall Goal",
      kpi: "KPI",
      cpa_goal: "Target CPA ($)",
      roas_goal: "Target ROAS",
      budget: "Budget ($)",
      coversion_rate: "Conversion Rate (%)",
      aov: "AOV ($)",
    };

    if (key == "goal" || key == "kpi") {
      let keyObj = { goal: goalOptions, kpi: kpiOptions };

      return (
        <select
          className={`basic-input form-control`}
          name={key}
          value={value}
          onChange={(event) => handleInputChange(event)}
        >
          <option value="" disabled>
            {keyNames[key]}
          </option>
          {Object.values(keyObj[key]).map((option) => {
            return (
              <option name={key} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      );
    } else {
      return (
        <input
          className={`basic-input form-control`}
          name={`${key}`}
          onChange={(event) => handleInputChange(event)}
          value={value}
          placeholder={keyNames[key]}
        />
      );
    }
  }

  render() {
    const { fields, ...rest } = this.props;
    const { errors, ...formFields } = fields;

    return (
      <Fragment>
        <h5 className="mb-4">Campaign Goal</h5>

        <div className="row d-flex flex-column">
          {Object.entries(formFields).map(([key, value]) => {
            return (
              <div className="col-6 mb-4">
                {this.showInput(key, value, errors, rest)}
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  }
}
