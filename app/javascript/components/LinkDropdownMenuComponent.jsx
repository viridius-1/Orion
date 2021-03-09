import React, {Component} from "react";
import axios from "axios";

export default class LinkDropdownMenuComponent extends Component {
    constructor(props) {
        super(props);
    }


    doAction(event, action, link, redirectLink) {
        if (action === 'delete') {
            //Todo: add confirmation
            event.preventDefault();
            const bodyFormData = new FormData();
            bodyFormData.append('authenticity_token', this.props.token);
            axios.delete(link, { data: bodyFormData })
                .then(() => {
                    window.location.assign(redirectLink);
                }).catch(()=> {
                    window.location.assign(redirectLink);
            });
        }
    }

    render() {
        const buttonClass = `btn ${this.props.buttonClass}`;

        return (
            <div className={`dropdown open ${this.props.class}`}>
                <button className={buttonClass} type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        style={{padding: "0px"}}
                >
                    <i className={this.props.icon}/>
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                    {this.props.items.map((item, index) => {
                        return (
                            <a className="dropdown-item menu-item" href={item.link} key={index}
                               onClick={event => this.doAction(event, item.action, item.link, item.redirectLink)}>
                                <i className={item.icon}/>
                                {item.text}</a>
                        );
                    })}
                </div>
            </div>
        );
    }
}
