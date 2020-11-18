import React, { Component, Fragment } from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";

export default class AudienceFields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      providerCategories: [],
      selectedCategory: {},
    };
  }

  showOptions(values) {
    console.log("values", values);
    if (values.length > 0) {
      return (
        <DropdownTreeSelect
          data={values}
          texts={{ placeholder: "Select Categories" }}
          className="categories-select"
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

  getCategoriesData(event, categories) {
    event.preventDefault();

    const providerId = event.target.value;

    const providerCategories = categories.filter(
      (category) => category.provider_id == providerId
    );

    this.setState({ providerCategories });
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

  showAudienceFields(audiences) {
    const { providers, categories } = audiences;
    const { providerCategories } = this.state;

    return (
      <Fragment>
        <div className="col col-6">
          <div className="form-group provider">
            <label>Audience Provider</label>
            <select
              className="form-control"
              onChange={(event) => this.getCategoriesData(event, categories)}
            >
              <option>Select A Provider</option>
              {providers.map((provider) => (
                <option value={provider.id}>{`${provider.name}`}</option>
              ))}
            </select>
          </div>
        </div>
        {this.showCategoryField(providerCategories)}
      </Fragment>
    );
  }

  render() {
    const audiences = this.props.audiences;

    return <Fragment>{this.showAudienceFields(audiences)}</Fragment>;
  }
}
