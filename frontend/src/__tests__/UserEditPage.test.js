import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render } from "../test-utils";
import { initialState } from "../store-mock";
import UserEditPage from "../pages/UserEditPage.js";
import { createMemoryHistory } from "history";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  const history = createMemoryHistory();
  const path = `/admin/user/:id/edit`;

  const match = {
    isExact: false,
    path,
    url: path.replace(":id", "6125d04db949259bdec4de34"),
    params: { id: "6125d04db949259bdec4de34" },
  };

  test("renders UserEditPage without crashing", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <UserEditPage match={match} history={history} />
      </Provider>,
      { initialRoutes: ["/admin/user/6125d04db949259bdec4de34/edit"] },
    );
    // screen.debug();
    expect(getByText(/Edit User/i)).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);

    const { asFragment } = render(
      <Provider store={store}>
        <UserEditPage match={match} history={history} loading={false} />
      </Provider>,
      { initialRoutes: [`/admin/user/6125d04db949259bdec4de34/edit`] },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
