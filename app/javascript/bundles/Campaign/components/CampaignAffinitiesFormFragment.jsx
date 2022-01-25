import React, { Component } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AffinitiesList from '../../../components/AffinitiesList';

export default class CampaignAffinitiesFormFragment extends Component {
  constructor(props) {
    super(props);

    const { data_providers: dataProviders } = this.props;

    this.state = {
      expanded: [],
      keyword: '',
      nodes: dataProviders,
      nodesFiltered: dataProviders,
    };
  }

  onExpanded = (expanded) => {
    this.setState({ expanded });
  }

  onSearchInputChange = (event) => {
    this.setState({
      keyword: event.target.value,
    }, this.filterTree);
  }

  getNodeIds(nodes) {
    let ids = [];
    if (nodes) {
      nodes.forEach(({ value, children }) => {
        ids = [...ids, value, ...this.getNodeIds(children)];
      });
    }
    return ids;
  }

  filterTree = () => {
    const { keyword } = this.state;

    // Reset nodes back to unfiltered state
    if (!keyword) {
      this.setState((prevState) => ({
        expanded: [],
        nodesFiltered: prevState.nodes,
      }));

      return;
    }

    const nodesFiltered = (prevState) => (
      { nodesFiltered: prevState.nodes.reduce(this.filterNodes, []) }
    );

    this.setState(nodesFiltered);
  }

  filterNodes = (filtered, node) => {
    const { keyword } = this.state;
    const children = (node.children || []).reduce(this.filterNodes, []);
    if (node.label.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) > -1
        || children.length) {
      if (children.length === 0) {
        filtered.push({ ...node, undefined });
      } else {
        filtered.push({ ...node, children });
      }
    }

    return filtered;
  }

  render() {
    const {
      affinities,
      affinities_checked: affinitiesChecked,
      handleCancel,
      handleSubmit,
      onAffinityChecked,
      onCloseAffinity,
    } = this.props;

    const {
      expanded,
      nodesFiltered,
    } = this.state;

    return (
      <div>
        <h3 className="form-title">Audiences</h3>

        <div className="row">
          <div className="col-6">
            <h5 style={{ marginBottom: '10px', marginTop: '10px' }}>Search</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              className="form-control"
              type="text"
              placeholder="Search affinities"
              onChange={this.onSearchInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <h5 style={{ marginBottom: '10px', marginTop: '15px' }}>Browse</h5>
          </div>
        </div>
        <div className="row">
          <div className="affinities-tree col-4">
            <CheckboxTree
              nodes={nodesFiltered}
              checked={affinitiesChecked}
              expanded={expanded}
              onCheck={onAffinityChecked}
              onExpand={this.onExpanded}
              noCascade
              showNodeIcon={false}
            />
          </div>
          <div className="col-6">
            <AffinitiesList
              affinities={affinities}
              onCloseAffinity={onCloseAffinity}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group">
            <button
              className="btn btn-secondary-v2"
              type="button"
              onClick={handleCancel}
              style={{ margin: '5px' }}
            >
              Back
            </button>
            <Button
              className="btn btn-primary btn-primary-v2"
              onClick={handleSubmit}
              value="insertion_order"
              style={{ margin: '5px' }}
            >
              <i
                className="fas fa-flag-checkered"
                style={{
                  marginRight: '5px',
                  transform: 'rotate(-23deg)',
                }}
              />
              Order an IO for Managed Services
            </Button>
            <Button
              className="btn btn-primary btn-primary-v2 float-right"
              onClick={handleSubmit}
              value="recommendation"
              style={{ margin: '5px' }}
            >
              <i
                className="fas fa-flag-checkered"
                style={{
                  marginRight: '5px',
                  transform: 'rotate(-23deg)',
                }}
              />
              Submit for Self Service Recommendations
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

CampaignAffinitiesFormFragment.propTypes = {
  affinities: PropTypes.objectOf(PropTypes.object).isRequired,
  affinities_checked: PropTypes.arrayOf(PropTypes.string).isRequired,
  data_providers: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onAffinityChecked: PropTypes.func.isRequired,
  onCloseAffinity: PropTypes.func.isRequired,
};
