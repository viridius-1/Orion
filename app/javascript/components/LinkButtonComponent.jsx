import React, {Component} from "react";

export default class LinkButtonComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const buttonClass =`btn ${this.props.buttonClass}`;
        const iconClass = `icon ${this.props.icon}`;
        return (
            <a href={this.props.link}>
                <button className={buttonClass}>
                    <span className={iconClass}/>
                    {this.props.text}
                </button>
            </a>
        );
    }
}
