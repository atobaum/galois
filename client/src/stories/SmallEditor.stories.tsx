import { Story } from "@storybook/react/types-6-0";

import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import SmallEditor from "../components/editor/SmallEditor";
import ZettelType from "../types/zettel-type";
import SourceType from "../types/source-type";
import ContentType from "../types/content-type";

export default {
  title: "components|editor/SmallEditor",
  component: SmallEditor,
} as Meta;

const Template: Story<{ defaultZettel: Zettel }> = (args: any) => {
  return <SmallEditor {...args} />;
};

export const NewZettel = Template.bind({});

const bookmarkZettle: Zettel = {
  id: "zettle-uuid-id",
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
export const Bookmark = Template.bind({});

Bookmark.args = {
  defaultZettel: bookmarkZettle,
};
