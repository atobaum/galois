import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { act } from "react-test-renderer";
import TagInput from "../TagInput";

describe("TagInput", () => {
  it("renders tags", () => {
    const onChange = jest.fn();
    const tags = ["t1", "t2"];
    const { getByText } = render(<TagInput tags={tags} onChange={onChange} />);

    getByText("#t1");
    getByText("#t2");
  });

  it("adds tag", () => {
    //given
    const onChange = jest.fn();
    const tags = ["t1", "t2"];
    const { getByPlaceholderText } = render(
      <TagInput tags={tags} onChange={onChange} />
    );
    const input = getByPlaceholderText("add tag...");

    //when
    act(() => {
      fireEvent.change(input, { target: { value: "newtag" } });
    });
    act(() => {
      fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
    });

    //then
    expect(onChange).toBeCalledWith([...tags, "newtag"]);
  });

  it("remove tag when tag clicked", () => {
    //given
    const onChange = jest.fn();
    const tags = ["t1", "t2"];
    const { getByText } = render(<TagInput tags={tags} onChange={onChange} />);
    const tag = getByText("#t1");

    //when
    act(() => {
      fireEvent.click(tag);
    });

    //then
    expect(onChange).toBeCalledWith(["t2"]);
  });
});
