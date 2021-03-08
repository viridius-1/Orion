import React, { Component, Fragment } from "react";

import TreeMenu from "react-simple-tree-menu";
import "react-simple-tree-menu/dist/main.css";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

export default class DataProvider extends Component {
  showDataProviders(props) {
    const { getAudiences, dataProviderOptions, fields } = props;
    const { errors } = fields;

    return (
      <Fragment>
        <label>Choose A Data Provider</label>
        {dataProviderOptions.map((value) => {
          return (
            <div className="d-flex flex-row mt-3 mb-3 align-items-center">
              <div
                className="btn btn-primary-outline d-flex align-items-center justify-content-center provider-btn"
                key={value.id}
                name={value.name}
                value={value.id}
                onClick={() => getAudiences("data_provider", value.id)}
              >
                {value.name}
              </div>
              <div className="ml-5">{value.description}</div>
            </div>
          );
        })}
      </Fragment>
    );
  }

  getAffinitesTag(selectedAudiences) {
    if (selectedAudiences.length > 1) {
      return Object.entries(selectedAudiences).map(([key, value]) => {
        return Object.keys(value);
      });
    } else {
      return [];
    }
  }

  showAudiences(props) {
    const { selectedAudiences, resetAudiences, setSelectedAudiences } = props;
    const { audiences, data_providers } = props.fields;
    let audValue = this.getAffinitesTag(selectedAudiences);

    return (
      <Fragment>
        <div className="mb-5">
          <label>Data Provider</label>
          <div className="btn btn-primary-outline d-flex align-items-center justify-content-center mb-3 provider-btn">
            {audiences[0].label}
          </div>
          <div onClick={resetAudiences}>Reset</div>
        </div>
        <div className="row">
          <div className="col-6">
            <TreeMenu
              className="audience-tree"
              data={audiences}
              onClickItem={setSelectedAudiences}
            />
          </div>
          <div className="col-6">
            <label>Selected Affinities</label>
            <TagsInput value={audValue} />
          </div>
        </div>
      </Fragment>
    );
  }

  renderCampaignAudiences(props) {
    const { audiences } = props.fields;
    if (audiences.length < 1) {
      return this.showDataProviders(props);
    } else {
      return this.showAudiences(props);
    }
  }

  render() {
    return (
      <Fragment>
        <h5 className="mb-4">Campaign Affinities</h5>
        <div className="row">
          <div className="col-12 d-flex flex-column btn-section">
            {this.renderCampaignAudiences(this.props)}
          </div>
        </div>
      </Fragment>
    );
  }
}
