import React, { Component, Fragment } from 'react';
import { Tabs } from 'react-simple-tabs-component';
import PropTypes from 'prop-types';
import { statusColor, statusLabel } from '../../constants';
import { formatRange, moneyFormatter, numberFormatter } from '../../common/utils';
import AffinitiesList from '../../components/AffinitiesList';

export default class CampaignDetailsComponent extends Component {
  constructor(props) {
    super(props);

    this.tabs = [
      {
        Component: this.campaignAudienceTab, // Tab Component
        index: 0, // Tab index
        label: 'Campaign Targeting', // Tab title
      },
      {
        Component: this.campaignGoalsTab,
        index: 1,
        label: 'Goals',
      },
    ];

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
      campaign: {
        objectives: objectives,
      },
    } = this.props;

    return (
      objectives.map((objective, i) => (
        this.objectiveSegment(objective, i)
      ))
    );
  }

  objectiveSegment = (objective, i) => {
    const { field_mapping: fieldMapping } = this.props;

    const fields = fieldMapping["field_options"][objective.kpi] || [];

    return (
      <div key={i}>
      {i > 0 &&
        <hr className="w-100"></hr>
      }
      <div style={{ padding: '0 40px' }}>
          <div className="row">
            <div className="col-12 grid-item">
              <div className="row">
                <div className="col-12 grid-item">
                  <div className="details-card">
                    <h6>Goal</h6>
                    <p className="goal-label">
                      {objective.goal || '-'}
                    </p>
                  </div>
                </div>
                {fields.includes('budget') &&
                  <div className="col-4 grid-item">
                    <h6>Budget</h6>
                    <p>
                      {moneyFormatter(objective.budget)}
                    </p>
                  </div>
                }
                {fields.includes('desired_dcpm') &&
                  <div className="col-4 grid-item">
                    <h6>Desired dCpm</h6>
                    <p>
                      {moneyFormatter(objective.desired_dcpm)}
                    </p>
                  </div>
                }
                {fields.includes('desired_dcpm') && fields.includes('budget') &&
                  <div className="col-4 grid-item">
                    <h6>Impressions</h6>
                    <p>
                      {numberFormatter(objective.impressions)}
                    </p>
                  </div>
                }
                {fields.includes('target_ctr') &&
                  <div className="col-4 grid-item">
                    <h6>Target CTR</h6>
                    <p>
                      {`${objective.target_ctr}%`}
                    </p>
                  </div>
                }
                {fields.includes('video_completion_rate') &&
                  <div className="col-4 grid-item">
                    <h6>Video Completion Rate</h6>
                    <p>
                      {`${objective.video_completion_rate}%`}
                    </p>
                  </div>
                }
                {fields.includes('target_cpa') &&
                  <div className="col-4 grid-item">
                    <h6>CPA Goal</h6>
                    <p>
                      {moneyFormatter(objective.target_cpa)}
                    </p>
                  </div>
                }
                {fields.includes('conversions') &&
                  <div className="col-4 grid-item">
                    <h6>Conversions</h6>
                    <p>
                      {objective.conversions.toLocaleString('en', {useGrouping: true})}
                    </p>
                  </div>
                }
                {fields.includes('target_conversion_rate') &&
                  <div className="col-4 grid-item">
                    <h6>Target Conversion Rate</h6>
                    <p>
                      {`${objective.target_conversion_rate}%`}
                    </p>
                  </div>
                }
                {fields.includes('average_order_value') &&
                  <div className="col-4 grid-item">
                    <h6>Average Order Value</h6>
                    <p>
                      {moneyFormatter(objective.average_order_value)}
                    </p>
                  </div>
                }
                {fields.includes('target_roas') && 
                <div className="col-4 grid-item">
                  <h6>ROAS Goal</h6>
                  <p>
                    {`${objective.target_roas}%`}
                  </p>
                </div>
                }
                <div className="col-4 grid-item">
                  <h6>KPI</h6>
                  <p>
                    {objective.kpi}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  campaignAudienceTab = () => {
    const {
      campaign: {
        household_income: householdIncome,
        geography,
        affinities,
      },
    } = this.props;

    return (
      <div style={{ padding: '0 40px' }}>
        <div className="row">
          <div className="col-8 grid-item">
            <div className="row">
              <div className="col-12 grid-item">
                <div className="row">
                  <div className="col-6 grid-item">
                    <h6>Gender</h6>
                    <p>{this._getGenderLabel() || '-'}</p>
                  </div>
                  <div className="col-6 grid-item">
                    <h6>Age</h6>
                    {this._getAgeLabels() || '-'}
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 grid-item">
                    <h6>Household Income</h6>
                    <p>
                      {householdIncome ? formatRange([moneyFormatter(householdIncome[0]), moneyFormatter(householdIncome[1])]) : '-'}
                    </p>
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
                        <div key={index} className="pill blue">{geographyItem}</div> // eslint-disable-line
                      )) : '-'
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
              {Object.keys(affinities).length > 0 ? <AffinitiesList affinities={affinities} /> : '-'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  _getGenderLabel() {
    const {
      campaign: {
        age_range_male: ageRangeMale,
        age_range_female: ageRangeFemale,
      },
    } = this.props;

    if (!!ageRangeMale && !!ageRangeFemale) {
      return 'Male & Female';
    } if (ageRangeMale) {
      return 'Male';
    } if (ageRangeFemale) {
      return 'Female';
    }

    return '';
  }

  _getAgeLabels() {
    const {
      campaign: {
        age_range_male: ageRangeMale,
        age_range_female: ageRangeFemale,
      },
    } = this.props;

    if (!!ageRangeMale && !!ageRangeFemale) {
      return (
        <>
          <p>{`Male: ${formatRange(ageRangeMale)}`}</p>
          <br />
          <p>{`Female: ${formatRange(ageRangeFemale)}`}</p>
        </>
      );
    } if (ageRangeMale) {
      return (<p>{`Male: ${formatRange(ageRangeMale)}`}</p>);
    } if (ageRangeFemale) {
      return (<p>{`Female: ${formatRange(ageRangeFemale)}`}</p>);
    }

    return null;
  }

  render() {
    const {
      campaign: {
        status,
        campaign_url: campaignUrl,
        flight
      },
    } = this.props;

    const { selectedTab } = this.state;

    return (
      <div className="campaign-details">
        <div className="row">
          <div className="col-4 grid-item">
            <div className="details-card status">
              <h6>Status</h6>
              <div style={{ display: 'inline-flex' }}>
                <span className={`dot ${statusColor[status]}`} />
                <p>{statusLabel[status]}</p>
              </div>
            </div>
          </div>
          <div className="col-4 grid-item">
            <div className="details-card">
              <h6>Destination URL</h6>
              <div style={{ display: 'inline-flex' }}>
                <p>{campaignUrl}</p>
              </div>
            </div>
          </div>
          <div className="col-4 grid-item">
            <div className="details-card">
              <h6>Flight</h6>
              <div style={{ display: 'inline-flex' }}>
                <p>{flight}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 grid-item">
            <div className="details-card more-details">
              <Tabs
                tabs={this.tabs}
                onClick={(event) => this.setSelectedTab(event)}
                selectedTab={selectedTab}
                className="tabs-component"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CampaignDetailsComponent.propTypes = {
  campaign: PropTypes.shape({
    affinities: PropTypes.objectOf(PropTypes.object),
    age_range_female: PropTypes.arrayOf(PropTypes.number),
    age_range_male: PropTypes.arrayOf(PropTypes.number),
    budget: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    campaign_url: PropTypes.string,
    conversion_rate: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    geography: PropTypes.arrayOf(PropTypes.string),
    goal: PropTypes.string,
    household_income: PropTypes.arrayOf(PropTypes.number),
    kpi: PropTypes.string,
    status: PropTypes.string,
    target_cpa: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    target_roas: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }).isRequired,
  field_mapping: PropTypes.object
};
