import React, { Component, Fragment } from "react";

import Form from "./components/Form";

export default class New extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
    };
  }

  nextStep = () => {
    const { step } = this.state;

    this.setState({
      step: step + 1,
    });
  };

  prevStep = () => {
    const { step } = this.state;

    this.setState({
      step: step - 1,
    });
  };

  render() {
    let step = this.state.step;
    const { page_type, campaign, company, is_client, ...options } = this.props;

    return (
      <Form
        currentStep={step}
        currentCompany={company}
        prevStep={this.prevStep}
        nextStep={this.nextStep}
        options={options}
      />
    );
  }
}
