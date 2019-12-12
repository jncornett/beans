import * as React from "react";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

export const Loading = () => (
  <Card>
    <Card.Body>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>{" "}
      Loading...
    </Card.Body>
  </Card>
);
