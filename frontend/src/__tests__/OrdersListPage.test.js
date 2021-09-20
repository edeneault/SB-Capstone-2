import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "../test-utils";
import OrdersListPage from "../pages/OrdersListPage.js";
import { createMemoryHistory } from "history";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  const history = createMemoryHistory();

  test("renders OrdersListPage without crashing", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <OrdersListPage history={history} />
      </Provider>,
      { initialRoutes: [`/admin/orderslist`] },
    );
    // screen.debug();
    expect(getByText(/My Orders/i)).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);

    const { asFragment } = render(
      <Provider store={store}>
        <OrdersListPage history={history} loading={false} />
      </Provider>,
      { initialRoutes: [`/admin/orderslist`] },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
