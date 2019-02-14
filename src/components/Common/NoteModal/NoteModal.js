import React, { Component } from "react";

export default class NoteModal extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    this.props.onSubmit({ title: this.state.title });
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="backdrop">
        <div className="modal">
          <div className="header">Header</div>
          <div className="body">
            <label>Title</label>
            <input
              type="text"
              value={this.state.title}
              onChange={e => this.setState({ title: e.target.value })}
            />
          </div>
          <div className="footer">
            <button onClick={this.props.onClose}>Close</button>
            <button onClick={this.submit}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}
