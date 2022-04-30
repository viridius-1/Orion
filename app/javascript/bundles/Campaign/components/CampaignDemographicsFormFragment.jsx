import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import Select, { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Slider from '@material-ui/core/Slider';
import FormUtils from '../../../common/FormUtils';
import SwitchInput from '../../../components/SwitchInput';

const getSelectButtonClass = (selected) => (selected ? 'btn-primary-v2 slim no-focus' : 'btn-secondary-v2 slim no-focus');

export default class CampaignDemographicsFormFragment extends Component {
  constructor(props) {
    super(props);

    this.formId = 'campaign_goals_form';
  }

  render() {
    const DropdownIndicator = (props) => (
      /* eslint-disable-next-line */
      <components.DropdownIndicator {...props}>
        <i className="fas fa-search" />
      </components.DropdownIndicator>
    );

    const {
      age_range_female: ageRangeFemale,
      age_range_male: ageRangeMale,
      female_selected: femaleSelected,
      geography,
      geography_input: geographyInput,
      geo_fence,
      geo_fence_input: geoFenceInput,
      footfall_analysis: footfallAnalysis,
      crm_data: crmData,
      contextual_targeting: contextualTargeting,
      brand_safety: brandSafety,
      targeting_notes: targetingNotes,
      handleCancel,
      handleCreatableSelectInputChange,
      handleCreatableSelectKeyDown,
      handleRangeChange,
      handleSelectChange,
      handleSubmit,
      handleSwitchChange,
      handleChange,
      updateState,
      male_selected: maleSelected,
      onSelectButtonPressed,
      validated,
    } = this.props;

    return (
      <div>
        <h3 className="form-title">Demographics</h3>
        <div className="row">
          <div className="col-6">
            <div className="form-v2">
              <Form
                noValidate
                id={this.formId}
                validated={validated}
                onSubmit={handleSubmit}
                onKeyPress={(event) => FormUtils.submitEnter(event, this.formId, handleSubmit)}
              >
                <Form.Group controlId="gender">
                  <Form.Label className="label-v2 default-position">Gender</Form.Label>
                  <div>
                    <button
                      className={getSelectButtonClass(maleSelected)}
                      name="male_selected"
                      onClick={onSelectButtonPressed}
                      type="button"
                      style={{
                        height: '32px',
                        width: '86px',
                      }}
                    >
                      Male
                    </button>
                    <button
                      className={getSelectButtonClass(femaleSelected)}
                      name="female_selected"
                      onClick={onSelectButtonPressed}
                      type="button"
                      style={{
                        height: '32px',
                        marginLeft: '15px',
                        width: '94px',
                      }}
                    >
                      Female
                    </button>
                  </div>
                </Form.Group>
                <Form.Group controlId="age_range_male">
                  <Form.Label className="label-v2 default-position">Male Age Range</Form.Label>
                  <div className="slider-group row col-8">
                    <div className="before-label">
                      <span>{ageRangeMale[0]}</span>
                    </div>
                    <Slider
                      className="slider"
                      value={ageRangeMale}
                      disabled={!maleSelected}
                      min={18}
                      max={99}
                      name="age_range_male"
                      valueLabelDisplay="off"
                      onChange={(event, range) => handleRangeChange(event, range, 'age_range_male')}
                    />
                    <div className="after-label">
                      <span>{ageRangeMale[1]}</span>
                    </div>
                  </div>
                </Form.Group>
                <Form.Group controlId="age_range_female">
                  <Form.Label className="label-v2 default-position">Female Age Range</Form.Label>
                  <div className="slider-group row col-8">
                    <div className="before-label">
                      <span>{ageRangeFemale[0]}</span>
                    </div>
                    <Slider
                      className="slider"
                      value={ageRangeFemale}
                      disabled={!femaleSelected}
                      min={18}
                      max={99}
                      name="age_range_female"
                      valueLabelDisplay="off"
                      onChange={(event, range) => handleRangeChange(event, range, 'age_range_female')}
                    />
                    <div className="after-label">
                      <span>{ageRangeFemale[1]}</span>
                    </div>
                  </div>
                </Form.Group>
                <Form.Group controlId="geography">
                  <Form.Label className="label-v2">Geography</Form.Label>
                  <CreatableSelect
                    className="multiSelectV2"
                    classNamePrefix="multiSelectV2"
                    components={{ DropdownIndicator }}
                    isClearable
                    isMulti
                    menuIsOpen={false}
                    name="geography"
                    onChange={(value) => handleSelectChange(value, { name: 'geography' })}
                    onInputChange={(value) => handleCreatableSelectInputChange(value, { name: 'geography_input' })}
                    onKeyDown={(event) => handleCreatableSelectKeyDown(event, 'geography', 'geography_input')}
                    placeholder="Type something and press enter..."
                    value={geography}
                    inputValue={geographyInput}
                  />
                  <span style={{ fontSize: '12px' }}>Enter countries, states, provinces, DMAs, cities, or ZIP/postal codes.</span>
                </Form.Group>
                <Form.Group controlId="geo_fence">
                  <Form.Label className="label-v2">Geo Fence</Form.Label>
                  <CreatableSelect
                    className="multiSelectV2"
                    classNamePrefix="multiSelectV2"
                    components={{ DropdownIndicator }}
                    isClearable
                    isMulti
                    menuIsOpen={false}
                    name="geo_fence"
                    onChange={(value) => handleSelectChange(value, { name: 'geo_fence' })}
                    onInputChange={(value) => handleCreatableSelectInputChange(value, { name: 'geo_fence_input' })}
                    onKeyDown={(event) => handleCreatableSelectKeyDown(event, 'geo_fence', 'geo_fence_input')}
                    placeholder="Type something and press enter..."
                    value={geo_fence}
                    inputValue={geoFenceInput}
                  />
                  <span style={{ fontSize: '12px' }}>Points of interest or business locations/names.</span>
                </Form.Group>
                <SwitchInput
                  name="footfall_analysis"
                  label="Footfall Analysis"
                  handleChange={updateState}
                  value={footfallAnalysis}
                />
                <SwitchInput
                  name="crm_data"
                  label="CRM Data"
                  handleChange={updateState}
                  value={crmData}
                />
                <SwitchInput
                  name="brand_safety"
                  label="Brand Safety"
                  handleChange={updateState}
                  value={brandSafety}
                />
                <SwitchInput
                  name="contextual_targeting"
                  label="Contextual Targeting"
                  handleChange={updateState}
                  value={contextualTargeting}
                />
                <Form.Group controlId="targeting_notes">
                   <Form.Label className="label-v2 default-position">Demographic Notes</Form.Label>
                   <Form.Control
                     className="input-v2 textarea"
                     name="targeting_notes"
                     type="text"
                     as="textarea"
                     onChange={handleChange}
                     value={targetingNotes}
                   />
                 </Form.Group>
                <div className="form-group">
                  <button className="btn btn-secondary-v2" type="button" onClick={handleCancel}>Back</button>
                  <button className="btn btn-primary-v2 float-right" type="submit" style={{ width: '61%' }}>
                    Continue
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CampaignDemographicsFormFragment.propTypes = {
  age_range_female: PropTypes.arrayOf(PropTypes.number),
  age_range_male: PropTypes.arrayOf(PropTypes.number),
  female_selected: PropTypes.bool,
  geography: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  geography_input: PropTypes.string,
  geo_fence: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  })),
  geo_fence_input: PropTypes.string,
  footfall_analysis: PropTypes.bool,
  crm_data: PropTypes.bool,
  contextual_targeting: PropTypes.bool,
  brand_safety: PropTypes.bool,
  targeting_notes: PropTypes.string,
  handleCancel: PropTypes.func.isRequired,
  handleCreatableSelectInputChange: PropTypes.func.isRequired,
  handleCreatableSelectKeyDown: PropTypes.func.isRequired,
  handleRangeChange: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  handleSwitchChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  updateState: PropTypes.func.isRequired,
  male_selected: PropTypes.bool,
  onSelectButtonPressed: PropTypes.func.isRequired,
  validated: PropTypes.bool,
};

CampaignDemographicsFormFragment.defaultProps = {
  age_range_female: [],
  age_range_male: [],
  female_selected: false,
  geography: [],
  geography_input: '',
  geo_fence: [],
  geo_fence_input: '',
  footfall_analysis: false,
  crm_data: false,
  contextual_targeting: false,
  brand_safety: false,
  targeting_notes: '',
  male_selected: false,
  validated: undefined,
};
