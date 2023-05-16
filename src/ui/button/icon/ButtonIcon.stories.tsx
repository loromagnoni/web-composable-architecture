import type { Meta, StoryObj } from "@storybook/react";

import ButtonIcon from "./ButtonIcon";

const meta: Meta<typeof ButtonIcon> = {
  component: ButtonIcon,
};

export default meta;
type Story = StoryObj<typeof ButtonIcon>;

export const Default: Story = {
  args: {
    Icon: function () {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
          <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
        </svg>
      );
    },
    onClick: () => {},
  },
};
