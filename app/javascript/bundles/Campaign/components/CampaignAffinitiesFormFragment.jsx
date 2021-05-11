import React, {Component} from "react";
import CheckboxTree from 'react-checkbox-tree';
import AffinitiesList from "../../../components/AffinitiesList";
import {Button, Modal} from "react-bootstrap";


export default class CampaignAffinitiesFormFragment extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      expanded: [],
      nodes: this.props.data_providers,
      nodesFiltered: this.props.data_providers,
      keyword: ''
    }
  }


  onExpanded = (expanded) => {
    this.setState({expanded})
  };

  onSearchInputChange = (event) => {
    this.setState({
      keyword: event.target.value
    }, this.filterTree);
  };


  getNodeIds = (nodes) => {
    let ids = [];
    if (nodes) {
      nodes.forEach(({value, children}) => {
        ids = [...ids, value, ...this.getNodeIds(children)];
      });
    }
    return ids;
  };

  filterTree = () => {
    // Reset nodes back to unfiltered state
    if (!this.state.keyword) {
      this.setState((prevState) => ({
        nodesFiltered: prevState.nodes,
        expanded: []
      }));

      return;
    }

    const nodesFiltered = (prevState) => (
      {nodesFiltered: prevState.nodes.reduce(this.filterNodes, [])}
    );

    this.setState(nodesFiltered)
  };

  filterNodes = (filtered, node) => {
    const {keyword} = this.state;
    const children = (node.children || []).reduce(this.filterNodes, []);
    if (node.label.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) > -1 || children.length) {
      if (children.length === 0) {
        filtered.push({...node, undefined});
      } else {
        filtered.push({...node, children});
      }

    }

    return filtered;
  };

  render() {
    return (
      <div>
        <h3 className="form-title">Affinities</h3>

        <div className="row">
          <div className="col-6">
            <h5 style={{marginBottom: "10px", marginTop: "10px"}}>Search</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input className="form-control"
                   type="text"
                   placeholder="Search affinities"
                   onChange={this.onSearchInputChange}/>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <h5 style={{marginBottom: "10px", marginTop: "15px"}}>Browse</h5>
          </div>
        </div>
        <div className="row">
          <div className="affinities-tree col-4">
            <CheckboxTree
              nodes={this.state.nodesFiltered}
              checked={this.props.affinities_checked}
              expanded={this.state.expanded}
              onCheck={this.props.onAffinityChecked}
              onExpand={this.onExpanded}
              noCascade
              showNodeIcon={false}
            />
          </div>
          <div className="col-6">
            <AffinitiesList affinities={this.props.affinities}
                            onCloseAffinity={this.props.onCloseAffinity}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group">
            <button className="btn btn-secondary-v2"
                    type="cancel"
                    onClick={this.props.handleCancel}
                    style={{margin: "5px"}}>
              Back
            </button>
            <Button className="btn btn-primary btn-primary-v2"
                    onClick={this.props.handleSubmit}
                    value={"insertion_order"}
                    style={{margin: "5px"}}>
              <i className="fas fa-flag-checkered"
                 style={{
                   transform: "rotate(-23deg)",
                   marginRight: "5px"
                 }}/>
              Order an IO for Managed Services
            </Button>
            <Button className="btn btn-primary btn-primary-v2 float-right"
                    onClick={this.props.handleSubmit}
                    value={"recommendation"}
                    style={{margin: "5px"}}>
              <i className="fas fa-flag-checkered"
                 style={{
                   transform: "rotate(-23deg)",
                   marginRight: "5px"
                 }}/>
              Submit for Self Service Recommendations
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
