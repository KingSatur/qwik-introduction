import {
  Slot,
  component$,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import type { PokemonListState } from "./pokemon-list.context";
import { PokemonGameListContext } from "./pokemon-list.context";
import type { PokemonGameState } from "./pokemon-game.context";
import { PokemonGameContext } from "./pokemon-game.context";

export const PokemonProvider = component$(() => {
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

  return <Slot />;
});
