import PropTypes from 'prop-types';
import React from 'react';

const LinkButton = ({buttonClass, icon, link, text, tooltip}) => (
  <a href={link} title={tooltip}>
    <button type="button" className={`btn ${buttonClass}`}>
      <span className={`icon ${icon}`}/>
      {text}
    </button>
  </a>
);

LinkButton.propTypes = {
  buttonClass: PropTypes.string,
  tooltip: PropTypes.string,
  icon: PropTypes.string,
  link: PropTypes.string,
  text: PropTypes.string,
};

LinkButton.defaultProps = {
  buttonClass: '',
  icon: '',
  link: '',
  text: '',
};

export default LinkButton;
