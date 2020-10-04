import { act, fireEvent, render } from "@testing-library/react";
import React from "react";
import { useDispatch } from "react-redux";

import { initZettels } from "../../../__mocks__/react-redux";
import ZettelViewerPanel from "../ZettelViewerPanel";
import { setViewer } from "../../../redux/editorReducer";

jest.mock("react-redux");

describe("ZettelViewerPanel", () => {
  const dispatch = useDispatch();
  it("renders current zettel", () => {
    dispatch(setViewer(initZettels[1]));

    const { getByText } = render(<ZettelViewerPanel />);
    const zettel = initZettels[1];

    if (zettel.title) getByText(zettel.title);
    getByText(zettel.id + "");

    getByText("Edit"); // 처음에는 보기모드
  });

  it("'Edit' 버튼 눌렀을 때 수정모드", () => {
    dispatch(setViewer(initZettels[1]));

    const { getByText } = render(<ZettelViewerPanel />);
    const zettel = initZettels[1];

    if (zettel.title) getByText(zettel.title);
    const editBtn = getByText("Edit");
    act(() => {
      fireEvent.click(editBtn);
    });

    expect(dispatch).toHaveBeenLastCalledWith(
      expect.objectContaining({
        type: "editor/START_EDIT",
        payload: expect.objectContaining({ id: zettel.id }),
      })
    );
  });
});
