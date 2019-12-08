import ApolloClient from "apollo-boost";

export default new ApolloClient({
  // TODO replace with process.env.API_ENDPOINT
  uri: process.env.API,
  headers: {
    // TODO replace with process.env.API_KEY
    "x-api-key": process.env.API_KEY,
  },
});
