import { component$, useComputed$ } from "@builder.io/qwik";
import {
  Link,
  type DocumentHead,
  routeLoader$,
  useLocation,
} from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon-image";
import type { SmallPokemon } from "~/interfaces";
import { getPokemons } from "~/utils";

export const usePokemonList = routeLoader$<SmallPokemon[]>(
  async ({ query, redirect }) => {
    const offset = Number(query.get("offset") || "0");

    if (isNaN(offset) || offset < 0) redirect(301, "/pokemons/list-ssr");

    return getPokemons(offset);
  }
);

export default component$(() => {
  const location = useLocation();

  const currentOffset = useComputed$<number>(() => {
    const offsetUrlParams = new URLSearchParams(location.url.search);

    return Number(offsetUrlParams.get("offset") || 0);
  });

  const pokemons = usePokemonList();

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Current offset: {currentOffset}</span>
        {location.isNavigating && <span>Is loading</span>}
      </div>
      <div class="mt-10">
        <Link
          class="btn btn-primary mr-2"
          href={`/pokemons/list-ssr?offset=${currentOffset.value - 10}`}
        >
          Last
        </Link>
        <Link
          class="btn btn-primary mr-2"
          href={`/pokemons/list-ssr?offset=${currentOffset.value + 10}`}
        >
          Next
        </Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {pokemons.value?.map((pokemonData) => {
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
  title: "SSR",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
