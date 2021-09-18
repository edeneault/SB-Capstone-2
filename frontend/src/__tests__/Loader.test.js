import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "../test-utils";

import Loader from "../components/Loader";

const mockStore = configureMockStore([thunk]);

test("renders Loader component without crashing", () => {
  const store = mockStore(initialState);

  const { getByText } = render(
    <Provider store={store}>
      <Loader />
    </Provider>,
  );

  expect(getByText("Loading...")).toBeInTheDocument();
});

test("matches snapshot", function () {
  const store = mockStore(initialState);
  const { asFragment } = render(
    <Provider store={store}>
      <Loader />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});