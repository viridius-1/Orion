import React, {Component} from "react";
import {Form} from "react-bootstrap";
import FormUtils from "../../../common/FormUtils";
import Select, {components} from "react-select";
import CreatableSelect from 'react-select/creatable';
import Slider from "@material-ui/core/Slider";

export default class CampaignGoalsFormFragment extends Component {
  constructor(props) {
    super(props);
  }

  formId = 'campaign_goals_form';

  _getSelectButtonClass(selected) {
    return selected ? "btn-primary-v2 slim no-focus" : "btn-secondary-v2 slim no-focus";
  }



  render() {
    const DropdownIndicator = (props) => {
      return (
        <components.DropdownIndicator {...props}>
          <i className="fas fa-search"></i>
        </components.DropdownIndicator>
      );
    };
    return (
      <div>
        <h3 className="form-title">Campaign Audience</h3>
        <div className="row">
          <div className="col-6">
            <div className="form-v2">
              <Form noValidate
                    id={this.formId}
                    validated={this.props.validated}
                    onSubmit={this.props.handleSubmit}
                    onKeyPress={() => FormUtils.submitEnter(event, this.formId, this.props.handleSubmit)}>
                <Form.Group controlId="gender">
                  <Form.Label className="label-v2 default-position">Gender</Form.Label>
                  <div>
                    <button className={this._getSelectButtonClass(this.props.male_selected)}
                            name="male_selected"
                            onClick={this.props.onSelectButtonPressed}
                            style={{
                              height: "32px",
                              width: "86px"
                            }}>
                      Male
                    </button>
                    <button className={this._getSelectButtonClass(this.props.female_selected)}
                            name="female_selected"
                            onClick={this.props.onSelectButtonPressed}
                            style={{
                              height: "32px",
                              width: "94px",
                              marginLeft: "15px"
                            }}>
                      Female
                    </button>
                  </div>
                </Form.Group>
                <Form.Group controlId="age_range_male">
                  <Form.Label className="label-v2 default-position">Male Age Range</Form.Label>
                  <div className="slider-group row col-8">
                    <div className="before-label">
                      <span>{this.props.age_range_male[0]}</span>
                    </div>
                    <Slider
                      className="slider"
                      value={this.props.age_range_male}
                      disabled={!this.props.male_selected}
                      min={18}
                      max={99}
                      name="age_range_male"
                      valueLabelDisplay="off"
                      onChange={(event, range) => this.props.handleRangeChange(event, range, 'age_range_male')}
                    />
                    <div className="after-label">
                      <span>{this.props.age_range_male[1]}</span>
                    </div>
                  </div>
                </Form.Group>
                <Form.Group controlId="age_range_female">
                  <Form.Label className="label-v2 default-position">Female Age Range</Form.Label>
                  <div className="slider-group row col-8">
                    <div className="before-label">
                      <span>{this.props.age_range_female[0]}</span>
                    </div>
                    <Slider
                      className="slider"
                      value={this.props.age_range_female}
                      disabled={!this.props.female_selected}
                      min={18}
                      max={99}
                      name="age_range_female"
                      valueLabelDisplay="off"
                      onChange={(event, range) => this.props.handleRangeChange(event, range, 'age_range_female')}
                    />
                    <div className="after-label">
                      <span>{this.props.age_range_female[1]}</span>
                    </div>
                  </div>
                </Form.Group>
                <Form.Group controlId="household_income">
                  <Form.Label className="label-v2 default-position">Household Income</Form.Label>
                  <div className="slider-group row col-8">
                    <div className="before-label">
                      <span>${this.props.household_income[0]}K</span>
                    </div>
                    <Slider
                      className="slider"
                      value={this.props.household_income}
                      min={50}
                      max={500}
                      name="household_income"
                      valueLabelDisplay="off"
                      onChange={(event, range) => this.props.handleRangeChange(event, range, 'household_income')}
                    />
                    <div className="after-label">
                      <span>${this.props.household_income[1]}K</span>
                    </div>
                  </div>
                </Form.Group>
                <Form.Group controlId="education">
                  <Form.Label className="label-v2">Education</Form.Label>
                  <Select className="selectV2"
                          classNamePrefix='selectV2'
                          options={FormUtils.buildOptions(this.props.options.education_options)}
                          name='education'
                          onChange={this.props.handleSelectChange}
                          value={this.props.education}
                  />
                </Form.Group>
                <Form.Group controlId="parental_status">
                  <Form.Label className="label-v2">Parental Status</Form.Label>
                  <Select className="selectV2"
                          classNamePrefix='selectV2'
                          options={FormUtils.buildOptions(this.props.options.parental_options)}
                          name='parental_status'
                          onChange={this.props.handleSelectChange}
                          value={this.props.parental_status}
                  />
                </Form.Group>
                <Form.Group controlId="geography">
                  <Form.Label className="label-v2">Geography</Form.Label>
                  <CreatableSelect
                    className="multiSelectV2"
                    classNamePrefix='multiSelectV2'
                    components={{DropdownIndicator}}
                    isClearable
                    isMulti
                    menuIsOpen={false}
                    name='geography'
                    onChange={(value) => this.props.handleSelectChange(value, {name: 'geography'})}
                    onInputChange={(value) => this.props.handleCreatableSelectInputChange(value, {name: 'geography_input'} )}
                    onKeyDown={(event) => this.props.handleCreatableSelectKeyDown(event, 'geography', 'geography_input')}
                    placeholder="Type something and press enter..."
                    value={this.props.geography}
                    inputValue={this.props.geography_input}
                  />
                  <span style={{fontSize: '12px'}}>Enter countries, states, provinces, DMAs, cities, or ZIP/postal codes.</span>
                </Form.Group>
                <div className="form-group">
                  <button className="btn btn-secondary-v2" type="cancel" onClick={this.props.handleCancel}>Back</button>
                  <button className="btn btn-primary-v2 float-right" type="submit" style={{width: "61%"}}>
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
