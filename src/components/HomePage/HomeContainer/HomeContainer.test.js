import React from "react";
import ReactDOM from "react-dom";
import HomeContainer from "components/HomePage/HomeContainer/HomeContainer";
import { shallow } from "enzyme";
import { Link } from "react-router";

describe("HomeContainer component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<HomeContainer />);
  });
});
