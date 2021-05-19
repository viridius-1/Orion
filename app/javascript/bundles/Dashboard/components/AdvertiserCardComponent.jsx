import React, {Component} from "react";
import LinkDropdownMenu from "../../../components/LinkDropdownMenu";
import LinkButton from "../../../components/LinkButton";

export default class AdvertiserCardComponent extends Component {
  constructor(props) {
    super(props);
  }

  numberOfCampaigns = this.props.advertiser.campaigns.length;
  hasActiveCampaigns = this.numberOfCampaigns > 0;

  getTopCardContent() {
    if (this.hasActiveCampaigns) {
      return (
        <div className="advertiser-card-container">
          <div className='content-bottom'>
            <LinkButton
              text={`${this.numberOfCampaigns} Active Campaigns`}
              buttonClass="active-campaigns-btn"
              icon=""
              link={`/advertisers/${this.props.advertiser.id}/campaigns`}>
            </LinkButton>
          </div>
        </div>
      );
    } else {
      return (
        <div className="advertiser-card-container">
          <div className='content-center'>
            <LinkButton
              text={'Create campaigns'}
              icon="fas fa-plus-circle icon"
              buttonClass="create-campaigns-btn"
              link={`/advertisers/${this.props.advertiser.id}/campaigns/new`}>
            </LinkButton>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className='advertiser-card'>
        <div className={this.hasActiveCampaigns ? 'advertiser-card-top' : 'advertiser-card-top' + ' grey'}>
          <div>
            <h4>{this.props.advertiser.name}</h4>
            <LinkDropdownMenu
              class="dropdown-menu-button"
              icon="fas fa-ellipsis-v card-drawer-icon"
              token={this.props.token}
              items={[
                {
                  text: "Edit",
                  icon: "fas fa-pen",
                  link: `/agencies/${this.props.advertiser.agency_id}/advertisers/${this.props.advertiser.id}/edit`
                },
                {
                  text: "Duplicate",
                  icon: "fas fa-copy",
                  link: `#`
                },
                {
                  text: "Delete",
                  icon: "fas fa-times-circle",
                  link: `/agencies/${this.props.advertiser.agency_id}/advertisers/${this.props.advertiser.id}`,
                  action: 'delete'
                }
              ]}
            />
          </div>
          {this.getTopCardContent()}
        </div>
      </div>
    );
  }
}
