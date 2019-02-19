import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import HomeContainer from "components/HomePage/HomeContainer/HomeContainer";
import NotebooksContainer from "components/NotebooksPage/NotebooksContainer/NotebooksContainer";
import NotebookContainer from "components/NotebookPage/NotebookContainer/NotebookContainer";
import NotesContainer from "components/NotesPage/NotesContainer/NotesContainer";
import NoteContainer from "components/NotePage/NoteContainer/NoteContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <React.Fragment>
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
          </Switch>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
