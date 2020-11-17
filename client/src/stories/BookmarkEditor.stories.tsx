import { Meta, Story } from "@storybook/react/types-6-0";
import React, { useState } from "react";
import BookmarkEditor from "../components/common/editor/inputs/BookmarkEditor";

export default {
  title: "Components|Editor/ContentEditor/BookmarkEditor",
  component: BookmarkEditor,
  argTypes: {
    content: { control: "text" },
    meta: { control: "object" },
    setMeta: { action: "setMeta" },
    setContent: { action: "setContent" },
  },
} as Meta;

const Template = (args: any) => {
  const [content, setContent] = useState(args.content);
  const [meta, setMeta] = useState(args.meta);
  return (
    <BookmarkEditor
      content={content}
      setContent={(v) => {
        setContent(v);
        args.setContent(v);
      }}
      meta={meta}
      setMeta={(v) => {
        setMeta(v);
        args.setMeta(v);
      }}
    />
  );
};

export const standard: any = Template.bind({});
standard.args = {
  content: "",
  meta: {},
};
