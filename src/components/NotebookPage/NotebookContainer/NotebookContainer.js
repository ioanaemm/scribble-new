import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as Api from "api/Api";

import Preloader from "components/Common/Preloader/Preloader";
import NoteList from "components/Common/NoteList/NoteList";
import "./NotebookContainer.scss";

export class NotebookContainer extends Component {
  constructor() {
    super();
    this.state = {
      notebook: null,
      pending: true,
      error: false,
      isInput: false,
      title: ""
    };

    this.inputRef = React.createRef();

    this.displayNotes = this.displayNotes.bind(this);
    this.onTitleSubmit = this.onTitleSubmit.bind(this);
    this.saveInputValue = this.saveInputValue.bind(this);
    this.displayTitle = this.displayTitle.bind(this);
    this.makeInput = this.makeInput.bind(this);
    this.makeNotInput = this.makeNotInput.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentDidMount() {
    Api.fetchNotebook(this.props.match.params.id).then(
      response => {
        window.addEventListener("click", this.makeNotInput);
        window.addEventListener("touchend", this.makeNotInput);

        this.setState({
          pending: false,
          title: response.data.title,
          notebook: response.data
        });
      },
      () => {
        this.setState({ pending: false, error: true });
      }
    );
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.makeNotInput);
    window.removeEventListener("touchend", this.makeNotInput);
  }

  onKeyUp(e) {
    if (e.key === "Enter") {
      this.makeNotInput();
    }
  }

  makeNotInput() {
    this.onTitleSubmit();
    this.setState({ isInput: false });
  }

  makeInput(e) {
    e.stopPropagation();

    this.setState({ isInput: true }, () => {
      this.inputRef.current.focus();
    });
  }

  displayNotes() {
    if (!this.state.notebook || !this.state.notebook.notes) {
      return null;
    }

    return <NoteList notes={this.state.notebook.notes} />;
  }

  onTitleSubmit() {
    Api.patchNotebookContent(this.props.match.params.id, {
      title: this.state.title
    }).then(
      response => {
        console.log("response.data", response.data);
        this.setState({
          title: response.data.title,
          isInput: false
        });
      },
      error => {
        this.setState({
          error: error.response.data
        });
      }
    );
  }

  saveInputValue(e) {
    this.setState({
      title: e.target.value
    });
  }

  displayTitle() {
    if (this.state.isInput) {
      return (
        <>
          <input
            className="title-input"
            type="text"
            value={this.state.title}
            onChange={this.saveInputValue}
            ref={this.inputRef}
            onKeyUp={this.onKeyUp}
          />
        </>
      );
    } else {
      return (
        <h3 className="notebook-title" onClick={this.makeInput}>
          {this.state.title}
        </h3>
      );
    }
  }

  render() {
    if (this.state.pending) {
      return (
        <div className="notebook-container">
          <Preloader centered={true} />
        </div>
      );
    }
    if (this.state.error) {
      return (
        <div className="notebook-container">
          <p className="error">Notebook not found</p>
        </div>
      );
    }

    return (
      <div className="notebook-container">
        {this.displayTitle()}
        {this.displayNotes()}
      </div>
    );
  }
}

export default withRouter(NotebookContainer);
