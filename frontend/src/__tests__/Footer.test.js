import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "../test-utils";

import Footer from "../components/Footer";

const mockStore = configureMockStore([thunk]);

test("renders Footer component without crashing", () => {
  const store = mockStore(initialState);

  const { getByText } = render(
    <Provider store={store}>
      <Footer />
    </Provider>,
  );

  expect(getByText("Copyright © Impresso Espresso")).toBeInTheDocument();
});

test("matches snapshot", function () {
  const store = mockStore(initialState);
  const { asFragment } = render(
    <Provider store={store}>
      <Footer />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
