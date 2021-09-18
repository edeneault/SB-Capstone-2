import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "../test-utils";

import MetaData from "../components/MetaData";

const mockStore = configureMockStore([thunk]);
const product = "lavazza mug";

test("renders Loader component without crashing", () => {
  const store = mockStore(initialState);

  const { getByText } = render(
    <Provider store={store}>
      <MetaData title={product} />
    </Provider>,
  );

  expect(getByText(product)).to.equal(document.title);
});

test("matches snapshot", function () {
  const store = mockStore(initialState);
  const { asFragment } = render(
    <Provider store={store}>
      <MetaData title={product} />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
