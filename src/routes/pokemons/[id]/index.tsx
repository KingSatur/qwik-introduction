import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon-image";

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
  // const {
  //   params: { id },
  // } = useLocation();

  const pokemonId = usePokemonId();

  return (
    <div class="flex flex-col justify-center">
      {/* <h1>Pokemon id: {id}</h1> */}
      <h1>Pokemon id: {pokemonId}</h1>

      <PokemonImage pokemonId={Number(pokemonId.value)} />
    </div>
  );
});
