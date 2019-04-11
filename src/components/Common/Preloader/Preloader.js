import React, { Component } from "react";

import "./Preloader.scss";

export default class Preloader extends Component {
  render() {
    return (
      <div className="preloader spinner">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </div>
    );
  }
}
