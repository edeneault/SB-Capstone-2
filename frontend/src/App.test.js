import React from "react";
import { createStore } from "redux";
import { Provider, connect, useDispatch } from "react-redux";
import { fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "./test-utils";

import App from "./App";

// import store from "./store";
// import products from "../../backend/data/products";

// console.log(products);
// console.log(store.getState());

const mockStore = configureMockStore([thunk]);
// console.log(initialState);

test("renders homepage", () => {
  const store = mockStore(initialState);

  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
      ,
    </Provider>,
  );

  expect(getByText("IMPRESSO ESPRESSO")).toBeInTheDocument();
});
