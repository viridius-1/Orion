import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import PropTypes from 'prop-types';
import { statusColor } from '../../constants';
import { moneyFormatter } from '../../common/utils';
import LinkButton from '../../components/LinkButton';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function statusFormatter(status) {
  return (
    <div style={{ display: 'flex' }}>
      <span className={`dot ${statusColor[status]}`} />
    </div>
  );
}

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
        text: 'Status',
        formatter: statusFormatter,
        headerStyle: () => ({ width: '84px' }),
        sort: true,
        sortCaret: getSortCaret,
      },
      {
        dataField: 'name',
        text: 'Campaign',
        sort: true,
        sortCaret: getSortCaret,
      },
      {
        dataField: 'flight',
        text: 'Flight',
        sort: true,
        sortCaret: getSortCaret,
      },
      {
        dataField: 'budget',
        text: 'Total Budget',
        sort: true,
        sortCaret: getSortCaret,
        formatter: budgetFormatter,
        style: () => ({ textAlign: 'center' }),
        headerStyle: () => ({ textAlign: 'center' }),
        sortFunc: (a, b, order) => {
          if (order === 'asc') return a - b;
          return b - a;
        },
      },
      {
        dataField: 'goal',
        text: 'Goal',
        sort: true,
        sortCaret: getSortCaret,
      },
    ];

    const tableData = this.setupTableData();
    this.state = {
      tableData,
      campaigns: tableData,
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
      start_date: startDate,
      end_date: endDate,
      budget,
      goal,
    }) => ({
      status,
      name,
      flight: `${new Date(startDate).toLocaleDateString('en-US')} - ${new Date(endDate).toLocaleDateString('en-US')}`,
      budget,
      goal,
      link: `${link}${id}`,
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
              buttonClass="btn btn-primary btn-primary-v2"
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
