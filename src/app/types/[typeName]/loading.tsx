export default function Loading() {
  return (
    <section className="max-w-5xl mx-auto p-4 text-center">
      <h1 className="text-xl text-gray-600 font-bold mb-6">
        Cargando Pokémon...
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bg-gray-200 h-40 rounded-xl animate-pulse" />
        ))}
      </div>
    </section>
  );
}
