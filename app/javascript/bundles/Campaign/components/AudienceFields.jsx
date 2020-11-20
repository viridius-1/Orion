import React, { Component, Fragment } from "react";

import CategoryFields from "./CategoryFields";

export default class AudienceFields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      providerCategories: [],
    };
  }

  getCategoriesData(event, categories) {
    event.preventDefault();

    const providerId = event.target.value;

    const providerCategories = categories.filter(
      (category) => category.provider_id == providerId
    );

    this.setState({ providerCategories });
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
        <CategoryFields
          listOfCategories={providerCategories}
          audienceState={this.props.audiences}
          setAudienceState={this.props.setAudienceState}
        />
      </Fragment>
    );
  }

  render() {
    const audiences = this.props.audiences;

    return <Fragment>{this.showAudienceFields(audiences)}</Fragment>;
  }
}
