import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "../test-utils";

import Paginate from "../components/Paginate";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  let pages, page, keyword;
  beforeEach(() => {
    pages = 2;
    page = 1;
    keyword = "";
  });

  test("renders Paginate component without crashing", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <Paginate pages={pages} page={page} keyword={keyword} />
      </Provider>,
    );

    expect(getByText("1")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const store = mockStore(initialState);
    const { asFragment } = render(
      <Provider store={store}>
        <Paginate pages={pages} page={page} keyword={keyword} />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
