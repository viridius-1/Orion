import React, { Component } from 'react';
import FormUtils from '../common/FormUtils';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export default class TextInput extends Component {
  handleTextChange = (event) => {
    const {
      handleChange
    } = this.props

    handleChange(event.target.name, event.target.value);
  }

  render() {
    const {
      name,
      label,
      value
    } = this.props;

    return (
      <Form.Group controlId={name}>
        <Form.Label className="label-v2">{label}</Form.Label>
        <Form.Control
          className="input-v2"
          required
          name={name}
          type="text"
          onChange={this.handleTextChange}
          value={value}
        />
        <Form.Control.Feedback type="invalid">
          {label} is required
        </Form.Control.Feedback>
      </Form.Group>
    )
  }
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};
