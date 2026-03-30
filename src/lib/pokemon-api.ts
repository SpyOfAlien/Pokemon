const POKEMON_API_URL = "https://pokeapi.co/api/v2";
const PAGE_SIZE = 24;

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export interface PokemonTypeResponse {
  pokemon: { pokemon: { name: string; url: string }; slot: number }[];
}

export interface TypeListResponse {
  results: { name: string; url: string }[];
}

export interface PokemonItem {
  name: string;
  id: number;
  spriteUrl: string;
}

export interface PaginatedPokemon {
  items: PokemonItem[];
  total: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export function extractIdFromUrl(url: string): number {
  const segments = url.replace(/\/$/, "").split("/");
  return Number(segments[segments.length - 1]);
}

export function getSpriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

function toPokemonItem(entry: { name: string; url: string }): PokemonItem {
  const id = extractIdFromUrl(entry.url);
  return { name: entry.name, id, spriteUrl: getSpriteUrl(id) };
}

export async function fetchPokemonTypes(): Promise<string[]> {
  const res = await fetch(`${POKEMON_API_URL}/type`);

  if (!res.ok) {
    throw new Error(`Failed to fetch Pokemon types: ${res.status}`);
  }

  const data: TypeListResponse = await res.json();

  return data.results.map((t) => t.name);
}

export async function fetchPokemonList(
  page: number = 1
): Promise<PaginatedPokemon> {
  const offset = (page - 1) * PAGE_SIZE;
  const res = await fetch(`${POKEMON_API_URL}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch Pokemon list: ${res.status}`);
  }

  const data: PokemonListResponse = await res.json();

  return {
    items: data.results.map(toPokemonItem),
    total: data.count,
    hasNext: data.next !== null,
    hasPrevious: data.previous !== null,
  };
}

export async function fetchPokemonByType(
  types: string[],
  page: number = 1
): Promise<PaginatedPokemon> {
  const responses = await Promise.all(
    types.map(async (type) => {
      const res = await fetch(`${POKEMON_API_URL}/type/${type}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch Pokemon by type "${type}": ${res.status}`);
      }
      const data: PokemonTypeResponse = await res.json();
      return data.pokemon.map((entry) => toPokemonItem(entry.pokemon));
    })
  );

  if (responses.length === 0) {
    return { items: [], total: 0, hasNext: false, hasPrevious: false };
  }

  let intersectedItems = responses[0];
  for (let i = 1; i < responses.length; i++) {
    const currentTypeIds = new Set(responses[i].map((p) => p.id));
    intersectedItems = intersectedItems.filter((p) => currentTypeIds.has(p.id));
  }

  intersectedItems.sort((a, b) => a.id - b.id);

  const total = intersectedItems.length;
  const offset = (page - 1) * PAGE_SIZE;
  const paginatedItems = intersectedItems.slice(offset, offset + PAGE_SIZE);

  return {
    items: paginatedItems,
    total,
    hasNext: offset + PAGE_SIZE < total,
    hasPrevious: page > 1,
  };
}

export { PAGE_SIZE };
