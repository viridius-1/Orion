import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import Select, { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Slider from '@material-ui/core/Slider';
import FormUtils from '../../../common/FormUtils';

const getSelectButtonClass = (selected) => (selected ? 'btn-primary-v2 slim no-focus' : 'btn-secondary-v2 slim no-focus');

export default class CampaignAudienceFormFragment extends Component {
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
      education,
      female_selected: femaleSelected,
      geography,
      geography_input: geographyInput,
      handleCancel,
      handleCreatableSelectInputChange,
      handleCreatableSelectKeyDown,
      handleRangeChange,
      handleSelectChange,
      handleSubmit,
      household_income: householdIncome,
      male_selected: maleSelected,
      onSelectButtonPressed,
      options: {
        education_options: educationOptions,
        parental_options: parentalOptions,
      },
      parental_status: parentalStatus,
      validated,
    } = this.props;

    return (
      <div>
        <h3 className="form-title">Campaign Audience</h3>
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
                <Form.Group controlId="household_income">
                  <Form.Label className="label-v2 default-position">Household Income</Form.Label>
                  <div className="slider-group row col-8">
                    <div className="before-label">
                      <span>
                        $
                        {householdIncome[0]}
                        K
                      </span>
                    </div>
                    <Slider
                      className="slider"
                      value={householdIncome}
                      min={50}
                      max={500}
                      name="household_income"
                      valueLabelDisplay="off"
                      onChange={(event, range) => handleRangeChange(event, range, 'household_income')}
                    />
                    <div className="after-label">
                      <span>
                        $
                        {householdIncome[1]}
                        K
                      </span>
                    </div>
                  </div>
                </Form.Group>
                <Form.Group controlId="education">
                  <Form.Label className="label-v2">Education</Form.Label>
                  <Select
                    className="selectV2"
                    classNamePrefix="selectV2"
                    options={FormUtils.buildOptions(educationOptions)}
                    name="education"
                    onChange={handleSelectChange}
                    value={education}
                  />
                </Form.Group>
                <Form.Group controlId="parental_status">
                  <Form.Label className="label-v2">Parental Status</Form.Label>
                  <Select
                    className="selectV2"
                    classNamePrefix="selectV2"
                    options={FormUtils.buildOptions(parentalOptions)}
                    name="parental_status"
                    onChange={handleSelectChange}
                    value={parentalStatus}
                  />
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

CampaignAudienceFormFragment.propTypes = {
  age_range_female: PropTypes.arrayOf(PropTypes.number),
  age_range_male: PropTypes.arrayOf(PropTypes.number),
  education: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  female_selected: PropTypes.bool,
  geography: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  geography_input: PropTypes.string,
  handleCancel: PropTypes.func.isRequired,
  handleCreatableSelectInputChange: PropTypes.func.isRequired,
  handleCreatableSelectKeyDown: PropTypes.func.isRequired,
  handleRangeChange: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  household_income: PropTypes.arrayOf(PropTypes.number),
  male_selected: PropTypes.bool,
  onSelectButtonPressed: PropTypes.func.isRequired,
  options: PropTypes.shape({
    education_options: PropTypes.arrayOf(PropTypes.string),
    parental_options: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  parental_status: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  validated: PropTypes.bool,
};

CampaignAudienceFormFragment.defaultProps = {
  age_range_female: [],
  age_range_male: [],
  education: undefined,
  female_selected: false,
  geography: [],
  geography_input: '',
  household_income: [],
  male_selected: false,
  parental_status: undefined,
  validated: undefined,
};
