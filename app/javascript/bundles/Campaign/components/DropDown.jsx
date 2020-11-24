import React, { Component } from "react";
import { TreeSelect } from "antd";

const { SHOW_PARENT } = TreeSelect;

export default class DropDown extends Component {
  updateSelectedCategories = (value) => {
    this.props.setAudienceState(value);
  };

  render() {
    const { listOfCategories, audienceState } = this.props;

    const tProps = {
      treeData: listOfCategories,
      value: audienceState,
      onChange: this.updateSelectedCategories,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      placeholder: "Please select",
      style: {
        width: "100%",
      },
    };

    return <TreeSelect {...tProps} />;
  }
}
