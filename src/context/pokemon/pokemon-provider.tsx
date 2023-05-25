import {
  Slot,
  component$,
  useContextProvider,
  useStore,
  useVisibleTask$,
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

  useVisibleTask$(() => {
    if (localStorage.getItem("pokemon-game")) {
      const {
        isVisible = true,
        pokemonId = 10,
        showBackImage = false,
      } = JSON.parse(localStorage.getItem("pokemon-game")!) as PokemonGameState;
      pokemonGame.isVisible = isVisible;
      pokemonGame.pokemonId = pokemonId;
      pokemonGame.showBackImage = showBackImage;
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => [
      pokemonGame.isVisible,
      pokemonGame.pokemonId,
      pokemonGame.showBackImage,
    ]);

    localStorage.setItem("pokemon-game", JSON.stringify(pokemonGame));
  });

  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonGameListContext, pokemonClientList);

  //Esta parte se me hizo un poco rara, lo importante es, Slot es un objeto global, en ese sentido, este es el mismo slot que tenemos en Layout.tsx
  return <Slot />;
});
