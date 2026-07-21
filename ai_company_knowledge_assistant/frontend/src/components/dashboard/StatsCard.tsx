import {
  FiArrowUpRight,
  FiBarChart2,
  FiFileText,
  FiMessageSquare,
  FiUsers,
} from "react-icons/fi";

type StatsCardProps = {
  title: string;
  value: string;
};

export default function StatsCard({
  title,
  value,
}: StatsCardProps) {
  const getIcon = () => {
    switch (title) {
      case "Total Documents":
        return <FiFileText className="h-6 w-6 text-blue-600" />;

      case "Total Users":
        return <FiUsers className="h-6 w-6 text-emerald-600" />;

      case "Total Chats":
        return <FiMessageSquare className="h-6 w-6 text-violet-600" />;

      default:
        return <FiBarChart2 className="h-6 w-6 text-orange-600" />;
    }
  };

  const getIconBg = () => {
    switch (title) {
      case "Total Documents":
        return "bg-blue-100";

      case "Total Users":
        return "bg-emerald-100";

      case "Total Chats":
        return "bg-violet-100";

      default:
        return "bg-orange-100";
    }
  };

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${getIconBg()}`}
        >
          {getIcon()}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
          <FiArrowUpRight />
          Live Data
        </div>

        <span className="text-xs text-slate-400">
          Updated now
        </span>
      </div>
    </div>
  );
}