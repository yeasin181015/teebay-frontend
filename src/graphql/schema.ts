export const typeDefs = `#graphql 
 
 type User {
   id: ID 
   email: String
   password: String
 }

 type Category {
  id: ID
  name: String
 }

 type Query {
  login(email: String!, password: String!): User
 }

 type Mutation {
  createUser(createUserData: CreateUserInput!): User!
 }
 `;
