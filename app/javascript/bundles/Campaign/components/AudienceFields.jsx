import React, { Component, Fragment } from "react";

export default class AudienceFields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      selectedCategory: {},
      segments: [],
      selectedSegment: {},
    };
  }

  showOptions(values) {
    if (values.length > 0) {
      return values.map((value) => (
        <option value={value.id}>{`${value.name}`}</option>
      ));
    } else {
      return <option>Select A Provider</option>;
    }
  }

  getSegmentData = (event) => {
    event.preventDefault();

    const categoryId = event.target.value;
    const { segments } = this.props.audiences;

    const categorySegments = segments.filter(
      (segment) => segment.category_id == categoryId
    );

    this.setState({ segments: categorySegments });
  };

  showSegmentField(segments) {
    // Grab the audience cat and get the segment
    return (
      <div className="col col-6">
        <div className="form-group segment">
          <label>Audience Segment</label>
          <select className="form-control">{this.showOptions(segments)}</select>
        </div>
      </div>
    );
  }

  getCategoriesData = (event) => {
    // Grab the provider id and call the Audience Cat and the sub cat
    event.preventDefault();

    const providerId = event.target.value;
    const { categories } = this.props.audiences;

    const providerCategories = categories.filter(
      (category) => category.provider_id == providerId
    );

    // restructure the data here

    this.setState({ categories: providerCategories });
  };

  showCategoryField(categories) {
    return (
      <div className="col col-6">
        <div className="form-group category">
          <label>Audience Category</label>
          <select className="form-control" onChange={this.getSegmentData}>
            {this.showOptions(categories)}
          </select>
        </div>
      </div>
    );
  }

  showAudienceFields() {
    const { providers } = this.props.audiences;
    const { categories, segments } = this.state;

    return (
      <Fragment>
        <div className="col col-6">
          <div className="form-group provider">
            <label>Audience Provider</label>
            <select className="form-control" onChange={this.getCategoriesData}>
              <option>Select A Provider</option>
              {providers.map((provider) => (
                <option value={provider.id}>{`${provider.name}`}</option>
              ))}
            </select>
          </div>
        </div>
        {this.showCategoryField(categories)}
        {this.showSegmentField(segments)}
      </Fragment>
    );
  }

  render() {
    return <Fragment>{this.showAudienceFields()}</Fragment>;
  }
}
