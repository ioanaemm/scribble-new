import React from "react";
import ReactDOM from "react-dom";
import NotebookItem from "components/Common/NotebookItem/NotebookItem";
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
    wrapper.find("button.delete").simulate("click");
    expect(mockRemoveItem).toBeCalledWith("1234");
  });

  it("renders the notebook count", () => {
    const wrapper = shallow(<NotebookItem notebook={{ noteCount: "12" }} />);
    expect(wrapper.find(".notebook-count").text()).toEqual("12");
  });

  // it("includes link to the notebook and renders the notebook title", () => {
  //   const wrapper = shallow(
  //     <NotebookItem notebook={{ _id: "121", title: "React post" }}>
  //       <Link />
  //     </NotebookItem>
  //   );
  //   expect(wrapper.find(".notebook-link-title").text()).toEqual("React post");
  // });
});
