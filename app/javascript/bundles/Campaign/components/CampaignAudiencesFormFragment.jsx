import React, {Component} from 'react';
import CheckboxTree from 'react-checkbox-tree';
import {Button, Form} from 'react-bootstrap';
import PropTypes from 'prop-types';
import AffinitiesList from '../../../components/AffinitiesList';
import FormUtils from "../../../common/FormUtils";

export default class CampaignAudiencesFormFragment extends Component {
  constructor(props) {
    super(props);

    const {data_providers: dataProviders} = this.props;

    this.state = {
      expanded: [],
      keyword: '',
      nodes: dataProviders,
      nodesFiltered: dataProviders,
    };
  }

  onExpanded = (expanded) => {
    this.setState({expanded});
  }

  onSearchInputChange = (event) => {
    this.setState({
      keyword: event.target.value,
    }, this.filterTree);
  }

  getNodeIds(nodes) {
    let ids = [];
    if (nodes) {
      nodes.forEach(({value, children}) => {
        ids = [...ids, value, ...this.getNodeIds(children)];
      });
    }
    return ids;
  }

  filterTree = () => {
    const {keyword} = this.state;

    // Reset nodes back to unfiltered state
    if (!keyword) {
      this.setState((prevState) => ({
        expanded: [],
        nodesFiltered: prevState.nodes,
      }));

      return;
    }

    const nodesFiltered = (prevState) => (
      {nodesFiltered: prevState.nodes.reduce(this.filterNodes, [])}
    );

    this.setState(nodesFiltered);
  }

  filterNodes = (filtered, node) => {
    const {keyword} = this.state;
    const children = (node.children || []).reduce(this.filterNodes, []);
    if (node.label.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) > -1
      || children.length) {
      if (children.length === 0) {
        filtered.push({...node, undefined});
      } else {
        filtered.push({...node, children});
      }
    }

    return filtered;
  }

  render() {
    const {
      affinities,
      affinities_checked: affinitiesChecked,
      audience_notes,
      handleCancel,
      handleChange,
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
            <h5 style={{marginBottom: '10px', marginTop: '10px'}}>Search</h5>
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
            <h5 style={{marginBottom: '10px', marginTop: '15px'}}>Browse</h5>
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
          <div className="col-6">
            <Form
              id={this.formId}
              onSubmit={handleSubmit}
              onKeyPress={(event) => FormUtils.submitEnter(event, this.formId, handleSubmit)}
            >
              <Form.Group controlId="audience_notes">
                <Form.Label className="label-v2 default-position">Audience Notes</Form.Label>
                <Form.Control
                  className="input-v2 textarea"
                  name="audience_notes"
                  type="text"
                  as="textarea"
                  onChange={handleChange}
                  value={audience_notes}
                />
              </Form.Group>
              <div className="form-group">
                <button className="btn btn-secondary-v2" type="button" onClick={handleCancel}>Back</button>
                <Button className="btn btn-primary-v2 float-right" onClick={handleSubmit} style={{width: '61%'}}>
                  <i className="fas fa-flag-checkered" style={{marginRight: '5px', transform: 'rotate(-23deg)'}}/>
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

CampaignAudiencesFormFragment.propTypes = {
  audience_notes: PropTypes.string,
  affinities: PropTypes.objectOf(PropTypes.object).isRequired,
  affinities_checked: PropTypes.arrayOf(PropTypes.string).isRequired,
  data_providers: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onAffinityChecked: PropTypes.func.isRequired,
  onCloseAffinity: PropTypes.func.isRequired,
};

CampaignAudiencesFormFragment.defaultProps = {
  audience_notes: '',
}
