import React from "react";
import ReactDOM from "react-dom";
import "./styles/styles.scss";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { firebase } from "./firebase/firebase";
import { startSetExpenses } from "./actions/expenses";
import { login, logout } from "./actions/auth";
import LoadingPage from "./components/LoadingPage";

const store = configureStore();
ReactDOM.render(<LoadingPage />, document.getElementById("root"));

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(
      <Provider store={store}>
        <AppRouter />
      </Provider>,
      document.getElementById("root")
    );
    hasRendered = true;
  }
};

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === "/") {
        history.push("/dashboard");
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});
