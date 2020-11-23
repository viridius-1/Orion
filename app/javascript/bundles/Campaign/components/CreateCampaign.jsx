import React, { Component } from "react";
import axios from "axios";

export default class CreateCampaign extends Component {
  getPostPath(company, is_client) {
    if (is_client) {
      return `/agencies/${company.agency_id}/clients/${company.id}/campaigns`;
    } else {
      return `/advertisers/${company.id}/campaigns`;
    }
  }

  sendCampaign = (data) => {
    event.preventDefault();

    const { company, isClient, stateProps } = data;
    const campaignPath = this.getPostPath(company, isClient);
    const { audiences, errors, ...campaign } = stateProps;

    axios.post(campaignPath, {
      campaign: campaign,
      audience: { ids: audiences },
      request_type: {type: event.target.value}
    }).then((response) => {console.log('response', response)});
  };

  render() {
    return (
      <div className="col col-12 d-flex submit-btns">
        <button
          className="btn btn-primary io-btn"
          onClick={(event) => this.sendCampaign(this.props)}
          value={'insertion_order'}
        >
          Request IO
        </button>
        <button
          className="btn btn-primary recommedation-btn"
          onClick={(event) => this.sendCampaign(this.props)}
          value={'recommendation'}
        >
          Request Recommendations
        </button>
      </div>
    );
  }
}
