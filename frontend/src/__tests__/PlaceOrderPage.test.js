import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render } from "../test-utils";
import { initialState } from "../store-mock";
import PlaceOrderPage from "../pages/PlaceOrderPage.js";
import { createMemoryHistory } from "history";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  const history = createMemoryHistory();

  test("renders PlaceOrderPage without crashing", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <PlaceOrderPage history={history} />
      </Provider>,
      { initialRoutes: [`/placeorder`] },
    );
    // screen.debug();
    expect(getByText(/Order Summary/i)).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);

    const { asFragment } = render(
      <Provider store={store}>
        <PlaceOrderPage history={history} />
      </Provider>,
      { initialRoutes: [`/placeorder`] },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
