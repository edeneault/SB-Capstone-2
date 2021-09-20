import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "../test-utils";
import ProfilePage from "../pages/ProfilePage.js";
import { createMemoryHistory } from "history";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  const history = createMemoryHistory();
  const path = `/profile`;

  test("renders ProfilePage without crashing", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <ProfilePage history={history} />
      </Provider>,
      { initialRoutes: [`/profile`] },
    );

    expect(getByText(/My Orders/i)).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);

    const { asFragment } = render(
      <Provider store={store}>
        <ProfilePage history={history} />
      </Provider>,
      { initialRoutes: [`/profile`] },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
