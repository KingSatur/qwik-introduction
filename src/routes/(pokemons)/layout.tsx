import { Slot, component$ } from "@builder.io/qwik";
import Footer from "~/components/shared/footer/footer";
import Header from "~/components/shared/navbar/navbar";

import { PokemonProvider } from "~/context";

export default component$(() => {
  return (
    <PokemonProvider>
      <Header />
      <main class="flex flex-col items-center justify-center">
        {/* Same Slot localted in pokemon-provider */}
        <Slot />
      </main>
      <Footer />
    </PokemonProvider>
  );
});
