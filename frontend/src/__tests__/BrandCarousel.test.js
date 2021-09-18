import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "../test-utils";

import BrandCarousel from "../components/BrandCarousel.js";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  test("renders BrandCarousel without crashing", async () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <BrandCarousel brand='lavazza' />
      </Provider>,
    );

    expect(getByText("~ Brand lavazza ~")).toBeDefined();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);
    const { asFragment } = render(
      <Provider store={store}>
        <BrandCarousel brand='lavazza' />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
