import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Preloader from "components/Common/Preloader/Preloader";
import * as Api from "api/Api";
import "components/RecoverPassword/RecoverPassword.scss";

export class RecoverPassword extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Api.changePassword(this.props.match.params.chunk).then(
      response => {
        console.log(response.data);
      },
      error => {
        console.log("error: ", error);
      }
    );
  }
  render() {
    return (
      <div>
        <p>Hello from recover password</p>
      </div>
    );
  }
}

export default withRouter(RecoverPassword);
