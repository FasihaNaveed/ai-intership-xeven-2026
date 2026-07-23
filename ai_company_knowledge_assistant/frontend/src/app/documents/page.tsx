"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

import { useEffect, useRef, useState } from "react";

import {
    getDocuments,
    uploadDocument,
    deleteDocument,
    updateDocument,
    getDocumentById,
} from "@/services/documentService";

import {
    FiUpload,
    FiFile,
    FiX,
    FiEdit2,
    FiEye,
    FiTrash2,
    FiSave,
    FiAlertTriangle,
    FiCheck,
} from "react-icons/fi";

interface FormErrors {
    documentName?: string;
    department?: string;
    documentType?: string;
    file?: string;
}

interface Document {
    id: number;
    document_name: string;
    department: string;
    document_type: string;
    tags: string;
    status: string;
    file_name?: string;
    uploaded_at?: string;
    file_size?: string;
    updated_local?: boolean;
    document_content?: string;
}

interface SimulatedPreview {
    title: string;
    department: string;
    type: string;
    fileName: string;
    uploadedAt: string;
    fileSize: string;
}

type ModalType = "delete" | "edit" | "view" | "view-fallback" | "success" | "toast" | null;

export default function DocumentsPage() {

    const [documentName, setDocumentName] = useState("");
    const [department, setDepartment] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [tags, setTags] = useState("");

    const [file, setFile] = useState<File | null>(null);
    const [editingFileName, setEditingFileName] = useState(false);
    const [fileNameEditValue, setFileNameEditValue] = useState("");

    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [dragOver, setDragOver] = useState(false);

    // Modal state
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
    const [editNameValue, setEditNameValue] = useState("");
    const [editDepartmentValue, setEditDepartmentValue] = useState("");
    const [editContentValue, setEditContentValue] = useState("");
    const [modalLoading, setModalLoading] = useState(false);
    const [viewFallbackPreview, setViewFallbackPreview] = useState<SimulatedPreview | null>(null);
    const [toastMessage, setToastMessage] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const departmentOptions = [
        "Engineering",
        "HR",
        "Finance",
        "Operations",
        "Marketing",
        "Legal",
    ];

    const documentTypeOptions = [
        "Policy Document",
        "SOP",
        "Technical Documentation",
        "Employee Handbook",
        "Contract",
        "Report",
    ];

    const loadDocuments = async () => {
        try {
            setLoading(true);
            const data = await getDocuments();
            setDocuments(data);
        } catch (error) {
            console.error("Failed to load documents:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDocuments();
    }, []);

    // Strip extension from filename
    const getFileNameWithoutExtension = (name: string) => {
        return name.replace(/\.[^/.]+$/, "");
    };

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
        const nameWithoutExt = getFileNameWithoutExtension(selectedFile.name);
        setDocumentName(nameWithoutExt);
        setFileNameEditValue(nameWithoutExt);
        setEditingFileName(true);
        setErrors((prev) => ({ ...prev, file: undefined }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        handleFileSelect(e.target.files[0]);
        e.target.value = "";
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile && droppedFile.type === "application/pdf") {
            handleFileSelect(droppedFile);
        } else {
            setErrors((prev) => ({ ...prev, file: "Please select a valid PDF file." }));
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleSaveFileName = () => {
        if (fileNameEditValue.trim()) {
            setDocumentName(fileNameEditValue.trim());
        }
        setEditingFileName(false);
    };

    const handleRemoveFile = () => {
        setFile(null);
        setEditingFileName(false);
        setFileNameEditValue("");
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if (!documentName.trim()) newErrors.documentName = "Document name is required.";
        if (!department.trim()) newErrors.department = "Please select a department.";
        if (!documentType.trim()) newErrors.documentType = "Please select a document type.";
        if (!file) newErrors.file = "Please upload a PDF file.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpload = async () => {
        if (!validateForm()) return;
        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("document_name", documentName);
            formData.append("department", department);
            formData.append("document_type", documentType);
            formData.append("tags", tags);
            formData.append("file", file!);

            await uploadDocument(formData);

            setDocumentName("");
            setDepartment("");
            setDocumentType("");
            setTags("");
            setFile(null);
            setEditingFileName(false);
            setFileNameEditValue("");
            setErrors({});
            await loadDocuments();

            setActiveModal("success");
        } catch (error: any) {
            console.error(error);
            if (error?.response?.status === 409) {
                const msg = error?.response?.data?.detail || "Document already exists in the system.";
                setErrors((prev) => ({ ...prev, documentName: msg }));
            } else {
                setErrors((prev) => ({ ...prev, file: "Upload failed. Please try again." }));
            }
        } finally {
            setUploading(false);
        }
    };

    // === MODAL-BASED ACTIONS ===

    const openDeleteModal = (doc: Document) => {
        setSelectedDoc(doc);
        setActiveModal("delete");
    };

    const confirmDelete = async () => {
        if (!selectedDoc) return;
        try {
            setModalLoading(true);
            await deleteDocument(selectedDoc.id);
            await loadDocuments();
            closeModal();
        } catch (error) {
            console.error(error);
            closeModal();
        } finally {
            setModalLoading(false);
        }
    };

    const openEditModal = (doc: Document) => {
        setSelectedDoc(doc);
        setEditNameValue(doc.document_name);
        setEditDepartmentValue(doc.department);
        setEditContentValue(doc.document_content || "");
        setActiveModal("edit");
    };

    const confirmEdit = async () => {
        if (!selectedDoc || !editNameValue.trim()) return;

        try {
            setModalLoading(true);

            const updateData: Record<string, string> = {};
            if (editNameValue.trim() !== selectedDoc.document_name) {
                updateData.document_name = editNameValue.trim();
            }
            if (editDepartmentValue !== selectedDoc.department) {
                updateData.department = editDepartmentValue;
            }
            if (editContentValue.trim()) {
                updateData.document_content = editContentValue.trim();
            }

            if (Object.keys(updateData).length > 0) {
                await updateDocument(selectedDoc.id, updateData);
            }

            // Re-fetch documents to get fresh data from backend
            await loadDocuments();

            setToastMessage("Document updated successfully.");
            setTimeout(() => setToastMessage(""), 4000);
            closeModal();
        } catch (error) {
            console.error(error);
            setToastMessage("Document updated (local changes applied).");
            setTimeout(() => setToastMessage(""), 4000);
            // Still re-fetch to sync
            await loadDocuments();
            closeModal();
        } finally {
            setModalLoading(false);
        }
    };

    // Open formatted HTML preview in a new tab using Blob URL
    const handleOpenInNewTab = (doc: Document | null) => {
        if (!doc) return;
        const content = doc.document_content || `Document Name: ${doc.document_name}\nDepartment: ${doc.department}\nType: ${doc.document_type}\n\n[Sample Knowledge Base Document Content]\n\nThis is a rendered enterprise document preview.`;
        const htmlContent = `
            <html>
                <head>
                    <title>${doc.document_name}</title>
                    <style>
                        body { font-family: sans-serif; padding: 40px; background: #0b0f19; color: #f8fafc; line-height: 1.6; margin: 0; }
                        .card { max-width: 800px; margin: 0 auto; background: #1e293b; padding: 30px; border-radius: 12px; border: 1px solid #334155; }
                        h1 { color: #6366f1; border-bottom: 1px solid #334155; padding-bottom: 10px; font-size: 24px; }
                        .meta { color: #94a3b8; font-size: 14px; margin-bottom: 20px; }
                        .content { white-space: pre-wrap; color: #e2e8f0; line-height: 1.6; }
                        hr { border-color: #334155; margin: 20px 0; }
                        .badge { display: inline-block; padding: 4px 12px; border-radius: 999px; background: #6366f1; color: white; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="card">
                        <h1>${doc.document_name}</h1>
                        <div class="meta">
                            <span class="badge">${doc.department || "General"}</span>
                            &nbsp; ${doc.document_type || "Document"}
                            &nbsp; | &nbsp; Status: ${doc.status || "Uploaded"}
                        </div>
                        <hr/>
                        <div class="content">${content}</div>
                    </div>
                </body>
            </html>
        `;
        const previewBlob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(previewBlob);
        window.open(url, '_blank');
        // Revoke the URL after a delay to free memory
        setTimeout(() => URL.revokeObjectURL(url), 60000);
    };

    const openViewModal = async (doc: Document) => {
        setSelectedDoc(doc);
        try {
            const apiDoc = await getDocumentById(doc.id);
            if (!apiDoc) {
                // Backend 404/405 - show fallback metadata preview
                const preview: SimulatedPreview = {
                    title: doc.document_name,
                    department: doc.department,
                    type: doc.document_type,
                    fileName: doc.file_name || `${doc.document_name}.pdf`,
                    uploadedAt: doc.uploaded_at || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
                    fileSize: doc.file_size || "—",
                };
                setViewFallbackPreview(preview);
                setActiveModal("view-fallback");
            } else {
                // Check if file URL is available
                const fileUrl = apiDoc.file_url || (apiDoc.file_name
                    ? `/uploads/${apiDoc.file_name}`
                    : `http://localhost:8000/documents/${doc.id}/file`);
                try {
                    const headResponse = await fetch(fileUrl, { method: "HEAD" });
                    if (headResponse.ok) {
                        console.log(fileUrl)
                        window.open(fileUrl, "_blank", "noopener,noreferrer");
                    } else {
                        throw new Error("File not accessible");
                    }
                } catch {
                    // File URL not accessible - show fallback metadata preview
                    const preview: SimulatedPreview = {
                        title: doc.document_name,
                        department: doc.department,
                        type: doc.document_type,
                        fileName: doc.file_name || `${doc.document_name}.pdf`,
                        uploadedAt: doc.uploaded_at || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
                        fileSize: doc.file_size || "—",
                    };
                    setViewFallbackPreview(preview);
                    setActiveModal("view-fallback");
                }
            }
        } catch {
            // Fallback to metadata-only view
            const preview: SimulatedPreview = {
                title: doc.document_name,
                department: doc.department,
                type: doc.document_type,
                fileName: doc.file_name || `${doc.document_name}.pdf`,
                uploadedAt: doc.uploaded_at || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
                fileSize: doc.file_size || "—",
            };
            setViewFallbackPreview(preview);
            setActiveModal("view-fallback");
        }
    };

    const closeModal = () => {
        setActiveModal(null);
        setSelectedDoc(null);
        setEditNameValue("");
        setEditDepartmentValue("");
        setEditContentValue("");
        setModalLoading(false);
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 pb-10">

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Documents
                    </h1>
                    <p className="text-gray-600 mt-2 dark:text-slate-400">
                        Manage and search internal company documents.
                    </p>
                </div>

                {/* Upload Section */}
        <div className="bg-white/80 backdrop-blur-md dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800/80 p-6 shadow-sm transition-all duration-200 hover:shadow-md">
                    <h2 className="text-xl font-semibold text-slate-900 mb-6 dark:text-white">
                        Upload New Document
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Document Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-300">Document Name</label>
                            <input
                                type="text"
                                value={documentName}
                                onChange={(e) => {
                                    setDocumentName(e.target.value);
                                    if (e.target.value.trim()) setErrors((prev) => ({ ...prev, documentName: undefined }));
                                }}
                                placeholder="Employee Handbook"
                                className={`w-full rounded-xl border bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-500 ${errors.documentName ? "border-red-400 ring-2 ring-red-200" : "border-gray-300 dark:border-slate-600"}`}
                            />
                            {errors.documentName && <p className="mt-1.5 text-sm text-red-500">{errors.documentName}</p>}
                        </div>

                        {/* Department - Custom Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-300">Department</label>
                            <div className="relative">
                                <select
                                    value={department}
                                    onChange={(e) => {
                                        setDepartment(e.target.value);
                                        if (e.target.value.trim()) setErrors((prev) => ({ ...prev, department: undefined }));
                                    }}
                                    className={`w-full rounded-xl border appearance-none bg-white px-4 py-3 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-600 ${errors.department ? "border-red-400 ring-2 ring-red-200" : "border-gray-300 dark:border-slate-600"}`}
                                >
                                    <option value="">Select Department</option>
                                    {departmentOptions.map((dept) => (<option key={dept} value={dept}>{dept}</option>))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <svg className="h-4 w-4 text-gray-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                            {errors.department && <p className="mt-1.5 text-sm text-red-500">{errors.department}</p>}
                        </div>

                        {/* Document Type - Custom Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-300">Document Type</label>
                            <div className="relative">
                                <select
                                    value={documentType}
                                    onChange={(e) => {
                                        setDocumentType(e.target.value);
                                        if (e.target.value.trim()) setErrors((prev) => ({ ...prev, documentType: undefined }));
                                    }}
                                    className={`w-full rounded-xl border appearance-none bg-white px-4 py-3 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-600 ${errors.documentType ? "border-red-400 ring-2 ring-red-200" : "border-gray-300 dark:border-slate-600"}`}
                                >
                                    <option value="">Select Type</option>
                                    {documentTypeOptions.map((type) => (<option key={type} value={type}>{type}</option>))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <svg className="h-4 w-4 text-gray-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                            {errors.documentType && <p className="mt-1.5 text-sm text-red-500">{errors.documentType}</p>}
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-300">Tags</label>
                            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="HR, Leave Policy"
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-600 dark:placeholder:text-slate-500"
                            />
                        </div>
                    </div>

                    {/* File Upload - Custom Drag & Drop */}
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-300">Upload PDF</label>
                        {!file ? (
                            <div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
                                onClick={() => fileInputRef.current?.click()}
                                className={`w-full rounded-xl border-2 border-dashed p-10 text-center cursor-pointer transition ${dragOver ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50 dark:border-slate-600 dark:hover:border-blue-500 dark:hover:bg-slate-700/50"}`}
                            >
                                <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                                <div className="flex flex-col items-center gap-3">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                                        <FiUpload size={24} className="text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-700 dark:text-slate-300">Drop your PDF here or click to browse</p>
                                        <p className="text-sm text-gray-500 mt-1 dark:text-slate-400">Supports PDF files up to 50MB</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full rounded-xl border-2 border-blue-200 bg-blue-50 p-4 dark:bg-blue-900/20 dark:border-blue-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                            <FiFile size={20} className="text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            {editingFileName ? (
                                                <div className="flex items-center gap-2">
                                                    <input type="text" value={fileNameEditValue} onChange={(e) => setFileNameEditValue(e.target.value)}
                                                        className="rounded-lg border border-blue-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:text-slate-200 dark:border-blue-600"
                                                        autoFocus onKeyDown={(e) => { if (e.key === "Enter") handleSaveFileName(); if (e.key === "Escape") setEditingFileName(false); }}
                                                    />
                                                    <button onClick={handleSaveFileName} className="rounded-lg bg-blue-600 p-1.5 text-white hover:bg-blue-700" title="Save name"><FiSave size={14} /></button>
                                                </div>
                                            ) : (
                                                <p className="font-medium text-gray-900 dark:text-white">{documentName}</p>
                                            )}
                                            <p className="text-xs text-gray-500 dark:text-slate-400">{file.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => setEditingFileName(!editingFileName)}
                                            className="rounded-lg border border-blue-200 bg-white p-2 text-blue-600 hover:bg-blue-100 transition dark:bg-slate-800 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-slate-700" title="Edit name"><FiEdit2 size={14} /></button>
                                        <button onClick={handleRemoveFile}
                                            className="rounded-lg border border-red-200 bg-white p-2 text-red-600 hover:bg-red-100 transition dark:bg-slate-800 dark:border-red-800 dark:text-red-400 dark:hover:bg-slate-700" title="Remove file"><FiX size={14} /></button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {errors.file && <p className="mt-1.5 text-sm text-red-500">{errors.file}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 flex justify-end">
                        <button onClick={handleUpload} disabled={uploading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 dark:bg-indigo-600 dark:hover:bg-indigo-700">
                            <FiUpload size={16} /> {uploading ? "Uploading..." : "Upload Document"}
                        </button>
                    </div>
                </div>

                {/* Documents Table */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6 dark:text-white">Uploaded Documents</h2>

                    {loading ? (
                        <div className="py-12 text-center"><p className="text-gray-500 text-lg dark:text-slate-400">Loading documents...</p></div>
                    ) : documents.length === 0 ? (
                        <div className="py-12 text-center"><p className="text-gray-500 text-lg dark:text-slate-400">No documents found.</p></div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b bg-gray-50 dark:bg-slate-700/50 dark:border-slate-700">
                                        <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-slate-300">Name</th>
                                        <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-slate-300">Department</th>
                                        <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-slate-300">Type</th>
                                        <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-slate-300">Status</th>
                                        <th className="text-center px-4 py-3 font-semibold text-gray-700 dark:text-slate-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {documents.map((doc) => (
                                        <tr key={doc.id} className="border-b hover:bg-gray-50 transition dark:border-slate-700 dark:hover:bg-slate-700/50">
                                            <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">{doc.document_name}</td>
                                            <td className="px-4 py-4 text-gray-700 dark:text-slate-300">{doc.department}</td>
                                            <td className="px-4 py-4 text-gray-700 dark:text-slate-300">{doc.document_type}</td>
                                            <td className="px-4 py-4">
                                                <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">{doc.status}</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button onClick={() => openViewModal(doc)}
                                                        className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-blue-600 hover:bg-blue-100 transition dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30" title="View document"><FiEye size={16} /></button>
                                                    <button onClick={() => openEditModal(doc)}
                                                        className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-600 hover:bg-amber-100 transition dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/30" title="Edit document"><FiEdit2 size={16} /></button>
                                                    <button onClick={() => openDeleteModal(doc)}
                                                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-600 hover:bg-red-100 transition dark:border-red-800 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30" title="Delete document"><FiTrash2 size={16} /></button>
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

            {/* === DELETE CONFIRM MODAL === */}
            {activeModal === "delete" && selectedDoc && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 modal-backdrop">
                    <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
                    <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 shadow-2xl border border-red-200 dark:border-red-900/50 p-6 modal-content">
                        <div className="flex flex-col items-center text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                                <FiAlertTriangle size={32} className="text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Document</h3>
                            <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">Are you sure you want to delete this document from the vector vault?</p>
                            <div className="inline-flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-900/10 px-4 py-2 border border-red-100 dark:border-red-900/30 mb-6">
                                <FiFile size={14} className="text-red-500" />
                                <span className="text-sm font-medium text-red-700 dark:text-red-400">{selectedDoc.document_name}</span>
                            </div>
                            <div className="flex gap-3 w-full">
                                <button onClick={closeModal} className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-600">Cancel</button>
                                <button onClick={confirmDelete} disabled={modalLoading} className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition disabled:bg-red-400 dark:bg-red-700 dark:hover:bg-red-600">{modalLoading ? "Deleting..." : "Delete"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* === EDIT DOCUMENT MODAL (Title + Content) === */}
            {activeModal === "edit" && selectedDoc && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-hidden">
                    <div className="absolute inset-0" onClick={closeModal} />
                    <div className="relative w-full max-w-2xl max-h-[85vh] h-auto flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Edit Document</h3>
                                <button onClick={closeModal} className="rounded-xl p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 transition"><FiX size={18} className="text-gray-400" /></button>
                            </div>
                        </div>
                        {/* Scrollable Content */}
                        <div className="p-6 overflow-y-auto space-y-4 flex-1">
                            <div className="inline-flex items-center gap-2 rounded-lg bg-amber-50 dark:bg-amber-900/10 px-4 py-2 border border-amber-100 dark:border-amber-900/30">
                                <FiFile size={14} className="text-amber-500" />
                                <span className="text-sm font-medium text-amber-700 dark:text-amber-400">{selectedDoc.document_name}</span>
                            </div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-300">Document Title</label>
                            <input type="text" value={editNameValue} onChange={(e) => setEditNameValue(e.target.value)}
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-600"
                                placeholder="Enter new document title" autoFocus
                                onKeyDown={(e) => { if (e.key === "Enter") confirmEdit(); if (e.key === "Escape") closeModal(); }}
                            />
                            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-300">Department</label>
                            <select
                                value={editDepartmentValue}
                                onChange={(e) => setEditDepartmentValue(e.target.value)}
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-600"
                            >
                                <option value="">Select Department</option>
                                {departmentOptions.map((dept) => (<option key={dept} value={dept}>{dept}</option>))}
                            </select>
                            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-300">Document Content</label>
                            <div className="max-h-60 overflow-y-auto rounded-xl border border-gray-300 bg-white dark:bg-slate-900 dark:border-slate-600">
                                <textarea
                                    value={editContentValue}
                                    onChange={(e) => setEditContentValue(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 text-gray-900 dark:text-slate-200 focus:outline-none resize-vertical bg-transparent"
                                    placeholder="Edit document text content here..."
                                />
                            </div>
                        </div>
                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 shrink-0 flex justify-end gap-3 bg-slate-50/50 dark:bg-slate-900/50">
                            <button onClick={closeModal} className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-600">Cancel</button>
                            <button onClick={confirmEdit} disabled={modalLoading || !editNameValue.trim()} className="flex-1 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-700 transition disabled:bg-amber-400 dark:bg-amber-700 dark:hover:bg-amber-600">{modalLoading ? "Saving..." : "Save Changes"}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* === VIEW DOCUMENT MODAL === */}
            {activeModal === "view" && selectedDoc && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-hidden">
                    <div className="absolute inset-0" onClick={closeModal} />
                    <div className="relative w-full max-w-2xl max-h-[85vh] h-auto flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Document Details</h3>
                                <button onClick={closeModal} className="rounded-xl p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 transition"><FiX size={18} className="text-gray-400" /></button>
                            </div>
                        </div>
                        {/* Scrollable Content */}
                        <div className="p-6 overflow-y-auto space-y-4 flex-1">
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wide">Name</p>
                                <p className="text-base font-semibold text-gray-900 dark:text-white mt-1">{selectedDoc.document_name}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wide">Department</p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-slate-200 mt-1">{selectedDoc.department || "—"}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wide">Type</p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-slate-200 mt-1">{selectedDoc.document_type || "—"}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wide">Status</p>
                                <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 mt-1 dark:bg-green-900/30 dark:text-green-400">{selectedDoc.status}</span>
                            </div>
                            {selectedDoc.tags && (
                                <div>
                                    <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wide">Tags</p>
                                    <p className="text-sm text-gray-700 dark:text-slate-300 mt-1">{selectedDoc.tags}</p>
                                </div>
                            )}
                            {selectedDoc.file_name && (
                                <div>
                                    <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wide">File</p>
                                    <p className="text-sm text-gray-700 dark:text-slate-300 mt-1">{selectedDoc.file_name}</p>
                                </div>
                            )}
                        </div>
                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 shrink-0 flex justify-end gap-3 bg-slate-50/50 dark:bg-slate-900/50">
                            <button
                                onClick={() => {
                                    const fileUrl = selectedDoc.file_name
                                        ? `http://localhost:8000/uploads/${selectedDoc.file_name}`
                                        : `http://localhost:8000/documents/${selectedDoc.id}/file`;
                                    window.open(fileUrl, "_blank", "noopener,noreferrer");
                                }}
                                className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition dark:border-blue-700 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                            >
                                <FiFile size={14} className="inline mr-1" /> Open Document
                            </button>
                            <button onClick={closeModal} className="rounded-xl bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition dark:bg-indigo-600 dark:hover:bg-indigo-700">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* === VIEW FALLBACK MODAL (File not found) === */}
            {activeModal === "view-fallback" && viewFallbackPreview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-hidden">
                    <div className="absolute inset-0" onClick={closeModal} />
                    <div className="relative w-full max-w-2xl max-h-[85vh] h-auto flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Document Preview</h3>
                                <button onClick={closeModal} className="rounded-xl p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 transition"><FiX size={18} className="text-gray-400" /></button>
                            </div>
                        </div>
                        {/* Scrollable Content */}
                        <div className="p-6 overflow-y-auto space-y-4 flex-1">
                            {/* Simulated Preview Box */}
                            <div className="rounded-xl border-2 border-dashed border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/10 p-6 text-center">
                                <div className="flex justify-center mb-3">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
                                        <FiFile size={28} className="text-amber-600 dark:text-amber-400" />
                                    </div>
                                </div>
                                <p className="font-semibold text-amber-800 dark:text-amber-300 text-lg">{viewFallbackPreview.title}</p>
                                <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">File preview not available (offline/backend)</p>
                            </div>

                            {/* Inline text preview from DB */}
                            {selectedDoc?.document_content && (
                                <div>
                                    <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-2">Extracted Text Preview</p>
                                    <div className="max-h-60 overflow-y-auto p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">
                                        {selectedDoc.document_content}
                                    </div>
                                </div>
                            )}

                            {/* Metadata */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wide">Department</p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-slate-200 mt-1">{viewFallbackPreview.department || "—"}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wide">Type</p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-slate-200 mt-1">{viewFallbackPreview.type || "—"}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wide">File Name</p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-slate-200 mt-1">{viewFallbackPreview.fileName}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wide">File Size</p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-slate-200 mt-1">{viewFallbackPreview.fileSize}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wide">Upload Date</p>
                                    <p className="text-sm font-medium text-gray-800 dark:text-slate-200 mt-1">{viewFallbackPreview.uploadedAt}</p>
                                </div>
                            </div>
                        </div>
                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 shrink-0 flex justify-end gap-3 bg-slate-50/50 dark:bg-slate-900/50">
                            <button onClick={closeModal} className="rounded-xl bg-amber-600 px-6 py-2 text-sm font-medium text-white hover:bg-amber-700 transition dark:bg-amber-700 dark:hover:bg-amber-600">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* === TOAST NOTIFICATION === */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-[70] animate-slide-up">
                    <div className="flex items-center gap-3 rounded-2xl bg-emerald-600 dark:bg-emerald-700 px-5 py-3 shadow-2xl text-white border border-emerald-400 dark:border-emerald-500">
                        <FiCheck size={18} className="flex-shrink-0" />
                        <p className="text-sm font-medium">{toastMessage}</p>
                    </div>
                </div>
            )}

            {/* === SUCCESS MODAL === */}
            {activeModal === "success" && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 modal-backdrop">
                    <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
                    <div className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-slate-800 shadow-2xl border border-emerald-200 dark:border-emerald-900/50 p-8 modal-content text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 mx-auto mb-4">
                            <FiCheck size={32} className="text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Upload Successful</h3>
                        <p className="text-sm text-gray-600 dark:text-slate-400 mb-6">Your document has been uploaded and indexed to the knowledge base.</p>
                        <button onClick={closeModal} className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition">Done</button>
                    </div>
                </div>
            )}

        </DashboardLayout>
    );
}

