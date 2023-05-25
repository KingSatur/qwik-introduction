import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon-image";
import { usePokemonGame } from "~/hooks/usePokemonGame";

export const usePokemonId = routeLoader$<number>(
  ({ params: { id: pokemonIdParam }, redirect }) => {
    const id = Number(pokemonIdParam);
    if (isNaN(id) && (id < 0 || id > 1000)) {
      redirect(301, "/");
    }

    return Number(pokemonIdParam);
  }
);

export default component$(() => {
  const { pokemonId, toggleVisibility, isVisible, showBackImage, rotate } =
    usePokemonGame();
  return (
    <div class="flex flex-col justify-center">
      <h1>Pokemon id: {pokemonId}</h1>
      <PokemonImage
        pokemonId={pokemonId.value}
        isVisible={isVisible.value}
        showBackImage={showBackImage.value}
      />
      <div>
        <button class="btn btn-primary mr-2" onClick$={rotate}>
          Rotate
        </button>
        <button class="btn btn-primary" onClick$={toggleVisibility}>
          Reveal
        </button>
      </div>
    </div>
  );
});
