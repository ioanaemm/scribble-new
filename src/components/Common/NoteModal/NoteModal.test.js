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
});
