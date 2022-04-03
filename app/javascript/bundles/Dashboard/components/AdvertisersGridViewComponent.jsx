import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import LinkButton from '../../../components/LinkButton';
import FormUtils from '../../../common/FormUtils';
import AdvertiserCardComponent from './AdvertiserCardComponent';

export default class AdvertisersGridViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { annualRevenueSearchValue: undefined, searchTerm: '' };
  }

  onSearchInputChange(searchText) {
    this.setState({
      searchTerm: searchText,
    });
  }

  onSelectChange = (selectedOption) => {
    this.setState({ annualRevenueSearchValue: selectedOption });
  }

  filteredAdvertisers = () => {
    let filteredAdvertisers;
    let minAnnualRevenue;
    let maxAnnualRevenue;

    const { advertisers, annualRevenueOptions } = this.props;
    const { annualRevenueSearchValue, searchTerm } = this.state;

    if (annualRevenueSearchValue) {
      const revenueRange = annualRevenueOptions[annualRevenueSearchValue.value].range;

      if (revenueRange.length === 2) {
        [minAnnualRevenue, maxAnnualRevenue] = revenueRange;
      } else if (revenueRange.length === 1) {
        [minAnnualRevenue] = revenueRange;
      }
    }

    filteredAdvertisers = searchTerm === '' ? advertisers : advertisers.filter((advertiser) => advertiser.name.toLowerCase().includes(searchTerm.toLowerCase()));
    filteredAdvertisers = !annualRevenueSearchValue ? filteredAdvertisers
      : filteredAdvertisers.filter(({ annual_revenue: annualRevenue }) => {
        if (minAnnualRevenue !== undefined && maxAnnualRevenue !== undefined) {
          if (annualRevenue >= minAnnualRevenue && annualRevenue <= maxAnnualRevenue) {
            return true;
          }
        } else if (minAnnualRevenue !== undefined) {
          return true;
        }

        return false;
      });

    return filteredAdvertisers;
  }

  render() {
    const {
      agency: {
        id,
      },
      annualRevenueOptions,
      token,
    } = this.props;

    const { annualRevenueSearchValue } = this.state;

    const filteredAdvertiserComponents = this.filteredAdvertisers();

    const addAdvertiserLink = `/agencies/${id}/vendors/new`;
    return (
      <div>
        <div className="row">
          <div className="col-md-4 col-sm-6 col-xs-12 grid-item">
            <input
              className="form-control"
              type="text"
              placeholder="Search advertisers"
              onChange={(event) => this.onSearchInputChange(event.target.value)}
            />
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12 grid-item">
            <Select
              className="selectV2 annual-revenue-filter"
              classNamePrefix="selectV2"
              options={FormUtils.buildAnnualRevenueOptions(annualRevenueOptions)}
              onChange={this.onSelectChange}
              value={annualRevenueSearchValue}
              placeholder="Filter by annual revenue"
              isClearable
              isSearchable={false}
            />
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12 grid-item">
            <LinkButton
              text="Add Advertiser"
              link={addAdvertiserLink}
              icon="fas fa-plus-circle icon"
              buttonClass="btn btn-primary btn-primary-v2 ht-50"
            />
          </div>
        </div>
        <div className="row">
          {filteredAdvertiserComponents.length > 0
            ? filteredAdvertiserComponents.map((advertiser) => (
              <div className="col-lg-4 col-md-6 col-sm-12 grid-item" key={advertiser.id}>
                <AdvertiserCardComponent advertiser={advertiser} token={token} />
              </div>
            )) : <div className="no-results-message">No results found</div>}
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
  annualRevenueOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      range: PropTypes.arrayOf(PropTypes.number),
    }),
  ).isRequired,
  token: PropTypes.string.isRequired,
};
