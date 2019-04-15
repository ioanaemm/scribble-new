import React from "react";
import ReactDOM from "react-dom";
import Title from "components/Common/Title/Title";
import { shallow } from "enzyme";

describe("Title component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Title />);
  });

  it("renders the content", () => {
    const wrapper = shallow(<Title content="Notebook title" />);
    expect(wrapper.text()).toEqual("Notebook title ");
  });
});
