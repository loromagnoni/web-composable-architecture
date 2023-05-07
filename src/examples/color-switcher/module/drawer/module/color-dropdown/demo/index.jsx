import React from "react";
import ReactDOM from "react-dom/client";
import { ColorDropDownModule } from "../module";
import { colors } from "./environment/colors";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorDropDownModule environment={{ colors }} />
  </React.StrictMode>
);
