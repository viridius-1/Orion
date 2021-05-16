import React, {Component} from "react";
import AdvertisersGridViewComponent from './components/AdvertisersGridViewComponent';
import LinkButton from "../../components/LinkButton";

export default class AgencyDashboardComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let content;
        const numOfAdvertisers = this.props.advertisers ? this.props.advertisers.length : 0;
        const addAdvertiserLink = `/agencies/${this.props.agency.id}/advertisers/new`;
        if (numOfAdvertisers > 0) {
            content = <AdvertisersGridViewComponent advertisers={this.props.advertisers} agency={this.props.agency} token={this.props.token}/>;
        } else {
            content =
                <div className="row">
                    <div className="col-12">
                        <div className="card no-advertisers-card">
                            <p>You don’t have any advertisers yet.</p>
                            <LinkButton
                                text="Add Advertiser"
                                link={addAdvertiserLink}
                                icon="fas fa-plus-circle icon"
                                buttonClass="btn btn-primary btn-primary-v2"/>
                        </div>
                    </div>
                </div>
        }
        return (
            <div className='agency-dashboard'>
                <div className="row">
                    <div className="col-12">
                        {content}
                    </div>
                </div>
            </div>
        );
    }
}