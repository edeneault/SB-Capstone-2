import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState } from "../store-mock";
import { render, screen } from "../test-utils";

import SearchBox from "../components/SearchBox";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  let name;
  beforeEach(() => {
    name = "lavazza";
  });

  test("renders SearchBox component without crashing", () => {
    const store = mockStore(initialState);

    const { getByRole } = render(
      <Provider store={store}>
        <SearchBox name={name} />
      </Provider>,
    );

    expect(screen.getByRole("textbox").placeholder).toEqual("search lavazza");
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);
    const { asFragment } = render(
      <Provider store={store}>
        <SearchBox name={name} />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
