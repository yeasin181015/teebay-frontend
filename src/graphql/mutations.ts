import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation Signup($userArgs: CreateUserInput!) {
    createUser(createUserData: $userArgs) {
      id
      email
      address
      firstName
      lastName
      phoneNumber
    }
  }
`;
