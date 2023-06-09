import { registerPlugin } from "@/tyca/plugin";
import { UI } from "@/ui";
import { ColorDropDownModule } from "../module/index";
import { colors } from "./environment/colors";

const meta = {
  component: ColorDropDownModule,
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default = {
  args: {
    environment: {
      colors,
      UI,
    },
  },
};
