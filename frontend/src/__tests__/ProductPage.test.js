import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render } from "../test-utils";
import { initialState } from "../store-mock";
import ProductPage from "../pages/ProductPage.js";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  test("renders ProductPage without crashing", async () => {
    const store = mockStore(initialState);
    const match = {
      params: {
        keyword: "",
      },
    };

    const { getByText } = render(
      <Provider store={store}>
        <ProductPage match={match} />
      </Provider>,
      { initialRoutes: [`/allproducts`] },
    );

    expect(getByText(/Add to cart/i)).toBeInTheDocument();
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
        <ProductPage match={match} />
      </Provider>,
      { initialRoutes: [`/allproducts`] },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
