"use client";

import { useState } from "react";
import PokemonCard from "./PokemonCard";
import { PokemonCardProps } from "@/types/pokemon-card";
import PokemonModal from "./PokemonModal";
import { fetchPokemonDetail } from "@/lib/fetch-pokemon-detail";
import { PokemonDetail } from "@/types/pokemon-details";

interface Props {
  initialData: PokemonCardProps[];
}

const ITEMS_PER_PAGE = 20;

export default function PokemonGrid({ initialData }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(
    null
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = initialData.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = currentPage * ITEMS_PER_PAGE;
  const paginated = filteredData.slice(start, end);

  const goToPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const openModal = async (pokemon: PokemonCardProps) => {
    const id = pokemon.url.split("/").filter(Boolean).pop();
    const details = await fetchPokemonDetail(id!);
    setSelectedPokemon(details);
    setIsModalOpen(true);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full bg-white text-gray-700 max-w-sm px-4 py-2 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
      ></input>
      {filteredData.length === 0 ? (
        <div className="h-[40vh] flex items-center justify-center">
          <p className="text-gray-600 font-semibold text-lg text-center">
            No se encontraron Pokémon :c
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paginated.map((p) => (
              <div
                key={p.name}
                onClick={() => openModal(p)}
                className="cursor-pointer"
              >
                <PokemonCard name={p.name} url={p.url} types={p.types} />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 gap-2 flex-wrap items-center">
            <button
              onClick={goToPrev}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              ◀ Anterior
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded transition-colors duration-200 ${
                  i + 1 === currentPage
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Siguiente ▶
            </button>
          </div>
        </>
      )}

      {isModalOpen && selectedPokemon && (
        <PokemonModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          pokemon={selectedPokemon}
        />
      )}
    </>
  );
}
