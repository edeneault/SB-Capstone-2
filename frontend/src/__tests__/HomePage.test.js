import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "../test-utils";

import HomePage from "../pages/HomePage.js";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  test("renders homepage", () => {
    const store = mockStore(initialState);
    const match = {
      params: {
        keyword: "",
      },
    };

    const { getByText } = render(
      <Provider store={store}>
        <HomePage match={match} />
      </Provider>,
      { initialRoutes: [`/`] },
    );

    expect(getByText("~ All Products ~")).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);
    const match = {
      params: {
        keyword: "",
      },
    };

    const { asFragment } = render(
      <Provider store={store}>
        <HomePage match={match} />
      </Provider>,
      { initialRoutes: [`/`] },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
