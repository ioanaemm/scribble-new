import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// import axios from "axios";

import "./App.scss";

// import * as Api from "Api/Api";
import User from "components/User/User";
import SearchResultsPage from "components/SearchResultsPage/SearchResultsPage";
import Sidebar from "components/Sidebar/Sidebar";
import HomeContainer from "components/HomePage/HomeContainer/HomeContainer";
import NotebooksContainer from "components/NotebooksPage/NotebooksContainer/NotebooksContainer";
import NotebookContainer from "components/NotebookPage/NotebookContainer/NotebookContainer";
import NotesContainer from "components/NotesPage/NotesContainer/NotesContainer";
import NoteContainer from "components/NotePage/NoteContainer/NoteContainer";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     username: "",
  //     password: "",
  //     userData: null,
  //     pending: true
  //   };
  //
  //   this.onFormSubmit = this.onFormSubmit.bind(this);
  //   this.displayPageContent = this.displayPageContent.bind(this);
  //   this.displayLoginForm = this.displayLoginForm.bind(this);
  // }

  // componentDidMount() {
  //   Api.fetchUserDetails().then(
  //     response => {
  //       this.setState({ userData: response.data, pending: false });
  //     },
  //     error => {
  //       this.setState({ pending: false });
  //     }
  //   );
  // }

  // onFormSubmit(e) {
  //   console.log("onFormSubmit()");
  //
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //
  //     axios.post("/api/users/signin", this.state).then(
  //       response => {
  //         this.setState({ userData: response.data });
  //       },
  //       error => {
  //         console.log("status: ", error.response.status);
  //       }
  //     );
  //   }
  // }

  // displayLoginForm() {
  //   return (
  //     <form onKeyDown={this.onFormSubmit}>
  //       <input
  //         placeholder="username"
  //         onChange={e => this.setState({ username: e.target.value })}
  //         value={this.state.username}
  //       />
  //       <input
  //         placeholder="password"
  //         type="password"
  //         onChange={e => this.setState({ password: e.target.value })}
  //         value={this.state.password}
  //       />
  //     </form>
  //   );
  // }

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
    let pageContent = <User />;
    // if (this.state.pending) {
    //   return <p>Loading...</p>;
    // }
    if (pageContent) {
      this.displayPageContent();
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
