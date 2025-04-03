import { PokemonCardProps } from "@/types/pokemon-card";
import { pokemonTypeColors } from "@/lib/type-colors";

function getIdFromUrl(url: string): string {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

export default function PokemonCard({ name, url, types }: PokemonCardProps) {
  const id = getIdFromUrl(url);
  const typeKey =
    types?.[0]?.toLowerCase() === "normal"
      ? types?.[1]?.toLowerCase() || "normal"
      : types?.[0]?.toLowerCase();

  const bgColor = pokemonTypeColors[typeKey] || "bg-gray-200";
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div
      className={`${bgColor} rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:scale-105 transition-transform`}
    >
      <img src={imageUrl} alt={name} className="w-28 h-28" />
      <h2 className="mt-2 font-bold capitalize text-sm text-center truncate max-w-full overflow-hidden whitespace-nowrap text-black">
        {name}
      </h2>
      <p className="text-sm text-gray-500">#{id.padStart(3, "0")}</p>
    </div>
  );
}
