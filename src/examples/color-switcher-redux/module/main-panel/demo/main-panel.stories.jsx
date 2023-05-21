import { color } from "./environment/colors";
import MainPanelModule from "../module/index";
import { UI } from "@/ui";

const meta = {
  component: MainPanelModule,
};

export default meta;

export const Default = {
  args: {
    environment: {
      color,
      UI,
    },
  },
};
