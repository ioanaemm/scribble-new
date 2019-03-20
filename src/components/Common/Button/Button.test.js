import React from "react";
import ReactDOM from "react-dom";
import Button from "components/Common/Button/Button";
import { shallow } from "enzyme";

describe("Button component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Button />);
  });

  it("renders the assigned classNames and the type", () => {
    const wrapper = shallow(<Button type="primary" className="notebook-btn" />);
    expect(wrapper.find(".primary.notebook-btn").exists()).toBe(true);
  });

  it("triggers the onClick handler", () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(<Button onClick={mockOnClick} />);
    wrapper.find("button").simulate("click");
    expect(mockOnClick).toBeCalled();
  });

  it("renders the label", () => {
    const wrapper = shallow(<Button label="Save" />);
    expect(wrapper.text()).toEqual("Save");
  });
});
