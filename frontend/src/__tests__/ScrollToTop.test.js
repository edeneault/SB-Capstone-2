import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "../test-utils";

import ScrollToTop from "../components/ScrollToTop";
import ProductsPage from "../pages/ProductsPage";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  let children, match;
  beforeEach(() => {
    match = {
      params: {
        keyword: "",
      },
    };
    children = <ProductsPage match={match} />;
  });

  test("renders ScrollToTop component without crashing", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <ScrollToTop children={children} />
      </Provider>,
      { initialRoutes: [`/`] },
    );
    expect(getByText("~ All Products ~")).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);
    const { asFragment } = render(
      <Provider store={store}>
        <ScrollToTop children={children} />
      </Provider>,
      { initialRoutes: [`/`] },
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
