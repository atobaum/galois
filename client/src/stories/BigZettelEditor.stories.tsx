import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";
import BigZettelEditor from "../components/zettel-page/BigZettelEditor";

export default {
  title: "components|Editor/BigZettelEditor",
  component: BigZettelEditor,
} as Meta;

const Template: Story = (args: any) => <BigZettelEditor {...args} />;

const args = {
  zettel: {
    content: "content",
    contentType: "markdown",
    title: "title",
    tags: ["tag1"],
  },
  onEdit: action("onEdit"),
};

export const standard = Template.bind({});
standard.args = args;
