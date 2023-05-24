import { $, useComputed$, useContext } from "@builder.io/qwik";
import { PokemonGameContext } from "~/context";

export const usePokemonGame = () => {
  const pokemonGameState = useContext(PokemonGameContext);

  const changePokemonId = $((value: number) => {
    if (pokemonGameState.pokemonId + value < 0) return;

    pokemonGameState.pokemonId += value;
  });

  const rotate = $(() => {
    pokemonGameState.showBackImage = !pokemonGameState.showBackImage;
  });

  const toggle = $(() => {
    pokemonGameState.isVisible = !pokemonGameState.isVisible;
  });

  return {
    //This is to make counter property readonly on the components who uses this hook
    pokemonId: useComputed$(() => pokemonGameState.pokemonId),
    //This is to make counter property readonly on the components who uses this hook
    isVisible: useComputed$(() => pokemonGameState.isVisible),
    //This is to make counter property readonly on the components who uses this hook
    showBackImage: useComputed$(() => pokemonGameState.showBackImage),
    nextPokemon: $(() => changePokemonId(1)),
    previousPokemon: $(() => changePokemonId(-1)),
    rotate,
    toggleVisibility: toggle,
  };
};
