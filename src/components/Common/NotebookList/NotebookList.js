import React, { Component } from "react";

import NotebookModal from "components/Common/NotebookModal/NotebookModal";
import Button from "components/Common/Button/Button";
import NotebookItem from "components/Common/NotebookItem/NotebookItem";
import "components/Common/NotebookList/NotebookList.scss";

export default class NotebookList extends Component {
  constructor() {
    super();

    this.state = {
      isNotebookModalOpen: false
    };

    this._isMounted = false;

    this.displayNotebookList = this.displayNotebookList.bind(this);
    this.toggleNotebookModal = this.toggleNotebookModal.bind(this);
    this.onNotebookModalSubmit = this.onNotebookModalSubmit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  displayNotebookList() {
    if (!this.props.notebooks) {
      return null;
    }

    if (this.props.notebooks.length === 0) {
      return <p className="message-no-results">No notebooks found</p>;
    }

    let notebooks = this.props.notebooks.map(notebook => {
      return (
        <NotebookItem
          notebook={notebook}
          key={notebook._id}
          removeNotebook={this.props.removeNotebook}
        />
      );
    });

    return <>{notebooks}</>;
  }

  onNotebookModalSubmit(notebookData) {
    console.log(this.state);
    this.props.addNotebook(notebookData);
    this.toggleNotebookModal();
  }

  renderNotebookModal() {
    let notebookModal = null;
    if (this.state.isNotebookModalOpen) {
      notebookModal = (
        <NotebookModal
          onClose={this.toggleNotebookModal}
          onSubmit={this.onNotebookModalSubmit}
        />
      );
    }
    return notebookModal;
  }

  toggleNotebookModal() {
    if (this._isMounted) {
      this.setState({ isNotebookModalOpen: !this.state.isNotebookModalOpen });
    }
  }

  render() {
    return (
      <div className="notebook-list">
        <Button
          className="add-notebook"
          type="primary"
          onClick={this.toggleNotebookModal}
          label="New Notebook"
        />
        <div className="inner-container">{this.displayNotebookList()}</div>
        {this.renderNotebookModal()}
      </div>
    );
  }
}
