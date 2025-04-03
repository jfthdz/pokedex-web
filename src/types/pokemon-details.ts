export interface PokemonDetail {
  name: string;
  image: string;
  abilities: string[];
  types: string[];
  height: number;
  weight: number;
  stats: {
    name: string;
    value: number;
  }[];
}
