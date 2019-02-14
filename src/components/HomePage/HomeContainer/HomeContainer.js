import React, { Component } from "react";
import Button from "components/Common/Button/Button";
import NotebookModal from "components/Common/NotebookModal/NotebookModal";
import NotebookList from "components/Common/NotebookList/NotebookList";
import * as ApiConnector from "Api/Api";

export default class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      notebooks: []
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.onModalSubmit = this.onModalSubmit.bind(this);
  }

  componentDidMount() {
    ApiConnector.fetchNotebooks().then(response => {
      this.setState({ notebooks: response.data });
    });
  }

  toggleModal() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  onModalSubmit(notebookData) {
    ApiConnector.addNotebook(notebookData).then(response => {
      this.setState({
        notebooks: [...this.state.notebooks, response.data]
      });
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggleModal} label="New Notebooks" />
        <NotebookModal
          show={this.state.isOpen}
          onClose={this.toggleModal}
          onSubmit={this.onModalSubmit}
        >
          hello modal
        </NotebookModal>
        <NotebookList notebooks={this.state.notebooks} />
      </div>
    );
  }
}
