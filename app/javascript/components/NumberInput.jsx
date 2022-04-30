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
      value,
      allowDecimal,
      className,
      prepend
    } = this.props;

    return (
      <Form.Group controlId={name} className={className}>
        <Form.Label className="label-v2">{label}</Form.Label>
        <Form.Control
          className={`input-v2 ${prepend ? "right" : ""}`}
          required
          name={name}
          onKeyDown={allowDecimal ? FormUtils.blockE : FormUtils.blockNonNum}
          type="text"
          onChange={this.handleNumberChange}
          value={FormUtils.formatNumber(value)}
        />
        {prepend && <div className="input-v2-prepend"><span>{prepend}</span></div>}
      </Form.Group>
    )
  }
}

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  allowDecimal: PropTypes.bool,
  className: PropTypes.string,
  prepend: PropTypes.string
};

NumberInput.defaultProps = {
  allowDecimal: false,
  className: ""
}
