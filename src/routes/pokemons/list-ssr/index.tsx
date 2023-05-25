import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  Link,
  type DocumentHead,
  routeLoader$,
  useLocation,
} from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon-image";
import { Modal } from "~/components/shared";
import type { SmallPokemon } from "~/interfaces";
import { getPokemons } from "~/utils";
import { getDataAboutPokemon } from "~/utils/get-response-by-prompt";

export const usePokemonList = routeLoader$<SmallPokemon[]>(
  async ({ query, redirect }) => {
    const offset = Number(query.get("offset") || "0");

    if (isNaN(offset) || offset < 0) redirect(301, "/pokemons/list-ssr");

    return getPokemons(offset);
  }
);

export default component$(() => {
  const location = useLocation();
  const isModalVisible = useSignal(false);

  const modalPokemon = useStore<{
    pokemonId: number | null;
    name: string;
    message: string | null;
  }>({
    pokemonId: null,
    name: "",
    message: "",
  });

  const showModal = $((id: number, name: string) => {
    modalPokemon.pokemonId = id;
    modalPokemon.name = name;
    isModalVisible.value = true;
  });

  const closeModal = $(() => {
    isModalVisible.value = false;
    modalPokemon.message = "";
  });

  useVisibleTask$(async ({ track }) => {
    track(() => modalPokemon.name);

    if (modalPokemon?.name?.length >= 0) {
      modalPokemon.message = await getDataAboutPokemon(modalPokemon.name);
    }
  });

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
              onClick$={() => showModal(pokemonData.id, pokemonData.name)}
              class="m-5 flex flex-col justify-center items-center"
            >
              <PokemonImage pokemonId={pokemonData?.id} isVisible={true} />
              <span class="capitalize">{pokemonData.name}</span>
            </div>
          );
        })}
      </div>
      <Modal
        isPersistent={false}
        size="lg"
        showModal={isModalVisible.value}
        closeFn={closeModal}
      >
        <div q:slot="title">{modalPokemon.name}</div>
        <div q:slot="content" class="flex flex-col items-center">
          <PokemonImage pokemonId={modalPokemon.pokemonId!} />
          <span>{modalPokemon.message || "Asking to OpenAI"}</span>
        </div>
      </Modal>
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
