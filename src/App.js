import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Button from "./components/Button";
import Modal from "./components/Modal";
import NotebookList from "./components/notebooks/NotebookList";
import * as ApiConnector from "./api/Api";

class App extends Component {
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
          {item.title} {item.id}
        </li>
      );
    });

    return notebooks;
  }

  render() {
    return (
      <div className="App">
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

export default App;
