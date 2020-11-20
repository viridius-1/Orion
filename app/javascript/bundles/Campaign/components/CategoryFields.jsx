import React, { Component, Fragment } from "react";

import DropDown from "./DropDown";
import "antd/dist/antd.css";

export default class CategoryFields extends Component {
  showOptions(categories) {
    if (categories.length > 0) {
      return (
        <DropDown
          categories={categories}
          audienceState={this.props.audiences}
          setAudienceState={this.props.setAudienceState}
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

  showCategoryField(categories) {
    return (
      <div className="col col-6">
        <div className="form-group category">
          <label>Audience Category</label>
          {this.showOptions(categories)}
        </div>
      </div>
    );
  }

  render() {
    const categories = this.props.listOfCategories;

    return <Fragment>{this.showCategoryField(categories)}</Fragment>;
  }
}
