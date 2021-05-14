import React, { Component } from "react";
import { statusColor } from "../../constants";
import { moneyFormatter } from "../../common/utils";
import LinkButton from "../../components/LinkButton";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

export default class CampaignIndexComponent extends Component {
  constructor(props) {
    super(props);

    const tableData = this.setupTableData();
    this.state = {
      searchTerm: "",
      tableData,
      campaigns: tableData
    };
  }

  setupTableData() {
    const { campaigns, link } = this.props;
    const data = campaigns.map(({ id, status, name, start_date, end_date, budget, goal }) => ({
        status,
        name,
        flight: `${new Date(start_date).toLocaleDateString("en-US")} - ${new Date(end_date).toLocaleDateString("en-US")}`,
        budget,
        goal,
        link: `${link}${id}`
      })
    );

    return data;
  }

  onSearchInputChange(searchTerm) {
    this.setState({
      searchTerm,
      tableData: this.getFilterTableData(searchTerm),
    });
  }

  getFilterTableData(searchTerm) {
    const { campaigns } = this.state;
    const data = searchTerm !== "" ? campaigns.filter((campaign) => campaign.name.toLowerCase().includes(searchTerm.toLowerCase())) : [...campaigns];

    return data;
  }

  statusFormatter(status) {
    return (
      <div style={{ display: "flex" }}>
        <span className={`dot ${statusColor[status]}`} />
      </div>
    );
  }

  budgetFormatter(budget) {
    return moneyFormatter(budget);
  }

  getSortCaret() {
    return <i className="fas fa-sort sort-caret" />;
  }

  onRowClick(row, cell) {
    window.location.assign(cell.link);
  }

  columns = [
    {
      dataField: "status",
      text: "Status",
      formatter: this.statusFormatter,
      headerStyle: () => {
        return { width: "84px" };
      },
      sort: true,
      sortCaret: this.getSortCaret,
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
      formatter: this.budgetFormatter,
      style: () => {
        return { textAlign: "center" };
      },
      headerStyle: () => {
        return { textAlign: "center" };
      },
      sortFunc: (a, b, order) => {
        if (order === 'asc') return a - b;
        else return b - a;
      }
    },
    {
      dataField: "goal",
      text: "Goal",
      sort: true,
      sortCaret: this.getSortCaret,
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
            <LinkButton
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
