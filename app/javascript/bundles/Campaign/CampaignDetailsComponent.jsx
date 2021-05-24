import React, { Fragment, Component } from 'react';
import { Tabs } from 'react-simple-tabs-component';
import PropTypes from 'prop-types';
import { statusLabel, statusColor } from '../../constants';
import { formatRange, moneyFormatter } from '../../common/utils';
import AffinitiesList from '../../components/AffinitiesList';

export default class CampaignDetailsComponent extends Component {
  constructor(props) {
    super(props);

    this.tabs = [
      {
        label: 'Campaign Audience', // Tab title
        index: 0, // Tab index
        Component: this.campaignAudienceTab, // Tab Component
      },
      {
        label: 'Goals',
        index: 1,
        Component: this.campaignGoalsTab,
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
        goal,
        budget,
        target_cpa: targetCpa,
        conversion_rate: conversionRate,
        target_roas: targetRoas,
        kpi,
      },
    } = this.props;

    return (
      <div style={{ padding: '0 40px' }}>
        <div className="row">
          <div className="col-12 grid-item">
            <div className="row">
              <div className="col-12 grid-item">
                <div className="details-card">
                  <h6>Goal</h6>
                  <p className="goal-label">
                    {goal || '-'}
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4 grid-item">
                <h6>Budget</h6>
                <p>
                  {budget !== null ? moneyFormatter(budget) : '-'}
                </p>
              </div>
              <div className="col-4 grid-item">
                <h6>CPA Goal</h6>
                <p>
                  {targetCpa !== null ? moneyFormatter(targetCpa) : '-'}
                </p>
              </div>
              <div className="col-4 grid-item">
                <h6>Target Conversion Rate</h6>
                <p>
                  {conversionRate ? `${conversionRate}%` : '-'}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-4 grid-item">
                <h6>ROAS Goal</h6>
                <p>
                  {targetRoas ? `${targetRoas}%` : '-'}
                </p>
              </div>
              <div className="col-4 grid-item">
                <h6>KPI</h6>
                <p>
                  {kpi || '-'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  campaignAudienceTab = () => {
    const {
      campaign: {
        household_income: householdIncome,
        geography,
        education,
        parental_status: parentalStatus,
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
                  <div className="col-6 grid-item">
                    <h6>Education</h6>
                    <p>
                      {education || '-'}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 grid-item">
                    <h6>Parental Status</h6>
                    <p>
                      {parentalStatus || '-'}
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
        start_date: startDate,
        end_date: endDate,
        campaign_url: campaignUrl,
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
              <h6>Campaign Length</h6>
              <p>{`${new Date(startDate).toLocaleDateString('en-US')} - ${new Date(endDate).toLocaleDateString('en-US')}`}</p>
            </div>
          </div>
          <div className="col-4 grid-item">
            <div className="details-card">
              <h6>Destination URL</h6>
              <p>{campaignUrl}</p>
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
    age_range_male: PropTypes.arrayOf(PropTypes.number),
    age_range_female: PropTypes.arrayOf(PropTypes.number),
    budget: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    campaign_url: PropTypes.string,
    conversion_rate: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    education: PropTypes.string,
    end_date: PropTypes.string,
    geography: PropTypes.arrayOf(PropTypes.string),
    goal: PropTypes.string,
    household_income: PropTypes.arrayOf(PropTypes.number),
    kpi: PropTypes.string,
    parental_status: PropTypes.string,
    start_date: PropTypes.string,
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
};
