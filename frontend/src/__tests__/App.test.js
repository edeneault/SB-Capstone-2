import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "../test-utils";

import App from "../App";

const mockStore = configureMockStore([thunk]);

test("renders App", () => {
  const store = mockStore(initialState);

  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  expect(getByText("IMPRESSO ESPRESSO")).toBeInTheDocument();
});

test("matches snapshot", function () {
  const store = mockStore(initialState);
  const { asFragment } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
