import type { Meta, StoryObj } from "@storybook/react";

import TextHeading from "./TextHeading";

const meta: Meta<typeof TextHeading> = {
  component: TextHeading,
};

export default meta;
type Story = StoryObj<typeof TextHeading>;

export const Default: Story = {
  args: {
    content: "Hello World",
    level: 1,
  },
};
