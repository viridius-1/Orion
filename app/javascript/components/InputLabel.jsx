import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from 'react-bootstrap';

export default class InputLabel extends Component {

  render() {
    const {
      label,
      tooltip,
      prepend,
      className
    } = this.props;

    const left = prepend ? "25px" :"";
    return (
      <div className={`label-v2 ${className}`} style={{paddingLeft: left}}>
        <Form.Label>{label}</Form.Label>
        {tooltip ? <i className="fas fa-info-circle info-icon" style={{paddingLeft: '5px'}} title={tooltip}/> : <></>}
      </div>
    )
  }
}

InputLabel.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  tooltip: PropTypes.string,
  prepend: PropTypes.bool
};
