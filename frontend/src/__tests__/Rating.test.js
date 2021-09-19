import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "../test-utils";

import Rating from "../components/Rating";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  let value, text;
  beforeEach(() => {
    (value = 5), (text = `1 reviews`);
  });

  test("renders Rating component without crashing", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <Rating value={value} text={text} />
      </Provider>,
    );

    expect(getByText("1 reviews")).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);
    const { asFragment } = render(
      <Provider store={store}>
        <Rating value={value} text={text} />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
