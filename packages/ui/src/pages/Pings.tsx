import { useMutation, useQuery } from "@apollo/react-hooks";
import { ApolloError } from "apollo-client";
import cx from "classnames";
import gql from "graphql-tag";
import * as React from "react";
import Alert from "react-bootstrap/Alert";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import useForm from "react-hook-form";
import { Link, NavLink, Route, Switch, useHistory } from "react-router-dom";
import { useUID } from "react-uid";

const LIST_PINGS_QUERY = gql`
  query ListPings {
    listPings {
      items {
        id
        name
      }
      nextToken
    }
  }
`;

type ListPingsQuery = {
  listPings: { items: { id: string; name: string }[]; nextToken: string | null };
};

const CREATE_PING_QUERY = gql`
  mutation CreatePing($name: String!) {
    createPing(name: $name) {
      id
      name
    }
  }
`;

type CreatePingQuery = {
  createPing: { id: string; name: string };
};

type CreatePingVariables = {
  name: string;
};

const ErrorAlert = ({ error }: { error: ApolloError }): JSX.Element => {
  const message = (() => {
    if (error.networkError) {
      const { statusCode, bodyText } = error.networkError as any;
      if (statusCode) {
        return `${statusCode}: ${bodyText}`;
      }
    }
    return error.message;
  })();
  return (
    <Alert variant="danger">
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      {message}
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </Alert>
  );
};

const CreatePingForm = (): JSX.Element => {
  const history = useHistory();
  const [mutate, { loading, error }] = useMutation<CreatePingQuery, CreatePingVariables>(
    CREATE_PING_QUERY,
    {
      update(cache, { data }) {
        console.log(data);
        if (data?.createPing) {
          try {
            const result = cache.readQuery<ListPingsQuery>({ query: LIST_PINGS_QUERY });
            if (result) {
              cache.writeQuery<ListPingsQuery, {}>({
                query: LIST_PINGS_QUERY,
                data: {
                  listPings: {
                    ...result.listPings,
                    items: [...result.listPings.items, data.createPing],
                  },
                },
              });
            }
          } catch (err) {}
        }
      },
    },
  );
  const { register, handleSubmit, errors } = useForm<CreatePingVariables>({ mode: "onBlur" });
  const nameId = useUID();
  const onSubmit = async (variables: CreatePingVariables): Promise<void> => {
    if (loading) {
      return;
    }
    await mutate({ variables }).then(() => history.goBack());
  };
  return (
    <>
      <h4>Create Ping</h4>
      {error && <ErrorAlert error={error} />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label htmlFor={nameId}>Name</Form.Label>
          <Form.Control
            id={nameId}
            className={cx(errors.name && "is-invalid")}
            type="text"
            name="name"
            isInvalid={!!errors.name}
            disabled={loading}
            ref={register({ required: true }) as any}
          />
          {errors.name && (
            <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Row className="float-right">
          {!loading && (
            <Link to="/pings" className="btn btn-outline-secondary mr-1">
              Cancel
            </Link>
          )}
          <Button variant="primary" type="submit" disabled={loading || !!errors.name}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="mr-1"
                />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Form.Row>
      </Form>
    </>
  );
};

const PingDetail = ({ ping }): JSX.Element => {
  return <pre>{JSON.stringify(ping, null, 2)}</pre>;
};

const PingsList = (): JSX.Element => {
  const { loading, error, data } = useQuery<ListPingsQuery>(LIST_PINGS_QUERY, {
    pollInterval: 10000,
  });
  return (
    <>
      {loading && (
        <>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>{" "}
          Loading results...
        </>
      )}
      {error && <ErrorAlert error={error} />}
      {data &&
        data?.listPings.items.map(({ id, name }) => (
          <pre key={id}>
            {id}: {name}
          </pre>
        ))}
      {data?.listPings.items.length === 0 && !error && (
        <Alert variant="secondary">No items to display</Alert>
      )}
    </>
  );
};

export default function Pings(): JSX.Element {
  return (
    <Container className="mt-3">
      <Row className="align-items-center">
        <Col>
          <Breadcrumb>
            <Link to="/" className="breadcrumb-item">
              Home
            </Link>
            <Link to="/pings" className="breadcrumb-item">
              Pings
            </Link>
            <Switch>
              <Route path="/pings/create">
                <Breadcrumb.Item active>Create</Breadcrumb.Item>
              </Route>
              <Route path="/pings/:id">
                {({ match }) => <Breadcrumb.Item active>{match?.params.id}</Breadcrumb.Item>}
              </Route>
              <Route>{null}</Route>
            </Switch>
          </Breadcrumb>
        </Col>
        <Col className="col-auto h-100 pb-3">
          <NavLink to="/pings/create" className="btn btn-link" activeClassName="disabled">
            Create Ping
          </NavLink>
        </Col>
      </Row>
      <Row>
        <Col>
          <Switch>
            <Route path="/pings" exact>
              <PingsList />
            </Route>
            <Route path="/pings/create" exact>
              <CreatePingForm />
            </Route>
            <Route path="/pings/:id" exact>
              <Route path="/pings/:id">
                {({ match }) => <Breadcrumb.Item active>{match?.params.id}</Breadcrumb.Item>}
              </Route>
            </Route>
          </Switch>
        </Col>
      </Row>
    </Container>
  );
}
