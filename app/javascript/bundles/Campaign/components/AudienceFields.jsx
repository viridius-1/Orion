import React, { Component, Fragment } from "react";
import Select from "react-select";

import CategoryFields from "./CategoryFields";

export default class AudienceFields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      providers: this.providersObj() || [],
      providerCategories: [],
    };
  }

  getCategoriesData(event, categories) {
    const provider = event;

    const providerId = event
      .map((provider) => {
        return provider.id;
      })
      .pop();

    const providerCategories = categories.filter(
      (category) => category.provider_id == providerId
    );

    this.setState({
      providers: provider,
      providerCategories,
    });
  }

  providersObj() {
    const { providers } = this.props.audiences;

    providers.map((provider) => {
      provider["value"] = provider.id;
      provider["label"] = provider.name;
    });

    return providers;
  }

  showAudienceFields(props) {
    const { audiences, audienceState, setAudienceState } = props;
    const { categories } = audiences;
    const { providerCategories } = this.state;

    return (
      <Fragment>
        <div className="col col-6">
          <div className="form-group provider">
            <label>Audience Provider</label>

            <Select
              defaultValue={this.state.providers}
              isMulti
              name="colors"
              options={this.providersObj()}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(event) => this.getCategoriesData(event, categories)}
            />
          </div>
        </div>
        <CategoryFields
          listOfCategories={providerCategories}
          audienceState={audienceState}
          setAudienceState={setAudienceState}
        />
      </Fragment>
    );
  }

  render() {
    return <Fragment>{this.showAudienceFields(this.props)}</Fragment>;
  }
}
