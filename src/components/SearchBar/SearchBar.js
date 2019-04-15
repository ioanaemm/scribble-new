import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import MobileSearchBar from "components/MobileSearchBar/MobileSearchBar";
import "components/SearchBar/SearchBar.scss";

export class SearchBar extends Component {
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
    window.addEventListener("touchend", this.collapseInput);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.collapseInput);
    window.removeEventListener("touchend", this.collapseInput);
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
    this.props.history.push(`/search/${this.state.term}`);
  }

  displayMobileSearchBar() {}

  render() {
    return (
      <>
        <form
          className={`search-container desktop-searchbar ${
            this.state.expanded ? "expanded" : ""
          } `}
          onSubmit={this.onFormSubmit}
          onClick={e => {
            e.stopPropagation();
            this.setState({ expanded: true });
            this.inputRef.current.focus();
          }}
        >
          <div className="background" />
          <div className="inner-container">
            <i className="fa fa-search icon" />
            <input
              className="search-input"
              type="text"
              ref={this.inputRef}
              value={this.state.term}
              onChange={this.onInputChange}
              placeholder="Search"
            />
          </div>
        </form>
        <form className="mobile-searchbar" onSubmit={this.onFormSubmit}>
          <div className="inner-container">
            <i className="fa fa-search icon" />
            <input
              className="search-input"
              type="text"
              value={this.props.term}
              onChange={this.onInputChange}
              placeholder="Search"
            />
          </div>
        </form>
      </>
    );
  }
}

export default withRouter(SearchBar);
