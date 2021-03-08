import React, {Component} from "react";
import LinkButtonComponent from "../../../components/LinkButtonComponent";
import AdvertiserCardComponent from "./AdvertiserCardComponent";

export default class ClientsGridViewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {searchTerm: ''};
    }

    onSearchInputChange(searchText) {
        this.setState({
            searchTerm: searchText
        });
    }

    render() {
        const addAdvertiserLink = `/agencies/${this.props.agency.id}/clients/new`;
        return (
            <div>
                <div className="row">
                    <div className="col-4 grid-item">
                        <input className="form-control" type="text" placeholder="Search advertisers"
                               onChange={event => this.onSearchInputChange(event.target.value)}/>
                    </div>
                    <div className="col-4 grid-item">
                        <div className="input-group">
                            <input type="text" className="form-control" style={{borderRight: "none"}} placeholder="Filter by annual revenue"/>
                            <div className="input-group-append">
                                <button className="btn btn-secondary btn-secondary-v2" type="button">
                                    <i className="fas fa-chevron-down"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='col-4 grid-item'>
                        <LinkButtonComponent
                            text="Add Advertiser"
                            link={addAdvertiserLink}
                            icon="fas fa-plus-circle icon"
                            buttonClass="btn btn-primary btn-primary-v2"/>
                    </div>
                </div>
                <div className="row">
                    {this.props.clients.filter((client) => {
                        if (this.state.searchTerm === "") {
                            return client;
                        } else if (client.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                            return client;
                        }
                    }).map(client => {
                        return (
                            <div className='col-4 grid-item' key={client.id}>
                                <AdvertiserCardComponent client={client} token={this.props.token}/>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
