import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import AuthContextProvider from "./AuthContext";
ReactDOM.render(
  <Provider store={store}>
    {/* <AuthContextProvider> */}
      <App />
    {/* </AuthContextProvider> */}
  </Provider>,
  document.getElementById("root")
);
