import React, { Component, Fragment } from "react";
import Select from "react-select";

import DropDown from "./DropDown";

export default class AudienceFields extends Component {
  constructor(props) {
    super(props);
  }

  showAudienceFields(props) {
    const { audiences, audienceState, setAudienceState } = props;
    return (
      <Fragment>
        <div className="col col-6">
          <div className="form-group category">
            <label>Audience Targeting</label>
            <DropDown
              audiences={audiences}
              audienceState={audienceState}
              setAudienceState={setAudienceState}
            />
          </div>
        </div>
      </Fragment>
    );
  }

  render() {
    return <Fragment>{this.showAudienceFields(this.props)}</Fragment>;
  }
}
