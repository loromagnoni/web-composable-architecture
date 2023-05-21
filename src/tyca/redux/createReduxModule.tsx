import { configureStore } from "@reduxjs/toolkit";
import { useRef } from "react";
import EnvironmentProvider from "../react/EnvironmentProvider";
import ReduxStoreProvider from "./ReduxStoreProvider";
import { effectMiddleware } from "./effectMiddleware";

let wrappedDispatch: any;

export function wrapDispatch(dispatch: any, actions: any) {
  return Object.keys(actions).reduce((acc: any, key: any) => {
    if (typeof actions[key] === "function") {
      acc[key] = (payload: any) => {
        dispatch(actions[key](payload));
      };
    } else {
      acc[key] = wrapDispatch(dispatch, actions[key]);
    }
    return acc;
  }, {});
}

export function getWrappedDispatch() {
  return wrappedDispatch;
}

function getSubmodule(store: any, dispatch: any, key: any) {
  const submodules = getSubmodules(store, dispatch[key]);
  return {
    submodules,
    dispatch: dispatch[key],
    store: { ...store, getState: () => store.getState()[key] },
  };
}

function getSubmodules(store: any, dispatch: any) {
  return Object.keys(dispatch).reduce((acc: any, key: any) => {
    if (typeof dispatch[key] === "function") return acc;
    acc = acc || {};
    acc[key] = getSubmodule(store, dispatch, key);
    return acc;
  }, undefined);
}

let created: any;

function setup(rootSliceCreator: any, environment: any) {
  if (created) {
    console.error("Only one redux store must be created");
    console.error("slice creator passed: ", rootSliceCreator);
    console.error("environment passed: ", environment);
  }
  const slice = rootSliceCreator(environment);
  const store = configureStore({
    reducer: slice.reducer,
    middleware: [effectMiddleware],
  });
  const dispatch = wrapDispatch(store.dispatch, slice.actions);
  wrappedDispatch = dispatch;
  const submodules = getSubmodules(store, dispatch);
  created = { store, dispatch, submodules };
  return created;
}

export const createReduxModule = ({
  View,
  defaultSlice,
}: any): React.FC<any> => {
  return function ModuleWrapper({ environment, module }: any) {
    const moduleRef = useRef(
      module ? module : defaultSlice ? setup(defaultSlice, environment) : {}
    );
    return (
      <ReduxStoreProvider store={moduleRef.current}>
        <EnvironmentProvider environment={environment}>
          <View />
        </EnvironmentProvider>
      </ReduxStoreProvider>
    );
  };
};
