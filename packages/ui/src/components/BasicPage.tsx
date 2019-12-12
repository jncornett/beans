import * as React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Route, Switch } from "react-router-dom";
import { GenomeBreadcrumb } from "../parts/GenomeBreadcrumb";
import { GenomesList } from "../parts/GenomesList";

export const BasicPage = ({ routes = [] }: { routes?: Array<[string, React.ComponentType]> }) => {
  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <GenomeBreadcrumb />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Genomes</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Switch>
            {routes.map(([path, Component], i) => (
              <Route path={`${path}@${i}`}>
                <Component />
              </Route>
            ))}
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};
