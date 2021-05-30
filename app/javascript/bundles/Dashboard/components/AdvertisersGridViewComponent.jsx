import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinkButton from '../../../components/LinkButton';
import AdvertiserCardComponent from './AdvertiserCardComponent';

export default class AdvertisersGridViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '' };
  }

  onSearchInputChange(searchText) {
    this.setState({
      searchTerm: searchText,
    });
  }

  render() {
    const {
      advertisers,
      agency: {
        id,
      },
      token,
    } = this.props;

    const { searchTerm } = this.state;

    const addAdvertiserLink = `/agencies/${id}/advertisers/new`;
    return (
      <div>
        <div className="row">
          <div className="col-4 grid-item">
            <input
              className="form-control"
              type="text"
              placeholder="Search advertisers"
              onChange={(event) => this.onSearchInputChange(event.target.value)}
            />
          </div>
          <div className="col-4 grid-item">
            <div className="input-group">
              <input type="text" className="form-control" style={{ borderRight: 'none' }} placeholder="Filter by annual revenue" />
              <div className="input-group-append">
                <button className="btn btn-secondary btn-append-right-v2" type="button">
                  <i className="fas fa-chevron-down" />
                </button>
              </div>
            </div>
          </div>
          <div className="col-4 grid-item">
            <LinkButton
              text="Add Advertiser"
              link={addAdvertiserLink}
              icon="fas fa-plus-circle icon"
              buttonClass="btn btn-primary btn-primary-v2"
            />
          </div>
        </div>
        <div className="row">
          {(searchTerm === '' ? advertisers : advertisers.filter((advertiser) => advertiser.name.toLowerCase().includes(searchTerm.toLowerCase()))).map((advertiser) => (
            <div className="col-4 grid-item" key={advertiser.id}>
              <AdvertiserCardComponent advertiser={advertiser} token={token} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

AdvertisersGridViewComponent.propTypes = {
  advertisers: PropTypes.arrayOf(PropTypes.object).isRequired,
  agency: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  token: PropTypes.string.isRequired,
};
