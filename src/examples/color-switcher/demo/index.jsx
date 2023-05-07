import React from "react";
import ReactDOM from "react-dom/client";
import { registerPlugin } from "@/tyca/plugin";
import { colors } from "./environment/colors";
import UserRepository from "./environment/userRepository";
import ColorSwitcherModule from "../module";

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect();

const reduxDevTools = (oldState, newState, { name }) => {
  devTools.send(name, newState);
};

registerPlugin(reduxDevTools);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorSwitcherModule
      environment={{ colors, userRepository: UserRepository() }}
    />
  </React.StrictMode>
);
