import {
  component$,
  Slot,
  useContextProvider,
  useStore,
  useStyles$,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import styles from "./styles.css?inline";
import Header from "~/components/shared/navbar/navbar";
import Footer from "~/components/shared/footer/footer";
import type { PokemonGameState } from "~/context";
import { PokemonGameContext } from "~/context";
import type { PokemonListState } from "~/context/pokemon/pokemon-list.context";
import { PokemonGameListContext } from "~/context/pokemon/pokemon-list.context";

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);
  const pokemonGame = useStore<PokemonGameState>({
    isVisible: true,
    pokemonId: 4,
    showBackImage: false,
  });
  const pokemonClientList = useStore<PokemonListState>({
    currentPage: 0,
    isLoading: true,
    pokemons: [],
  });
  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonGameListContext, pokemonClientList);
  return (
    <>
      <Header />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
      <Footer />
    </>
  );
});
