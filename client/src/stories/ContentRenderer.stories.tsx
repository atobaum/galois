import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import ContentRenderer from "../components/common/content-renderer/ContentRenderer";
import ContentType from "../types/content-type";

export default {
  title: "Components|Basic/ContentRenderer",
  component: ContentRenderer,
} as Meta;

const template: Story<{ contentType: ContentType; content: string }> = (
  args
) => <ContentRenderer {...args} />;
export const Plain = template.bind({});
Plain.args = {
  contentType: ContentType.PLAIN,
  content: "plain content\n\ncan line breaks",
};

export const Markdown = template.bind({});
Markdown.args = {
  contentType: ContentType.MARKDOWN,
  content: "## header2\n### header3\n- list\n-list\n\n1. list\n1. list",
};
