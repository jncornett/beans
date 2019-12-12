const { buildSchema } = require("graphql");
const { readFileSync } = require("fs");

module.exports = function(schemaString, config) {
  return buildSchema(readFileSync(require.resolve(schemaString), { encoding: "utf-8" }));
};
