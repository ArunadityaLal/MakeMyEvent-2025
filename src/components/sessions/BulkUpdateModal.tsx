import React, { useState, useEffect } from "react";
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
  UserPlus,
  Plus,
  RefreshCw,
  Calendar,
  Settings,
} from "lucide-react";

interface BulkUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface UpdateResult {
  total: number;
  processed: number;
  created: number;
  updated: number;
  errors: string[];
  skipped: number;
  details: {
    usersCreated: number;
    usersUpdated: number;
    sessionsCreated: number;
    sessionsUpdated: number;
    metadataUpdated: number;
  };
  changes: Array<{
    email: string;
    sessionTitle: string;
    action:
      | "CREATED_USER"
      | "CREATED_SESSION"
      | "UPDATED_USER"
      | "UPDATED_SESSION";
    changes: string[];
  }>;
}

interface Event {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location?: string;
  status: string;
  description?: string;
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

  // Event selection state
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [eventsLoading, setEventsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Event Selection, 2: File Upload & Process, 3: Results
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  // ✅ NEW: Persistent error state
  const [persistentError, setPersistentError] = useState<string>("");
  const [persistentErrorDetails, setPersistentErrorDetails] =
    useState<string>("");

  // Load events when modal opens
  useEffect(() => {
    if (isOpen) {
      loadEvents();
    }
  }, [isOpen]);

  // ✅ NEW: Clear errors when step changes
  useEffect(() => {
    setPersistentError("");
    setPersistentErrorDetails("");
  }, [step]);

  const loadEvents = async () => {
    try {
      setEventsLoading(true);
      setPersistentError(""); // Clear any previous errors
      console.log("🔄 Loading events for bulk update...");

      const response = await fetch("/api/events", {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Events API Error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("📋 Events API Response:", data);

      let eventsArray: any[];
      if (data.success && data.data && data.data.events) {
        eventsArray = data.data.events;
      } else if (data.events) {
        eventsArray = data.events;
      } else if (Array.isArray(data)) {
        eventsArray = data;
      } else {
        console.warn("Unexpected events API response format:", data);
        eventsArray = [];
      }

      const processedEvents: Event[] = eventsArray.map((event: any) => ({
        id: event.id,
        name: event.name || "Unnamed Event",
        location: event.venue || event.location || "TBA",
        status: event.status || "DRAFT",
        startDate: event.startdate || event.startDate,
        endDate: event.enddate || event.endDate,
        description: event.description,
      }));

      console.log(
        `✅ Successfully loaded ${processedEvents.length} events for bulk update`
      );
      setEvents(processedEvents);
    } catch (error) {
      console.error("❌ Error loading events:", error);
      // ✅ NEW: Set persistent error instead of temporary message
      setPersistentError("Failed to load events");
      setPersistentErrorDetails(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
      setEvents([]);
    } finally {
      setEventsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setPersistentError(""); // Clear any previous errors
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      setPersistentError(""); // Clear any previous errors
      const response = await fetch("/api/bulk-update", { method: "GET" });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "bulk_create_update_template.xlsx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        // ✅ NEW: Set persistent error
        setPersistentError("Failed to download template");
        setPersistentErrorDetails(
          `Server returned ${response.status}: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error downloading template:", error);
      // ✅ NEW: Set persistent error instead of alert
      setPersistentError("Error downloading template");
      setPersistentErrorDetails(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  };

  const handleUpload = async () => {
    if (!file || !selectedEventId) return;

    setUploading(true);
    setPersistentError(""); // Clear any previous errors

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("defaultEventId", selectedEventId);

      const response = await fetch("/api/bulk-update", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
        setStep(3); // Move to results step
        console.log("✅ Bulk update completed successfully");
      } else {
        // ✅ NEW: Set persistent error instead of alert
        setPersistentError(`Upload failed: ${data.error}`);
        setPersistentErrorDetails(
          data.details || "Please check your file format and try again"
        );

        if (data.errors && data.errors.length > 0) {
          console.error("Upload errors:", data.errors);
          setPersistentErrorDetails(
            `${data.details || ""}\n\nFirst few errors:\n${data.errors
              .slice(0, 3)
              .join("\n")}`
          );
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // ✅ NEW: Set persistent error instead of alert
      setPersistentError("Error uploading file");
      setPersistentErrorDetails(
        error instanceof Error
          ? error.message
          : "Network error occurred. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    if (result && (result.created > 0 || result.updated > 0)) {
      onSuccess();
    }

    // Reset all state
    setFile(null);
    setResult(null);
    setShowDetails(false);
    setSelectedEventId("");
    setStep(1);
    setValidationErrors({});
    setPersistentError(""); // ✅ NEW: Clear persistent errors
    setPersistentErrorDetails("");
    onClose();
  };

  const nextStep = () => {
    if (step === 1) {
      if (!selectedEventId) {
        setValidationErrors({ selectedEventId: "Please select an event" });
        return;
      }
      setValidationErrors({});
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // ✅ NEW: Function to dismiss persistent error
  const dismissError = () => {
    setPersistentError("");
    setPersistentErrorDetails("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Database className="w-6 h-6" />
              <div>
                <h2 className="text-2xl font-bold">
                  Bulk Create & Update Sessions
                </h2>
                <p className="text-blue-100">
                  Create new users/sessions or update existing ones via Excel
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

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mt-6">
            {[
              { step: 1, title: "Event Selection", icon: Calendar },
              { step: 2, title: "File Upload & Process", icon: Upload },
              { step: 3, title: "Results", icon: CheckCircle },
            ].map(({ step: stepNum, title, icon: Icon }) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${
                    step >= stepNum
                      ? "bg-white/20 border-white/30 text-white shadow-lg"
                      : "bg-transparent border-white/20 text-white/60"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium text-sm">{title}</span>
                </div>
                {stepNum < 3 && (
                  <div
                    className={`w-8 h-0.5 mx-2 ${
                      step > stepNum ? "bg-white/60" : "bg-white/20"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          className="p-6 overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 180px)" }}
        >
          {/* ✅ NEW: Persistent Error Display */}
          {persistentError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-900 mb-1">
                      {persistentError}
                    </h4>
                    {persistentErrorDetails && (
                      <div className="text-sm text-red-700 whitespace-pre-line">
                        {persistentErrorDetails}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={dismissError}
                  className="text-red-500 hover:text-red-700 transition-colors p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 1: Event Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Select Event for Bulk Operations
                </h3>
                <p className="text-gray-600">
                  Choose the event where sessions will be created/updated. This
                  will be used as the default event for all sessions.
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Select Event *
                </label>

                {eventsLoading ? (
                  <div className="w-full p-4 border-2 border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-500 mr-2" />
                    <span className="text-gray-600">Loading events...</span>
                  </div>
                ) : events.length === 0 && !persistentError ? (
                  <div className="w-full p-4 border-2 border-red-300 rounded-lg bg-red-50 text-center">
                    <AlertTriangle className="h-5 w-5 text-red-500 mx-auto mb-2" />
                    <span className="text-red-700">
                      No events available. Please create events first.
                    </span>
                  </div>
                ) : events.length > 0 ? (
                  <select
                    value={selectedEventId}
                    onChange={(e) => {
                      setSelectedEventId(e.target.value);
                      if (validationErrors.selectedEventId) {
                        setValidationErrors((prev) => ({
                          ...prev,
                          selectedEventId: "",
                        }));
                      }
                    }}
                    className={`w-full p-4 border-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      validationErrors.selectedEventId
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-gray-400 focus:border-blue-400"
                    }`}
                  >
                    <option value="">Choose Event</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.name} ({event.status})
                      </option>
                    ))}
                  </select>
                ) : null}

                {validationErrors.selectedEventId && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.selectedEventId}
                  </p>
                )}

                {selectedEventId && !eventsLoading && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    {(() => {
                      const selectedEvent = events.find(
                        (e) => e.id === selectedEventId
                      );
                      return selectedEvent ? (
                        <div className="text-sm">
                          <div className="font-semibold text-blue-900 mb-2">
                            Selected Event:
                          </div>
                          <div className="text-blue-800">
                            <div>
                              <strong>Name:</strong> {selectedEvent.name}
                            </div>
                            <div>
                              <strong>Status:</strong> {selectedEvent.status}
                            </div>
                            {selectedEvent.location && (
                              <div>
                                <strong>Location:</strong>{" "}
                                {selectedEvent.location}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-center pt-6 border-t border-gray-200">
                <button
                  onClick={nextStep}
                  disabled={
                    !selectedEventId || eventsLoading || persistentError !== ""
                  }
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  Continue to File Upload
                  <Calendar className="h-4 w-4" />
                </button>
              </div>

              {/* ✅ NEW: Retry button for event loading errors */}
              {persistentError && persistentError.includes("load events") && (
                <div className="flex justify-center">
                  <button
                    onClick={loadEvents}
                    disabled={eventsLoading}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors flex items-center gap-2"
                  >
                    <RefreshCw
                      className={`h-4 w-4 ${
                        eventsLoading ? "animate-spin" : ""
                      }`}
                    />
                    Retry Loading Events
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: File Upload & Process */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Upload Excel File
                </h3>
                <p className="text-gray-600">
                  Upload your Excel file to create/update sessions for:{" "}
                  <strong>
                    {events.find((e) => e.id === selectedEventId)?.name}
                  </strong>
                </p>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  How it works - Create & Update Logic
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-green-50 border border-green-200 rounded p-3">
                    <h5 className="font-semibold text-green-800 mb-2 flex items-center">
                      <UserPlus className="w-4 h-4 mr-1" />
                      Creation Logic
                    </h5>
                    <ul className="list-disc list-inside text-green-700 space-y-1">
                      <li>
                        If email doesn't exist → Create new user + session
                      </li>
                      <li>
                        If email exists but session title doesn't → Create new
                        session under existing user
                      </li>
                      <li>
                        All sessions will be associated with the selected event
                      </li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded p-3">
                    <h5 className="font-semibold text-orange-800 mb-2 flex items-center">
                      <Plus className="w-4 w-4 mr-1" />
                      Update Logic
                    </h5>
                    <ul className="list-disc list-inside text-orange-700 space-y-1">
                      <li>
                        If email + session title exist → Update existing records
                      </li>
                      <li>Updates user info, session details, and metadata</li>
                      <li>Only provided fields will be updated</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded">
                  <h5 className="font-semibold text-gray-800 mb-1">
                    Required Fields:
                  </h5>
                  <p className="text-gray-700 text-sm">
                    <strong>Email</strong> and <strong>Session Title</strong>{" "}
                    are the ONLY mandatory fields.
                    <br />
                    Optional: Name, Description, Member Description, Start Time,
                    End Time, Place, Status, Institution, Invite Status
                  </p>
                </div>
              </div>

              {/* Template Download */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Excel Template
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Download the template with sample data. Only Email and
                      Session Title are required!
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
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors">
                <div className="text-center">
                  <FileSpreadsheet className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Upload Excel File
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Upload Excel file for bulk create/update operations
                  </p>

                  {!file ? (
                    <div>
                      <input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileChange}
                        className="hidden"
                        id="excel-upload"
                      />
                      <label
                        htmlFor="excel-upload"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors shadow-lg"
                      >
                        <Upload className="h-4 w-4" />
                        Choose Excel File
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        .xlsx, .xls up to 10MB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-3">
                        <div className="px-3 py-1 bg-green-100 text-green-800 border border-green-300 rounded-full text-sm font-medium">
                          <CheckCircle className="h-3 w-3 mr-1 inline" />
                          {file.name}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setFile(null);
                            setPersistentError(""); // Clear any file-related errors
                          }}
                          className="text-red-600 hover:text-red-800 text-sm border border-red-300 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                        >
                          <X className="h-3 w-3 mr-1 inline" />
                          Remove
                        </button>
                      </div>
                      <div className="text-sm text-gray-600">
                        Size: {(file.size / 1024).toFixed(1)} KB
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Process Button */}
              {file && (
                <div className="text-center">
                  <button
                    onClick={handleUpload}
                    disabled={uploading || persistentError !== ""}
                    className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium transition-colors text-lg ${
                      uploading || persistentError !== ""
                        ? "bg-gray-400 cursor-not-allowed text-gray-600"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                    }`}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing Excel File...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        <span>Start Bulk Process</span>
                      </>
                    )}
                  </button>
                  {persistentError && (
                    <p className="text-sm text-gray-600 mt-2">
                      Please resolve the error above before proceeding.
                    </p>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={prevStep}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2"
                >
                  ← Back to Event Selection
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Results - Previous code remains the same */}
          {step === 3 && result && (
            <div className="space-y-6">
              {/* Results Summary */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-lg font-semibold text-green-900">
                    Bulk Process Completed for{" "}
                    {events.find((e) => e.id === selectedEventId)?.name}
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div className="bg-blue-100 p-3 rounded text-center">
                    <div className="font-semibold text-blue-900">Total</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {result.total}
                    </div>
                  </div>
                  <div className="bg-green-100 p-3 rounded text-center">
                    <div className="font-semibold text-green-900">Created</div>
                    <div className="text-2xl font-bold text-green-600">
                      {result.created}
                    </div>
                  </div>
                  <div className="bg-orange-100 p-3 rounded text-center">
                    <div className="font-semibold text-orange-900">Updated</div>
                    <div className="text-2xl font-bold text-orange-600">
                      {result.updated}
                    </div>
                  </div>
                  <div className="bg-purple-100 p-3 rounded text-center">
                    <div className="font-semibold text-purple-900">
                      New Users
                    </div>
                    <div className="text-2xl font-bold text-purple-600">
                      {result.details.usersCreated}
                    </div>
                  </div>
                  <div className="bg-indigo-100 p-3 rounded text-center">
                    <div className="font-semibold text-indigo-900">
                      New Sessions
                    </div>
                    <div className="text-2xl font-bold text-indigo-600">
                      {result.details.sessionsCreated}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="bg-gray-100 p-3 rounded text-center">
                  <div className="font-medium text-gray-700">Users Updated</div>
                  <div className="text-lg font-bold text-gray-600">
                    {result.details.usersUpdated}
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded text-center">
                  <div className="font-medium text-gray-700">
                    Sessions Updated
                  </div>
                  <div className="text-lg font-bold text-gray-600">
                    {result.details.sessionsUpdated}
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded text-center">
                  <div className="font-medium text-gray-700">
                    Metadata Updated
                  </div>
                  <div className="text-lg font-bold text-gray-600">
                    {result.details.metadataUpdated}
                  </div>
                </div>
                <div className="bg-red-100 p-3 rounded text-center">
                  <div className="font-medium text-red-700">Skipped</div>
                  <div className="text-lg font-bold text-red-600">
                    {result.skipped}
                  </div>
                </div>
              </div>

              {/* Errors */}
              {result.errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
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
                <div className="border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-900">
                      Actions Performed ({result.changes.length})
                    </h4>
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {showDetails ? "Hide Details" : "Show Details"}
                    </button>
                  </div>
                  {showDetails && (
                    <div className="max-h-60 overflow-y-auto p-4">
                      {result.changes.map((change, index) => (
                        <div
                          key={index}
                          className="mb-4 pb-3 border-b border-gray-200 last:border-b-0"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium text-gray-900">
                              <Users className="w-4 h-4 inline mr-1" />
                              {change.email}
                            </div>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                change.action === "CREATED_USER"
                                  ? "bg-green-100 text-green-800"
                                  : change.action === "CREATED_SESSION"
                                  ? "bg-blue-100 text-blue-800"
                                  : change.action === "UPDATED_USER"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {change.action.replace("_", " ")}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-1">
                            Session: <strong>{change.sessionTitle}</strong>
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
              <div className="flex justify-center space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setResult(null);
                    setFile(null);
                    setPersistentError("");
                    setPersistentErrorDetails("");
                    setStep(2);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Process Another File
                </button>

                {result && (result.created > 0 || result.updated > 0) && (
                  <button
                    onClick={() => {
                      onSuccess();
                      setTimeout(() => {
                        handleClose();
                      }, 500);
                    }}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh Dashboard & Close</span>
                  </button>
                )}

                <button
                  onClick={handleClose}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkUpdateModal;
