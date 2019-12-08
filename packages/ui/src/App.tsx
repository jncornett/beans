import { ApolloProvider } from "@apollo/react-hooks";
// import "bootstrap/dist/css/bootstrap.css";
import "./css/themes/darkly.min.css";
import * as React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";
import graphqlClient from "./config/graphql-client";
import Pings from "./pages/Pings";
import { ToastOverlay } from "./toasts";

const Navigation = (): JSX.Element => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">beans</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <NavLink to="/" className="nav-link" exact>
          Home
        </NavLink>
        <NavLink to="/pings" className="nav-link">
          Pings
        </NavLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default hot(() => (
  <ApolloProvider client={graphqlClient}>
    <Router>
      <Navigation />
      <Switch>
        <Route path="/pings">
          <Pings />
        </Route>
      </Switch>
    </Router>
  </ApolloProvider>
));
