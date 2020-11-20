import React, { Component } from "react";
import { TreeSelect } from "antd";

const { SHOW_PARENT } = TreeSelect;

export default class DropDown extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedCategories: [] };
  }

  updateSelectedCategories = (value) => {
    this.setState({ selectedCategories: value }, () => {
      if (this.props.getChildState) {
        this.props.getChildState(this.state);
      }
    });
  };

  render() {
    const categories = this.props.categories;

    const tProps = {
      treeData: categories,
      value: this.state.selectedCategories,
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
