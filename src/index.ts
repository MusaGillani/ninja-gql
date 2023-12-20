import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs, resolvers } from "./graphqlSDL";

// server setup
const server = new ApolloServer({
  typeDefs, //-- definitions of types of data
  resolvers, //-- functions to run each query,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server Ready at port ", 4000);
