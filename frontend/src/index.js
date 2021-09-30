import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./bootstrap.min.css";
import "react-multi-carousel/lib/styles.css";
import "./index.css";
import App from "./App";
import ScrollToTop from "./components/ScrollToTop";
import reportWebVitals from "./reportWebVitals";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
    {toast(
      "Web Application built using MERN stack as a Capstone Project. NOT A REAL STORE.",
      { type: "info" },
    )}
  </Provider>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
