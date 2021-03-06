import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render } from "../test-utils";
import { initialState } from "../store-mock";
import { waitFor } from "@testing-library/react";

import MetaData from "../components/MetaData";

const mockStore = configureMockStore([thunk]);
const title = "Welcome to Impresso Espresso";

function getMeta(metaName) {
  const title = document.title;
  if (title === metaName) {
    return title;
  }
  return "";
}

test("renders MetaData component without crashing", () => {
  const store = mockStore(initialState);

  render(
    <>
      <Provider store={store}>
        <MetaData />
        <div>Body</div>
      </Provider>
      ,
    </>,
  );

  waitFor(() => expect(getMeta(title)).toEqual(title));
});

test("matches snapshot", function () {
  const store = mockStore(initialState);
  const { asFragment } = render(
    <Provider store={store}>
      <MetaData title={title} />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
