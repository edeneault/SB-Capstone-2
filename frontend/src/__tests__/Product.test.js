import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initialState, render } from "../test-utils";

import Product from "../components/Product";

const mockStore = configureMockStore([thunk]);

describe("test", () => {
  let product;
  beforeEach(() => {
    product = {
      rating: 5,
      numReviews: 1,
      price: 35.99,
      countInStock: 9,
      _id: "61306f7d7ef9b1460b0f6c6c",
      name: "Espresso Capsules Sampler Bundle",
      user: "6125d04db949259bdec4de35",
      image:
        "https://res.cloudinary.com/edeneault-cloudinary/image/upload/v1630786349/eShop/yt55uakwnkvkfrxck7oj.jpg",
      category: "espresso",
      brand: "Nesgresso",
      description:
        "4 Boxes of Espresso Compatible* Capsules (40 Aluminium Capsules Total)",
      reviews: [
        {
          _id: "6133398cd6359871a6a9ee28",
          name: "John Doe",
          rating: 5,
          comment: "Delicious but pricey.",
          user: "6125d04db949259bdec4de35",
          createdAt: "2021-09-04T09:17:00.324Z",
          updatedAt: "2021-09-04T09:17:00.324Z",
        },
      ],
      createdAt: "2021-09-02T06:30:21.695Z",
      updatedAt: "2021-09-09T17:44:57.014Z",
      __v: 1,
    };
  });

  test("renders Product component without crashing", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <Product product={product} />
      </Provider>,
    );

    expect(getByText("Espresso Capsules Sampler Bundle")).toBeInTheDocument();
    expect(getByText("1 reviews")).toBeInTheDocument();
    expect(getByText("$35.99")).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const store = mockStore(initialState);
    const { asFragment } = render(
      <Provider store={store}>
        <Product product={product} />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
