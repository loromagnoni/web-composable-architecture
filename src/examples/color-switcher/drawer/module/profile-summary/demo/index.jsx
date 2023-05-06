import React from "react";
import ReactDOM from "react-dom/client";
import { registerPlugin } from "../../../../../tyca/plugin";
import { ProfileSummaryModule } from "../module";
import UserRepository from "./environment/userRepository";

const logger = (oldState, newState, { name }) => {
  console.log(`Applying ${name}`);
  console.log("Old state", oldState);
  console.log("New state", newState);
};

registerPlugin(logger);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProfileSummaryModule
      environment={{
        userRepository: UserRepository(),
      }}
    />
  </React.StrictMode>
);
