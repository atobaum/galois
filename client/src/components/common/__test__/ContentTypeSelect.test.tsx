import { render } from "@testing-library/react";
import React from "react";
import ContentType from "../../../types/content-type";
import ContentTypeSelect from "../ContentTypeSelect";

describe("ContentTypeSelect", () => {
  it("renders option", () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <ContentTypeSelect
        onChange={onChange}
        contentType={ContentType.MARKDOWN}
      />
    );

    getByText("markdown");
    getByText("plain");
  });
});
