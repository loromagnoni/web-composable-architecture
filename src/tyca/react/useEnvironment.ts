import { useContext } from "react";
import { EnvironmentContext } from "./EnvironmentProvider";

export const useEnvironment = () => useContext(EnvironmentContext);
