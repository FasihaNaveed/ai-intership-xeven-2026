type StatsCardProps = {
  title: string;
  value: string;
};

export default function StatsCard({
  title,
  value,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-sm text-gray-500">{title}</h3>

      <p className="text-3xl font-bold text-gray-900 mt-2">
        {value}
      </p>
    </div>
  );
}