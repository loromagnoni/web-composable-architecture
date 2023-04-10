import CounterModule from "./CounterModule";
import { counter } from "./logic";

const module = counter.create();

export default function CounterModuleRunner() {
  return <CounterModule module={module} />;
}
