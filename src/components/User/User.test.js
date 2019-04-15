import React from "react";
import ReactDOM from "react-dom";
import User from "components/User/User";
import { shallow } from "enzyme";

import * as Api from "api/Api";

describe("User component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<User />);
  });

  it("renders the username input", () => {
    const wrapper = shallow(<User />);
    expect(wrapper.find(".username").exists()).toBe(true);
  });

  it("renders the password input", () => {
    const wrapper = shallow(<User />);
    expect(wrapper.find(".password").exists()).toBe(true);
  });

  it("the username input works", () => {
    const wrapper = shallow(<User />);
    wrapper
      .find(".username")
      .simulate("change", { target: { value: "ioanam" } });
    expect(wrapper.find(".username").prop("value")).toEqual("ioanam");
  });

  it("the password input works", () => {
    const wrapper = shallow(<User />);
    wrapper
      .find(".password")
      .simulate("change", { target: { value: "qwerty" } });
    expect(wrapper.find(".password").prop("value")).toEqual("qwerty");
  });

  it("does not submit the form", () => {
    const mockSignInUser = jest.fn();
    // when a non-enter key is pressed,
    // the Api.signInUser function doesn't get called
    Api.signInUser = mockSignInUser;
    const wrapper = shallow(<User />);
    wrapper.find(".login").simulate("keydown", { key: "Shift" });
    expect(mockSignInUser).not.toBeCalled();
  });

  it("submits the form", async () => {
    Api.signInUser = jest.fn().mockReturnValue(
      new Promise((resolve, reject) => {
        resolve({
          data: {
            foo: "test"
          }
        });
      })
    );
    const mockOnLogin = jest.fn();
    const wrapper = shallow(<User onLogin={mockOnLogin} />);
    wrapper.find(".login").simulate("submit", { preventDefault: jest.fn() });
    await new Promise(resolve => resolve());
    expect(mockOnLogin).toBeCalledWith({ foo: "test" });
  });
});
