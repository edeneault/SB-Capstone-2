import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "../test-utils";
import ProductsBrandPage from "../pages/ProductsBrandPage.js";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  let brand;
  beforeEach(() => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);
    brand = "lavazza";
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });
  test("renders ProductsBrandPage without crashing", async () => {
    const store = mockStore(initialState);
    const match = {
      params: {
        brand: brand,
      },
    };

    const { getByText } = render(
      <Provider store={store}>
        <ProductsBrandPage match={match} />
      </Provider>,
      { initialRoutes: [`/allproducts`] },
    );

    expect(getByText(/~ BRAND LAVAZZA ~/i)).toBeInTheDocument();
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
        <ProductsBrandPage match={match} />
      </Provider>,
      { initialRoutes: [`/allproducts`] },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
