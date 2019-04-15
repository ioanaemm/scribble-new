import React from "react";
import ReactDOM from "react-dom";
import { NotebookContainer } from "components/NotebookPage/NotebookContainer/NotebookContainer";
import { shallow } from "enzyme";
import { Link } from "react-router";

const match = {
  params: {
    id: "1234"
  }
};

describe("NotebookContainer component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<NotebookContainer match={match} />);
  });

  it("renders the preloader if the state is pending", () => {
    const wrapper = shallow(<NotebookContainer match={match} />);

    expect(wrapper.find("Preloader").exists()).toBe(true);
  });

  it("renders the title if not in input mode", () => {
    const wrapper = shallow(<NotebookContainer match={match} />);
    wrapper.setState({ pending: false });
    expect(wrapper.find(".notebook-title").exists()).toBe(true);
  });

  it("renders the input if in input mode", () => {
    const wrapper = shallow(<NotebookContainer match={match} />);
    wrapper.setState({ pending: false });
    wrapper
      .find(".notebook-title")
      .simulate("click", { stopPropagation: jest.fn() });

    expect(wrapper.find(".title-input").exists()).toBe(true);
  });

  it("renders the error", () => {
    const wrapper = shallow(<NotebookContainer match={match} />);
    wrapper.setState({ pending: false, error: true });
    expect(wrapper.find(".error").exists()).toBe(true);
  });

  it("updates the title input when the user types something", () => {
    const wrapper = shallow(<NotebookContainer match={match} />);
    wrapper.setState({ pending: false });
    wrapper
      .find(".notebook-title")
      .simulate("click", { stopPropagation: jest.fn() });
    wrapper.find(".title-input").simulate("change", {
      target: { value: "React" }
    });

    expect(wrapper.find(".title-input").prop("value")).toEqual("React");
  });
});
