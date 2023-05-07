import React from "react";
import ReactDOM from "react-dom/client";
import DrawerModule from "../module";
import { color } from "./environment/colors";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DrawerModule environment={{ color }} />
  </React.StrictMode>
);
