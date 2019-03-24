import React from "react";
import ReactDOM from "react-dom";
import NotebookModal from "components/Common/NotebookModal/NotebookModal";
import { shallow } from "enzyme";

describe("NotebookModal component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<NotebookModal />);
  });

  it("triggers the close button", () => {
    const mockOnClose = jest.fn();
    const wrapper = shallow(<NotebookModal onClose={mockOnClose} />);
    wrapper.find("button.close-btn").simulate("click");
    expect(mockOnClose).toBeCalled();
  });

  it("updates the title input value", () => {
    const wrapper = shallow(<NotebookModal />);
    wrapper
      .find(".new-notebook-title")
      .simulate("change", { target: { value: "Hello" } });
    wrapper.update();
    expect(wrapper.find(".new-notebook-title").prop("value")).toEqual("Hello");
  });

  it("updates the tags input value", () => {
    const wrapper = shallow(<NotebookModal />);
    wrapper
      .find(".new-notebook-tags")
      .simulate("change", { target: { value: "Art" } });
    wrapper.update();
    expect(wrapper.find(".new-notebook-tags").prop("value")).toEqual("Art");
  });

  it("submits the form", () => {
    const mockOnSubmit = jest.fn();
    const wrapper = shallow(<NotebookModal onSubmit={mockOnSubmit} />);
    wrapper.find(".newnotebook-btn").simulate("click");
    expect(mockOnSubmit).toBeCalled();
  });
});
