import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import PropTypes from 'prop-types';
import { statusColor } from '../../constants';
import { moneyFormatter } from '../../common/utils';
import LinkButton from '../../components/LinkButton';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function budgetFormatter(budget) {
  return moneyFormatter(budget);
}

function getSortCaret() {
  return <i className="fas fa-sort sort-caret" />;
}

function onRowClick(row, cell) {
  window.location.assign(cell.link);
}

export default class CampaignIndexComponent extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        dataField: 'status',
        headerStyle: () => ({ width: '120px' }),
        sort: true,
        sortCaret: getSortCaret,
        text: 'Status',
      },
      {
        dataField: 'name',
        sort: true,
        sortCaret: getSortCaret,
        text: 'Campaign',
      },
      {
        dataField: 'flight',
        sort: true,
        sortCaret: getSortCaret,
        text: 'Flight',
      },
      {
        dataField: 'campaign_type',
        sort: true,
        sortCaret: getSortCaret,
        text: 'Campaign Activation',
      },
      {
        dataField: 'budget',
        formatter: budgetFormatter,
        headerStyle: () => ({ textAlign: 'center' }),
        sort: true,
        sortCaret: getSortCaret,
        sortFunc: (a, b, order) => {
          if (order === 'asc') return a - b;
          return b - a;
        },
        style: () => ({ textAlign: 'center' }),
        text: 'Total Budget',
      },
      {
        dataField: 'goals',
        sort: true,
        sortCaret: getSortCaret,
        text: 'Goal(s)',
      },
    ];

    const tableData = this.setupTableData();
    this.state = {
      campaigns: tableData,
      tableData,
    };
  }

  onSearchInputChange(searchTerm) {
    this.setState({ tableData: this.getFilterTableData(searchTerm) });
  }

  getFilterTableData(searchTerm) {
    const { campaigns } = this.state;
    const data = searchTerm !== '' ? campaigns.filter((campaign) => campaign.name.toLowerCase().includes(searchTerm.toLowerCase())) : [...campaigns];

    return data;
  }

  setupTableData() {
    const { campaigns, link } = this.props;
    const data = campaigns.map(({
      id,
      status,
      name,
      budget,
      flight,
      campaign_type,
      goals,
    }) => ({
      budget,
      flight,
      campaign_type,
      goals,
      link: `/campaigns/${id}`,
      name,
      status,
    }));

    return data;
  }

  render() {
    const { link } = this.props;
    const { tableData } = this.state;

    return (
      <div>
        <div className="row">
          <div className="col-4 grid-item">
            <input
              className="form-control"
              type="text"
              placeholder="Search campaigns"
              onChange={(event) => this.onSearchInputChange(event.target.value)}
            />
          </div>
          <div className="col-4 grid-item">
            <LinkButton
              text="Plan a campaign"
              link={`${link}new`}
              icon="fas fa-plus-circle icon"
              buttonClass="btn btn-primary btn-primary-v2 ht-50"
              tooltip="Enter any additional details to launch a new campaign"
            />
          </div>
        </div>
        <BootstrapTable
          keyField="id"
          data={tableData}
          columns={this.columns}
          classes="campaigns-index-table"
          headerClasses="header-classes"
          rowEvents={{ onClick: onRowClick }}
        />
      </div>
    );
  }
}

CampaignIndexComponent.propTypes = {
  campaigns: PropTypes.arrayOf(PropTypes.object).isRequired,
  link: PropTypes.string.isRequired,
};
