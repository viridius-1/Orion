import React, { Component } from 'react';
import FormUtils from '../common/FormUtils';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

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
      value
    } = this.props;

    return (
      <Form.Group controlId={name}>
        <Form.Label className="label-v2 default-position">{label}</Form.Label>
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
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired
};
