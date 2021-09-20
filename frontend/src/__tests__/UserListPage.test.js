import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "../test-utils";
import UserListPage from "../pages/UserListPage.js";
import { createMemoryHistory, createLocation } from "history";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  const history = createMemoryHistory();
  const path = `/admin/usersList`;

  const match = {
    params: {
      pageNumber: 1,
    },
    url: path,
  };
  const location = createLocation(match.url);

  test("renders UserListPage without crashing", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <UserListPage history={history} match={match} />
      </Provider>,
      { initialRoutes: [`/admin/usersList`] },
    );
    // screen.debug();
    expect(getByText(/My Users/i)).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);

    const { asFragment } = render(
      <Provider store={store}>
        <UserListPage history={history} match={match} />
      </Provider>,
      { initialRoutes: [`/admin/usersList`] },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
