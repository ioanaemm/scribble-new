import React, { Component } from "react";
import Button from "./components/Button";
import Modal from "./components/Modal";
import NotebookList from "./components/notebooks/NotebookList";
import * as ApiConnector from "./api/Api";
import { Link } from "react-router-dom";

export default class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      notebooks: []
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.onModalSubmit = this.onModalSubmit.bind(this);
    this.displayNotebookList = this.displayNotebookList.bind(this);
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

  displayNotebookList() {
    let notebooks = this.state.notebooks.map(item => {
      return (
        <li key={item.id}>
          <Link to="/notebooks">
            {item.title} {item.id}
          </Link>
        </li>
      );
    });

    return notebooks;
  }
  render() {
    return (
      <div>
        <Button onClick={this.toggleModal} label="New Notebooks" />
        <Modal
          show={this.state.isOpen}
          onClose={this.toggleModal}
          onSubmit={this.onModalSubmit}
        >
          hello modal
        </Modal>
        <NotebookList displayNotebooks={this.displayNotebookList()} />
      </div>
    );
  }
}
