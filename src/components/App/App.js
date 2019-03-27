import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// import axios from "axios";

import "./App.scss";

import * as Api from "../../Api/Api";
import User from "components/User/User";
import SearchResultsPage from "components/SearchResultsPage/SearchResultsPage";
import Sidebar from "components/Sidebar/Sidebar";
import HomeContainer from "components/HomePage/HomeContainer/HomeContainer";
import NotebooksContainer from "components/NotebooksPage/NotebooksContainer/NotebooksContainer";
import NotebookContainer from "components/NotebookPage/NotebookContainer/NotebookContainer";
import NotesContainer from "components/NotesPage/NotesContainer/NotesContainer";
import NoteContainer from "components/NotePage/NoteContainer/NoteContainer";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
      pending: true
    };

    // this.onFormSubmit = this.onFormSubmit.bind(this);
    this.displayPageContent = this.displayPageContent.bind(this);
    this.onLoginUser = this.onLoginUser.bind(this);
  }

  componentDidMount() {
    Api.fetchUserDetails().then(
      response => {
        this.setState({ userData: response.data, pending: false });
      },
      error => {
        this.setState({ pending: false });
      }
    );
  }

  onLoginUser(userData) {
    console.log("onFormSubmit2()");
    this.setState({
      userData
    });
  }

  displayPageContent() {
    return (
      <div className="page-content">
        <Switch>
          <Route exact path="/">
            <HomeContainer />
          </Route>
          <Route exact path="/notebooks">
            <NotebooksContainer />
          </Route>
          <Route exact path="/notebooks/:id">
            <NotebookContainer />
          </Route>
          <Route exact path="/notes">
            <NotesContainer />
          </Route>
          <Route exact path="/notes/:id">
            <NoteContainer />
          </Route>
          <Route exact path="/search/:query">
            <SearchResultsPage />
          </Route>
        </Switch>
      </div>
    );
  }

  render() {
    let pageContent = null;
    if (this.state.pending) {
      return <p className="preloader">Loading...</p>;
    }
    if (!this.state.userData) {
      pageContent = <User onLogin={this.onLoginUser} />;
    } else {
      pageContent = this.displayPageContent();
    }

    return (
      <div className="app">
        <Sidebar />
        {pageContent}
      </div>
    );
  }
}

export default App;
