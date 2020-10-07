import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ZettelCard from "../zettel-grid/ZettelCard";

describe("<ZettelCard />", () => {
  const zettel: Zettel = {
    id: 123,
    title: "제목",
    content: `
## 소제목
- list1
`,
    tags: ["태그1", "태그2"],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it("renders props properly", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ZettelCard zettel={zettel} />
      </MemoryRouter>
    );
    // getByText("ad8f2j");
    getByText("123");
    // getByText("3");
    getByText("제목");
    getByText("소제목");
    getByText("list1");
    getByText("#태그1");
    getByText("#태그2");
  });
});
