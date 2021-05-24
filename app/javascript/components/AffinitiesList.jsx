import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CancelSvg from '../../assets/images/cancel.svg';

const getParentLabel = (parent) => {
  if (parent) {
    return (
      <div style={{ fontSize: '10px', color: '#828282' }}>
        {parent}
      </div>
    );
  }
  return (<div />);
};

const getNameLabel = (name) => (
  <div style={{ fontSize: '12px', color: '#4F4F4F' }}>
    {name}
  </div>
);

export default class AffinitiesList extends Component {
  _getAffinities() {
    const { affinities, onCloseAffinity } = this.props;

    const affinitiesKeys = Object.keys(affinities);
    return affinitiesKeys.map((key) => (
      <div key={key} className="pill affinity">
        <div style={{ margin: 'auto' }}>
          {getParentLabel(affinities[key].parent)}
          {getNameLabel(affinities[key].name)}
        </div>
        { onCloseAffinity && (
        <button type="button" className="btn btn-sm" onClick={() => onCloseAffinity(key)}>
          <img
            alt="cancel"
            src={CancelSvg}
            style={{ width: '10px' }}
          />
        </button>
        )}
      </div>
    ));
  }

  render() {
    return (
      <div>
        {this._getAffinities()}
      </div>
    );
  }
}

AffinitiesList.propTypes = {
  affinities: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string,
      parent: PropTypes.string,
    }),
  ).isRequired,
  onCloseAffinity: PropTypes.func,
};

AffinitiesList.defaultProps = {
  onCloseAffinity: undefined,
};
