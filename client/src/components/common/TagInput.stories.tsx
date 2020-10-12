import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import TagInput from "./TagInput";

export default {
  title: "components|basic/TagInput",
  component: TagInput,
} as Meta;

export const standard = (args: any) => {
  return <TagInput {...args} />;
};
standard.args = {
  tags: ["tag1", "tag2"],
  onChange: action("onChange"),
};
