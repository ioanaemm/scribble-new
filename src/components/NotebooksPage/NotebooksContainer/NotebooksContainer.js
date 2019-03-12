import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as Api from "Api/Api";
import { Link } from "react-router-dom";
import moment from "moment";
// import * as ApiConnector from "Api/Api";

export class NotebooksContainer extends Component {
  constructor() {
    super();
    this.state = {
      notebooks: null
    };
    this.displayNotebookList = this.displayNotebookList.bind(this);
  }
  componentDidMount() {
    Api.fetchNotebooks().then(response => {
      this.setState({ notebooks: response.data });
    });
  }

  /*
  var dateFromObjectId = function (objectId) {
	return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
  };

  */

  displayNotebookList() {
    if (!this.state.notebooks) {
      return null;
    }
    let notebookList = this.state.notebooks.map(notebook => {
      let timestamp = moment(
        new Date(parseInt(notebook._id.substring(0, 8), 16) * 1000)
      ).format("Do MMMM YYYY");
      return (
        <li key={notebook._id}>
          <Link to={`/notebooks/${notebook._id}`}>
            {notebook.title} {timestamp}{" "}
          </Link>
        </li>
      );
    });

    return <ul>{notebookList}</ul>;
  }

  render() {
    return <div>{this.displayNotebookList()}</div>;
  }
}

export default withRouter(NotebooksContainer);
