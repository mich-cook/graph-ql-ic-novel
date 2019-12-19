import { resolvers } from './resolvers';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
  type Contact {
    id: ID
    firstName: String
    lastName: String
    email: String
    company: String
  }

  type Query {
    getContacts: [Contact],
    getOneContact(id: ID!): Contact
  }

  type Mutation {
    createContact(input: ContactInput): Contact
    updateContact(input: ContactInput): Contact
    deleteContact(id: ID!): String
  }

  input ContactInput {
    id: ID
    firstName: String
    lastName: String
    email: String
    company: String
  }

`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };
