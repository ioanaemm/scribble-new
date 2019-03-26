import React from "react";
import ReactDOM from "react-dom";
import NoteModal from "components/Common/NoteModal/NoteModal";
import { shallow } from "enzyme";

describe("NoteModal component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<NoteModal />);
  });

  it("triggers the close button", () => {
    const mockOnClose = jest.fn();
    const wrapper = shallow(<NoteModal onClose={mockOnClose} />);
    wrapper.find("button.close-btn").simulate("click");
    expect(mockOnClose).toBeCalled();
  });

  it("updates the input title value", () => {
    const wrapper = shallow(<NoteModal />);
    wrapper
      .find(".new-note-title")
      .simulate("change", { target: { value: "React" } });
    wrapper.update();
    expect(wrapper.find(".new-note-title").prop("value")).toEqual("React");
  });

  it("submits the form", () => {
    const mockOnSubmit = jest.fn();
    const wrapper = shallow(<NoteModal onSubmit={mockOnSubmit} />);
    wrapper.find(".newnote-btn").simulate("click");
    expect(mockOnSubmit).toBeCalled();
  });
});
