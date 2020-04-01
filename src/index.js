import React from "react";
import ReactDOM from "react-dom";
import ReduxToastr from "react-redux-toastr";
import "./index.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ReduxToastr
      timeOut={9000}
      newestOnTop={false}
      preventDuplicates
      position="top-left"
      getState={(state) => state.toastr} // This is the default
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick
    />
  </Provider>,
  document.getElementById("root")
);
