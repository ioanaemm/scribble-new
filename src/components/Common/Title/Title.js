import React, { Component } from "react";
import "components/Common/Title/Title.scss";

export default class Title extends Component {
  render() {
    return <span className="title">{this.props.content}</span>;
  }
}
