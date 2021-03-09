import React, { Component } from "react";
import { Tabs } from "react-simple-tabs-component";
import CampaignIndexViewComponent from "./CampaignIndexViewComponent";

export default class CampaignDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 0,
        };
    }

    setSelectedTab(index) {
        this.setState({
            selectedTab: index,
        });
    }

    campaignGoalsTab() {
        return (
            <div style={{ padding: "0 20px" }}>
                <div className="row">
                    <div className="col-8 grid-item">
                        <div className="row">
                            <div className="col-10 grid-item">
                                <div className="details-card">
                                    <h6>Goal</h6>
                                    <label className="goal-label">
                                        Awareness
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 grid-item">
                                <h6>Budget</h6>
                                <label>
                                    {CampaignIndexViewComponent.moneyFormatter(
                                        450000
                                    )}
                                </label>
                            </div>
                            <div className="col-3 grid-item">
                                <h6>CPA Goal</h6>
                                <label>$20</label>
                            </div>
                            <div className="col-4 grid-item">
                                <h6>Target Conversion Rate</h6>
                                <label>2.5%</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 grid-item">
                                <h6>ROAS Goal</h6>
                                <label>230%</label>
                            </div>
                            <div className="col-3 grid-item">
                                <h6>KPI</h6>
                                <label>Impressions</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 grid-item">
                        <img
                            src={require("../../../assets/images/geography-campaign.svg")}
                            style={{ zoom: "81%" }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    campaignAudienceTab() {
        return (
            <div style={{ padding: "0 20px" }}>
                <div className="row">
                    <div className="col-8 grid-item">
                        <div className="row">
                            <div className="col-4 grid-item">
                                <h6>Gender</h6>
                                <label>Male & Female</label>
                            </div>
                            <div className="col-4 grid-item">
                                <h6>Age</h6>
                                <label>Male: 32-83</label>
                                <br />
                                <label>Female: 20-60</label>
                            </div>
                            <div className="col-4 grid-item">
                                <h6>Geography</h6>
                                <label>Canada</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 grid-item">
                                <h6>Household Income</h6>
                                <label>
                                    {CampaignIndexViewComponent.moneyFormatter(
                                        120000
                                    )}
                                </label>
                            </div>
                            <div className="col-4 grid-item">
                                <h6>Education</h6>
                                <label>Highschool</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 grid-item">
                                <h6>Parental Status</h6>
                                <label>Married</label>
                            </div>
                            <div className="col-8 grid-item">
                                <h6>Language(s)</h6>
                                <label>English, French, German, Spanish</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 grid-item"></div>
                        </div>
                        <div className="row">
                            <div className="col-12 grid-item">
                                <img
                                    src={require("../../../assets/images/affinities-card.svg")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-4 grid-item">
                        <img
                            src={require("../../../assets/images/geography-campaign.svg")}
                            style={{ zoom: "81%" }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    tabs = [
        {
            label: "Campaign Audience", // Tab title
            index: 0, // Tab index
            Component: this.campaignAudienceTab, // Tab Component
        },
        {
            label: "Goals",
            index: 1,
            Component: this.campaignGoalsTab,
        },
    ];

    render() {
        return (
            <div className="campaign-details">
                <div className="row">
                    <div className="col-4 grid-item">
                        <div className="details-card">
                            <h6>Status</h6>
                            <div style={{ display: "inline-flex" }}>
                                <span className="dot orange" />
                                <label>Pending Approval</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 grid-item">
                        <div className="details-card">
                            <h6>Campaign Length</h6>
                            <label>{`${this.props.campaign?.flight_start_date?.replaceAll(
                                "-",
                                "/"
                            )} - ${this.props.campaign?.flight_end_date?.replaceAll(
                                "-",
                                "/"
                            )}`}</label>
                        </div>
                    </div>
                    <div className="col-4 grid-item">
                        <div className="details-card">
                            <h6>Destination URL</h6>
                            <label>{this.props.client.website}</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 grid-item">
                        <div className="details-card filled">
                            <Tabs
                                tabs={this.tabs}
                                onClick={(event) => this.setSelectedTab(event)}
                                selectedTab={this.state.selectedTab}
                                className="tabs-component"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
