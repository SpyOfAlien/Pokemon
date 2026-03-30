import Link from "next/link";

interface TypeFilterItemProps {
  type: string;
  isActive: boolean;
  href: string;
}

export function TypeFilterItem({ type, isActive, href }: TypeFilterItemProps) {
  return (
    <Link
      href={href}
      className={`border p-4 transition-colors ${
        isActive
          ? "bg-blue-500 text-white border-blue-500"
          : "border-gray-300 hover:border-gray-400"
      }`}
    >
      {type}
    </Link>
  );
}

function buildTypeHref(type: string, activeTypes: string[]): string {
  const isActive = activeTypes.includes(type);
  const newTypes = isActive
    ? activeTypes.filter((t) => t !== type)
    : [...activeTypes, type];

  if (newTypes.length === 0) return "/";

  return `/?type=${newTypes.join(",")}`;
}

interface TypeFilterListProps {
  types: string[];
  activeTypes: string[];
}

export function TypeFilterList({ types, activeTypes }: TypeFilterListProps) {
  return (
    <section className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <span>Types:</span>
      {types.map((type) => (
        <TypeFilterItem
          key={type}
          type={type}
          isActive={activeTypes.includes(type)}
          href={buildTypeHref(type, activeTypes)}
        />
      ))}
    </section>
  );
}
