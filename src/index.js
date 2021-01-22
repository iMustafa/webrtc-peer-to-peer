import "./index.css";
import "./App.css";
import "./pages.css";
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux";
import Footer from "./components/footer";
import App from "./App";
import Admin from "./pages/admin";
import About from "./pages/about";
import GuideLines from "./pages/guidelines";
import FAQ from "./pages/faq";
import Press from "./pages/press";
import Privacy from "./pages/privacy";
import Terms from "./pages/terms";
import Contacts from "./pages/contacts";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/guidelines">
            <GuideLines />
          </Route>
          <Route path="/faq">
            <FAQ />
          </Route>
          <Route path="/press">
            <Press />
          </Route>
          <Route path="/privacy">
            <Privacy />
          </Route>
          <Route path="/terms">
            <Terms />
          </Route>
          <Route path="/contact">
            <Contacts />
          </Route>
          <Redirect to="/" />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
