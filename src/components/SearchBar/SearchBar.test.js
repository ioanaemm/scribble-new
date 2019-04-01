import React from "react";
import ReactDOM from "react-dom";
import SearchBar from "components/SearchBar/SearchBar";
import { shallow } from "enzyme";
import { Link } from "react-router";

describe("SearchBar component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<SearchBar />);
  });

  it("the search input works", () => {
    const wrapper = shallow(<SearchBar />);
    wrapper
      .find(".search-input")
      .simulate("change", { target: { value: "React" } });
    expect(wrapper.find(".search-input").prop("value")).toEqual("React");
  });

  it("submits the form and redirects to the link", async () => {
    Object.defineProperty(global.window, "location", {
      value: {}
    });
    global.window = { ...window };

    const wrapper = shallow(<SearchBar />);
    wrapper.setState({ term: "react" });
    wrapper
      .find(".search-container")
      .simulate("submit", { preventDefault: () => {} });
    expect(global.window.location.href).toEqual("/search/react");
  });
});
