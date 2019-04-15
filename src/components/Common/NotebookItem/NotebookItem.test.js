import React from "react";
import ReactDOM from "react-dom";
import { NotebookItem } from "./NotebookItem";
import { shallow } from "enzyme";
import { Link } from "react-router";

describe("NotebookItem component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<NotebookItem notebook={{}} />);
  });

  it("puts the id in the class name", () => {
    const wrapper = shallow(<NotebookItem notebook={{ _id: "123" }} />);
    expect(wrapper.find(".notebook-item-123").exists()).toBe(true);
  });

  it("removes the item", () => {
    const mockRemoveItem = jest.fn();
    const wrapper = shallow(
      <NotebookItem
        removeNotebook={mockRemoveItem}
        notebook={{ _id: "1234" }}
      />
    );
    wrapper
      .find("button.delete")
      .simulate("click", { stopPropagation: jest.fn() });
    expect(mockRemoveItem).toBeCalledWith("1234");
  });

  it("renders the notebook count", () => {
    const wrapper = shallow(<NotebookItem notebook={{ noteCount: "12" }} />);
    expect(wrapper.find(".notebook-count").text()).toEqual("12");
  });

  it("opens the notebook on click", () => {
    const mockHistory = {
      push: jest.fn()
    };
    const wrapper = shallow(
      <NotebookItem
        notebook={{ _id: "121", title: "React post" }}
        history={mockHistory}
      />
    );
    wrapper.find(".notebook-item-container").simulate("click");
    expect(mockHistory.push).toBeCalled();
  });

  it("doesn't render tags if they are not present", () => {
    const wrapper = shallow(<NotebookItem notebook={{}} />);
    expect(wrapper.find(".tags").exists()).toBe(false);
  });

  it("renders tags if they are present", () => {
    const wrapper = shallow(<NotebookItem notebook={{ tags: "react" }} />);
    expect(wrapper.find(".tags").exists()).toBe(true);
    expect(wrapper.find(".tags").props().label).toEqual("react");
  });
});
