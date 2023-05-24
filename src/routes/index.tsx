import { $, component$ } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon-image";
import { usePokemonGame } from "~/hooks/usePokemonGame";

export default component$(() => {
  const navigate = useNavigate();

  const {
    nextPokemon,
    previousPokemon,
    rotate,
    pokemonId,
    isVisible,
    showBackImage,
    toggleVisibility,
  } = usePokemonGame();

  const goToPokemonPage = $(() => {
    navigate(`/pokemons/${pokemonId.value}`);
  });

  return (
    <>
      <span class="text-2xl">Simple seacher</span>
      <span class="text-9xl">{pokemonId.value}</span>

      <div onClick$={() => goToPokemonPage()}>
        <PokemonImage
          pokemonId={pokemonId.value}
          showBackImage={showBackImage.value}
          isVisible={isVisible.value}
        />
      </div>
      <div>
        <button onClick$={previousPokemon} class="btn btn-primary mr-2">
          Previous
        </button>
        <button onClick$={nextPokemon} class="btn btn-primary mr-2">
          Next
        </button>
        <button class="btn btn-primary mr-2" onClick$={rotate}>
          Rotate
        </button>
        <button class="btn btn-primary" onClick$={toggleVisibility}>
          Reveal
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Poke Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
