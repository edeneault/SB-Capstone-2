import React from "react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "../test-utils";

import AllProductsCarousel from "../components/AllProductsCarousel.js";

const mockStore = configureMockStore([thunk]);

describe("AllProductsComponent test", () => {
  test("renders AllProductsCarousel component", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <AllProductsCarousel />
      </Provider>,
    );

    expect(getByText("~ All Products ~")).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);
    const { asFragment } = render(
      <Provider store={store}>
        <AllProductsCarousel />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
