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

    const [uploading, setUploading] = useState(false);

    const loadDocuments = async () => {
        try {
            setLoading(true);

            const data = await getDocuments();

            setDocuments(data);

        } catch (error) {
            console.error("Failed to load documents:", error);
            alert("Failed to load documents.");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDocuments();
    }, []);

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {

        if (!documentName.trim()) {
            alert("Please enter document name.");
            return;
        }

        if (!department.trim()) {
            alert("Please select department.");
            return;
        }

        if (!documentType.trim()) {
            alert("Please select document type.");
            return;
        }

        if (!file) {
            alert("Please choose a PDF file.");
            return;
        }

        try {

            setUploading(true);

            const formData = new FormData();

            formData.append(
                "document_name",
                documentName
            );

            formData.append(
                "department",
                department
            );

            formData.append(
                "document_type",
                documentType
            );

            formData.append(
                "tags",
                tags
            );

            formData.append(
                "file",
                file
            );

            await uploadDocument(formData);

            alert("Document uploaded successfully.");

            setDocumentName("");
            setDepartment("");
            setDocumentType("");
            setTags("");
            setFile(null);

            await loadDocuments();

        } catch (error) {

            console.error(error);

            alert("Upload failed.");

        } finally {

            setUploading(false);
        }
    };

    const handleDelete = async (
        documentId: number
    ) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this document?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteDocument(documentId);

            alert("Document deleted successfully.");

            await loadDocuments();

        } catch (error) {

            console.error(error);

            alert("Delete failed.");
        }
    };

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
                            value={documentName}
                            onChange={(e) =>
                                setDocumentName(e.target.value)
                            }
                            placeholder="Employee Handbook"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Department
                        </label>

                        <select
                            value={department}
                            onChange={(e) =>
                                setDepartment(e.target.value)
                            }
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">
                                Select Department
                            </option>

                            <option value="Engineering">
                                Engineering
                            </option>

                            <option value="HR">
                                HR
                            </option>

                            <option value="Finance">
                                Finance
                            </option>

                            <option value="Operations">
                                Operations
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Document Type
                        </label>

                        <select
                            value={documentType}
                            onChange={(e) =>
                                setDocumentType(e.target.value)
                            }
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">
                                Select Type
                            </option>

                            <option value="Policy Document">
                                Policy Document
                            </option>

                            <option value="SOP">
                                SOP
                            </option>

                            <option value="Technical Documentation">
                                Technical Documentation
                            </option>

                            <option value="Employee Handbook">
                                Employee Handbook
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tags
                        </label>

                        <input
                            type="text"
                            value={tags}
                            onChange={(e) =>
                                setTags(e.target.value)
                            }
                            placeholder="HR, Leave Policy"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                </div>

                <div className="mt-6">

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload PDF
                    </label>

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="w-full rounded-xl border-2 border-dashed border-gray-300 p-6"
                    />

                    {file && (

                        <p className="mt-3 text-sm text-green-600">

                            Selected File:

                            <span className="font-semibold ml-2">
                                {file.name}
                            </span>

                        </p>

                    )}

                </div>

                <div className="mt-8 flex justify-end">

                    <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition disabled:bg-gray-400"
                    >
                        {uploading
                            ? "Uploading..."
                            : "Upload Document"}
                    </button>

                </div>

            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Uploaded Documents
                </h2>

                {loading ? (

                    <div className="py-12 text-center">

                        <p className="text-gray-500 text-lg">
                            Loading documents...
                        </p>

                    </div>

                ) : documents.length === 0 ? (

                    <div className="py-12 text-center">

                        <p className="text-gray-500 text-lg">
                            No documents found.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="min-w-full">

                            <thead>

                                <tr className="border-b bg-gray-50">

                                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                                        Name
                                    </th>

                                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                                        Department
                                    </th>

                                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                                        Type
                                    </th>

                                    <th className="text-left px-4 py-3 font-semibold text-gray-700">
                                        Status
                                    </th>

                                    <th className="text-center px-4 py-3 font-semibold text-gray-700">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {documents.map((doc) => (

                                    <tr
                                        key={doc.id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >

                                        <td className="px-4 py-4 font-medium text-gray-900">
                                            {doc.document_name}
                                        </td>

                                        <td className="px-4 py-4">
                                            {doc.department}
                                        </td>

                                        <td className="px-4 py-4">
                                            {doc.document_type}
                                        </td>

                                        <td className="px-4 py-4">

                                            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">

                                                {doc.status}

                                            </span>

                                        </td>

                                        <td className="px-4 py-4">

                                            <div className="flex justify-center">

                                                <button
                                                    onClick={() =>
                                                        handleDelete(doc.id)
                                                    }
                                                    className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
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

                )}

            </div>

        </div>

        </DashboardLayout >

    );

}