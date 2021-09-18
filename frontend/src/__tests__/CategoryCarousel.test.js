import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "../test-utils";
import CategoryCarousel from "../components/CategoryCarousel.js";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  test("renders CategoryCarousel without crashing", async () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <CategoryCarousel category='espresso' />
      </Provider>,
    );

    expect(getByText("~ Category espresso ~")).toBeDefined();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);
    const { asFragment } = render(
      <Provider store={store}>
        <CategoryCarousel category='espresso' />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});