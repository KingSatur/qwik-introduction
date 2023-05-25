import { $, useComputed$, useSignal } from "@builder.io/qwik";

export const useCounter = (initialValue: number) => {
  const counter = useSignal(initialValue);

  const increase = $(() => {
    counter.value++;
  });

  const decrease = $(() => {
    counter.value--;
  });

  return {
    //This is to make counter property readonly on the components who uses this hook
    counter: useComputed$(() => counter.value),
    increase,
    decrease,
  };
};
