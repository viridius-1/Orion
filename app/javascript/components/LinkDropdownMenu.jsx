import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LinkDropdownMenu extends Component {
  doAction(event, action, link) {
    const { token } = this.props;

    if (action === 'delete') {
      event.preventDefault();
      const body = JSON.stringify({
        authenticity_token: token,
      });
      fetch(link, {
        method: action,
        headers: { 'Content-Type': 'application/json' },
        body,
      }).then((response) => {
        if (response.redirected) {
          window.location.href = response.url;
        }
      });
    }
  }

  render() {
    const {
      buttonClass,
      class: dropdownClass,
      icon,
      items,
    } = this.props;

    return (
      <div className={`dropdown open ${dropdownClass}`}>
        <button
          className={`btn ${buttonClass}`}
          type="button"
          id="dropdownMenu1"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          style={{ padding: '0px' }}
        >
          <i className={icon} />
        </button>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
          {items.map((item) => (
            <a
              className="dropdown-item menu-item"
              href={item.link}
              key={item.id}
              onClick={(event) => this.doAction(event, item.action, item.link)}
            >
              <i className={item.icon} />
              {item.text}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

LinkDropdownMenu.propTypes = {
  buttonClass: PropTypes.string,
  class: PropTypes.string,
  icon: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      action: PropTypes.string,
      icon: PropTypes.string,
      id: PropTypes.string,
      link: PropTypes.string,
      text: PropTypes.string,
    }),
  ).isRequired,
  token: PropTypes.string.isRequired,
};

LinkDropdownMenu.defaultProps = {
  buttonClass: '',
  class: '',
  icon: '',
};
