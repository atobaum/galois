import React from "react";
import { fireEvent, render } from "@testing-library/react";
import ZettelListItem from "../ZettelListItem";
import { mockedZettel } from "../../../__mocks__/dummy-data";

describe("ZettelListItem", () => {
  it("renders properly", () => {
    const { getByText } = render(<ZettelListItem {...mockedZettel} />);

    // render title, id, content, tags
    getByText("title");
    getByText("1");
    getByText("#tag1");
    getByText("#tag2");

    //date
    // getByText(/17/);
  });
});
