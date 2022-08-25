import React, {Component} from 'react';
import {Tabs} from 'react-simple-tabs-component';
import PropTypes from 'prop-types';
import {statusColor, statusLabel} from '../../constants';
import {formatRange, moneyFormatter, numberFormatter} from '../../common/utils';
import AffinitiesList from '../../components/AffinitiesList';
import CampaignActionItemsFormFragment from './components/CampaignActionItemsFormFragment';
import FileUpload from '../../components/fileUpload';

export default class CampaignDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.tabs = [
      {
        Component: this.campaignAudienceTab,
        index: 1,
        label: 'Campaign Targeting',
      },
      {
        Component: this.campaignGoalsTab,
        index: 2,
        label: 'Goals',
      },
    ];

    this.actionItemsNeeded(this.tabs);

    const {campaign: {campaign_type: campaignType}} = this.props;

    if (campaignType === 'self_service_auto_setup') {
      this.tabs.push(
        {
          Component: this.uploadCreativeTab,
          index: 3,
          label: 'Upload Creative'
        }
      )
    }

    this.state = {
      selectedTab: 0,
      creatives: this.props.campaign.creatives
    };
  }

  actionItemsNeeded(tabs) {
    const {
      campaign: {
        crm_data,
        brand_safety,
        contextual_targeting
      },
    } = this.props;

    const itemsValue = [ crm_data, brand_safety, contextual_targeting];
    const {campaign: {campaign_type}} = this.props;

    if (itemsValue.some(v => v === true) || campaign_type === 'self_service_auto_setup') {
      tabs.unshift({
        Component: this.campaignActionItem, // Tab Component
        index: 0, // Tab index
        label: 'Action Items', // Tab title
      })
    }
  }

  selectCreativeUploadTab() {
    $('#btn-3').trigger('click');
  }
  setSelectedTab(index) {
    this.setState({
      selectedTab: index,
    });
  }

  campaignActionItem = () => {
    const {
      campaign: {
        id,
        crm_data,
        brand_safety,
        contextual_targeting,
        crm_data_checked,
        brand_safety_text,
        contextual_targeting_text,
        campaign_type,
        is_creative_uploaded
      },
      token
    } = this.props;

    return (
      <CampaignActionItemsFormFragment
        crmData={crm_data}
        brandSafety={brand_safety}
        contextualTargeting={contextual_targeting}
        crmDataChecked={crm_data_checked}
        brandSafetyText={brand_safety_text}
        contextualTargetingText={contextual_targeting_text}
        campaignId={id}
        token={token}
        campaignType={campaign_type}
        isCreativeUploaded={is_creative_uploaded}
        selectCreativeUploadTab={this.selectCreativeUploadTab}
      />
    );
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
    const {field_mapping: fieldMapping} = this.props;

    const fields = fieldMapping["field_options"][objective.kpi] || [];

    return (
      <div key={i}>
        {i > 0 &&
          <hr className="w-100"></hr>
        }
        <div style={{padding: '0 40px'}}>
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
                <div className="col-4 grid-item">
                  <h6>KPI</h6>
                  <p>
                    {objective.kpi}
                  </p>
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
        geography,
        affinities,
        geo_fence,
        targeting_notes
      },
    } = this.props;

    return (
      <div style={{padding: '0 40px'}}>
        <div className="row">
          <div className="col-6 grid-item">
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
              </div>
              <div className="col-12 grid-item">
                <div className="row">
                  <div className="col-6 grid-item">
                    <h6>Demographic Notes</h6>
                    <p>{targeting_notes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 grid-item">
            <div className="row">
              <div className="col-12 grid-item">
                <div className="row">
                  <div className="col-6 grid-item">
                    <h6>Geography</h6>
                    {
                      geography.length !== 0 ? geography.map((geographyItem, index) => (
                        <div key={index} className="pill blue">{geographyItem}</div> // eslint-disable-line
                      )) : '-'
                    }
                  </div>
                  <div className="col-6 grid-item">
                    <h6>Geo Fence</h6>
                    {
                      geo_fence.length !== 0 ? geo_fence.map((geoItem, index) => (
                        <div key={index} className="pill blue">{geoItem}</div> // eslint-disable-line
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
              {Object.keys(affinities).length > 0 ? <AffinitiesList affinities={affinities}/> : '-'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleOnFileChange = (file, status) => {
    if (status === 'done') {
      const data = JSON.parse(file.xhr.response);
      const updatedCreatives = [...this.state.creatives];
      updatedCreatives.push(data);
      this.setState({
        creatives: updatedCreatives,
      });
      file.remove();
    }
  }

  handleDeleteCreative = (creativeId, index) => {

    const requestOptions = {
      headers: {'Content-Type': 'application/json'},
      method: 'DELETE',
    };

    const deleteCreativeUrl = `/creatives/${creativeId}`;

    fetch(deleteCreativeUrl, requestOptions)
      .then((response) => {
        if (response.ok) {
          const updatedCreatives = [...this.state.creatives];
          updatedCreatives.splice(index, 1);
          this.setState({
            creatives: updatedCreatives,
          });
        }
      });
  }

  uploadCreativeTab = () => {
    const {
      campaign: {
        id: campaignId
      }
    } = this.props;

    return (
      <div>
        <FileUpload creatives={this.state.creatives}
                    campaignId={campaignId}
                    handleOnFileChange={this.handleOnFileChange}
                    handleDeleteCreative={this.handleDeleteCreative}/>
      </div>
    )
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
    }
    if (ageRangeMale) {
      return 'Male';
    }
    if (ageRangeFemale) {
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
          <br/>
          <p>{`Female: ${formatRange(ageRangeFemale)}`}</p>
        </>
      );
    }
    if (ageRangeMale) {
      return (<p>{`Male: ${formatRange(ageRangeMale)}`}</p>);
    }
    if (ageRangeFemale) {
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

    const {selectedTab} = this.state;

    return (
      <div className="campaign-details">
        <div className="row">
          <div className="col-4 grid-item">
            <div className="details-card status">
              <h6>Status</h6>
              <div style={{display: 'inline-flex'}}>
                <span className={`dot ${statusColor[status]}`}/>
                <p>{statusLabel[status]}</p>
              </div>
            </div>
          </div>
          <div className="col-4 grid-item">
            <div className="details-card">
              <h6>Destination URL</h6>
              <div style={{display: 'inline-flex'}}>
                <p>{campaignUrl}</p>
              </div>
            </div>
          </div>
          <div className="col-4 grid-item">
            <div className="details-card">
              <h6>Flight</h6>
              <div style={{display: 'inline-flex'}}>
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
    campaign_type: PropTypes.string,
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
