import React, { Component } from 'react';
import FormUtils from '../common/FormUtils';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import InputLabel from "./InputLabel";

export default class UrlInput extends Component {

  render() {
    const {
      name,
      label,
      tooltip,
      value,
      handleChange
    } = this.props;

    return (
      <Form.Group controlId={name} title={tooltip}>
        <InputLabel label={label} tooltip={tooltip}/>
        <Form.Control
          className="input-v2"
          required
          name={name}
          type="url"
          onChange={handleChange}
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
  tooltip: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};
