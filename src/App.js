import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Button from "./components/Button";
import Modal from "./components/Modal";
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
      <div className="App">
        <Button onClick={this.toggleModal} label="New Notebooks" />
        <Modal
          show={this.state.isOpen}
          onClose={this.toggleModal}
          onSubmit={this.onModalSubmit}
        >
          hello modal
        </Modal>
        <ul>
          {this.state.notebooks.map(item => (
            <li key={item.id}>
              {item.title} {item.id}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
