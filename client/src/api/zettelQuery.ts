import { gql } from "@apollo/client";

export const getZettelsQuery = gql`
  query GetZettels($limit: Int, $cursor: String) {
    zettels(limit: $limit, cursor: $cursor) {
      nextCursor
      data {
        id
        number
        title
        content
        type
        tags
        createdAt
        updatedAt
        meta
      }
    }
  }
`;

export const getZettelQuery = gql`
  query GetZettle($id: Int) {
    zettel(number: $id) {
      id
      number
      title
      content
      type
      tags
      createdAt
      meta
    }
  }
`;

export const createZettelMutation = gql`
  mutation CreateZettel(
    $title: String
    $content: String!
    $tags: [String]!
    $type: ZettelType!
    $meta: JSON
  ) {
    createZettel(
      title: $title
      content: $content
      tags: $tags
      type: $type
      meta: $meta
    ) {
      id
      number
      title
      content
      type
      tags
      createdAt
      meta
    }
  }
`;

export const updateZettelQuery = gql`
  mutation UpdateZettel(
    $id: ID!
    $title: String
    $tags: [String]
    $content: String
    $meta: JSON
  ) {
    updateZettel(
      id: $id
      title: $title
      tags: $tags
      content: $content
      meta: $meta
    ) {
      id
      number
      title
      content
      tags
      createdAt
      updatedAt
      meta
    }
  }
`;
