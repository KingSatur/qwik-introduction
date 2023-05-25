import type { PokemonListResponseDto, SmallPokemon } from "~/interfaces";

const getPokemons = async (
  offset = 10,
  limit = 10
): Promise<SmallPokemon[]> => {
  const resp = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const data = (await resp.json()) as PokemonListResponseDto;

  return data.results.map((pokemon) => ({
    id: Number(pokemon.url.split("/").at(-2)),
    name: pokemon.name,
  }));
};

export default getPokemons;
