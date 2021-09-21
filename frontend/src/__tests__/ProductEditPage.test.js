import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render } from "../test-utils";
import { initialState } from "../store-mock";
import ProductEditPage from "../pages/ProductEditPage.js";
import { createMemoryHistory } from "history";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  const history = createMemoryHistory();
  const path = `/admin/product/:id/edit`;

  const match = {
    isExact: false,
    path,
    url: path.replace(":id", "6125d04db949259bdec4de3c"),
    params: { id: "6125d04db949259bdec4de3c" },
  };

  test("renders ProductEditPage without crashing", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <ProductEditPage match={match} history={history} />
      </Provider>,
      { initialRoutes: [`/admin/product/6125d04db949259bdec4de3c/edit`] },
    );
    // screen.debug();
    expect(getByText(/Edit Product/i)).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);

    const { asFragment } = render(
      <Provider store={store}>
        <ProductEditPage match={match} history={history} loading={false} />
      </Provider>,
      { initialRoutes: [`/admin/product/6125d04db949259bdec4de3c/edit`] },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
