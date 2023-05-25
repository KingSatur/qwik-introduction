import { component$, useComputed$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./login.css?inline";
import { Form, routeAction$, zod$, z } from "@builder.io/qwik-city";

export const useLoginUserAction = routeAction$(
  (data, { cookie, redirect }) => {
    const { email, password } = data;

    if (email === "sample@mail.com" && password === "123") {
      cookie.set("jwt", "123213312123", { secure: true, path: "/" });
      redirect(302, "/");
      return {
        success: true,
        jwt: "123213312123",
      };
    }

    return {
      success: false,
    };
  },
  zod$({
    email: z.string().email("Invalid email"),
    password: z.string().min(3, "Min 6 characters"),
  })
);

export default component$(() => {
  useStylesScoped$(styles);

  const action = useLoginUserAction();

  return (
    <Form class="login-form" action={action}>
      <div class="relative">
        <input name="email" type="text" placeholder="Email address" />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button type="submit">Ingresar</button>
      </div>

      <p>
        {action?.value?.fieldErrors && (
          <code>Authenticated token: {action.value.jwt}</code>
        )}
      </p>
      <code>{JSON.stringify(action.value || {}, undefined, 2)}</code>
    </Form>
  );
});