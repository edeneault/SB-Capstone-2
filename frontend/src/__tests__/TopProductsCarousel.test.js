import React from "react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render } from "../test-utils";
import { initialState } from "../store-mock";

import TopProductsCarousel from "../components/TopProductsCarousel.js";

const mockStore = configureMockStore([thunk]);

describe("TopProductsComponent test", () => {
  test("renders TopProductsCarousel component", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <TopProductsCarousel />
      </Provider>,
    );

    expect(getByText(/~ Top Rated Products ~/i)).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);
    const { asFragment } = render(
      <Provider store={store}>
        <TopProductsCarousel />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
