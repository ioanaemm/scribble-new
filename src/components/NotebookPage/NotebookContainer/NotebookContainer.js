import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as Api from "Api/Api";

import Button from "components/Common/Button/Button";
import Modal from "components/Common/Modal/Modal";

export class Notebook extends Component {
  constructor() {
    super();
    this.state = {
      notebook: null,
      pending: true,
      error: false
    };
  }
  componentDidMount() {
    Api.fetchNotebook(this.props.match.params.id).then(
      response => {
        this.setState({
          pending: false,
          notebook: response.data
        });
      },
      () => {
        this.setState({ pending: false, error: true });
      }
    );
  }

  render() {
    if (this.state.pending) {
      return <p>Loading...</p>;
    }
    if (this.state.error) {
      return <p>Notebook not found</p>;
    }
    return (
      <div>
        <h3>{this.state.notebook.title}</h3>
        <p>{this.state.notebook.tags}</p>
        <Modal />
        <Button onClick={this.toggleModal} label="New Note" />
      </div>
    );
  }
}

export default withRouter(Notebook);
