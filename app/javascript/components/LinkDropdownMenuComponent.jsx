import React, {Component} from "react";

export default class LinkDropdownMenuComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`dropdown open ${this.props.class}`}>
                <button className="btn" type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        style={{padding: "0px"}}
                >
                    <i className={this.props.icon}/>
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                    {this.props.items.map((item, index)=> {
                        return (
                            <a className="dropdown-item menu-item" href={item.link} key={index}>
                                <i className={item.icon}/>
                                {item.text}</a>
                        );
                    })}
                </div>
            </div>
        );
    }
}
