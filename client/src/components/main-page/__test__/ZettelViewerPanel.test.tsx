import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ZettelList from "../ZettelList";

import { initZettels } from "../../../__mocks__/react-redux";
import ZettelViewerPanel from "../ZettelViewerPanel";
import { setEditor } from "../../../reducers/editorReducer";

jest.mock("react-redux");

describe("ZettelViewerPanel", () => {
  const dispatch = useDispatch();
  it("renders current zettel", () => {
    dispatch(setEditor(initZettels[1]));

    const { getByText } = render(<ZettelViewerPanel />);
    const zettel = initZettels[1];

    if (zettel.title) getByText(zettel.title);
    getByText(zettel.id + "");

    getByText("Edit"); // 처음에는 보기모드
  });

  it("'Edit' 버튼 눌렀을 때 수정모드", () => {
    dispatch(setEditor(initZettels[1]));

    const { getByText } = render(<ZettelViewerPanel />);
    const zettel = initZettels[1];

    if (zettel.title) getByText(zettel.title);
    const editBtn = getByText("Edit");
    fireEvent.click(editBtn);

    const submitBtn = getByText("Submit");
    fireEvent.click(submitBtn);

    getByText("Edit");
  });
});
