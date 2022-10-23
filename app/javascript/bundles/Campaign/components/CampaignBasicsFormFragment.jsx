import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import OrionForm from '../../../components/OrionForm';
import SelectInput from "../../../components/SelectInput";
import TextInput from "../../../components/TextInput";
import UrlInput from "../../../components/UrlInput";
import FormUtils from "../../../common/FormUtils";

export default class CampaignBasicsFormFragment extends Component {
  render() {
    const {
      advertiser_id: advertiserId,
      hide_advertiser: hideAdvertiser,
      campaign_type: campaignType,
      demand_side_platform: demandSidePlatform,
      campaign_url: campaignUrl,
      handleSelectChange,
      handleCancel,
      handleChange,
      handleSubmit,
      name,
      options: {
        advertiser_options: advertiserOptions,
        campaign_type_options: campaignTypeOptions,
        dsp_options: dspOptions
      },
      errors
    } = this.props;

    return (
      <div>
        <h3 className="form-title">Flight</h3>
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="form-v2">
              <OrionForm
                formId="campaign_basics_form"
                handleSubmit={handleSubmit}
                errors={errors}
              >
                <div className={hideAdvertiser ? "hidden" : ""}>
                  <SelectInput
                    name="advertiser_id"
                    label="Advertiser"
                    tooltip="Select advertiser which this campaign belongs to"
                    options={advertiserOptions}
                    handleChange={handleSelectChange}
                    value={advertiserId}
                  />
                </div>
                <SelectInput
                  name="campaign_type"
                  label="Campaign Activation"
                  tooltip="Service type of this campaign as contracted to Version2"
                  options={campaignTypeOptions}
                  handleChange={handleSelectChange}
                  value={campaignType}
                />
                {campaignType.value === 'self_service_auto_setup' &&
                  <SelectInput
                  name="demand_side_platform"
                  label="Demand Side Platform"
                  options={FormUtils.buildOptions(dspOptions)}
                  handleChange={handleSelectChange}
                  value={demandSidePlatform}
                  />
                }
                <TextInput
                  name="name"
                  label="Campaign Name"
                  handleChange={handleChange}
                  value={name}
                />
                <UrlInput
                  name="campaign_url"
                  label="Campaign URL"
                  tooltip="Click-Through URL for this campaign"
                  handleChange={handleChange}
                  value={campaignUrl}
                />
                <div className="form-group">
                  <button className="btn btn-secondary-v2" type="button" onClick={handleCancel}>Cancel</button>
                  <button className="btn btn-primary-v2 float-right" type="submit" style={{ width: '61%' }}>
                    Continue
                  </button>
                </div>
              </OrionForm>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CampaignBasicsFormFragment.propTypes = {
  advertiser_id: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
  }),
  campaign_type: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  demand_side_platform: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  hide_advertiser: PropTypes.bool,
  options: PropTypes.shape({
    goal_options: PropTypes.arrayOf(PropTypes.string),
    kpi_options: PropTypes.arrayOf(PropTypes.string),
    advertiser_options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number
    }))
  }).isRequired,
  campaign_url: PropTypes.string,
  handleCancel: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  name: PropTypes.string,
  errors: PropTypes.object
};

CampaignBasicsFormFragment.defaultProps = {
  advertiser_id: undefined,
  hide_advertiser: undefined,
  campaign_url: undefined,
  name: undefined
};
