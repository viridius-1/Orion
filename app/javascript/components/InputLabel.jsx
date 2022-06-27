import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from 'react-bootstrap';

export default class InputLabel extends Component {

  render() {
    const {
      label,
      tooltip,
      prepend
    } = this.props;

    const padding = prepend ? '25px': '5px';
    return (
      <div className="label-v2">
        <Form.Label>{label}</Form.Label>
        {tooltip ? <i className="fas fa-info-circle info-icon" style={{paddingLeft: padding}} title={tooltip}/> : <></>}
      </div>
    )
  }
}

InputLabel.propTypes = {
  label: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
  prepend: PropTypes.string
};
