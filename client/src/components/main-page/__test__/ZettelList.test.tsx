import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { useSelector } from "react-redux";
import ZettelList from "../ZettelList";

import { initZettels } from "../../../__mocks__/react-redux";

jest.mock("react-redux");

describe("ZettelList", () => {
  it("Zettel을 클릭했을 때 redux dispatch", () => {
    const { container } = render(<ZettelList />);

    const firstZettel = container.firstChild?.firstChild;
    fireEvent.click(firstZettel!);

    const editorState = useSelector((state: any) => state.editor);
    expect(editorState.isNew).toBe(false);
    expect(editorState.zettel.id).toBe(initZettels[0].id);
  });
});
