import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import * as Api from "Api/Api";

export class NotebooksContainer extends Component {
  //constructor() {
  //super();
  // this.state = {
  //   notebook: null
  // };
  //}
  componentDidMount() {
    console.log(this.props);
    // Api.fetchNotebook();
  }

  render() {
    return <p>Notebooks</p>;
  }
}

export default withRouter(NotebooksContainer);
