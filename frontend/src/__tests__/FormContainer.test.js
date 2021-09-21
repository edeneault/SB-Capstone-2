import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render } from "../test-utils";
import { initialState } from "../store-mock";
import FormContainer from "../components/FormContainer";
import ProductEditPage from "../pages/ProductEditPage";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  test("renders FormContainer with children without crashing", () => {
    const store = mockStore(initialState);
    const match = {
      params: {
        id: "61306f7d7ef9b1460b0f6c6c",
      },
    };

    const { getByText } = render(
      <Provider store={store}>
        <FormContainer children={<ProductEditPage match={match} />} />
      </Provider>,
    );

    expect(getByText("Edit Product")).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);
    const match = {
      params: {
        id: "61306f7d7ef9b1460b0f6c6c",
      },
    };

    const { asFragment } = render(
      <Provider store={store}>
        <FormContainer children={<ProductEditPage match={match} />} />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
