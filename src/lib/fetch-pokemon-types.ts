export async function fetchPokemonTypes() {
  const res = await fetch("https://pokeapi.co/api/v2/type");
  const data = await res.json();
  return data.results;
}
