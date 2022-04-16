import React, { Component } from 'react';
import FormUtils from '../common/FormUtils';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export default class NumberInput extends Component {
  handleNumberChange = (event) => {
    const {
      handleChange
    } = this.props

    let number = event.target.value.replaceAll(',', '').replaceAll('-', '')

    // limit to 2 decimal places
    let [wholePart, decimalPart] = number.split('.')
    if (decimalPart) {
      decimalPart = decimalPart.substring(0, 2)
      number = `${wholePart}.${decimalPart}`
    }

    // js can't handle parsing of huge numbers
    if (number.length >= 16) {
      event.preventDefault()
      return
    }

    if (number === '') {
      handleChange(event.target.name, '');
      return
    }

    if (Number(number) !== 0 && !Number(number)) {
      event.preventDefault()
      return
    }

    if (Number(number) < 0) {
      handleChange(event.target.name, 0)
      return
    }

    handleChange(event.target.name, number)
  }

  render() {
    const {
      name,
      label,
      handleChange,
      value
    } = this.props;

    return (
      <Form.Group controlId={name}>
        <Form.Label className="label-v2">{label}</Form.Label>
        <Form.Control
          className="input-v2"
          required
          name={name}
          onKeyDown={FormUtils.blockNonNum}
          type="text"
          onChange={this.handleNumberChange}
          value={FormUtils.formatNumber(value)}
        />
        <Form.Control.Feedback type="invalid">
          {label} is required
        </Form.Control.Feedback>
      </Form.Group>
    )
  }
}

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};
