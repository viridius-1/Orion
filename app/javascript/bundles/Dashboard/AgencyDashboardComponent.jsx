import React from 'react';
import PropTypes from 'prop-types';
import AdvertisersGridViewComponent from './components/AdvertisersGridViewComponent';
import LinkButton from '../../components/LinkButton';

const AgencyDashboardComponent = ({ advertisers, agency, token }) => {
  const numOfAdvertisers = advertisers ? advertisers.length : 0;
  const addAdvertiserLink = `/agencies/${agency.id}/advertisers/new`;

  let content;
  if (numOfAdvertisers > 0) {
    content = (
      <AdvertisersGridViewComponent
        advertisers={advertisers}
        agency={agency}
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
              buttonClass="btn btn-primary btn-primary-v2"
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
  agency: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default AgencyDashboardComponent;
