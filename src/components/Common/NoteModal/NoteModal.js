import React, { Component } from "react";
import "components/Common/NoteModal/NoteModal.scss";
import Button from "components/Common/Button/Button";
import Title from "components/Common/Title/Title";
import closebutton from "icons/close.png";

export default class NoteModal extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: ""
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    this.props.onSubmit({ title: this.state.title, body: this.state.body });
    this.setState({
      title: "",
      body: ""
    });
  }

  render() {
    return (
      <div className="backdrop">
        <div className="modal modal-note">
          <Title content="Add new note" />
          <div className="body">
            <button className="close-btn" onClick={this.props.onClose}>
              <img className="icon" src={closebutton} alt="close" />
            </button>
            <label>Title</label>
            <input
              type="text"
              value={this.state.title}
              onChange={e => this.setState({ title: e.target.value })}
            />
          </div>
          <div className="footer">
            <Button type="primary" onClick={this.submit} label="Submit">
              Submit
            </Button>
          </div>
        </div>
        <div className="modal-overlay" />
      </div>
    );
  }
}
