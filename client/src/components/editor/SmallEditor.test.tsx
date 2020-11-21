import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "mutationobserver-shim";
import userEvent from "@testing-library/user-event";

import SmallEditor from "./SmallEditor";
import SourceType from "../../types/source-type";
import ZettelType from "../../types/zettel-type";
import ContentType from "../../types/content-type";

const bookmarkZettle: Zettel = {
  id: "80c52c84-95d0-420a-b557-8445d8938481",
  number: 201111001,
  title: "bookmark title",
  content: "bookmark content",
  type: ZettelType.BOOKMARK,
  tags: ["tag1", "tag2"],
  createdAt: new Date("2020-11-11"),
  updatedAt: new Date("2020-11-11"),
  meta: {
    source: {
      type: SourceType.URL,
      data: "https://www.example.com",
    },
    renderer: ContentType.MARKDOWN,
  },
} as Zettel;

function $(selector: string): any {
  return document.querySelector(selector);
}
describe("<SmallEditor />", () => {
  it("should set default zettel", () => {
    const onSumbit = jest.fn();
    const { getByText } = render(
      <SmallEditor onSubmit={onSumbit} defaultZettel={bookmarkZettle} />
    );

    getByText("201111001"); // number
    expect($("input[name='title']").value).toBe("bookmark title"); // title
    expect($("textarea[name='content']").value).toBe("bookmark content"); // content
    // getByText("BOOKMARK") // type
    getByText("#tag1"); // tag
    expect($("select[name='meta.source.type']").value).toBe(SourceType.URL); // source type
    expect($("input[name='meta.source.data']").value).toBe(
      "https://www.example.com"
    ); // link
    getByText("수정"); // submit button
  });

  it("should call onSubmit with correct data when user submit a note", () => {
    const onSumbit = jest.fn();
    const { getByRole } = render(<SmallEditor onSubmit={onSumbit} />);

    userEvent.type($("input[name='title']"), "new title");
    fireEvent.change($("textarea[name='content']"), {
      target: { value: "content" },
    });
    userEvent.selectOptions($("select[name='meta.renderer']"), "MARKDOWN");

    userEvent.click(getByRole("button"));
    return waitFor(
      () => {
        expect(onSumbit).toBeCalledWith({
          title: "new title",
          type: "NOTE",
          content: "content",
          meta: { renderer: "MARKDOWN" },
          tags: [],
        });
      },
      { timeout: 500 }
    );
  });

  it("can add source to note", () => {
    const onSumbit = jest.fn();
    const { getByLabelText } = render(<SmallEditor onSubmit={onSumbit} />);
    expect($("select[name='meta.source.type']")).toBeFalsy(); // source type

    userEvent.click(getByLabelText("source"));
    expect($("select[name='meta.source.type']")).toBeTruthy(); // source type
  });
  //   it("should render error");
});
