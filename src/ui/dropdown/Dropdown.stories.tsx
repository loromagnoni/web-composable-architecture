import type { Meta, StoryObj } from "@storybook/react";

import Dropdown from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    options: ["Option 1", "Option 2", "Option 3"],
    selected: "Option 1",
  },
};
