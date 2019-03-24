import React from "react";
import ReactDOM from "react-dom";
import NoteList from "components/Common/NoteList/NoteList";
import { shallow } from "enzyme";

describe("NoteList component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<NoteList />);
  });

  it("trigger the displayNotes method", () => {
    const mockDisplayNotes = jest.fn();
    const wrapper = shallow(<NoteList />);
    const instance = wrapper.instance();
    instance.displayNotes = mockDisplayNotes;
    instance.render();
    expect(mockDisplayNotes).toBeCalled();
  });

  it("doesn't render note items if the notes prop is missing ", () => {
    const wrapper = shallow(<NoteList />);

    const testSubject = wrapper.find("NoteItem").exists();
    expect(testSubject).toBe(false);
  });

  it("doesn't render note items if the notes prop is present", () => {
    const wrapper = shallow(<NoteList notes={[]} />);
    expect(wrapper.find("NoteItem").exists()).toBe(false);
  });

  it("renders the note items if the notes prop is present and not empty", () => {
    const notes = [
      {
        _id: "123",
        title: "React",
        body: "Lorem ipsum bla bla bla"
      },
      {
        _id: "345",
        title: "React1",
        body: "Lorem ipsum bla bla "
      }
    ];
    const wrapper = shallow(<NoteList notes={notes} />);
    expect(wrapper.find("NoteItem").length).toBe(2);
  });
});
