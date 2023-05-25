import {
  $,
  component$,
  useContext,
  useOnDocument,
  useTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon-image";
import { PokemonGameListContext } from "~/context";
import { getPokemons } from "~/utils";

export default component$(() => {
  const currentState = useContext(PokemonGameListContext);

  // Executes only on client side
  // useVisibleTask$(async ({ track }) => {
  //   track(() => currentState.currentPage);
  //   const pokemons = await getPokemons(currentState.currentPage * 10);
  //   currentState.pokemons = [...currentState.pokemons, ...pokemons];
  // });

  useTask$(async ({ track }) => {
    track(() => currentState.currentPage);

    if (
      (currentState.isLoading && currentState.currentPage >= 1) ||
      currentState.currentPage === 0
    ) {
      const pokemons = await getPokemons(currentState.currentPage * 30, 30);
      currentState.pokemons = [...currentState.pokemons, ...pokemons];
      currentState.isLoading = false;
    }
  });

  // useTask$(async ({ track }) => {
  //   track(() => currentState.currentPage);

  //   if (currentState.currentPage === 0) {
  //     const pokemons = await getPokemons(currentState.currentPage * 30, 30);
  //     currentState.pokemons = [...pokemons];
  //   }
  //   if (currentState.currentPage >= 1 ) {
  //     const pokemons = await getPokemons(currentState.currentPage * 30, 30);
  //     currentState.pokemons = [...currentState.pokemons, ...pokemons];
  //   }
  //   currentState.isLoading = false;
  // });

  useOnDocument(
    "scroll",
    $(() => {
      const maxScroll = document.body.scrollHeight;
      const currentPosition = window.scrollY + window.innerHeight;

      if (currentPosition + 50 >= maxScroll && !currentState.isLoading) {
        currentState.isLoading = true;
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
              <PokemonImage pokemonId={pokemonData?.id} isVisible={true} />
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
