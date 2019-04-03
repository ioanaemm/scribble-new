import React from "react";
import ReactDOM from "react-dom";
import { NoteContainer } from "components/NotePage/NoteContainer/NoteContainer";
import { shallow } from "enzyme";
import { Link } from "react-router";

const match = {
  params: {
    id: "345"
  }
};
describe("NoteContainer component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<NoteContainer match={match} />);
  });

  it("renders the preloader if the state is pending", () => {
    const wrapper = shallow(<NoteContainer match={match} />);
    expect(wrapper.find(".preloader"));
  });

  it("renders the title if not in input mode", () => {
    const wrapper = shallow(<NoteContainer match={match} />);
    wrapper.setState({ pending: false });
    expect(wrapper.find(".note-title").exists()).toBe(true);
  });

  it("renders the input if in input mode", () => {
    const wrapper = shallow(<NoteContainer match={match} />);
    wrapper.setState({ pending: false });
    wrapper.find(".note-title").simulate("click");
    expect(wrapper.find(".input-title").exists()).toBe(true);
  });

  it("renders the notes in notebook", () => {
    const wrapper = shallow(<NoteContainer match={match} />);
    wrapper.setState({ pending: false });
    // wrapper.find();
  });
});
