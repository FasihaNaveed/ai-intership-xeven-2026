"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

import { useEffect, useState } from "react";
import {
    getDocuments,
    uploadDocument,
    deleteDocument,
} from "@/services/documentService";

export default function DocumentsPage() {

    const [documentName, setDocumentName] = useState("");
    const [department, setDepartment] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [tags, setTags] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const loadDocuments = async () => {
        try {
            const data = await getDocuments();
            setDocuments(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadDocuments();
    }, []);

    return (
        <DashboardLayout>
            <div className="space-y-6 pb-10">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Documents
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Manage and search internal company documents.
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
                                {documents.map((doc) => (
                                    <tr key={doc.id} className="border-b">
                                        <td className="py-4">{doc.document_name}</td>
                                        <td>{doc.department}</td>
                                        <td>{doc.document_type}</td>
                                        <td className="text-green-600 font-medium">
                                            {doc.status}
                                        </td>

                                        <td className="py-4">
                                            <div className="flex gap-3">

                                                <button
                                                    className="px-3 py-1 rounded-lg bg-red-50 text-red-600"
                                                >
                                                    Delete
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}