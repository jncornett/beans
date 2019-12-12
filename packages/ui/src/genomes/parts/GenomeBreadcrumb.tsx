import * as React from "react";
import { Link, Switch, Route } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export const GenomeBreadcrumb = () => (
  <Breadcrumb>
    <Link to="/" className="breadcrumb-item">
      Home
    </Link>
    <Link to="/genomes" className="breadcrumb-item">
      Genomes
    </Link>
    <Switch>
      <Route path="/genomes/add">
        <Breadcrumb.Item active>Add</Breadcrumb.Item>
      </Route>
      <Route path="/genomes/:id">
        {({ match }) => <Breadcrumb.Item active>{match?.params.id}</Breadcrumb.Item>}
      </Route>
      <Route>{null}</Route>
    </Switch>
  </Breadcrumb>
);
