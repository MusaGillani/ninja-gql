import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "garph";
import { resolvers, schema as g } from "./garph";

const schema = buildSchema({ g, resolvers });
// server setup
const server = new ApolloServer({
  schema,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4200 },
});

console.log("Server Ready at port ", 4200);
