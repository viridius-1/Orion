import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import InputLabel from "./InputLabel";

export default class SwitchInput extends Component {
  handleSwitchChange = () => {
    const {
      name,
      value,
      handleChange
    } = this.props;

    handleChange(name, !value)
  }

  render() {
    const {
      name,
      label,
      value,
      tooltip
    } = this.props;

    return (
      <Form.Group controlId={name} title={tooltip}>
        <InputLabel label={label} tooltip={tooltip} className="default-position"/>
        <Form.Switch
          type="switch"
          id={label}
          defaultChecked={value}
          onChange={this.handleSwitchChange}
        />
      </Form.Group>
    )
  }
}

SwitchInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired
};
