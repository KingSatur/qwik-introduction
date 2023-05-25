import {
  $,
  component$,
  useComputed$,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";

import styles from "./login.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const formState = useStore({
    email: "",
    password: "",
    isSubmitted: false,
  });

  const emailError = useComputed$(() => {
    if (formState.email.includes("@")) return "";

    return "not-valid";
  });

  const passwordError = useComputed$(() => {
    if (formState.password.length >= 7) return "";

    return "not-valid";
  });

  const isValid = useComputed$(() => {
    return (
      emailError.value !== "not-valid" && passwordError.value !== "not-valid"
    );
  });

  const onSubmit = $(() => {
    if (!formState.isSubmitted) formState.isSubmitted = true;
    const { email, password } = formState;
    console.log({ email, password });
  });

  return (
    <form class="login-form" onSubmit$={onSubmit} preventdefault:submit>
      <div class="relative">
        <input
          value={formState.email}
          onInput$={(ev) =>
            (formState.email = (ev.target as HTMLInputElement).value)
          }
          class={formState.isSubmitted ? emailError.value : ""}
          name="email"
          type="text"
          placeholder="Email address"
        />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          value={formState.password}
          onInput$={(ev) =>
            (formState.password = (ev.target as HTMLInputElement).value)
          }
          class={formState.isSubmitted ? passwordError.value : ""}
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button type="submit" disabled={!isValid.value}>
          Ingresar
        </button>
      </div>

      <code>{JSON.stringify(formState, undefined, 2)}</code>
    </form>
  );
});
