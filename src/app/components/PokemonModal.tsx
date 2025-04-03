"use client";

import { useEffect } from "react";
import { PokemonModalProps } from "@/types/pokemon-modal";
import { pokemonTypeColors } from "@/lib/type-colors";
import { motion, AnimatePresence } from "framer-motion";

export default function PokemonModal({
  isOpen,
  onClose,
  pokemon,
}: PokemonModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const primaryType =
    pokemon.types?.find((t) => t !== "normal") ||
    pokemon.types?.[0] ||
    "normal";

  const typeColor = pokemonTypeColors[primaryType] || "bg-gray-200";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl overflow-hidden w-full max-w-md shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            {/* Imagen y bg */}
            <div className={`${typeColor} relative p-6 pb-2 text-center`}>
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
                onClick={onClose}
              >
                ×
              </button>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-32 h-32 mx-auto -mt-4"
              />
              <h2 className="text-2xl font-bold text-black capitalize">
                {pokemon.name}
              </h2>

              {/* Tipo de pokemon */}
              <div className="flex justify-center gap-2 mt-2">
                {pokemon.types?.map((type) => (
                  <span
                    key={type}
                    className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full capitalize"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Altura y peso */}
            <div className="p-4 text-center text-sm text-gray-700">
              <div className="flex justify-around text-xs mb-4">
                <div>
                  <p className="font-semibold">
                    {pokemon.weight ? pokemon.weight / 10 : "?"} KG
                  </p>
                  <p className="text-gray-500">Weight</p>
                </div>
                <div>
                  <p className="font-semibold">
                    {pokemon.height ? pokemon.height / 10 : "?"} M
                  </p>
                  <p className="text-gray-500">Height</p>
                </div>
              </div>

              {/* Habilidades */}
              <h3 className="font-semibold mb-1">Abilities</h3>
              <ul className="mb-4 flex gap-2 justify-center text-gray-600">
                {pokemon.abilities.slice(0, 2).map((a, i) => (
                  <li key={i}>
                    {i + 1}.{a.toLocaleUpperCase()}
                  </li>
                ))}
              </ul>

              {/* Estadisticas */}
              {pokemon.stats && (
                <>
                  <h3 className="font-semibold mb-2">Base Stats</h3>
                  <div className="space-y-2 text-left">
                    {pokemon.stats.map((s) => (
                      <div key={s.name}>
                        <div className="flex justify-between text-xs font-medium">
                          <span className="capitalize">{s.name}</span>
                          <span>{s.value}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              s.name === "hp"
                                ? "bg-red-500"
                                : s.name === "attack"
                                ? "bg-yellow-500"
                                : s.name === "defense"
                                ? "bg-blue-500"
                                : s.name === "speed"
                                ? "bg-green-500"
                                : "bg-purple-500"
                            }`}
                            style={{ width: `${(s.value / 200) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
