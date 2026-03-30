import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  baseUrl: string;
}

export function Pagination({
  currentPage,
  hasNext,
  hasPrevious,
  baseUrl,
}: PaginationProps) {
  const separator = baseUrl.includes("?") ? "&" : "?";

  return (
    <div className="flex justify-center gap-4 py-6">
      {hasPrevious && (
        <Link
          href={`${baseUrl}${separator}page=${currentPage - 1}`}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Previous
        </Link>
      )}
      {hasNext && (
        <Link
          href={`${baseUrl}${separator}page=${currentPage + 1}`}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Next
        </Link>
      )}
    </div>
  );
}
