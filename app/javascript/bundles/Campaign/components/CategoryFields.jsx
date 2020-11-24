import React, { Component, Fragment } from "react";

import DropDown from "./DropDown";
import "antd/dist/antd.css";

export default class CategoryFields extends Component {
  showOptions(props) {
    const { audienceState, listOfCategories, setAudienceState } = props;

    if (listOfCategories.length > 0) {
      return (
        <DropDown
          listOfCategories={listOfCategories}
          audienceState={audienceState}
          setAudienceState={setAudienceState}
        />
      );
    } else {
      return (
        <select className="form-control">
          <option>Select A Provider</option>
        </select>
      );
    }
  }

  showCategoryField(props) {
    return (
      <div className="col col-6">
        <div className="form-group category">
          <label>Audience Category</label>
          {this.showOptions(props)}
        </div>
      </div>
    );
  }

  render() {
    return <Fragment>{this.showCategoryField(this.props)}</Fragment>;
  }
}
