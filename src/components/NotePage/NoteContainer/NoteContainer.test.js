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

  // it("renders the preloader if the state is pending", () => {
  //   const wrapper = shallow(<NoteContainer match={match} />);
  //   expect(wrapper.find(".preloader"));
  // });
});
