import * as React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ErrorAlert } from "../../components/ErrorAlert";
import { Loading } from "../../components/Loading";
import { GenomeCard } from "../components/GenomeCard";
import { Genome, useGenomes } from "../models/genome";

export const Empty = () => (
  <Card>
    <Card.Body>There are no items to display</Card.Body>
  </Card>
);

export const GenomesList = (): JSX.Element => {
  const { loading, error, data } = useGenomes();
  const genomes = data?.genomes.items ?? [];
  return (
    <>
      {loading && <Loading />}
      {error && <ErrorAlert error={error} />}
      {data &&
        (genomes.length === 0 ? (
          <Empty />
        ) : (
          genomes.map(genome => (
            <Row key={genome.id}>
              <Col>
                <GenomeCard genome={genome} />
              </Col>
            </Row>
          ))
        ))}
    </>
  );
};
