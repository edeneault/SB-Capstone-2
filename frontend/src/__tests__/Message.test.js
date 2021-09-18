import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "../test-utils";

import Message from "../components/Message";

const mockStore = configureMockStore([thunk]);

test("renders Loader component without crashing", () => {
  const store = mockStore(initialState);

  const { getByRole } = render(
    <Provider store={store}>
      <Message />
    </Provider>,
  );

  expect(getByRole("alert")).toBeInTheDocument();
});

test("matches snapshot", function () {
  const store = mockStore(initialState);
  const { asFragment } = render(
    <Provider store={store}>
      <Message />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
