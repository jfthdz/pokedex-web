import { fetchPokemonTypes } from "@/lib/fetch-pokemon-types";
import TypeCard from "./components/TypeCard";

export default async function Home() {
  const types = await fetchPokemonTypes();
  return (
    <section className="max-w-5xl mx-auto p-4">
      <h1 className="font-retro text-2xl mb-6">Tipos de Pokemon</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {types.map((type: any) => (
          <TypeCard key={type.name} name={type.name}></TypeCard>
        ))}
      </div>
    </section>
  );
}
