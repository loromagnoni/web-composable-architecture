import { Middleware } from "@reduxjs/toolkit";
import { getWrappedDispatch, wrapDispatch } from "./createReduxModule";

function scopeDispatch(dispatch: any, action: any) {
  const actionPath = action.type.split("/").slice(0, -1);
  return actionPath.reduce((s: any, path: string) => s[path], dispatch);
}

export const effectMiddleware: Middleware = (store) => (next) => (action) => {
  let syncActivityFinished = false;
  let effectQueue: Function[] = [];

  function flushQueue() {
    effectQueue.forEach((e) => e(scopeDispatch(getWrappedDispatch(), action)));
    effectQueue = [];
  }

  function runEffect(newEffect: Function) {
    effectQueue = effectQueue.concat([newEffect]);

    if (syncActivityFinished) {
      flushQueue();
    }
  }

  const actionWithEffectRunner = Object.assign({}, action, { runEffect });

  const res = next(actionWithEffectRunner);

  syncActivityFinished = true;
  flushQueue();

  return res;
};
