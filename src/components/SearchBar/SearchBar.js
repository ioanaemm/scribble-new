import React, { Component } from "react";
import "components/SearchBar/SearchBar.scss";

export default class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      term: ""
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    window.location.href = `/search/${this.state.term}`;
  }

  render() {
    return (
      <form className="search-container" onSubmit={this.onFormSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Notebooks, Notes"
          value={this.state.term}
          onChange={this.onInputChange}
        />
      </form>
    );
  }
}
