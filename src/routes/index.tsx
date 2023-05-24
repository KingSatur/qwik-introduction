import { $, component$, useContext } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon-image";
import { PokemonGameContext } from "~/context";

export default component$(() => {
  const pokemonGameState = useContext(PokemonGameContext);
  const navigate = useNavigate();

  const changePokemonId = $((value: number) => {
    if (pokemonGameState.pokemonId + value < 0) return;

    pokemonGameState.pokemonId += value;
  });

  const goToPokemonPage = $(() => {
    navigate(`/pokemons/${pokemonGameState.pokemonId}`);
  });

  return (
    <>
      <span class="text-2xl">Simple seacher</span>
      <span class="text-9xl">{pokemonGameState.pokemonId}</span>

      <div onClick$={() => goToPokemonPage()}>
        <PokemonImage
          pokemonId={pokemonGameState.pokemonId}
          showBackImage={pokemonGameState.showBackImage}
          isVisible={pokemonGameState.isVisible}
        />
      </div>
      <div>
        <button
          onClick$={() => changePokemonId(-1)}
          class="btn btn-primary mr-2"
        >
          Last
        </button>
        <button
          onClick$={() => changePokemonId(+1)}
          class="btn btn-primary mr-2"
        >
          Next
        </button>
        <button
          class="btn btn-primary mr-2"
          onClick$={() => {
            pokemonGameState.showBackImage = !pokemonGameState.showBackImage;
          }}
        >
          Rotate
        </button>
        <button
          class="btn btn-primary"
          onClick$={() => {
            pokemonGameState.isVisible = !pokemonGameState.isVisible;
          }}
        >
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
