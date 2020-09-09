import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ZettelCard from "../ZettelCard";
import { Zettel } from "../../models/Zettel";

describe("<ZettelCard />", () => {
  const zettel: Zettel = {
    uuid: "ad8f2j",
    id: 123,
    version: 3,
    title: "제목",
    content: `
## 소제목
- list1
`,
    tags: ["태그1", "태그2"],
    createdAt: new Date(),
  };

  it("renders props properly", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ZettelCard {...zettel} />
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

  it("routes", () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <ZettelCard {...zettel} />
      </Router>
    );

    const detailButton = getByText("More");
    fireEvent.click(detailButton);
    expect(history.location.pathname).toBe(`/zettel/${zettel.id}`);

    const tag = getByText("#태그1");
    fireEvent.click(tag);
    expect(history.location.pathname).toBe(`/tag/태그1`);
  });
});
