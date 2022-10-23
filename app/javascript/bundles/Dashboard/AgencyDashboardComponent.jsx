import React from 'react';
import PropTypes from 'prop-types';
import AdvertisersGridViewComponent from './components/AdvertisersGridViewComponent';
import LinkButton from '../../components/LinkButton';

const AgencyDashboardComponent = ({
  advertisers,
  agency,
  annual_revenue_options: annualRevenueOptions,
  token,
}) => {
  const numOfAdvertisers = advertisers ? advertisers.length : 0;
  const addAdvertiserLink = `/agencies/${agency.id}/vendors/new`;

  let content;
  if (numOfAdvertisers > 0) {
    content = (
      <AdvertisersGridViewComponent
        advertisers={advertisers}
        agency={agency}
        annualRevenueOptions={annualRevenueOptions}
        token={token}
      />
    );
  } else {
    content = (
      <div className="row">
        <div className="col-12">
          <div className="card no-advertisers-card">
            <p>You don’t have any advertisers yet.</p>
            <LinkButton
              text="Add Advertiser"
              link={addAdvertiserLink}
              icon="fas fa-plus-circle icon"
              buttonClass="btn btn-primary btn-primary-v2 ht-50"
              tooltip="Click here to build a new advertiser"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="agency-dashboard">
      <div className="row">
        <div className="col-12">
          {content}
        </div>
      </div>
    </div>
  );
};

AgencyDashboardComponent.propTypes = {
  advertisers: PropTypes.arrayOf(PropTypes.object).isRequired,
  agency: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  annual_revenue_options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      range: PropTypes.arrayOf(PropTypes.number),
    }),
  ).isRequired,
  token: PropTypes.string.isRequired,
};

export default AgencyDashboardComponent;
