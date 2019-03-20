import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Switch } from "react-router-dom";
import { shallow } from "enzyme";

describe("App component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<App />); // mount/render/shallow when applicable
  });
  it("shows a preloader", () => {
    const wrapper = shallow(<App />); // mount/render/shallow when applicable
    expect(wrapper.find(".preloader").length).toBe(1);
  });
  it("shows the login form", () => {
    const wrapper = shallow(<App />); // mount/render/shallow when applicable
    wrapper.setState({ pending: false });
    expect(wrapper.find("User").exists()).toBe(true);
  });
  it("shows the page content", () => {
    const wrapper = shallow(<App />); // mount/render/shallow when applicable
    wrapper.setState({ pending: false, userData: {} });
    expect(wrapper.find(".page-content").exists()).toBe(true);
  });
});
