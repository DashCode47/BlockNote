import { gql } from "@apollo/client";

export const createNotas = gql`
  mutation CreateNotas(
    $input: CreateNotasInput!
    $condition: ModelNotasConditionInput
  ) {
    createNotas(input: $input, condition: $condition) {
      id
      titulo
      subtitulo
      userID
      User {
        id
        name
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateNotas = gql`
  mutation UpdateNotas(
    $input: UpdateNotasInput!
    $condition: ModelNotasConditionInput
  ) {
    updateNotas(input: $input, condition: $condition) {
      id
      titulo
      subtitulo
      _version
      _deleted
      _lastChangedAt
    }
  }
`;

export const getUser = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      username
      Notas {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
