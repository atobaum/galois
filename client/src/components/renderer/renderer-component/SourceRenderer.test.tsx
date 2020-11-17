import React from "react";
import SourceRenderer from "./SourceRenderer";
import { render } from "@testing-library/react";

describe("<SourceRenderer />", () => {
  it("renders url", () => {
    render(
      <SourceRenderer
        source={{ type: "url" as any, data: "https://www.example.com" }}
      />
    );

    expect(document.querySelector("a")?.href).toBe("https://www.example.com/");
  });

  it("renders book info", () => {
    const { getByText } = render(
      <SourceRenderer source={{ type: "book" as any, data: "책 제목" }} />
    );

    getByText("책 제목");
  });
});
