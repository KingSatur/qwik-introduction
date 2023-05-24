import { createContextId } from "@builder.io/qwik";
import type { SmallPokemon } from "~/interfaces";

export interface PokemonListState {
  currentPage: number;
  isLoading: boolean;
  pokemons: SmallPokemon[];
}

export const PokemonGameListContext = createContextId<PokemonListState>(
  "pokemon-game-list-context"
);
