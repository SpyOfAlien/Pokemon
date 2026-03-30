interface PokemonGridProps {
  children: React.ReactNode;
}

export function PokemonGrid({ children }: PokemonGridProps) {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-16 gap-y-6">
      {children}
    </section>
  );
}
