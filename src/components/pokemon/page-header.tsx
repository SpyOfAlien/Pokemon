interface PageHeaderProps {
  title: string;
  total: number;
}

export function PageHeader({ title, total }: PageHeaderProps) {
  return (
    <div className="py-4 text-center">
      <p className="text-lg">{title}</p>
      <p>Total: {total}</p>
    </div>
  );
}
