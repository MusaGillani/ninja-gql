import { createYoga } from "graphql-yoga";
import { createServer } from "http";
import { buildSchema } from "garph";
import { resolvers, schema as g } from "./garph";

const schema = buildSchema({ g, resolvers });
// server setup
const yoga = createYoga({ schema });
const server = createServer(yoga);
server.listen(4500, () => {
  console.info("Server is running on http://localhost:4500/graphql");
});
