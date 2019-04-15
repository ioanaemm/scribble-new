import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { Link } from "react-router";

import { SearchBar } from "./SearchBar";

describe("SearchBar component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<SearchBar />);
  });

  it("the search input works", () => {
    const wrapper = shallow(<SearchBar />);
    wrapper
      .find(".desktop-searchbar .search-input")
      .simulate("change", { target: { value: "React" } });
    expect(
      wrapper.find(".desktop-searchbar .search-input").prop("value")
    ).toEqual("React");
  });

  it("submits the form and redirects to the link", async () => {
    Object.defineProperty(global.window, "location", {
      value: {}
    });
    global.window = { ...window };

    const mockHistory = {
      push: jest.fn()
    };
    const wrapper = shallow(<SearchBar history={mockHistory} />);
    wrapper.setState({ term: "react" });
    wrapper
      .find(".search-container")
      .simulate("submit", { preventDefault: () => {} });
    expect(mockHistory.push).toBeCalledWith("/search/react");
  });
});
