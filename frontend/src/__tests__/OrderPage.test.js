import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render, screen } from "../test-utils";
import OrderPage from "../pages/OrderPage.js";
import { createMemoryHistory, createLocation } from "history";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  const history = createMemoryHistory();
  const path = `/orders/:id`;

  const match = {
    isExact: false,
    path,
    url: path.replace(":id", "6125d0c2d3ffd29bedee24af"),
    params: { id: "6125d0c2d3ffd29bedee24af" },
  };

  test("renders OrderPage without crashing", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <OrderPage match={match} history={history} />
      </Provider>,
      { initialRoutes: [`/orders/6125d0c2d3ffd29bedee24af`] },
    );
    // screen.debug();
    expect(getByText(/Order:/i)).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);

    const { asFragment } = render(
      <Provider store={store}>
        <OrderPage match={match} history={history} loading={false} />
      </Provider>,
      { initialRoutes: [`/orders/6125d0c2d3ffd29bedee24af`] },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
