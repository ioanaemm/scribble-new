import React, { Component } from "react";
import "components/Common/Title/Title.scss";

export default class Title extends Component {
  render() {
    return (
      <h1 className="title">
        {this.props.content} {this.props.children}
      </h1>
    );
  }
}
