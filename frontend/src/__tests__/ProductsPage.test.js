import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render } from "../test-utils";
import { initialState } from "../store-mock";
import ProductsPage from "../pages/ProductsPage.js";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  test("renders ProductsPage without crashing", async () => {
    const store = mockStore(initialState);
    const match = {
      params: {
        keyword: "",
      },
    };

    const { getByText } = render(
      <Provider store={store}>
        <ProductsPage match={match} />
      </Provider>,
      { initialRoutes: [`/allproducts`] },
    );

    expect(getByText("~ All Products ~")).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);
    const match = {
      params: {
        keyword: "",
      },
    };

    const { asFragment } = render(
      <Provider store={store}>
        <ProductsPage match={match} />
      </Provider>,
      { initialRoutes: [`/allproducts`] },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
