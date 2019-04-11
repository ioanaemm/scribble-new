import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
// import axios from "axios";

import "./App.scss";
import "./Averta.css";
// require("./Averta.js");

import * as Api from "api/Api";
import SearchBar from "components/SearchBar/SearchBar";
import Preloader from "components/Common/Preloader/Preloader";
import User from "components/User/User";
import Register from "components/Register/Register";
import SearchResultsPage from "components/SearchResultsPage/SearchResultsPage";
import Sidebar from "components/Sidebar/Sidebar";
import BottomSidebar from "components/Sidebar/BottomSidebar";
import HomeContainer from "components/HomePage/HomeContainer/HomeContainer";
import NotebooksContainer from "components/NotebooksPage/NotebooksContainer/NotebooksContainer";
import NotebookContainer from "components/NotebookPage/NotebookContainer/NotebookContainer";
import NotesContainer from "components/NotesPage/NotesContainer/NotesContainer";
import NoteContainer from "components/NotePage/NoteContainer/NoteContainer";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
      pending: true
    };

    this.pageContentRef = React.createRef();

    // this.onFormSubmit = this.onFormSubmit.bind(this);
    this.displayPageContent = this.displayPageContent.bind(this);
    this.onLoginUser = this.onLoginUser.bind(this);
  }

  componentDidMount() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    Api.fetchUserDetails().then(
      response => {
        this.setState({ userData: response.data, pending: false });
      },
      error => {
        this.setState({ pending: false });
        this.props.history.push("/login");
      }
    );
  }

  onLoginUser(userData) {
    console.log("onFormSubmit2()");
    this.props.history.push("/");
    this.setState({
      userData
    });
  }

  displayPageContent() {
    return (
      <Switch>
        <Route exact path="/">
          <HomeContainer pageContentRef={this.pageContentRef} />
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
        <Route exact path="/login">
          <User onLogin={this.onLoginUser} />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    );
  }

  render() {
    if (this.state.pending) {
      return <Preloader />;
    }

    return (
      <div className="app">
        <Sidebar />
        <div className="page-content" ref={this.pageContentRef}>
          <SearchBar />
          {this.displayPageContent()}
        </div>
        <BottomSidebar />
      </div>
    );
  }
}

export default withRouter(App);
