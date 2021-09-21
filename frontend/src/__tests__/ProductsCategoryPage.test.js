import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render } from "../test-utils";
import { initialState } from "../store-mock";
import ProductsCategoryPage from "../pages/ProductsCategoryPage.js";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  let category;
  beforeEach(() => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);
    category = "espresso";
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });
  test("renders ProductsCategoryPage without crashing", async () => {
    const store = mockStore(initialState);
    const match = {
      params: {
        category: category,
      },
    };

    const { getByText } = render(
      <Provider store={store}>
        <ProductsCategoryPage match={match} />
      </Provider>,
      { initialRoutes: [`/allproducts`] },
    );

    expect(getByText(/~ category espresso ~/i)).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);
    const match = {
      params: {
        category: category,
      },
    };

    const { asFragment } = render(
      <Provider store={store}>
        <ProductsCategoryPage match={match} />
      </Provider>,
      { initialRoutes: [`/allproducts`] },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
