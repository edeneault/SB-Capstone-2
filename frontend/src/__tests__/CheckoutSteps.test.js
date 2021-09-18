import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "../test-utils";

import CheckoutSteps from "../components/CheckoutSteps";

const mockStore = configureMockStore([thunk]);

test("renders CheckoutSteps component without crashing", () => {
  const store = mockStore(initialState);

  const { getByText } = render(
    <Provider store={store}>
      <CheckoutSteps />
    </Provider>,
  );

  expect(getByText("Shipping")).toBeInTheDocument();
});

test("matches snapshot", function () {
  const store = mockStore(initialState);
  const { asFragment } = render(
    <Provider store={store}>
      <CheckoutSteps />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
