import React, { Component } from "react";
import "components/Common/Button/Button.scss";

export default class Button extends Component {
  render() {
    return (
      <button className={this.props.type} onClick={this.props.onClick}>
        {this.props.label}
      </button>
    );
  }
}
