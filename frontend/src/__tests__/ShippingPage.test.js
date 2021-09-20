import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "../test-utils";
import ShippingPage from "../pages/ShippingPage";
import { createMemoryHistory } from "history";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  const history = createMemoryHistory();

  test("renders Shipping without crashing", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <ShippingPage history={history} />
      </Provider>,
      { initialRoutes: [`/shipping`] },
    );
    // screen.debug();
    expect(getByText(/address/i)).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);

    const { asFragment } = render(
      <Provider store={store}>
        <ShippingPage history={history} />
      </Provider>,
      { initialRoutes: [`/shipping`] },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
