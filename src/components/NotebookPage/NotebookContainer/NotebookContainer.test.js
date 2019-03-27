import React from "react";
import ReactDOM from "react-dom";
import { NotebookContainer } from "components/NotebookPage/NotebookContainer/NotebookContainer";
import { shallow } from "enzyme";
import { Link } from "react-router";

describe("NotebookContainer component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(
      <NotebookContainer match={{ params: { id: "544765" } }} />
    );
  });

  it("renders the preloader if the state is pending", () => {
    const wrapper = shallow(
      <NotebookContainer match={{ params: { id: "544765" } }} />
    );

    expect(wrapper.find(".preloader").exists()).toBe(true);
  });

  it("renders the title if not in input mode", () => {
    const wrapper = shallow(
      <NotebookContainer match={{ params: { id: "544765" } }} />
    );
    wrapper.setState({ pending: false });
    expect(wrapper.find(".notebook-title").exists()).toBe(true);
  });

  it("renders the input if in input mode", () => {
    const wrapper = shallow(
      <NotebookContainer match={{ params: { id: "544765" } }} />
    );
    wrapper.setState({ pending: false });
    wrapper.find(".notebook-title").simulate("click");

    expect(wrapper.find(".title-input").exists()).toBe(true);
  });
});
