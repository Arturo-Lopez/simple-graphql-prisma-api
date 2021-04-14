import "dotenv/config";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

import { PrismaClient } from "@prisma/client";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Query {
    users: [User]!
  }
`;

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

apolloServer.applyMiddleware({ app });

const { SERVER_PORT } = process.env;

app.listen({ port: SERVER_PORT }, () => {
  console.log(`Server on: http://localhost:${SERVER_PORT}/graphql`);
});
