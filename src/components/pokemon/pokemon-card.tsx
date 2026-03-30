import Image from "next/image";

interface PokemonCardProps {
  name: string;
  id: number;
  spriteUrl: string;
}

export function PokemonCard({ name, id, spriteUrl }: PokemonCardProps) {
  return (
    <div className="flex flex-col items-center justify-between border p-4">
      <h3>{name}</h3>
      <Image
        src={spriteUrl}
        alt={name}
        width={80}
        height={80}
        className="w-20"
      />
      <p>Number: {id}</p>
    </div>
  );
}
