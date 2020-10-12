import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ZettelCard from "../zettel-grid/ZettelCard";
import { mockedZettel } from "../../__mocks__/dummy-data";

describe("<ZettelCard />", () => {
  const zettel = mockedZettel;

  it("renders props properly", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ZettelCard zettel={zettel} />
      </MemoryRouter>
    );

    //number
    getByText("10");
    getByText("title");

    //content
    getByText("content");

    //tags
    getByText("#tag1");
    getByText("#tag2");
  });
});
