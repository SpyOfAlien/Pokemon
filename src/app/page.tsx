import {
  fetchPokemonList,
  fetchPokemonByType,
  fetchPokemonTypes,
} from "@/lib/pokemon-api";
import { PageHeader } from "@/components/pokemon/page-header";
import { TypeFilterList } from "@/components/pokemon/type-filter";
import { PokemonCard } from "@/components/pokemon/pokemon-card";
import { PokemonGrid } from "@/components/pokemon/pokemon-grid";
import { Pagination } from "@/components/pokemon/pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { type, page: pageParam } = await searchParams;

  const activeTypes: string[] =
    typeof type === "string" ? type.split(",").filter(Boolean) : [];

  const currentPage = typeof pageParam === "string" ? Number(pageParam) : 1;

  const [pokemonData, types] = await Promise.all([
    activeTypes.length > 0
      ? fetchPokemonByType(activeTypes, currentPage)
      : fetchPokemonList(currentPage),
    fetchPokemonTypes(),
  ]);

  const baseUrl =
    activeTypes.length > 0 ? `/?type=${activeTypes.join(",")}` : "/";

  return (
    <main className="flex flex-col gap-4 px-10">
      <PageHeader title="Welcome to Pokemon world" total={pokemonData.total} />

      <TypeFilterList types={types} activeTypes={activeTypes} />

      {pokemonData.items.length > 0 ? (
        <PokemonGrid>
          {pokemonData.items.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              name={pokemon.name}
              id={pokemon.id}
              spriteUrl={pokemon.spriteUrl}
            />
          ))}
        </PokemonGrid>
      ) : (
        <div className="flex justify-center py-20 text-gray-500 text-xl">
          <p>No Pokemon found</p>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        hasNext={pokemonData.hasNext}
        hasPrevious={pokemonData.hasPrevious}
        baseUrl={baseUrl}
      />
    </main>
  );
}
