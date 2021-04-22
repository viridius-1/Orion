import React, {Component} from "react";
import ClientsGridViewComponent from './components/ClientsGridViewComponent';
import LinkButton from "../../components/LinkButton";

export default class AgencyDashboardComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let content;
        const numOfClients = this.props.clients ? this.props.clients.length : 0;
        const addAdvertiserLink = `/agencies/${this.props.agency.id}/clients/new`;
        if (numOfClients > 0) {
            content = <ClientsGridViewComponent clients={this.props.clients} agency={this.props.agency} token={this.props.token}/>;
        } else {
            content =
                <div className="row">
                    <div className="col-12">
                        <div className="card no-clients-card">
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