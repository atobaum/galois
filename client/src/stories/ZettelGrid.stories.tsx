import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";
import { mockedZettels } from "../__mocks__/dummy-data";
import { Provider } from "react-redux";
import ZettelGrid from "../components/zettel-grid/ZettelGrid";

const store = {
  getState: () => ({
    zettelGrid: {
      pendings: mockedZettels.map((z, idx) => ({
        loading: idx % 2 === 0,
        zettel: z,
      })),
      zettels: mockedZettels,
    },
    core: {
      user: {
        username: "testuser",
        email: "testuser@test.com",
      },
    },
  }),
  dispatch: action("dispatch"),
  subscribe: () => {},
} as any;

const withStore = (story: any) => <Provider store={store}>{story()}</Provider>;

export default {
  title: "Components|Viewer/ZettelGrid",
  component: ZettelGrid,
  decorators: [withStore],
} as Meta;

const Template: Story = (args: any) => <ZettelGrid {...args} />;

export const Test = Template.bind({});
