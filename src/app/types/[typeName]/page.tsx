import { fetchPokemonByType } from "@/lib/fetch-pokemon-by-type";
import { TypePageProps } from "@/types/type-page";
import PokemonGrid from "@/app/components/PokemonsGrid";

export default async function TypePage({ params }: TypePageProps) {
  const { typeName } = await params;
  const pokemons = await fetchPokemonByType(typeName);

  return (
    <section className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Tipo: {typeName}</h1>
      <PokemonGrid initialData={pokemons}></PokemonGrid>
    </section>
  );
}
