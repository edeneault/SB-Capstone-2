import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render } from "../test-utils";
import { initialState } from "../store-mock";
import PaymentPageUpdate from "../pages/PaymentPageUpdate.js";
import { createMemoryHistory } from "history";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  const history = createMemoryHistory();

  test("renders PaymentPageUpdate without crashing", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <PaymentPageUpdate history={history} />
      </Provider>,
      { initialRoutes: [`/paymentmethod`] },
    );
    // screen.debug();
    expect(getByText(/Payment Method/i)).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);

    const { asFragment } = render(
      <Provider store={store}>
        <PaymentPageUpdate history={history} />
      </Provider>,
      { initialRoutes: [`/paymentmethod`] },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
