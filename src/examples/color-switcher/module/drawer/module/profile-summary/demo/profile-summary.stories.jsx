import { UI } from "@/ui";
import ProfileSummaryModule from "../module/index";
import UserRepository from "./environment/userRepository";

const meta = {
  component: ProfileSummaryModule,
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
      userRepository: UserRepository(),
      UI: UI,
    },
  },
};
