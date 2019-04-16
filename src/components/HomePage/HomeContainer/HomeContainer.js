import React, { Component } from "react";

import * as Api from "api/Api";
import Title from "components/Common/Title/Title";
import NotebookList from "components/Common/NotebookList/NotebookList";
import NoteList from "components/Common/NoteList/NoteList";
import Preloader from "components/Common/Preloader/Preloader";

import "./HomeContainer.scss";

const REFRESH_PADDING_LIMIT = 25;

export default class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notebooks: [],
      notes: [],
      refreshPaddingHeight: 0,
      pending: true,
      isFirstRequest: true
    };

    this._isMounted = false;

    this.lastTouchY = null;

    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.updateRefreshPadding = this.updateRefreshPadding.bind(this);
    this.refresh = this.refresh.bind(this);
    this.displayPreloader = this.displayPreloader.bind(this);
    this.displayContent = this.displayContent.bind(this);
    this.displayRefreshPadding = this.displayRefreshPadding.bind(this);
    this.removeNotebook = this.removeNotebook.bind(this);
    this.addNotebook = this.addNotebook.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    window.addEventListener("touchmove", this.onTouchMove);
    window.addEventListener("touchend", this.onTouchEnd);
    this.refresh();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  refresh() {
    if (this._isMounted) {
      this.setState({ pending: true });
    }
    let notebooksPromise = Api.fetchNotebooks({
      skip: 0,
      limit: Number.MAX_SAFE_INTEGER,
      sort: { _id: -1 }
    });
    let notePromise = Api.fetchNotes({ limit: 10 });

    Promise.all([notebooksPromise, notePromise]).then(
      ([notebooksResponse, notesResponse]) => {
        if (this._isMounted) {
          this.setState({
            isFirstRequest: false,
            notebooks: notebooksResponse.data,
            notes: notesResponse.data,
            pending: false
          });
        }
      }
    );
  }

  onTouchMove(e) {
    // e.preventDefault();

    if (
      this.lastTouchY !== null &&
      this.props.pageContentRef &&
      this.props.pageContentRef.current
    ) {
      const pageContent = this.props.pageContentRef.current;
      let crtTouchY = e.touches[0].pageY;
      let delta = crtTouchY - this.lastTouchY;

      let scrollTop = pageContent.scrollTop;
      if (scrollTop === 0) {
        this.updateRefreshPadding(delta);
      } else {
        this.lastTouchY = null;
      }
    }
    this.lastTouchY = e.touches[0].pageY;
  }

  updateRefreshPadding(delta) {
    let oldHeight = this.state.refreshPaddingHeight;

    let multiplier = 0;
    const limit = REFRESH_PADDING_LIMIT;

    if (oldHeight < limit) {
      multiplier = 1;
    } else {
      multiplier = 1 - (oldHeight - limit) / limit;
    }

    if (this._isMounted) {
      this.setState({
        refreshPaddingHeight:
          this.state.refreshPaddingHeight + delta * multiplier
      });
    }
  }

  removeNotebook(notebookId) {
    Api.deleteNotebook(notebookId).then(this.refresh);
  }

  addNotebook(notebookData) {
    Api.addNotebook(notebookData).then(this.refresh);
  }

  onTouchEnd(e) {
    this.lastTouchY = null;
    if (REFRESH_PADDING_LIMIT * 2 - this.state.refreshPaddingHeight < 10) {
      this.setState({ pending: true });
      setTimeout(this.refresh, 800);
    }
    if (this._isMounted) {
      this.setState({
        refreshPaddingHeight: 0
      });
    }
  }

  displayPreloader() {
    if (!this.state.pending) {
      return null;
    }
    return <Preloader />;
  }

  displayRefreshPadding() {
    const limit = REFRESH_PADDING_LIMIT;
    const current = this.state.refreshPaddingHeight;
    const arrowAngle = ((limit * 2 - current) / limit / 2) * 180;
    const opacity = 1 - (limit - current) / limit;

    return (
      <div
        className="refresh-padding"
        style={{ height: this.state.refreshPaddingHeight + "px" }}
      >
        <i
          className="fa fa-arrow-up icon"
          style={{
            transform: `translate(-50%, -50%) rotate(${arrowAngle}deg)`,
            opacity
          }}
        />
      </div>
    );
  }

  displayContent() {
    if (this.state.pending && this.state.isFirstRequest) {
      return null;
    }
    return (
      <>
        <Title content="Notebooks" />
        <NotebookList
          notebooks={this.state.notebooks}
          removeNotebook={this.removeNotebook}
          addNotebook={this.addNotebook}
        />

        <Title content="Notes" />
        <NoteList notes={this.state.notes} />
      </>
    );
  }

  render() {
    return (
      <div className="home-container" ref={this.containerRef}>
        {this.displayPreloader()}
        {this.displayRefreshPadding()}
        {this.displayContent()}
      </div>
    );
  }
}
