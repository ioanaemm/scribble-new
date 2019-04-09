import React, { Component } from "react";
import "components/SearchBar/SearchBar.scss";

export default class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      term: "",
      expanded: false
    };

    this.inputRef = React.createRef();

    this.collapseInput = this.collapseInput.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    window.addEventListener("click", this.collapseInput);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.collapseInput);
  }

  collapseInput() {
    if (this.state.term.length === 0) {
      this.setState({ expanded: false });
    }
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
      <form
        className={`search-container ${
          this.state.expanded ? "expanded" : ""
        } mobile-searchbar`}
        onSubmit={this.onFormSubmit}
        onClick={e => {
          e.stopPropagation();
          this.setState({ expanded: true });
          this.inputRef.current.focus();
        }}
      >
        <i className="fa fa-search icon" />
        <input
          className="search-input"
          type="text"
          ref={this.inputRef}
          value={this.state.term}
          onChange={this.onInputChange}
          placeholder="Search"
        />
      </form>
    );
  }
}
