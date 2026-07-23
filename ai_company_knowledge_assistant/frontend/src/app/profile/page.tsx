"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import { getProfile } from "@/services/profileService";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);

  const loadProfile = async () => {
    try {
      const data = await getProfile(1); // Change ID later after login
      setProfile(data);
    } catch (error) {
      console.error("Failed to load profile", error);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[500px]">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-10">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Profile
          </h1>

          <p className="text-gray-600 mt-2">
            Manage your personal information and account details.
          </p>
        </div>

        <div className="backdrop-blur-md bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800/80 p-8 shadow-sm transition-all duration-200 hover:shadow-md">

          <div className="flex items-center gap-6 mb-8">

            <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
              {profile.full_name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {profile.full_name}
              </h2>

              <p className="text-gray-600">
                {profile.role}
              </p>

              <p className="text-gray-500">
                Xeven Solutions
              </p>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={profile.full_name}
                readOnly
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                value={profile.email}
                readOnly
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>

              <input
                type="text"
                value="Xeven Solutions"
                readOnly
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>

              <input
                type="text"
                value={profile.role}
                readOnly
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900"
              />
            </div>

          </div>

          <div className="mt-8">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Update Profile
            </button>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}