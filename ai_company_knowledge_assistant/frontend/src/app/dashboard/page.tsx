import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome to the AI Company Knowledge Assistant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <StatsCard title="Total Documents" value="128" />
          <StatsCard title="Active Users" value="42" />
          <StatsCard title="Total Conversations" value="963" />
          <StatsCard title="Questions Asked Today" value="87" />
          <StatsCard title="Average Confidence" value="94%" />
          <StatsCard title="Most Used Department" value="Engineering" />
        </div>
      </div>
    </DashboardLayout>
  );
}