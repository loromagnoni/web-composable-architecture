import React from "react";
import ReactDOM from "react-dom/client";
import Module from "./examples/color-switcher-redux/module/index.js";
import { UI } from "./ui/index.js";
import { colors } from "./examples/color-switcher-redux/module/drawer/demo/environment/colors.js";
import UserRepository from "./examples/color-switcher-redux/module/drawer/module/profile-summary/demo/environment/userRepository.js";

function App() {
  return (
    <Module environment={{ UI, colors, userRepository: UserRepository() }} />
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
