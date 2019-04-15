import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import { SearchResultsPage } from "components/SearchResultsPage/SearchResultsPage";
import * as Api from "api/Api";

const match = {
  params: {
    query: "react"
  }
};

describe("SearchResultsPage component", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<SearchResultsPage match={match} />);
  });

  it("does not render the notebook list if there aren't any notebooks", () => {
    const wrapper = shallow(<SearchResultsPage match={match} />);
    expect(wrapper.find(".notebook-list").exists()).toBe(false);
  });

  it("renders the notebook list", async () => {
    Api.fetchSearchList = jest.fn().mockReturnValue(
      new Promise((resolve, reject) => {
        resolve({
          data: {
            notebooks: [
              {
                title: "Notebook1 ",
                _id: "12345"
              },
              {
                title: "Notebook2",
                _id: "234"
              }
            ]
          }
        });
      })
    );

    const wrapper = shallow(<SearchResultsPage match={match} />);
    await new Promise(resolve => resolve());
    expect(wrapper.find("NotebookList").exists()).toBe(true);
  });

  it("doesn't render the note list", () => {
    const wrapper = shallow(<SearchResultsPage match={match} />);
    expect(wrapper.find(".note-list").exists()).toBe(false);
  });

  it("renders the note list", async () => {
    Api.fetchSearchList = jest.fn().mockReturnValue(
      new Promise((resolve, reject) => {
        resolve({
          data: {
            notes: [
              {
                title: "Note1",
                _id: "1234"
              },
              {
                title: "Note2",
                _id: "12345"
              }
            ]
          }
        });
      })
    );
    const wrapper = shallow(<SearchResultsPage match={match} />);
    await new Promise(resolve => resolve());
    expect(wrapper.find("NoteList").exists()).toBe(true);
  });
});
