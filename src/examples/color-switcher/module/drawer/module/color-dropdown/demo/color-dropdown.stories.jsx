import { UI } from "@/ui";
import { ColorDropDownModule } from "../module/index";
import { colors } from "./environment/colors";

const meta = {
  component: ColorDropDownModule,
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
