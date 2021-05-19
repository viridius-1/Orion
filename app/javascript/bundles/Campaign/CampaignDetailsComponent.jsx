import React, { Fragment, Component } from "react";
import { Tabs } from "react-simple-tabs-component";
import { statusLabel, statusColor } from "../../constants";
import { formatRange, moneyFormatter } from "../../common/utils";
import AffinitiesList from "../../components/AffinitiesList";

export default class CampaignDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
    };
  }

  setSelectedTab(index) {
    this.setState({
      selectedTab: index,
    });
  }

  campaignGoalsTab = () => {
    const {
      goal,
      budget,
      target_cpa,
      conversion_rate,
      target_roas,
      kpi
    } = this.props.campaign;

    return (
      <div style={{ padding: "0 40px" }}>
        <div className="row">
          <div className="col-12 grid-item">
            <div className="row">
              <div className="col-12 grid-item">
                <div className="details-card">
                  <h6>Goal</h6>
                  <label className="goal-label">
                    {goal || "-"}
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4 grid-item">
                <h6>Budget</h6>
                <label>
                  {budget !== null ? moneyFormatter(budget) : "-"}
                </label>
              </div>
              <div className="col-4 grid-item">
                <h6>CPA Goal</h6>
                <label>
                  {target_cpa !== null ? moneyFormatter(target_cpa) : "-"}
                </label>
              </div>
              <div className="col-4 grid-item">
                <h6>Target Conversion Rate</h6>
                <label>
                  {conversion_rate ? `${conversion_rate}%` : "-"}
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-4 grid-item">
                <h6>ROAS Goal</h6>
                <label>
                  {target_roas ? `${target_roas}%` : "-"}
                </label>
              </div>
              <div className="col-4 grid-item">
                <h6>KPI</h6>
                <label>
                  {kpi || "-"}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  campaignAudienceTab = () => {
    const {
      household_income,
      geography,
      education,
      parental_status,
      affinities
    } = this.props.campaign;
    console.log(geography);
    return (
      <div style={{ padding: "0 40px" }}>
        <div className="row">
          <div className="col-8 grid-item">
            <div className="row">
              <div className="col-12 grid-item">
                <div className="row">
                  <div className="col-6 grid-item">
                    <h6>Gender</h6>
                    <label>{this._getGenderLabel() || "-"}</label>
                  </div>
                  <div className="col-6 grid-item">
                    <h6>Age</h6>
                    {this._getAgeLabels() || "-"}
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 grid-item">
                    <h6>Household Income</h6>
                    <label>
                      {household_income ? formatRange([moneyFormatter(household_income[0]), moneyFormatter(household_income[1])]) : "-"}
                    </label>
                  </div>
                  <div className="col-6 grid-item">
                    <h6>Education</h6>
                    <label>
                      {education || "-"}
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 grid-item">
                    <h6>Parental Status</h6>
                    <label>
                      {parental_status || "-"}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 grid-item">
            <div className="row">
              <div className="col-12 grid-item">
                <div className="row">
                  <div className="col-12 grid-item">
                    <h6>Geography</h6>
                    {
                      geography.length !== 0 ? geography.map((geographyItem, index) => (
                        <div key={index} className="pill blue">{geographyItem}</div>
                      )) : "-"
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 grid-item">
            <div className="details-card">
              <h6>Affinities</h6>
              {Object.keys(affinities).length > 0 ? <AffinitiesList affinities={affinities} /> : "-"}
            </div>
          </div>
        </div>
      </div>
    );
  }

  _getGenderLabel = () => {
    const { age_range_male, age_range_female } = this.props.campaign;

    if (!!age_range_male && !!age_range_female) {
      return "Male & Female"
    } else if (!!age_range_male) {
      return "Male"
    } else if (!!age_range_female) {
      return "Female"
    }

    return "";
  }

  _getAgeLabels = () => {
    const { age_range_male, age_range_female } = this.props.campaign;
    if (!!age_range_male && !!age_range_female) {
      return (
        <Fragment>
          <label>{`Male: ${formatRange(age_range_male)}`}</label>
          <br />
          <label>{`Female: ${formatRange(age_range_female)}`}</label>
        </Fragment>
      );
    } else if (!!age_range_male) {
      return (<label>{`Male: ${formatRange(age_range_male)}`}</label>);
    } else if (!!age_range_female) {
      return (<label>{`Female: ${formatRange(age_range_female)}`}</label>);
    }

    return null;
  };

  tabs = [
    {
      label: "Campaign Audience", // Tab title
      index: 0, // Tab index
      Component: this.campaignAudienceTab, // Tab Component
    },
    {
      label: "Goals",
      index: 1,
      Component: this.campaignGoalsTab,
    },
  ];

  render() {
    const {
      status,
      start_date,
      end_date,
      campaign_url
    } = this.props.campaign;

    return (
      <div className="campaign-details">
        <div className="row">
          <div className="col-4 grid-item">
            <div className="details-card status">
              <h6>Status</h6>
              <div style={{ display: "inline-flex" }}>
                <span className={`dot ${statusColor[status]}`} />
                <label>{statusLabel[status]}</label>
              </div>
            </div>
          </div>
          <div className="col-4 grid-item">
            <div className="details-card">
              <h6>Campaign Length</h6>
              <label>{`${new Date(start_date).toLocaleDateString("en-US")} - ${new Date(end_date).toLocaleDateString("en-US")}`}</label>
            </div>
          </div>
          <div className="col-4 grid-item">
            <div className="details-card">
              <h6>Destination URL</h6>
              <label>{campaign_url}</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 grid-item">
            <div className="details-card more-details">
              <Tabs
                tabs={this.tabs}
                onClick={(event) => this.setSelectedTab(event)}
                selectedTab={this.state.selectedTab}
                className="tabs-component"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
