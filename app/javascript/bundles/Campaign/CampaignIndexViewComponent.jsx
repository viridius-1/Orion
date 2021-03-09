import React, { Component } from "react";
import LinkButtonComponent from "../../components/LinkButtonComponent";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

export default class CampaignIndexViewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            tableData: this.getUpdatedTableData(""),
        };
    }

    onSearchInputChange(searchText) {
        this.setState({
            searchTerm: searchText,
            tableData: this.getUpdatedTableData(searchText),
        });
    }

    getUpdatedTableData(searchText) {
        let data = this.props.campaigns;
        data = data.filter((campaign) => {
            if (searchText === "") {
                return campaign;
            } else if (
                campaign.name.toLowerCase().includes(searchText.toLowerCase())
            ) {
                return campaign;
            }
        });
        data.map((campaign) => {
            campaign.flight = `${campaign?.flight_start_date?.replaceAll(
                "-",
                "/"
            )} - ${campaign?.flight_end_date?.replaceAll("-", "/")}`;
            campaign.budget_used = Math.floor(Math.random() * 91) + 10;
            campaign.link = `${this.props.link}${campaign.id}`;
        });

        return data;
    }

    statusFormatter() {
        return (
            <div style={{ display: "flex" }}>
                <span className="dot orange" />
            </div>
        );
    }

    static getProgressBarColor(value) {
        const hue = (value * 1.2).toString(10);
        return `hsl(${hue}, 100%, 40%)`;
    }

    moneyFormatter(row) {
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        });
        return `${formatter.format(row)} CAD`;
    }

    budgetUsedFormatter(row) {
        const color = CampaignIndexViewComponent.getProgressBarColor(row);
        return (
            <div className="budget-used-cell">
                <p>{`${row}%`}</p>
                <div className="budget-used-bar">
                    <div
                        className="budget-used-bar-inside"
                        style={{
                            background: color,
                            width: `${row}px`,
                        }}
                    />
                </div>
            </div>
        );
    }

    getSortCaret() {
        return <i className="fas fa-sort sort-caret" />;
    }

    onRowClick(row, cell) {
        console.log(cell);
        window.location.assign(cell.link);
    }

    columns = [
        {
            dataField: "status",
            text: "Status",
            formatter: this.statusFormatter,
            headerStyle: () => {
                return { width: "80px" };
            },
        },
        {
            dataField: "name",
            text: "Campaign",
            sort: true,
            sortCaret: this.getSortCaret,
        },
        {
            dataField: "flight",
            text: "Flight",
            sort: true,
            sortCaret: this.getSortCaret,
        },
        {
            dataField: "budget",
            text: "Total Budget",
            sort: true,
            sortCaret: this.getSortCaret,
            formatter: this.moneyFormatter,
            style: () => {
                return { textAlign: "center" };
            },
            headerStyle: () => {
                return { textAlign: "center" };
            },
        },
        {
            dataField: "budget_used",
            text: "Budget Used",
            sort: true,
            sortCaret: this.getSortCaret,
            formatter: this.budgetUsedFormatter,
            headerStyle: () => {
                return { textAlign: "center" };
            },
        },
        {
            dataField: "goals",
            text: "Goals",
            sort: true,
            sortCaret: () => {
                return <i className="fas fa-sort sort-caret" />;
            },
        },
    ];

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-4 grid-item">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Search campaigns"
                            onChange={(event) =>
                                this.onSearchInputChange(event.target.value)
                            }
                        />
                    </div>
                    <div className="col-4 grid-item">
                        <LinkButtonComponent
                            text="Plan a campaign"
                            link={`${this.props.link}new`}
                            icon="fas fa-plus-circle icon"
                            buttonClass="btn btn-primary btn-primary-v2"
                        />
                    </div>
                </div>
                <BootstrapTable
                    keyField="id"
                    data={this.state.tableData}
                    columns={this.columns}
                    classes="campaigns-index-table"
                    headerClasses="header-classes"
                    rowEvents={{ onClick: this.onRowClick }}
                />
            </div>
        );
    }
}
