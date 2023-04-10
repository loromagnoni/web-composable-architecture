import Module from "../../tyca/react/ModuleContext";
import Counter from "./Counter";

type Props = {
  module: any;
};

export default function CounterModule({ module }: Props) {
  return (
    <Module module={module}>
      <Counter />
    </Module>
  );
}
