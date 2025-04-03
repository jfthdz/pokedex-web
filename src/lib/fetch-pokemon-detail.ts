import { PokemonDetail } from "@/types/pokemon-details";

export async function fetchPokemonDetail(
  idOrName: string
): Promise<PokemonDetail> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
  const data = await res.json();

  return {
    name: data.name,
    image: data.sprites.other["official-artwork"].front_default,
    abilities: data.abilities.map(
      (a: { ability: { name: string } }) => a.ability.name
    ),
    types: data.types.map((t: { type: { name: string } }) => t.type.name),
    height: data.height,
    weight: data.weight,
    stats: data.stats.map(
      (s: { stat: { name: string }; base_stat: number }) => ({
        name: s.stat.name,
        value: s.base_stat,
      })
    ),
  };
}
