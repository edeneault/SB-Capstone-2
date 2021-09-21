import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render } from "../test-utils";
import { initialState } from "../store-mock";

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

test("matches snapshot", () => {
  const store = mockStore(initialState);
  const { asFragment } = render(
    <Provider store={store}>
      <Loader />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
