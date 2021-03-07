import React, {Component} from "react";
import LinkDropdownMenuComponent from "../../../components/LinkDropdownMenuComponent";
import LinkButtonComponent from "../../../components/LinkButtonComponent";

export default class AdvertiserCardComponent extends Component {
    constructor(props) {
        super(props);
    }

    numberOfCampaigns = this.props.client.campaigns.length;
    hasActiveCampaigns = this.numberOfCampaigns > 0;

    getTopCardContent() {
        if (this.hasActiveCampaigns) {
            return (
                <div className="advertiser-card-container">
                    <div className='content-bottom'>
                        <LinkButtonComponent
                            text={`${this.numberOfCampaigns} Active Campaigns`}
                            buttonClass="active-campaigns-btn"
                            link={`/agencies/${this.props.client.agency_id}/clients/${this.props.client.id}/campaigns`}>
                        </LinkButtonComponent>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="advertiser-card-container">
                    <div className='content-center'>
                        <LinkButtonComponent
                            text={'Create campaigns'}
                            icon="fas fa-plus-circle icon"
                            buttonClass="create-campaigns-btn"
                            link={`/agencies/${this.props.client.agency_id}/clients/${this.props.client.id}/campaigns/new`}>
                        </LinkButtonComponent>
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
                        <h4>{this.props.client.name}</h4>
                        <LinkDropdownMenuComponent
                            class="dropdown-menu-button"
                            icon="fas fa-ellipsis-v card-drawer-icon"
                            items={[
                                {
                                    text: "Edit",
                                    icon: "fas fa-pen",
                                    link: `/agencies/${this.props.client.agency_id}/clients/${this.props.client.id}/edit`
                                },
                                {
                                    text: "Duplicate",
                                    icon: "fas fa-copy",
                                    link: `#`
                                },
                                {
                                    text: "Delete",
                                    icon: "fas fa-times-circle",
                                    link: `#`
                                }
                            ]}
                        />
                    </div>
                    {this.getTopCardContent()}
                </div>
                <div className='advertiser-card-bottom'>
                    <label>See details</label>
                </div>
            </div>
        );
    }
}
