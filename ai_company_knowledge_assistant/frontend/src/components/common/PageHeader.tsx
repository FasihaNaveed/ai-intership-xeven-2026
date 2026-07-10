interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  return (
    <div className="text-center mb-10">
      <h1 className="text-3xl font-bold text-gray-900">
        {title}
      </h1>

      <p className="text-gray-600 mt-2">
        {description}
      </p>
    </div>
  );
}