import * as React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Route, Switch } from "react-router-dom";
import { GenomeBreadcrumb } from "../parts/GenomeBreadcrumb";
import { GenomesList } from "../parts/GenomesList";

export const GenomesPage = () => {
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
            <Route path="/genomes" exact>
              <GenomesList />
            </Route>
            <Route path="/genomes/add" exact>
              <div />
            </Route>
            <Route path="/genomes/:id" exact>
              <Route path="/genomes/:id"></Route>
            </Route>
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};
