import React, {Component} from "react";

export default class Step extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <img
        src={require(`../../../../assets/images/star_step_${this.props.step}.svg`)}
        alt={`Step: ${this.props.step}`}
      />
    );
  }
}
