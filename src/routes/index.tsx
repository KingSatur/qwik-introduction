import { $, component$, useSignal } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon-image";

export default component$(() => {
  const pokemonId = useSignal<number>(1);
  const showBackImage = useSignal<boolean>(false);
  const isVisible = useSignal<boolean>(false);
  const navigate = useNavigate();

  const changePokemonId = $((value: number) => {
    if (pokemonId.value + value < 0) return;

    pokemonId.value += value;
  });

  const goToPokemonPage = $(() => {
    console.log("aqui amor");
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
            showBackImage.value = !showBackImage.value;
          }}
        >
          Rotate
        </button>
        <button
          class="btn btn-primary"
          onClick$={() => {
            isVisible.value = !isVisible.value;
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
