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
        contentType
        tags
        createdAt
        updatedAt
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
      contentType
      tags
      createdAt
    }
  }
`;

export const createZettelMutation = gql`
  mutation CreateZettel(
    $title: String
    $content: String!
    $tags: [String]!
    $contentType: ContentType!
  ) {
    createZettel(
      title: $title
      content: $content
      tags: $tags
      contentType: $contentType
    ) {
      id
      number
      title
      content
      contentType
      tags
      createdAt
    }
  }
`;

export const updateZettelQuery = gql`
  mutation UpdateZettel(
    $id: ID!
    $title: String
    $tags: [String]
    $content: String
    $contentType: ContentType!
  ) {
    updateZettel(
      id: $id
      title: $title
      tags: $tags
      content: $content
      contentType: $contentType
    ) {
      id
      number
      title
      content
      contentType
      tags
      createdAt
      updatedAt
    }
  }
`;
