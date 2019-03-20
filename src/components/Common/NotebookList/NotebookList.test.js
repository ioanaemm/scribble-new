import React from "react";
import ReactDOM from "react-dom";
import NotebookList from "components/Common/NotebookList/NotebookList";
import { shallow } from "enzyme";

describe("NotebookList component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<NotebookList />);
  });

  it("triggers the displayNotebookList method", () => {
    const wrapper = shallow(<NotebookList />);
    const mockDisplayNotebookList = jest.fn();
    const instance = wrapper.instance();
    instance.displayNotebookList = mockDisplayNotebookList;
    instance.render();
    expect(mockDisplayNotebookList).toBeCalled();
  });

  it("does not render the notebook items if there aren't any", () => {
    const wrapper = shallow(<NotebookList />);
    expect(wrapper.find("NotebookItem").length).toBe(0);
  });

  it("renders the notebook items", () => {
    const notebooks = [
      {
        _id: "3333"
      },
      {
        _id: "565565"
      }
    ];
    const wrapper = shallow(<NotebookList notebooks={notebooks} />);
    expect(wrapper.find("NotebookItem").length).toEqual(2);
  });
});
