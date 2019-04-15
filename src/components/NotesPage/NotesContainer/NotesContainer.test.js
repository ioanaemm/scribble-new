import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { Link } from "react-router";
import NotesContainer from "components/NotesPage/NotesContainer/NotesContainer";
import * as Api from "api/Api";

describe("NotesContainer component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<NotesContainer />);
  });

  it("renders the preloader if the state is pending", () => {
    const wrapper = shallow(<NotesContainer />);
    expect(wrapper.find("Preloader").exists()).toBe(true);
  });

  it("doesn't render the note list", () => {
    const wrapper = shallow(<NotesContainer />);
    expect(wrapper.find("NoteList").exists()).toBe(false);
  });

  it("renders the note list", async () => {
    Api.fetchNotes = jest.fn().mockReturnValue(
      new Promise((resolve, reject) => {
        resolve({
          data: [
            {
              title: "Note1",
              _id: "1234"
            },
            {
              title: "Note2",
              _id: "12345"
            }
          ]
        });
      })
    );
    const wrapper = shallow(<NotesContainer />);

    await new Promise(resolve => resolve());
    expect(wrapper.find("NoteList").exists()).toBe(true);
  });
});
