import type { Meta, StoryObj } from "@storybook/react";

import TextLabel from "./TextLabel";

const meta: Meta<typeof TextLabel> = {
  component: TextLabel,
};

export default meta;
type Story = StoryObj<typeof TextLabel>;

export const Default: Story = {
  args: {
    content: "Hello World",
  },
};
