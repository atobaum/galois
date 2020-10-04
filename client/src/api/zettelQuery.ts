import { gql } from "@apollo/client";

export const updateZettelQuery = gql`
  mutation UpdateZettel(
    $id: Int!
    $title: String
    $tags: [String]
    $content: String
    $contentType: ContentType
  ) {
    updateZettel(
      id: $id
      title: $title
      tags: $tags
      content: $content
      contentType: $contentType
    ) {
      id
      title
      content
      contentType
      tags
      createdAt
      updatedAt
    }
  }
`;
