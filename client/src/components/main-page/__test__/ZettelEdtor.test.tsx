import { fireEvent, getByText, render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { useDispatch } from "react-redux";

import { initZettels } from "../../../__mocks__/react-redux";
import ZettelEditor from "../ZettelEditor";

jest.mock("react-redux");

describe("ZettelEditor", () => {
  useDispatch();
  it(" renders", () => {
    const zettel = initZettels[1];
    const { container } = render(
      <ZettelEditor
        onSubmit={() => {}}
        title={zettel.title}
        content={zettel.content}
        tags={zettel.tags}
        ref={null}
      />
    );
  });

  it("수정한 것 ref.current.getDate()했을때 리턴", () => {
    const zettel = initZettels[1];
    const ref = { current: { getData: () => {} } };
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <ZettelEditor
        onSubmit={onSubmit}
        title={zettel.title}
        content={zettel.content}
        tags={zettel.tags}
        ref={ref}
      />
    );

    const contentArea = getByPlaceholderText(/content.../);
    const tagInput = getByPlaceholderText(/tag.../);

    act(() => {
      fireEvent.change(contentArea, { target: { value: "newcontent" } });
    });
    act(() => {
      fireEvent.focus(tagInput);
      fireEvent.change(tagInput, { target: { value: "new tag" } });
    });
    act(() => {
      fireEvent.keyPress(tagInput, { key: "Enter", code: 13, charCode: 13 });
    });

    const data = ref.current.getData();
    expect(data).toEqual({
      title: zettel.title,
      content: "newcontent",
      tags: [...zettel.tags, "new tag"],
    });
  });
});
