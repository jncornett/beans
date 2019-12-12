import * as React from "react";
import { Link, Switch, Route } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export const BasicBreadcrumb = ({
  prefix,
  commands,
  title,
}: {
  prefix: string;
  commands: Array<{ path: string; name: string }>;
  title: string;
}) => (
  <Breadcrumb>
    <Link to="/" className="breadcrumb-item">
      Home
    </Link>
    <Link to={prefix} className="breadcrumb-item">
      {title}
    </Link>
    <Switch>
      {commands.map(({ path, name }) => (
        <Route path={`${prefix}${path}`}>
          <Breadcrumb.Item active>{name}</Breadcrumb.Item>
        </Route>
      ))}
      <Route path={`${prefix}/:id`}>
        {({ match }) => <Breadcrumb.Item active>{match?.params.id}</Breadcrumb.Item>}
      </Route>
      <Route>{null /* TODO 404 */}</Route>
    </Switch>
  </Breadcrumb>
);
