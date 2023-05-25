import { component$ } from "@builder.io/qwik";
import { useCounter } from "~/hooks/useCounter";

export default component$(() => {
  const { decrease, increase, counter } = useCounter(30);

  return (
    <>
      <span class="text-2xl">Counter</span>
      <span class="text-4xl">{counter.value}</span>
      <div class="mt-2">
        <button onClick$={decrease} class="btn btn-primary mr-2">
          -1
        </button>
        <button onClick$={increase} class="btn btn-primary">
          +1
        </button>
      </div>
    </>
  );
});
