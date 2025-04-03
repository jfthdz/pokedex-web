import { PokemonCardProps } from "@/types/pokemon-card";

type BasicPokemon = Omit<PokemonCardProps, "types">;

export async function fetchPokemonByType(typeName: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
  const data = await res.json();

  const pokemons = await Promise.all(
    data.pokemon.map(async ({ pokemon }: { pokemon: BasicPokemon }) => {
      const { name, url } = pokemon;

      const detailsRes = await fetch(url);
      const details = await detailsRes.json();

      const types = details.types.map(
        (t: { type: { name: string } }) => t.type.name
      );

      return { name, url, types };
    })
  );

  return pokemons;
}
