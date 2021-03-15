import React, { Component, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css";

import { showErrorStyles } from "../common/";

export default class CampaignAudience extends Component {
  renderStyle(option) {
    return option ? { color: "white", backgroundColor: "#58107C" } : {};
  }

  showInput(key, value, errors, rest) {
    const {
      handleInputChange,
      handleRange,
      handleOnClick,
      handleInputTags,
      educationOptions,
      incomeOptions,
      parentOptions,
      genderOptions,
    } = rest;

    let keyNames = {
      gender: "Gender",
      age_range: "Age Range",
      income: "Household Income",
      education: "Education",
      parental_status: "Parental Status",
      geography: "Geography",
    };

    let keyObj = {
      education: educationOptions,
      parental_status: parentOptions,
      age_range: [18, 99],
      income: incomeOptions,
    };

    if (key == "education" || key == "parental_status" || key == "income") {
      return (
        <select
          className={`basic-input ${showErrorStyles(errors[key])}`}
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
    } else if (key == "gender") {
      return (
        <div className="row row d-flex flex-column">
          <label className="col-6">{key}</label>
          <div className="col-8 d-flex justify-content-between btn-section">
            {Object.entries(genderOptions).map(([gender, option]) => {
              return (
                <div
                  className="btn btn-primary-outline d-flex align-items-center justify-content-center select-btn gender"
                  style={this.renderStyle(option)}
                  name={gender}
                  value={gender}
                  onClick={() => handleOnClick(key, gender, option)}
                >
                  {gender}
                </div>
              );
            })}
          </div>
        </div>
      );
    } else if (key == "age_range") {
      let [first, second] = keyObj[key];

      return (
        <div className="slider" aria-label={key}>
          <Typography id="range-slider" gutterBottom>
            {keyNames[key]}
          </Typography>
          <Slider
            value={value}
            min={first}
            max={second}
            name={key}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            onChange={handleRange}
            step={key == "age_range" ? 1 : 10}
            marks={key == "age_range" ? false : true}
          />
        </div>
      );
    } else if (key == "geography") {
      return (
        <Fragment>
          <TagsInput
            value={this.props.fields.geography}
            inputProps={{ placeholder: keyNames[key] }}
            onChange={(tags) => handleInputTags(tags, key)}
          />
          <small>
            Enter countries, states, provinces, DMAs, cities, or ZIP/postal
            codes.
          </small>
        </Fragment>
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
    const { fields, ...rest } = this.props;
    const { errors, ...formFields } = fields;

    return (
      <Fragment>
        <h5 className="mb-4">Campaign Audience</h5>

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
