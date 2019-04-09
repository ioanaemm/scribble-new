import React, { Component } from "react";
import SearchBar from "components/SearchBar/SearchBar";
import Title from "components/Common/Title/Title";
import Button from "components/Common/Button/Button";
import NotebookModal from "components/Common/NotebookModal/NotebookModal";
import NoteModal from "components/Common/NoteModal/NoteModal";
import NotebookList from "components/Common/NotebookList/NotebookList";
import NoteList from "components/Common/NoteList/NoteList";
import * as Api from "api/Api";
import "components/HomePage/HomeContainer/HomeContainer.scss";

export default class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNotebookModalOpen: false,
      isNoteModalOpen: false,
      notebooks: [],
      notes: [],
      showSearchBar: false
    };

    this._isMounted = false;

    this.lastTouchY = null;

    this.toggleNotebookModal = this.toggleNotebookModal.bind(this);
    this.toggleNoteModal = this.toggleNoteModal.bind(this);
    this.onNotebookModalSubmit = this.onNotebookModalSubmit.bind(this);
    this.onNoteModalSubmit = this.onNoteModalSubmit.bind(this);
    this.removeNotebook = this.removeNotebook.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.displaySearchBar = this.displaySearchBar.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    window.addEventListener("touchmove", this.onTouchMove);

    Api.fetchNotebooks({
      skip: 0,
      limit: Number.MAX_SAFE_INTEGER,
      sort: { _id: -1 }
    }).then(response => {
      this.setState({ notebooks: response.data });
    });

    Api.fetchNotes().then(response => {
      if (this._isMounted) {
        this.setState({ notes: response.data });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggleNotebookModal() {
    this.setState({ isNotebookModalOpen: !this.state.isNotebookModalOpen });
  }

  toggleNoteModal() {
    this.setState({ isNoteModalOpen: !this.state.isNoteModalOpen });
  }

  onNotebookModalSubmit(notebookData) {
    Api.addNotebook(notebookData).then(response => {
      this.setState({
        notebooks: [...this.state.notebooks, response.data]
      });
    });
    this.toggleNotebookModal();
  }

  onNoteModalSubmit(noteData) {
    Api.addNote(noteData).then(response => {
      this.setState({
        notes: [...this.state.notes, response.data]
      });
    });

    this.toggleNoteModal();
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

  renderNoteModal() {
    let noteModal = null;
    if (this.state.isNoteModalOpen) {
      noteModal = (
        <NoteModal
          onClose={this.toggleNoteModal}
          onSubmit={this.onNoteModalSubmit}
        />
      );
    }
    return noteModal;
  }

  removeNotebook(notebookId) {
    Api.deleteNotebook(notebookId).then(response => {
      if (this.state.notebooks) {
        this.setState({
          notebooks: this.state.notebooks.filter(
            notebook => notebook._id !== notebookId
          )
        });
      }
    });
  }

  onTouchMove(e) {
    if (this.lastTouchY === null) {
      this.lastTouchY = e.touches[0].clientY;
    } else {
      let crtTouchY = e.touches[0].clientY;
      let delta = crtTouchY - this.lastTouchY;
      console.log("delta= ", delta);
      let scrollTop = this.props.pageContentRef.current.scrollTop;
      if (delta > 0) {
        // console.log(this.props.pageContentRef.current);
        if (this.props.pageContentRef.current) {
          console.log("scrollTOp = ", scrollTop);
          if (scrollTop <= 0 && !this.state.showSearchBar) {
            this.setState({ showSearchBar: true });
          }
        }
      } else if (delta < 0) {
        console.log(scrollTop);
        if (scrollTop < 50 && this.state.showSearchBar) {
          this.setState({ showSearchBar: false });
        }
      }
      // console.log(delta);
    }
  }

  displaySearchBar() {
    if (!this.state.showSearchBar) {
      return null;
    }

    return <SearchBar />;
  }

  render() {
    return (
      <div className="home-container" ref={this.containerRef}>
        {this.displaySearchBar()}
        <div className="add-item-container">
          <Title content="Notebooks">
            <Button
              className="add-notebook"
              type="primary"
              onClick={this.toggleNotebookModal}
              label="New Notebook"
            />
          </Title>

          {this.renderNotebookModal()}
        </div>

        <NotebookList
          notebooks={this.state.notebooks}
          removeNotebook={this.removeNotebook}
        />
        <div className="add-item-container">
          <Title content="Notes">
            <Button
              className="add-note"
              type="primary"
              onClick={this.toggleNoteModal}
              label="New Note"
            />
          </Title>

          {this.renderNoteModal()}
        </div>
        <NoteList notes={this.state.notes} />
      </div>
    );
  }
}
