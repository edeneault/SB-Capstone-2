import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "../test-utils";
import { createMemoryHistory, createLocation } from "history";
import RegisterPage from "../pages/RegisterPage.js";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  const history = createMemoryHistory();
  const path = `/register`;

  const match = {
    isExact: false,
    path,
    url: path,
  };
  const location = createLocation(match.url);

  test("renders RegisterPage without crashing", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <RegisterPage location={location} history={history} />
      </Provider>,
      { initialRoutes: [`/register`] },
    );

    expect(getByText(/sign up/i)).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);

    const { asFragment } = render(
      <Provider store={store}>
        <RegisterPage location={location} history={history} />
      </Provider>,
      { initialRoutes: [`/register`] },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
