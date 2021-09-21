import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render } from "../test-utils";
import { initialState } from "../store-mock";
import { createMemoryHistory, createLocation } from "history";
import LoginPage from "../pages/LoginPage.js";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  const history = createMemoryHistory();
  const path = `/cart`;

  const match = {
    isExact: false,
    path,
    url: path,
  };
  const location = createLocation(match.url);

  test("renders LoginPage without crashing", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <LoginPage location={location} history={history} />
      </Provider>,
      { initialRoutes: [`/cart`] },
    );

    expect(getByText(/password/i)).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);

    const { asFragment } = render(
      <Provider store={store}>
        <LoginPage location={location} history={history} />
      </Provider>,
      { initialRoutes: [`/cart`] },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
