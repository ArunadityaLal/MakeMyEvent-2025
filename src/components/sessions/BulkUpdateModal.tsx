import React, { useState } from "react";
import {
  X,
  Upload,
  Download,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Users,
  Database,
  FileText,
} from "lucide-react";

interface BulkUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface UpdateResult {
  total: number;
  updated: number;
  errors: string[];
  details: {
    usersUpdated: number;
    sessionsUpdated: number;
    metadataUpdated: number;
  };
  changes: Array<{
    email: string;
    changes: string[];
  }>;
}

const BulkUpdateModal: React.FC<BulkUpdateModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UpdateResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await fetch("/api/bulk-update", { method: "GET" });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "bulk_update_template.xlsx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        alert("Failed to download template");
      }
    } catch (error) {
      console.error("Error downloading template:", error);
      alert("Error downloading template");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/bulk-update", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
        onSuccess();
      } else {
        alert(`Upload failed: ${data.error}`);
        if (data.errors && data.errors.length > 0) {
          console.error("Upload errors:", data.errors);
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setResult(null);
    setShowDetails(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Database className="w-6 h-6" />
              <div>
                <h2 className="text-2xl font-bold">Bulk Update Sessions</h2>
                <p className="text-blue-100">
                  Update multiple sessions and faculty data via Excel
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white/10 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          className="p-6 overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 120px)" }}
        >
          {!result ? (
            <>
              {/* Instructions */}
              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  How it works
                </h3>
                <ol className="list-decimal list-inside text-blue-800 space-y-1 text-sm">
                  <li>Download the Excel template below</li>
                  <li>
                    Fill in the data with Email as the primary key (required)
                  </li>
                  <li>
                    Optional fields: Name, Session Title, Description, Start
                    Time, End Time, Place, Status, Institution
                  </li>
                  <li>Upload the completed Excel file</li>
                  <li>
                    System will update existing records based on email matches
                  </li>
                </ol>
              </div>

              {/* Template Download */}
              <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Excel Template
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Download the template with sample data and required
                      columns
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadTemplate}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Template</span>
                  </button>
                </div>
              </div>

              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Excel File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileSpreadsheet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-input"
                  />
                  <label
                    htmlFor="file-input"
                    className="cursor-pointer inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Choose Excel File</span>
                  </label>
                  {file && (
                    <div className="mt-4 text-sm text-gray-600">
                      Selected: <span className="font-medium">{file.name}</span>
                      <br />
                      Size: {(file.size / 1024).toFixed(1)} KB
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Button */}
              {file && (
                <div className="flex justify-center">
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      uploading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white`}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        <span>Start Bulk Update</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Results Summary */}
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-lg font-semibold text-green-900">
                    Bulk Update Completed
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="bg-blue-100 p-3 rounded">
                    <div className="font-semibold text-blue-900">
                      Total Processed
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {result.total}
                    </div>
                  </div>
                  <div className="bg-green-100 p-3 rounded">
                    <div className="font-semibold text-green-900">Updated</div>
                    <div className="text-2xl font-bold text-green-600">
                      {result.updated}
                    </div>
                  </div>
                  <div className="bg-purple-100 p-3 rounded">
                    <div className="font-semibold text-purple-900">
                      Users Updated
                    </div>
                    <div className="text-2xl font-bold text-purple-600">
                      {result.details.usersUpdated}
                    </div>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <div className="font-semibold text-orange-900">
                      Sessions Updated
                    </div>
                    <div className="text-2xl font-bold text-orange-600">
                      {result.details.sessionsUpdated +
                        result.details.metadataUpdated}
                    </div>
                  </div>
                </div>
              </div>

              {/* Errors */}
              {result.errors.length > 0 && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                    <h4 className="font-semibold text-red-900">
                      Errors ({result.errors.length})
                    </h4>
                  </div>
                  <div className="max-h-40 overflow-y-auto">
                    {result.errors.slice(0, 10).map((error, index) => (
                      <div key={index} className="text-sm text-red-700 mb-1">
                        • {error}
                      </div>
                    ))}
                    {result.errors.length > 10 && (
                      <div className="text-sm text-red-600 italic">
                        ... and {result.errors.length - 10} more errors
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Changes Details */}
              {result.changes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">
                      Changes Made ({result.changes.length})
                    </h4>
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {showDetails ? "Hide Details" : "Show Details"}
                    </button>
                  </div>
                  {showDetails && (
                    <div className="max-h-60 overflow-y-auto bg-gray-50 border rounded-lg p-4">
                      {result.changes.map((change, index) => (
                        <div
                          key={index}
                          className="mb-4 pb-3 border-b border-gray-200 last:border-b-0"
                        >
                          <div className="font-medium text-gray-900 mb-2">
                            <Users className="w-4 h-4 inline mr-1" />
                            {change.email}
                          </div>
                          <div className="pl-5 space-y-1">
                            {change.changes.map((changeDetail, changeIndex) => (
                              <div
                                key={changeIndex}
                                className="text-sm text-gray-600"
                              >
                                • {changeDetail}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => {
                    setResult(null);
                    setFile(null);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload Another File
                </button>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkUpdateModal;
