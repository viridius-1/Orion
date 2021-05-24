import React from 'react';
import PropTypes from 'prop-types';

const Step = ({ step }) => (
  <img
    src={require(`../../../../assets/images/star_step_${step}.svg`)} // eslint-disable-line
    alt={`Step: ${step}`}
  />
);

Step.propTypes = {
  step: PropTypes.number.isRequired,
};

export default Step;
