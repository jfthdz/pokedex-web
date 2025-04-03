import Link from "next/link";
import Image from "next/image";
import { PokemonTypeCardProps } from "@/types/pokemon-type";

export default function TypeCard({ name }: PokemonTypeCardProps) {
  return (
    <Link href={`/types/${name}`}>
      <div className="flex items-center gap-4 bg-gray-200 rounded-xl shadow-md px-4 py-2 hover:scale-105 transition-transform">
        <Image
          src={`/assets/images/${name}.png`}
          alt={`Tipo ${name}`}
          width={64}
          height={64}
          className="object-contain"
        />
        <span className="text-gray-700 font-semibold capitalize truncate">
          {name}
        </span>
      </div>
    </Link>
  );
}
