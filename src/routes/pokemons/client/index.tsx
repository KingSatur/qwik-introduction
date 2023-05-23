import {
  $,
  component$,
  useOnDocument,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon-image";
import type { SmallPokemon } from "~/interfaces";
import { getPokemons } from "~/utils";

interface PokemonsState {
  currentPage: number;
  pokemons: SmallPokemon[];
  loading: boolean;
}

export default component$(() => {
  const currentState = useStore<PokemonsState>({
    currentPage: 0,
    pokemons: [],
    loading: false,
  });

  // Executes only on client side
  // useVisibleTask$(async ({ track }) => {
  //   track(() => currentState.currentPage);
  //   const pokemons = await getPokemons(currentState.currentPage * 10);
  //   currentState.pokemons = [...currentState.pokemons, ...pokemons];
  // });

  useTask$(async ({ track }) => {
    track(() => currentState.currentPage);
    const pokemons = await getPokemons(currentState.currentPage * 10, 30);
    currentState.pokemons = [...currentState.pokemons, ...pokemons];
    currentState.loading = false;
  });

  useOnDocument(
    "scroll",
    $((event) => {
      const maxScroll = document.body.scrollHeight;
      const currentPosition = window.scrollY + window.innerHeight;

      if (currentPosition + 200 >= maxScroll && !currentState.loading) {
        currentState.loading = true;
        currentState.currentPage++;
      }
    })
  );

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Current page: {currentState.currentPage}</span>
      </div>
      <div class="mt-10">
        {/* <button
          onClick$={() => currentState.currentPage--}
          class="btn btn-primary mr-2"
        >
          Last
        </button> */}
        <button
          onClick$={() => currentState.currentPage++}
          class="btn btn-primary mr-2"
        >
          Next
        </button>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
        {currentState.pokemons?.map((pokemonData) => {
          return (
            <div
              key={pokemonData.name}
              class="m-5 flex flex-col justify-center items-center"
            >
              <PokemonImage pokemonId={pokemonData?.id} />
              <span class="capitalize">{pokemonData.name}</span>
            </div>
          );
        })}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Client",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
