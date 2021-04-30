import React, {Component} from "react";
import CheckboxTree from 'react-checkbox-tree';


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
      if(children.length === 0){
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
        <h3 className="form-title">Campaign Affinities</h3>
        <input
          className="filter-text"
          placeholder="Search..."
          type="text"
          value={this.state.keyword}
          onChange={this.onSearchInputChange}
        />
        <div>
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
        <div className="form-group">
          <button className="btn btn-secondary-v2" type="cancel" onClick={this.props.handleCancel}>Back</button>
          <button className="btn btn-primary-v2 float-right" type="submit" onClick={this.props.handleSubmit} style={{width: "61%"}}>
              Submit
          </button>
        </div>
      </div>
    );
  }
}
