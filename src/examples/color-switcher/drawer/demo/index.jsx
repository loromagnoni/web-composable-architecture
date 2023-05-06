import React from "react";
import ReactDOM from "react-dom/client";
import { registerPlugin } from "@/tyca/plugin";
import { colors } from "./environment/colors";
import UserRepository from "./environment/userRepository";
import DrawerModule from "../module";

const logger = (oldState, newState, { name }) => {
  console.log(`Applying ${name}`);
  console.log("Old state", oldState);
  console.log("New state", newState);
};

registerPlugin(logger);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DrawerModule environment={{ colors, userRepository: UserRepository() }} />
  </React.StrictMode>
);
