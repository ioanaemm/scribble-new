import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { Switch } from "react-router-dom";
import { shallow } from "enzyme";

describe("App component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<App />);
  });
  it("shows a preloader if not on the verify page", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("Preloader").length).toBe(1);
  });
  it("shows the login form", () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ pending: false });
    expect(wrapper.find("User").exists()).toBe(true);
  });
  it("shows the page content", () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ pending: false, userData: {} });
    expect(wrapper.find(".page-content").exists()).toBe(true);
  });
});
