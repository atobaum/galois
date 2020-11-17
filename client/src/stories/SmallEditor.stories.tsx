import { Story } from "@storybook/react/types-6-0";

import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import SmallEditor from "../components/common/editor/SmallEditor";

export default {
  title: "components|editor/SmallEditor",
  component: SmallEditor,
} as Meta;

export const standard = (args: any) => {
  return <SmallEditor {...args} />;
};

standard.args = {
  onSubmit: action("onSubmit"),
};
