import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import ZettelListItem from "../components/zettel-page/ZettelListItem";

export default {
  title: "Components|Basic/ZettelListItem",
  component: ZettelListItem,
} as Meta;

const Template: Story = (args: any) => <ZettelListItem {...args} />;

const args = {
  id: 1,
  content: "content",
  title: "title",
  tags: [],
  createdAt: new Date(),
};

export const Test = Template.bind({});
Test.args = args;
