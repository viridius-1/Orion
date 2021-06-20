import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinkDropdownMenu from '../../../components/LinkDropdownMenu';
import LinkButton from '../../../components/LinkButton';

export default class AdvertiserCardComponent extends Component {
  constructor(props) {
    super(props);

    const { advertiser: { campaigns } } = props;

    this.numberOfCampaigns = campaigns.length;
    this.hasActiveCampaigns = this.numberOfCampaigns > 0;
  }

  getTopCardContent() {
    const { advertiser: { id } } = this.props;

    if (this.hasActiveCampaigns) {
      return (
        <div className="advertiser-card-container">
          <div className="content-bottom">
            <LinkButton
              text={`${this.numberOfCampaigns} Active Campaigns`}
              buttonClass="active-campaigns-btn"
              icon=""
              link={`/vendors/${id}/campaigns`}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="advertiser-card-container">
        <div className="content-center">
          <LinkButton
            text="Create campaigns"
            icon="fas fa-plus-circle icon"
            buttonClass="create-campaigns-btn"
            link={`/vendors/${id}/campaigns/new`}
          />
        </div>
      </div>
    );
  }

  render() {
    const {
      advertiser: {
        agency_id: agencyId,
        id,
        name,
      },
      token,
    } = this.props;

    return (
      <div className="advertiser-card">
        <div className={this.hasActiveCampaigns ? 'advertiser-card-top' : 'advertiser-card-top grey'}>
          <div>
            <h4>{name}</h4>
            <LinkDropdownMenu
              class="dropdown-menu-button"
              icon="fas fa-ellipsis-v card-drawer-icon"
              token={token}
              items={[
                {
                  icon: 'fas fa-pen',
                  id: 'edit',
                  link: `/agencies/${agencyId}/vendors/${id}/edit`,
                  text: 'Edit',
                },
                {
                  icon: 'fas fa-copy',
                  id: 'duplicate',
                  link: '#',
                  text: 'Duplicate',
                },
                {
                  action: 'delete',
                  icon: 'fas fa-times-circle',
                  id: 'delete',
                  link: `/agencies/${agencyId}/vendors/${id}`,
                  text: 'Delete',
                },
              ]}
            />
          </div>
          {this.getTopCardContent()}
        </div>
      </div>
    );
  }
}

AdvertiserCardComponent.propTypes = {
  advertiser: PropTypes.shape({
    agency_id: PropTypes.number,
    campaigns: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  token: PropTypes.string,
};

AdvertiserCardComponent.defaultProps = {
  token: undefined,
};
