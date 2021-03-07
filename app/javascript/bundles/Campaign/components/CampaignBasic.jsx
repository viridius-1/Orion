import React, { Component, Fragment } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { showErrorStyles } from "../common/";

export default class CampaignBasic extends Component {
  showInput(key, value, errors, handleDateNumSelect, handleInputChange) {
    let keyNames = {
      name: "Campaign Name",
      url: "Campaign URL",
      flight_start_date: "Start Date",
      flight_end_date: "End Date",
    };

    if (key == "flight_start_date" || key == "flight_end_date") {
      return (
        <DatePicker
          className={`basic-input ${showErrorStyles(errors[key])}`}
          name={`${key}`}
          onSelect={(event) => handleDateNumSelect(key, event)}
          selected={value}
          placeholderText={keyNames[key]}
        />
      );
    } else {
      return (
        <input
          className={`basic-input ${showErrorStyles(errors[key])}`}
          name={`${key}`}
          onChange={(event) => handleInputChange(event)}
          value={value}
          placeholder={keyNames[key]}
        />
      );
    }
  }

  render() {
    const { currentStep, handleDateNumSelect, handleInputChange } = this.props;
    const { errors, ...formFields } = this.props.fields;

    return (
      <Fragment>
        <h5 className="mb-4">Campaign Basic</h5>

        <div className="row d-flex flex-column">
          {Object.entries(formFields).map(([key, value]) => {
            return (
              <div className="col-6 mb-4">
                {this.showInput(
                  key,
                  value,
                  errors,
                  handleDateNumSelect,
                  handleInputChange
                )}
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  }
}
