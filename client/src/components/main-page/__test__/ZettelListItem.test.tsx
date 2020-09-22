import React from "react";
import { fireEvent, render } from "@testing-library/react";
import ZettelListItem from "../ZettelListItem";
import { useDispatch } from "react-redux";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => mockDispatch,
}));

describe("ZettelListItem", () => {
  const props = {
    uuid: "123asdf",
    version: 1,
    title: "title",
    createdAt: new Date(),
    id: 123,
    content: "123",
    tags: ["t1", "t2"],
  };
  it("renders properly", () => {
    const onDelete = jest.fn();
    const mockedDispatch = jest.fn();
    // (useDispatch as any).mockReturnValue(mockedDispatch);
    const { getByText } = render(
      <ZettelListItem {...props} onDelete={onDelete} />
    );
    const btn = getByText("btn");
    fireEvent.click(btn);
    expect(mockDispatch).toBeCalledWith(123);
  });
});
