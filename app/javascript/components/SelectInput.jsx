import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from 'react-bootstrap';
import InputLabel from "./InputLabel";
import Select from "react-select";

export default class SelectInput extends Component {

  render() {
    const {
      name,
      label,
      options,
      value,
      tooltip,
      handleChange
    } = this.props;

    return (
      <Form.Group controlId={name} title={tooltip}>
        <InputLabel label={label} tooltip={tooltip}/>
        <Select
          className="selectV2"
          classNamePrefix="selectV2"
          options={options}
          name={name}
          onChange={handleChange}
          value={value}
        />
      </Form.Group>
    )
  }
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  tooltip: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired
};
