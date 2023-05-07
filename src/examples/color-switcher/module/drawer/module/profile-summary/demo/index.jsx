import React from "react";
import ReactDOM from "react-dom/client";
import { registerPlugin } from "../../../../../tyca/plugin";
import { ProfileSummaryModule } from "../module";
import UserRepository from "./environment/userRepository";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProfileSummaryModule
      environment={{
        userRepository: UserRepository(),
      }}
    />
  </React.StrictMode>
);
