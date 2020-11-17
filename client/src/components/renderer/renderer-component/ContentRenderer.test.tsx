import React from "react";
import { render } from "@testing-library/react";
import ContentRenderer from "./ContentRenderer";
import ContentType from "../../../types/content-type";

describe("<ContentRenderer />", () => {
  const testMarkdown =
    "# header1\r\n## header2\r\n### header3\r\n\r\n[[ 1 | internal link ]]\r\n\r\n**bold**";
  it("should render markdown", () => {
    const { getByText } = render(
      <ContentRenderer
        content={testMarkdown}
        meta={{ renderer: ContentType.MARKDOWN }}
      />
    );

    getByText("header1");
    const internalLink = getByText("internal link");

    expect(internalLink.tagName).toBe("A");
    expect(internalLink.getAttribute("href")).toBe("/zettel/1");
  });

  it("should render plain text", () => {
    const { getByText, queryByText } = render(
      <ContentRenderer
        content={testMarkdown}
        meta={{ renderer: ContentType.PLAIN }}
      />
    );

    getByText(/# header1/);
  });
});
