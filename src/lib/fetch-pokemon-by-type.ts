export async function fetchPokemonByType(typeName: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
  const data = await res.json();

  const pokemons = await Promise.all(
    data.pokemon.map(async (p: any) => {
      const name = p.pokemon.name;
      const url = p.pokemon.url;

      const detailsRes = await fetch(url);
      const details = await detailsRes.json();

      const types = details.types.map((t: any) => t.type.name);

      return { name, url, types };
    })
  );

  return pokemons;
}
