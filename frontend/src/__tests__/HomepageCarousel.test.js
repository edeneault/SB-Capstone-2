import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render } from "../test-utils";
import { initialState } from "../store-mock";
import HomepageCarousel from "../components/HomepageCarousel.js";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  test("renders HomepageCarousel without crashing", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <HomepageCarousel />
      </Provider>,
    );

    expect(getByText("Curated Coffee Selection")).toBeDefined();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);
    const { asFragment } = render(
      <Provider store={store}>
        <HomepageCarousel />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
