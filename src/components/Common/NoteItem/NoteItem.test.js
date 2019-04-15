import React from "react";
import ReactDOM from "react-dom";
import NoteItem from "components/Common/NoteItem/NoteItem";
import { shallow } from "enzyme";
import moment from "moment";
import { Link } from "react-router";

describe("NoteItem component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(
      <NoteItem note={{ _id: "5c801cb0be41203a155452d8" }} />
    );
  });

  it("puts the id in the class name", () => {
    const wrapper = shallow(
      <NoteItem note={{ _id: "5c801cb0be41203a155452d8" }} />
    );
    expect(wrapper.find(".note-item-5c801cb0be41203a155452d8").exists()).toBe(
      true
    );
  });

  it("renders the formatted date", () => {
    const wrapper = shallow(
      <NoteItem note={{ _id: "5c801cb0be41203a155452d8" }} />
    );
    const actualTimestamp = wrapper.find(".date").text();
    expect(actualTimestamp).toEqual("6th March 2019, 07:17 PM");
  });

  it("renders the note title", () => {
    const wrapper = shallow(
      <NoteItem note={{ _id: "123", title: "React post" }} />
    );
    expect(wrapper.find(".note-title").text()).toEqual("React post");
  });

  it("includes a link to the note page", () => {
    const wrapper = shallow(
      <NoteItem note={{ _id: "123", title: "React post" }} />
    );
    const link = wrapper.find("Link");
    expect(link.prop("to")).toEqual("/notes/123");
  });
});
