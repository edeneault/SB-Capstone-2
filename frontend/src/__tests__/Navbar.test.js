import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render } from "../test-utils";
import { initialState } from "../store-mock";

import Navbar from "../components/Navbar";

const mockStore = configureMockStore([thunk]);

test("renders Navbar component without crashing", () => {
  const store = mockStore(initialState);

  const { getByText } = render(
    <Provider store={store}>
      <Navbar />
    </Provider>,
  );

  expect(getByText("IMPRESSO ESPRESSO")).toBeInTheDocument();
  expect(getByText("Home")).toBeInTheDocument();
  expect(getByText("Brands")).toBeInTheDocument();
});

test("matches snapshot", function () {
  const store = mockStore(initialState);
  const { asFragment } = render(
    <Provider store={store}>
      <Navbar />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
