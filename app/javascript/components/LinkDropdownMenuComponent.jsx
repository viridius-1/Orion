import React, {Component} from "react";
import axios from "axios";

export default class LinkDropdownMenuComponent extends Component {
    constructor(props) {
        super(props);
    }


    doAction(event, action, link) {
        if (action === 'delete') {
            //Todo: add confirmation
            event.preventDefault();
            const bodyFormData = new FormData();
            bodyFormData.append('authenticity_token', this.props.token)
            axios.delete(link, { data: bodyFormData })
                .then((response) => {
                    console.log(response);
                }).catch((response)=> {
                    window.location.assign(window.location.href);
            });
        }
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
                    {this.props.items.map((item, index) => {
                        return (
                            <a className="dropdown-item menu-item" href={item.link} key={index}
                               onClick={event => this.doAction(event, item.action, item.link)}>
                                <i className={item.icon}/>
                                {item.text}</a>
                        );
                    })}
                </div>
            </div>
        );
    }
}
