import { UI } from "@/ui";
import { colors } from "./environment/colors";
import DrawerModule from "../module/index";
import UserRepository from "./environment/userRepository";

const meta = {
  component: DrawerModule,
};

export default meta;

export const Default = {
  args: {
    environment: {
      colors,
      userRepository: UserRepository(),
      UI,
    },
  },
};
