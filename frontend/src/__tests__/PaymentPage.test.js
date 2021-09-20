import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "../test-utils";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import PaymentPage from "../pages/PaymentPage.js";
import { createMemoryHistory } from "history";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  const history = createMemoryHistory();

  test("renders PaymentPage without crashing", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <PaymentPage history={history} />
      </Provider>,
      { initialRoutes: [`/admin/orderslist`] },
    );
    // screen.debug();
    expect(getByText(/Payment Method/i)).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);

    const { asFragment } = render(
      <Provider store={store}>
        <PaymentPage history={history} />
      </Provider>,
      { initialRoutes: [`/admin/orderslist`] },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
