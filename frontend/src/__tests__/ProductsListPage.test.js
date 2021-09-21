import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render } from "../test-utils";
import { initialState } from "../store-mock";
import ProductsListPage from "../pages/ProductsListPage.js";
import { createMemoryHistory, createLocation } from "history";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  const history = createMemoryHistory();
  const path = `/admin/productslist`;

  const match = {
    params: {
      pageNumber: 1,
    },
    url: path,
  };
  const location = createLocation(match.url);

  test("renders ProductsListPage without crashing", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <ProductsListPage history={history} match={match} />
      </Provider>,
      { initialRoutes: [`/admin/productslist`] },
    );
    // screen.debug();
    expect(getByText(/My Products/i)).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);

    const { asFragment } = render(
      <Provider store={store}>
        <ProductsListPage history={history} match={match} />
      </Provider>,
      { initialRoutes: [`/admin/productslist`] },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
