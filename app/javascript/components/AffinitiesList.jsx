import React, {Component} from "react";

export default class AffinitiesList extends Component {
  constructor(props) {
    super(props);
  }

  _getParentLabel = (parent) => {
    if (parent) {
      return (
        <div style={{fontSize: '10px', color: "#828282"}}>
          {parent}
        </div>)
    }
    return(<div/>)
  };

  _getNameLabel = (name) => {
    return (
      <div style={{fontSize: "12px", color: "#4F4F4F"}}>
        {name}
      </div>
    );
  };

  _getAffinities = () => {
    const affinitiesKeys = Object.keys(this.props.affinities);
    return affinitiesKeys.map((key) => {
      return (
        <div key={key} className="pill affinity">
          <div style={{margin:"auto"}}>
            {this._getParentLabel(this.props.affinities[key].parent)}
            {this._getNameLabel(this.props.affinities[key].name)}
          </div>
          { this.props.onCloseAffinity && (
            <button className="btn btn-sm" onClick={() => this.props.onCloseAffinity(key)}>
              <img src={require("../../assets/images/cancel.svg")}
                  style={{width: "10px"}}
              />
            </button>)
          }
        </div>);
    })
  };

  render() {
    return (
      <div>
        {this._getAffinities()}
      </div>
    )
  }
}
