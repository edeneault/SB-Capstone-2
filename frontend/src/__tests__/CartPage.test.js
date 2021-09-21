import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render } from "../test-utils";
import { initialState } from "../store-mock";
import CartPage from "../pages/CartPage.js";
import { createMemoryHistory, createLocation } from "history";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  const history = createMemoryHistory();
  const path = `/cart/:id`;

  const match = {
    isExact: false,
    path,
    url: path.replace(":id", "6125d04db949259bdec4de3d"),
    params: { id: "6125d04db949259bdec4de3d" },
  };
  const location = createLocation(match.url);

  test("renders CartPage without crashing", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <CartPage match={match} location={location} history={history} />
      </Provider>,
      { initialRoutes: [`/cart`] },
    );

    expect(getByText(/Shopping Cart/i)).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);

    const { asFragment } = render(
      <Provider store={store}>
        <CartPage match={match} location={location} history={history} />
      </Provider>,
      { initialRoutes: [`/cart`] },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
