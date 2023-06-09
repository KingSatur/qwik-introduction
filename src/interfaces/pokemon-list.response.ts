export interface PokemonListResponseDto {
  count: number;
  next: null;
  previous: null;
  results: PokemonResultDto[];
}

export interface PokemonResultDto {
  name: string;
  url: string;
}
