import React, { Component } from "react";

import "./Preloader.scss";

export default class Preloader extends Component {
  render() {
    return (
      <div className="loader book">
        <figure className="page" />
        <figure className="page" />
        <figure className="page" />
        <figure className="page" />
      </div>
    );
  }
}
