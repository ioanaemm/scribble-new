import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import * as Api from "api/Api";

import Preloader from "components/Common/Preloader/Preloader";
import NoteList from "components/Common/NoteList/NoteList";
import Button from "components/Common/Button/Button";

import "./NotebookContainer.scss";

export class NotebookContainer extends Component {
  constructor() {
    super();
    this.state = {
      notebook: null,
      pending: true,
      error: false,
      isInput: false,
      isSaving: false,
      isSaved: false,
      title: "",
      isNew: false
    };

    this.inputRef = React.createRef();

    this.displayNotes = this.displayNotes.bind(this);
    this.save = this.save.bind(this);
    this.displayTitle = this.displayTitle.bind(this);
    this.makeInput = this.makeInput.bind(this);
    this.makeNotInput = this.makeNotInput.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.fetchNotebookDetails = this.fetchNotebookDetails.bind(this);
    this.initNewNotebook = this.initNewNotebook.bind(this);
    this.displaySaveButton = this.displaySaveButton.bind(this);
    this.displaySaveIcon = this.displaySaveIcon.bind(this);
    this.displayNewNoteButton = this.displayNewNoteButton.bind(this);
  }

  componentDidMount() {
    if (window.location.href.includes("/newnotebook")) {
      this.initNewNotebook();
    } else {
      this.fetchNotebookDetails();
    }
  }

  initNewNotebook() {
    setTimeout(() => {
      window.addEventListener("click", this.makeNotInput);
      window.addEventListener("touchend", this.makeNotInput);
    }, 3000);
    this.setState(
      { isNew: true, pending: false, title: "New notebook", isInput: true },
      () => {
        setTimeout(() => {
          if (this.inputRef.current) {
            this.inputRef.current.focus();
          }
        }, 500);
      }
    );
  }

  fetchNotebookDetails() {
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
      this.makeNotInput(e);
    }
  }

  makeNotInput(e) {
    if (e && e.target && e.target.classList.contains("notebook-title")) {
      return;
    }
    console.log("makeNotInput()");
    this.setState({ isInput: false });
  }

  makeInput(e) {
    e.stopPropagation();

    this.setState({ isInput: true }, () => {
      if (this.inputRef.current) {
        this.inputRef.current.focus();
      }
    });
  }

  displayNotes() {
    if (this.state.isNew) {
      return (
        <p className="message-no-results">
          You will be able to add notes after creating the notebook
        </p>
      );
    }

    if (!this.state.notebook || !this.state.notebook.notes) {
      return null;
    }

    return <NoteList notes={this.state.notebook.notes} />;
  }

  save() {
    this.setState({ isSaving: true });

    setTimeout(() => {
      if (this.state.isNew) {
        Api.addNotebook({ title: this.state.title, tags: "" }).then(
          response => {
            this.setState(
              { isNew: false, isSaving: false, isSaved: true },
              () => {
                this.props.history.push(`/notebooks/${response.data._id}`);
                setTimeout(() => {
                  this.setState({ isSaved: false });
                }, 2000);
              }
            );
          },
          response => {
            alert("Something went wrong, please try again later");
          }
        );
      } else {
        Api.patchNotebookContent(this.props.match.params.id, {
          title: this.state.title
        }).then(
          response => {
            this.setState(
              {
                isInput: false,
                isSaving: false,
                isSaved: true
              },
              () => {
                setTimeout(() => {
                  this.setState({ isSaved: false });
                }, 2000);
              }
            );
          },
          error => {
            this.setState({
              error: error.response.data
            });
          }
        );
      }
    }, 500);
  }

  displayTitle() {
    if (this.state.isInput) {
      return (
        <>
          <input
            className="title-input"
            type="text"
            value={this.state.title}
            onChange={e =>
              this.setState({
                title: e.target.value
              })
            }
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

  displaySaveIcon() {
    if (this.state.isSaving) {
      return <Preloader />;
    } else if (this.state.isSaved) {
      return <i className="fa icon fa-check fa-lg" key="check" />;
    } else {
      return <i className="fa icon fa-cloud-upload-alt fa-lg" key="cloud" />;
    }
  }

  displaySaveButton() {
    return (
      <div className="save-button-container">
        <Button className="save-note desktop" onClick={this.save}>
          {this.displaySaveIcon()}
        </Button>
        <Button className="save-note mobile" onClick={this.save}>
          {this.displaySaveIcon()}
        </Button>
      </div>
    );
  }

  displayNewNoteButton() {
    if (this.state.isNew || !this.state.notebook) {
      return null;
    }
    return (
      <Link
        className="add-note-container"
        to={`/newnote/${this.state.notebook._id}`}
      >
        <Button className="add-note" type="primary" label="New Note" />
      </Link>
    );
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
        {this.displaySaveButton()}
        {this.displayTitle()}
        {this.displayNewNoteButton()}
        {this.displayNotes()}
      </div>
    );
  }
}

export default withRouter(NotebookContainer);
