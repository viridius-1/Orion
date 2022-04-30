import React, { Component } from 'react';
import FormUtils from '../common/FormUtils';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export default class UrlInput extends Component {
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
          type="url"
          onChange={this.handleTextChange}
          value={value}
        />
        <Form.Control.Feedback type="invalid">
          {label} is invalid
        </Form.Control.Feedback>
      </Form.Group>
    )
  }
}

UrlInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};
