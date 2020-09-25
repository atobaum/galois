import React from "react";
import { fireEvent, render } from "@testing-library/react";
import ZettelListItem from "../ZettelListItem";

describe("ZettelListItem", () => {
  const props = {
    uuid: "a4e09b69-a338-4e06-b007-6f4fd4bec369",
    id: 12,
    version: 2,
    title: "title",
    createdAt: new Date("2020-02-17T13:01:01Z"), // 2020-17-02 22:01:01 한국시간
    content: "## subtitle\n- list1\n- list2",
    tags: ["t1", "t2"],
  };
  it("renders properly", () => {
    const { getByText } = render(
      <ZettelListItem {...props} onClick={() => {}} onTagClick={() => {}} />
    );

    // render title, id, content, tags
    getByText("title");
    getByText("12");
    getByText("#t1");
    getByText("#t2");

    //date
    getByText(/17/);
  });

  it("calls 'onClick' when clicked", () => {
    const onClick = jest.fn();
    const { container } = render(
      <ZettelListItem {...props} onClick={onClick} onTagClick={() => {}} />
    );

    fireEvent.click(container.firstChild!);
    expect(onClick).toBeCalledWith(props.id);
  });

  it("calls 'onTagClick' when tag clicked", () => {
    const onClick = jest.fn();
    const onTagClick = jest.fn();
    const { getByText } = render(
      <ZettelListItem {...props} onClick={onClick} onTagClick={onTagClick} />
    );

    const tag = getByText("#t1");
    fireEvent.click(tag);
    expect(onTagClick).toBeCalled();
    expect(onClick).not.toBeCalledWith(props.id);
  });
});
