"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getDocuments } from "@/services/documentService";
import { FiSearch, FiFile, FiBookOpen, FiExternalLink, FiClock, FiTag } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface Document {
  id: number;
  document_name: string;
  department: string;
  document_type: string;
  tags: string;
  status: string;
  created_at?: string;
}

export default function KnowledgeBasePage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (error) {
      console.error("Failed to load knowledge base:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = documents.filter((doc) => {
    const q = search.toLowerCase();
    return (
      doc.document_name.toLowerCase().includes(q) ||
      doc.department?.toLowerCase().includes(q) ||
      doc.document_type?.toLowerCase().includes(q) ||
      doc.tags?.toLowerCase().includes(q)
    );
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Knowledge Base</h1>
          <p className="text-gray-600 mt-2 dark:text-slate-400">
            Browse and search indexed company documents and policies.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search knowledge base..."
            className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 pl-11 pr-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm">
            <p className="text-sm text-gray-500 dark:text-slate-400">Total Documents</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{documents.length}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm">
            <p className="text-sm text-gray-500 dark:text-slate-400">Categories</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
              {new Set(documents.map((d) => d.document_type)).size}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm">
            <p className="text-sm text-gray-500 dark:text-slate-400">Departments</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
              {new Set(documents.map((d) => d.department)).size}
            </p>
          </div>
        </div>

        {/* Document Cards */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-slate-400 text-lg">Loading knowledge base...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <FiBookOpen size={48} className="text-gray-300 dark:text-slate-600" />
            </div>
            <p className="text-gray-500 dark:text-slate-400 text-lg">
              {search ? "No documents match your search." : "No documents in knowledge base yet."}
            </p>
            {!search && (
              <button
                onClick={() => router.push("/documents")}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
              >
                <FiFile size={16} />
                Upload Documents
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((doc) => (
              <div
                key={doc.id}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-5 shadow-sm hover:shadow-md transition-all hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer"
                onClick={() => router.push(`/documents?view=${doc.id}`)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30 flex-shrink-0">
                    <FiFile size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">{doc.document_name}</h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{doc.document_type}</p>
                  </div>
                  <FiExternalLink size={14} className="text-gray-300 dark:text-slate-600 flex-shrink-0 mt-1" />
                </div>
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-900/20 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-400">
                    <FiBookOpen size={10} />
                    {doc.department || "General"}
                  </span>
                  {doc.tags && doc.tags.split(",").slice(0, 2).map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 rounded-full bg-slate-50 dark:bg-slate-700 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                      <FiTag size={10} />
                      {tag.trim()}
                    </span>
                  ))}
                </div>
                {doc.created_at && (
                  <div className="mt-3 flex items-center gap-1 text-xs text-gray-400 dark:text-slate-500">
                    <FiClock size={10} />
                    Added {new Date(doc.created_at).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

