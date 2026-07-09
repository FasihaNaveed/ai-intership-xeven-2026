import DashboardLayout from "@/components/layout/DashboardLayout";

export default function DocumentsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6 pb-10">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Document Management
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Upload and manage company documents for AI-powered knowledge retrieval.
                    </p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        Upload New Document
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Document Name
                            </label>

                            <input
                                type="text"
                                placeholder="Employee Handbook"
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-700 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Department
                            </label>

                            <select className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option className="text-gray-900">Engineering</option>
                                <option className="text-gray-900">HR</option>
                                <option className="text-gray-900">Finance</option>
                                <option className="text-gray-900">Operations</option>
                            </select>

                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Document Type
                            </label>

                            <select className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option className="text-gray-900">Policy Document</option>
                                <option className="text-gray-900">SOP</option>
                                <option className="text-gray-900">Technical Documentation</option>
                                <option className="text-gray-900">Employee Handbook</option>
                            </select>
                            
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tags
                            </label>

                            <input
                                type="text"
                                placeholder="HR, Leave Policy, Employees"
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-700 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload File
                        </label>

                        <input
                            type="file"
                            className="w-full rounded-xl border-2 border-dashed border-gray-400 bg-white p-6 text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
                            Upload Document
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        Uploaded Documents
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b text-gray-700">
                                    <th className="text-left py-3">Name</th>
                                    <th className="text-left py-3">Department</th>
                                    <th className="text-left py-3">Type</th>
                                    <th className="text-left py-3">Status</th>
                                    <th className="text-left py-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="border-b">
                                    <td className="py-4">HR Policy.pdf</td>
                                    <td>HR</td>
                                    <td>Policy</td>
                                    <td className="text-green-600 font-medium">Indexed</td>
                                    <td className="space-x-3">
                                        <button className="text-blue-600">View</button>
                                        <button className="text-red-600">Delete</button>
                                    </td>
                                </tr>

                                <tr className="border-b">
                                    <td className="py-4">Engineering SOP.pdf</td>
                                    <td>Engineering</td>
                                    <td>SOP</td>
                                    <td className="text-green-600 font-medium">Indexed</td>
                                    <td className="space-x-3">
                                        <button className="text-blue-600">View</button>
                                        <button className="text-red-600">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}