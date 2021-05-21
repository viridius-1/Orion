import React, { Component } from 'react';
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
    const addAdvertiserLink = `/agencies/${this.props.agency.id}/advertisers/new`;
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
          {this.props.advertisers.filter((advertiser) => {
            if (this.state.searchTerm === '') {
              return advertiser;
            } if (advertiser.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
              return advertiser;
            }
          }).map((advertiser) => (
            <div className="col-4 grid-item" key={advertiser.id}>
              <AdvertiserCardComponent advertiser={advertiser} token={this.props.token} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
