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
    const actualTimestamp = wrapper.find(".timestamp").text();
    expect(actualTimestamp).toEqual("6th March 2019");
  });

  it("includes a link to the note and renders the note title", () => {
    const wrapper = shallow(
      <NoteItem
        note={{ _id: "5c801cb0be41203a155452d8", title: "React post" }}
      />
    );
    const titleLinkProps = wrapper.find(".note-link-title").props();
    expect(titleLinkProps.children).toEqual("React post");
    expect(titleLinkProps.to).toEqual("/notes/5c801cb0be41203a155452d8");
  });

  it("renders the body content", () => {
    const wrapper = shallow(
      <NoteItem note={{ _id: "5c95ee6b40d300fae6c15d2e", body: "cucumber" }} />
    );

    const bodyNote = wrapper.find(".note-content").props()
      .dangerouslySetInnerHTML.__html;
    expect(bodyNote).toEqual("cucumber");
  });
});
