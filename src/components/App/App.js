import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./App.scss";
import "./Averta.css";

import * as Api from "api/Api";
import SearchBar from "components/SearchBar/SearchBar";
import Preloader from "components/Common/Preloader/Preloader";
import User from "components/User/User";
import Register from "components/Register/Register";
import AccountDetails from "components/AccountDetails/AccountDetails";
import VerifyAccount from "components/VerifyAccount/VerifyAccount";
import RecoverPassword from "components/RecoverPassword/RecoverPassword";
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
    this.updateDocumentSize = this.updateDocumentSize.bind(this);
  }

  componentDidMount() {
    this.updateDocumentSize();
    window.addEventListener("resize", this.updateDocumentSize);

    if (window.location.href.includes("/verify/")) {
      this.setState({
        pending: false
      });
    } else {
      Api.fetchUserDetails().then(
        response => {
          this.setState({ userData: response.data, pending: false });
        },
        error => {
          this.setState({ pending: false });
        }
      );
    }
  }

  updateDocumentSize() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  onLoginUser(userData) {
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
          <NotebookContainer key="notebookDetails" />
        </Route>
        <Route exact path="/newnotebook">
          <NotebookContainer key="newNotebook" />
        </Route>
        <Route exact path="/notes">
          <NotesContainer key="noteDetails" />
        </Route>
        <Route exact path="/newnote/:notebookId">
          <NoteContainer key="newnoteForNotebook" />
        </Route>
        <Route exact path="/newnote">
          <NoteContainer key="newnote" />
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
        <Route exact path="/account">
          <AccountDetails />
        </Route>
        <Route exact path="/verify/:username/:chunk">
          <VerifyAccount />
        </Route>
        <Route exact path="/verify/:username/:chunk">
          <RecoverPassword />
        </Route>
      </Switch>
    );
  }

  render() {
    if (this.state.pending) {
      return <Preloader centered={true} />;
    }

    return (
      <div className="app">
        <Route
          path={new RegExp("^(?!.*(/login|/register)).*$")}
          component={Sidebar}
        />

        <div className="page-content" ref={this.pageContentRef}>
          <Route exact path="/" component={SearchBar} />
          <Route path="/search" component={SearchBar} />

          {this.displayPageContent()}
        </div>
        <Route
          path={new RegExp("^(?!.*(/login|/register|/notes/|/newnote)).*$")}
          component={BottomSidebar}
        />
      </div>
    );
  }
}

export default withRouter(App);
