"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit3,
  Save,
  X,
  Trash2,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import {
  format,
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
  isSameDay,
  parseISO,
  isValid,
} from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Session Type
export interface Session {
  id: string;
  title: string;
  facultyId: string;
  facultyName?: string;
  email: string;
  place: string;
  roomId: string;
  roomName?: string;
  description?: string;
  startTime: string;
  endTime: string;
  status: "Draft" | "Confirmed";
  inviteStatus: "Pending" | "Accepted" | "Declined";
  rejectionReason?: "NotInterested" | "SuggestedTopic" | "TimeConflict";
  suggestedTopic?: string;
  suggestedTimeStart?: string;
  suggestedTimeEnd?: string;
  optionalQuery?: string;
  formattedStartTime?: string;
  formattedEndTime?: string;
  duration?: string;
  eventId?: string;
}

type RoomLite = { id: string; name: string };

// Updated Faculty type to match database structure
type Faculty = {
  id: string;
  name: string;
  email: string;
  department?: string;
  institution?: string;
  expertise?: string;
  phone?: string;
  eventId: string;
  eventName: string;
};

// Event type for dropdown
type Event = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location?: string;
  status: string;
  description?: string;
  eventType?: string;
  createdByUser?: {
    id: string;
    name: string;
    email: string;
  };
  _count?: {
    sessions: number;
    registrations: number;
  };
  facultyCount?: number;
};

type DraftSession = {
  title?: string;
  place: string;
  roomId?: string;
  startTime?: string;
  endTime?: string;
  status: "Draft" | "Confirmed";
  description?: string;
};

// FIXED: Utility function to parse time consistently (preserves original grid behavior)
const parseTimeString = (timeStr: string) => {
  if (!timeStr) return { hours: 0, minutes: 0, date: new Date() };

  try {
    // Handle datetime-local format first (2023-09-05T16:30)
    if (
      timeStr.includes("T") &&
      !timeStr.includes("Z") &&
      timeStr.length <= 19
    ) {
      const [datePart, timePart] = timeStr.split("T");
      const [hoursStr, minutesStr = "0"] = (timePart || "").split(":");
      const hours = parseInt(hoursStr ?? "0", 10);
      const minutes = parseInt(minutesStr ?? "0", 10);

      // Create date from the date part only
      if (!datePart) {
        return { hours, minutes, date: new Date() };
      }
      const dateParts = datePart.split("-");
      const year = parseInt(dateParts[0] ?? "0", 10);
      const month = parseInt(dateParts[1] ?? "0", 10) - 1; // Month is 0-indexed
      const day = parseInt(dateParts[2] ?? "0", 10);
      const date = new Date(year, month, day);

      return { hours, minutes, date };
    } else {
      // Handle ISO format but convert to local time for display
      const date = new Date(timeStr);
      if (isValid(date)) {
        return {
          hours: date.getHours(),
          minutes: date.getMinutes(),
          date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        };
      }
    }
  } catch (error) {
    console.warn("Error parsing time:", timeStr, error);
  }

  return { hours: 0, minutes: 0, date: new Date() };
};

// FIXED: Function to format datetime-local input value
const formatDateTimeLocal = (dateStr: string) => {
  if (!dateStr) return "";

  try {
    // If already in datetime-local format, keep as-is
    if (dateStr.includes("T") && !dateStr.includes("Z")) {
      return dateStr.length === 16 ? dateStr : dateStr.slice(0, 16);
    } else {
      // Convert from ISO to datetime-local
      const date = new Date(dateStr);
      if (isValid(date)) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      }
    }
  } catch (error) {
    console.warn("Error formatting datetime local:", dateStr, error);
  }

  return "";
};

interface SessionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: Session[];
  date: string;
  timeSlot?: string;
  rooms: RoomLite[];
  onSessionUpdate: (sessionId: string, updates: Partial<Session>) => void;
  onSessionDelete: (sessionId: string) => void;
}

// Session Details Modal Component
const SessionDetailsModal: React.FC<SessionDetailsModalProps> = ({
  isOpen,
  onClose,
  sessions,
  date,
  timeSlot,
  rooms,
  onSessionUpdate,
  onSessionDelete,
}) => {
  const [editing, setEditing] = useState<Record<string, boolean>>({});
  const [draft, setDraft] = useState<Record<string, DraftSession>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [deleting, setDeleting] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "Draft":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getInviteStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "Declined":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "Pending":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const onEdit = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;
    setEditing((e) => ({ ...e, [sessionId]: true }));
    setDraft((d) => ({
      ...d,
      [sessionId]: {
        title: session.title ?? "",
        place: session.place ?? "",
        roomId: session.roomId,
        startTime: formatDateTimeLocal(session.startTime),
        endTime: formatDateTimeLocal(session.endTime),
        status: session.status,
        description: session.description ?? "",
      },
    }));
  };

  const onCancel = (sessionId: string) => {
    setEditing((e) => ({ ...e, [sessionId]: false }));
    setDraft((d) => {
      const nd = { ...d };
      delete nd[sessionId];
      return nd;
    });
  };

  const onChangeDraft = (
    sessionId: string,
    field: keyof DraftSession,
    value: string
  ) => {
    setDraft((d) => ({
      ...d,
      [sessionId]: {
        title: d[sessionId]?.title ?? "",
        place: d[sessionId]?.place ?? "",
        roomId: d[sessionId]?.roomId,
        startTime: d[sessionId]?.startTime,
        endTime: d[sessionId]?.endTime,
        status: d[sessionId]?.status ?? "Draft",
        description: d[sessionId]?.description ?? "",
        [field]: value,
      },
    }));
  };

  const onSave = async (sessionId: string) => {
    const body = draft[sessionId];
    if (!body) return;

    // FIXED: Keep datetime-local format without converting to ISO
    if (body.startTime && body.endTime) {
      const startHour = parseInt(
        body.startTime.split("T")[1]?.split(":")[0] || "0"
      );
      const endHour = parseInt(
        body.endTime.split("T")[1]?.split(":")[0] || "0"
      );

      if (endHour <= startHour) {
        alert("End time must be after start time");
        return;
      }
    }

    const payload = {
      ...body,
      startTime: body.startTime,
      endTime: body.endTime,
    };

    setSaving((s) => ({ ...s, [sessionId]: true }));

    try {
      const res = await fetch(`/api/sessions/${sessionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Failed to update session");
        return;
      }

      const result = await res.json();
      onSessionUpdate(sessionId, result.data);
      onCancel(sessionId);
    } catch (e) {
      console.error("Session update error:", e);
      alert("Failed to update session");
    } finally {
      setSaving((s) => ({ ...s, [sessionId]: false }));
    }
  };

  const onDelete = async (sessionId: string) => {
    if (!confirm("Are you sure you want to delete this session?")) return;

    setDeleting((d) => ({ ...d, [sessionId]: true }));

    try {
      const res = await fetch(`/api/sessions/${sessionId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Failed to delete session.");
        return;
      }
      onSessionDelete(sessionId);
      onClose();
    } catch (e) {
      console.error(e);
      alert("Failed to delete session.");
    } finally {
      setDeleting((d) => ({ ...d, [sessionId]: false }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Sessions for {date}
              </h2>
              {timeSlot && (
                <p className="text-blue-400 mt-1 font-medium">{timeSlot}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl font-bold p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              ×
            </button>
          </div>
          <p className="text-gray-400 mt-2">
            {sessions.length} session{sessions.length !== 1 ? "s" : ""}{" "}
            scheduled
          </p>
        </div>

        <div className="p-6 space-y-4">
          {sessions.map((session) => {
            const isEditing = editing[session.id];
            const d = draft[session.id];
            const isSaving = saving[session.id];
            const isDeleting = deleting[session.id];

            return (
              <div
                key={session.id}
                className={`border border-gray-700 rounded-lg p-5 transition-all duration-200 ${
                  isEditing
                    ? "border-blue-500 bg-blue-900/10"
                    : "hover:border-gray-600 hover:bg-gray-800/50"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  {isEditing ? (
                    <input
                      type="text"
                      value={d?.title || ""}
                      onChange={(e) =>
                        onChangeDraft(session.id, "title", e.target.value)
                      }
                      className="text-lg font-semibold text-white bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 w-full mr-4"
                      placeholder="Session Title"
                    />
                  ) : (
                    <h3 className="text-lg font-semibold text-white">
                      {session.title || "Untitled Session"}
                    </h3>
                  )}
                  <div className="flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        session.status
                      )}`}
                    >
                      {session.status}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getInviteStatusColor(
                        session.inviteStatus
                      )}`}
                    >
                      {session.inviteStatus}
                    </span>
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Place/Location
                        </label>
                        <input
                          type="text"
                          value={d?.place || ""}
                          onChange={(e) =>
                            onChangeDraft(session.id, "place", e.target.value)
                          }
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Room
                        </label>
                        <select
                          value={d?.roomId || session.roomId || ""}
                          onChange={(e) =>
                            onChangeDraft(session.id, "roomId", e.target.value)
                          }
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                        >
                          <option value="">Select Room</option>
                          {rooms.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Start Time
                        </label>
                        <input
                          type="datetime-local"
                          value={d?.startTime || ""}
                          onChange={(e) =>
                            onChangeDraft(
                              session.id,
                              "startTime",
                              e.target.value
                            )
                          }
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          End Time
                        </label>
                        <input
                          type="datetime-local"
                          value={d?.endTime || ""}
                          onChange={(e) =>
                            onChangeDraft(session.id, "endTime", e.target.value)
                          }
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Status
                      </label>
                      <select
                        value={d?.status || session.status}
                        onChange={(e) =>
                          onChangeDraft(
                            session.id,
                            "status",
                            e.target.value as "Draft" | "Confirmed"
                          )
                        }
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Confirmed">Confirmed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={d?.description || ""}
                        onChange={(e) =>
                          onChangeDraft(
                            session.id,
                            "description",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={() => onSave(session.id)}
                        disabled={isSaving}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isSaving ? (
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => onCancel(session.id)}
                        disabled={isSaving}
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => onDelete(session.id)}
                        disabled={isDeleting}
                        className="border-red-600 text-red-400 hover:bg-red-900/20 ml-auto"
                      >
                        {isDeleting ? (
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4 mr-2" />
                        )}
                        Delete
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300 mb-4">
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-blue-400" />
                        <span>{session.facultyName || "Faculty TBD"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-green-400" />
                        <span>
                          {session.place} - {session.roomName || session.roomId}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-purple-400" />
                        <span>
                          {parseTimeString(session.startTime)
                            .hours.toString()
                            .padStart(2, "0")}
                          :
                          {parseTimeString(session.startTime)
                            .minutes.toString()
                            .padStart(2, "0")}{" "}
                          -{" "}
                          {parseTimeString(session.endTime)
                            .hours.toString()
                            .padStart(2, "0")}
                          :
                          {parseTimeString(session.endTime)
                            .minutes.toString()
                            .padStart(2, "0")}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-yellow-400" />
                        <span>{session.duration || "Duration TBD"}</span>
                      </div>
                    </div>

                    {session.description && (
                      <div className="mb-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {session.description}
                        </p>
                      </div>
                    )}

                    {session.inviteStatus === "Declined" &&
                      session.rejectionReason && (
                        <div className="mb-4">
                          {session.rejectionReason === "SuggestedTopic" &&
                            session.suggestedTopic && (
                              <div className="bg-orange-900/20 border border-orange-700 rounded-lg p-3">
                                <div className="font-medium text-orange-300 mb-1">
                                  Topic Suggestion:
                                </div>
                                <div className="text-orange-200">
                                  {session.suggestedTopic}
                                </div>
                              </div>
                            )}
                          {session.rejectionReason === "TimeConflict" && (
                            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3">
                              <div className="font-medium text-blue-300 mb-2">
                                Time Conflict:
                              </div>
                              {session.suggestedTimeStart &&
                                session.suggestedTimeEnd && (
                                  <div className="text-blue-200 space-y-1">
                                    <div className="text-sm">
                                      <span className="text-green-300">
                                        Suggested Start:
                                      </span>{" "}
                                      {new Date(
                                        session.suggestedTimeStart
                                      ).toLocaleString()}
                                    </div>
                                    <div className="text-sm">
                                      <span className="text-red-300">
                                        Suggested End:
                                      </span>{" "}
                                      {new Date(
                                        session.suggestedTimeEnd
                                      ).toLocaleString()}
                                    </div>
                                    {session.optionalQuery && (
                                      <div className="text-sm border-t border-blue-800 pt-2 mt-2">
                                        <span className="text-blue-300">
                                          Comment:
                                        </span>{" "}
                                        {session.optionalQuery}
                                      </div>
                                    )}
                                  </div>
                                )}
                            </div>
                          )}
                        </div>
                      )}

                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(session.id)}
                        className="border-blue-600 text-blue-400 hover:bg-blue-900/20"
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Session
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface CreateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDate?: Date | undefined;
  defaultHour?: number | undefined;
  rooms: RoomLite[];
  events: Event[];
  facultiesByEvent: Record<string, Faculty[]>;
  onCreate: () => void;
}

// Create Session Modal Component
const CreateSessionModal: React.FC<CreateSessionModalProps> = ({
  isOpen,
  onClose,
  defaultDate,
  defaultHour,
  rooms,
  events,
  facultiesByEvent,
  onCreate,
}) => {
  const [title, setTitle] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [email, setEmail] = useState("");
  const [place, setPlace] = useState("");
  const [roomId, setRoomId] = useState("");
  const [description, setDescription] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [status, setStatus] = useState<"Draft" | "Confirmed">("Draft");
  const [loading, setLoading] = useState(false);
  const [travelRequired, setTravelRequired] = useState("");
  const [accommodationRequired, setAccommodationRequired] = useState("");

  useEffect(() => {
    if (isOpen && defaultDate && defaultHour !== undefined) {
      const startDate = new Date(defaultDate);
      startDate.setHours(defaultHour, 0, 0, 0);

      const endDate = new Date(startDate);
      endDate.setHours(defaultHour + 1, 0, 0, 0);

      // FIXED: Format as datetime-local string without timezone conversion
      const formatDateTime = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };

      setStartDateTime(formatDateTime(startDate));
      setEndDateTime(formatDateTime(endDate));
    }
  }, [isOpen, defaultDate, defaultHour]);

  // Get faculty for selected event
  const availableFaculty = selectedEventId
    ? facultiesByEvent[selectedEventId] || []
    : [];

  // Auto-populate email when faculty is selected
  const handleFacultyChange = (selectedFacultyId: string) => {
    setFacultyId(selectedFacultyId);
    const selectedFaculty = availableFaculty.find(
      (f) => f.id === selectedFacultyId
    );
    if (selectedFaculty) {
      setEmail(selectedFaculty.email);
    } else {
      setEmail("");
    }
  };

  // Handle event selection
  const handleEventChange = (eventId: string) => {
    setSelectedEventId(eventId);
    setFacultyId(""); // Reset faculty selection
    setEmail(""); // Reset email

    // Auto-fill place with event location if available
    const selectedEvent = events.find((e) => e.id === eventId);
    if (selectedEvent?.location) {
      setPlace(selectedEvent.location);
    }
  };

  const resetForm = () => {
    setTitle("");
    setSelectedEventId("");
    setFacultyId("");
    setEmail("");
    setPlace("");
    setRoomId("");
    setDescription("");
    setStartDateTime("");
    setEndDateTime("");
    setStatus("Draft");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // FIXED: Validate time using local time parsing
      const startTimeLocal = parseTimeString(startDateTime);
      const endTimeLocal = parseTimeString(endDateTime);

      if (
        endTimeLocal.hours <= startTimeLocal.hours ||
        (endTimeLocal.hours === startTimeLocal.hours &&
          endTimeLocal.minutes <= startTimeLocal.minutes)
      ) {
        alert("End time must be after start time");
        return;
      }

      const durationMinutes =
        endTimeLocal.hours * 60 +
        endTimeLocal.minutes -
        (startTimeLocal.hours * 60 + startTimeLocal.minutes);
      if (durationMinutes < 15) {
        alert("Session must be at least 15 minutes long");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("facultyId", facultyId);
      formData.append("email", email);
      formData.append("place", place);
      formData.append("roomId", roomId);
      formData.append("description", description);

      // FIXED: Send datetime-local strings directly without conversion
      formData.append("startTime", startDateTime);
      formData.append("endTime", endDateTime);

      formData.append("status", status);
      formData.append("inviteStatus", "Pending");
      formData.append("eventId", selectedEventId);
      formData.append("travel", travelRequired);
      formData.append("accommodation", accommodationRequired);

      console.log("📋 Creating session with local times:", {
        startTime: startDateTime,
        endTime: endDateTime,
        startHour: startTimeLocal.hours,
        endHour: endTimeLocal.hours,
        travelRequired: travelRequired,        // ✅ Add this log
        accommodationRequired: accommodationRequired, // ✅ Add this log
      });

      const response = await fetch("/api/sessions", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Failed to create session");
        return;
      }

      const result = await response.json();
      console.log("✅ Session created successfully:", result);

      resetForm();
      onCreate();
      onClose();

      if (result.emailStatus === "sent") {
        alert("Session created and invitation email sent successfully!");
      } else {
        alert(
          "Session created successfully! Email notification may be delayed."
        );
      }
    } catch (error) {
      console.error("❌ Error creating session:", error);
      alert("Failed to create session. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              Create New Session
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl font-bold p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              ×
            </button>
          </div>
          <p className="text-gray-400 mt-1">
            Fill in the details to create a new session
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Session Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  placeholder="Enter session title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Event *
                  <span className="text-xs text-blue-400 ml-2">
                    ({events.length} events available)
                  </span>
                </label>
                <select
                  value={selectedEventId}
                  onChange={(e) => handleEventChange(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Select Event</option>
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.name} ({event.facultyCount || 0} faculty)
                    </option>
                  ))}
                </select>
                {events.length === 0 && (
                  <p className="text-xs text-yellow-400 mt-1">
                    ⚠️ No events found. Please ensure events are created and
                    faculty lists are uploaded.
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Faculty *
                <span className="text-xs text-blue-400 ml-2">
                  ({availableFaculty.length} faculty available for selected
                  event)
                </span>
              </label>
              <select
                value={facultyId}
                onChange={(e) => handleFacultyChange(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                required
                disabled={!selectedEventId}
              >
                <option value="">
                  {selectedEventId
                    ? "Select Faculty"
                    : "Please select an event first"}
                </option>
                {availableFaculty.map((faculty) => (
                  <option key={faculty.id} value={faculty.id}>
                    {faculty.name}
                    {faculty.department && ` (${faculty.department})`}
                    {faculty.institution && ` - ${faculty.institution}`}
                  </option>
                ))}
              </select>
              {selectedEventId && availableFaculty.length === 0 && (
                <p className="text-xs text-yellow-400 mt-1">
                  ⚠️ No faculty available for this event. Please upload faculty
                  lists.
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Faculty Email *
                  <span className="text-xs text-gray-400 ml-2">
                    (auto-filled)
                  </span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  placeholder="faculty@university.edu"
                  required
                  readOnly={!!facultyId}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Place/Location *
                </label>
                <input
                  type="text"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., Main Campus, Building A"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Room *
              </label>
              <select
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="">Select Room</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Travel *
                </label>
                <select
                  name="travel" // ✅ ADD THIS - Critical for FormData
                  value={travelRequired}
                  onChange={(e) => {
                    console.log("Travel selected:", e.target.value); // ✅ Debug log
                    setTravelRequired(e.target.value);
                  }}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Provide Travel</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Accommodation *
                </label>
                <select
                  name="accommodation" // ✅ ADD THIS - Critical for FormData
                  value={accommodationRequired}
                  onChange={(e) => {
                    console.log("Accommodation selected:", e.target.value); // ✅ Debug log
                    setAccommodationRequired(e.target.value);
                  }}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Provide Accommodation</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Start Time *
                </label>
                <input
                  type="datetime-local"
                  value={startDateTime}
                  onChange={(e) => setStartDateTime(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Time *
                </label>
                <input
                  type="datetime-local"
                  value={endDateTime}
                  onChange={(e) => setEndDateTime(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "Draft" | "Confirmed")
                }
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="Draft">Draft</option>
                <option value="Confirmed">Confirmed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                placeholder="Session description, objectives, and key topics..."
                required
              />
            </div>

            {/* Selected Event and Faculty Info */}
            {selectedEventId && facultyId && (
              <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-200 mb-2">
                  Session Summary:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-blue-300">
                  <div>
                    <span className="font-medium">Event:</span>{" "}
                    {events.find((e) => e.id === selectedEventId)?.name}
                  </div>
                  <div>
                    <span className="font-medium">Faculty:</span>{" "}
                    {availableFaculty.find((f) => f.id === facultyId)?.name}
                  </div>
                  <div>
                    <span className="font-medium">Time:</span>{" "}
                    {startDateTime &&
                      `${
                        parseTimeString(startDateTime).hours
                      }:${parseTimeString(startDateTime)
                        .minutes.toString()
                        .padStart(2, "0")}`}{" "}
                    -{" "}
                    {endDateTime &&
                      `${parseTimeString(endDateTime).hours}:${parseTimeString(
                        endDateTime
                      )
                        .minutes.toString()
                        .padStart(2, "0")}`}
                  </div>
                  <div>
                    <span className="font-medium">Institution:</span>{" "}
                    {availableFaculty.find((f) => f.id === facultyId)
                      ?.institution || "N/A"}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || !selectedEventId || !facultyId}
                className="bg-green-600 hover:bg-green-700"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Create Session
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Main Sessions Calendar Component
const SessionsCalendarView: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [rooms, setRooms] = useState<RoomLite[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [facultiesByEvent, setFacultiesByEvent] = useState<
    Record<string, Faculty[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSessions, setSelectedSessions] = useState<Session[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [lastUpdateTime, setLastUpdateTime] = useState<string>("");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSessionDate, setNewSessionDate] = useState<Date | undefined>(
    undefined
  );
  const [newSessionHour, setNewSessionHour] = useState<number | undefined>(
    undefined
  );

  const POLL_INTERVAL = 30000; // Reduced polling frequency

  // Load events and faculty data
  const loadEventsAndFaculty = useCallback(async () => {
    try {
      console.log("🔄 Loading events and faculty data...");

      // Load events from database
      const eventsResponse = await fetch("/api/events", {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });

      let eventsList: Event[] = [];
      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json();

        if (eventsData.success && eventsData.data?.events) {
          eventsList = eventsData.data.events;
        } else if (eventsData.events) {
          eventsList = eventsData.events;
        } else if (Array.isArray(eventsData)) {
          eventsList = eventsData;
        }

        console.log(`✅ Loaded ${eventsList.length} events from database`);
      }

      // Load faculty data from localStorage and database
      const facultyResponse = await fetch("/api/faculties", {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });

      let allFaculties: Faculty[] = [];
      if (facultyResponse.ok) {
        allFaculties = await facultyResponse.json();
        console.log(`✅ Loaded ${allFaculties.length} faculties from database`);
      }

      // Also check localStorage for uploaded faculty lists
      if (typeof window !== "undefined") {
        const savedFacultyData = localStorage.getItem("eventFacultyData");
        if (savedFacultyData) {
          const eventFacultyData = JSON.parse(savedFacultyData);
          const localFaculties = eventFacultyData.flatMap(
            (eventData: any) =>
              eventData.facultyList?.map((faculty: any) => ({
                ...faculty,
                eventId: eventData.eventId,
                eventName: eventData.eventName,
              })) || []
          );

          // Merge with database faculties, avoiding duplicates
          localFaculties.forEach((localFaculty: Faculty) => {
            if (!allFaculties.find((f) => f.email === localFaculty.email)) {
              allFaculties.push(localFaculty);
            }
          });

          console.log(
            `✅ Added ${localFaculties.length} faculties from localStorage`
          );
        }
      }

      // FIXED: Group faculties by event safely
      const facultyMapping: Record<string, Faculty[]> = {};
      allFaculties.forEach((faculty) => {
        if (!facultyMapping[faculty.eventId]) {
          facultyMapping[faculty.eventId] = [];
        }
        (
          facultyMapping[faculty.eventId] ??
          (facultyMapping[faculty.eventId] = [])
        ).push(faculty);
      });

      // Update events with faculty counts
      const eventsWithFacultyCounts = eventsList.map((event: Event) => ({
        ...event,
        facultyCount: facultyMapping[event.id]?.length || 0,
      }));

      console.log("✅ Events and faculty data loaded successfully");
      return {
        events: eventsWithFacultyCounts,
        facultiesByEvent: facultyMapping,
      };
    } catch (error) {
      console.error("❌ Error loading events and faculty:", error);
      return { events: [], facultiesByEvent: {} };
    }
  }, []);

  // Fetch all data
  const fetchSessions = useCallback(
    async (showLoading = true) => {
      try {
        if (showLoading) setLoading(true);
        setError(null);

        const [
          sessionsRes,
          roomsRes,
          { events: eventsFromDb, facultiesByEvent: facultyMapping },
        ] = await Promise.all([
          fetch("/api/sessions", { cache: "no-store" }),
          fetch("/api/rooms", { cache: "no-store" }),
          loadEventsAndFaculty(),
        ]);

        if (!sessionsRes.ok || !roomsRes.ok) {
          throw new Error("Failed to fetch data from server");
        }

        const sessionsData = await sessionsRes.json();
        const roomsData = await roomsRes.json();

        const sessionsList =
          sessionsData?.data?.sessions ||
          sessionsData?.sessions ||
          sessionsData ||
          [];
        const roomsList = roomsData || [];

        if (Array.isArray(sessionsList)) {
          const enhancedSessions = sessionsList.map((session: any) => ({
            ...session,
            roomName:
              roomsList.find((r: RoomLite) => r.id === session.roomId)?.name ||
              session.roomName,
          }));

          setSessions(enhancedSessions);
          setRooms(roomsList);
          setEvents(eventsFromDb);
          setFacultiesByEvent(facultyMapping);
          setLastUpdateTime(new Date().toLocaleTimeString());

          console.log(
            `✅ Calendar updated: ${enhancedSessions.length} sessions, ${eventsFromDb.length} events`
          );
        } else {
          setError(sessionsData?.error || "Failed to load sessions");
        }
      } catch (err) {
        console.error("❌ Error fetching data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        if (showLoading) setLoading(false);
      }
    },
    [loadEventsAndFaculty]
  );

  // Listen for faculty data updates
  useEffect(() => {
    const handleFacultyDataUpdate = () => {
      console.log("🔄 Faculty data updated, refreshing...");
      fetchSessions(false);
    };

    window.addEventListener("storage", handleFacultyDataUpdate);
    window.addEventListener("eventFacultyDataUpdated", handleFacultyDataUpdate);

    return () => {
      window.removeEventListener("storage", handleFacultyDataUpdate);
      window.removeEventListener(
        "eventFacultyDataUpdated",
        handleFacultyDataUpdate
      );
    };
  }, [fetchSessions]);

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(() => fetchSessions(false), POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchSessions]);

  const handleNewSessionClick = () => {
    setNewSessionDate(new Date());
    setNewSessionHour(9);
    setShowCreateModal(true);
  };

  const handleEmptySlotClick = (date: Date, hour: number) => {
    setNewSessionDate(date);
    setNewSessionHour(hour);
    setShowCreateModal(true);
  };

  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      slots.push({
        hour,
        label: format(new Date().setHours(hour, 0, 0, 0), "HH:mm"),
        displayLabel: format(new Date().setHours(hour, 0, 0, 0), "h a"),
      });
    }
    return slots;
  }, []);

  const weekDays = useMemo(() => {
    const start = startOfWeek(currentWeek, { weekStartsOn: 1 });
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(start, i);
      days.push({
        date,
        dayName: format(date, "EEE"),
        dateNumber: format(date, "d"),
        fullDate: format(date, "MMM d, yyyy"),
        isToday: isSameDay(date, new Date()),
      });
    }
    return days;
  }, [currentWeek]);

  // FIXED: Get sessions for slot using local time parsing (like original)
  const getSessionsForSlot = (date: Date, hour: number) => {
    return sessions.filter((session) => {
      if (!session.startTime || !session.endTime) return false;

      const sessionTime = parseTimeString(session.startTime);
      const sessionEndTime = parseTimeString(session.endTime);

      // Check if same date
      if (!isSameDay(sessionTime.date, date)) return false;

      // Check if hour falls within session time range
      return hour >= sessionTime.hours && hour < sessionEndTime.hours;
    });
  };

  // FIXED: Get session style using local time positioning (preserves grid behavior)
  const getSessionStyle = (session: Session) => {
    if (!session.startTime || !session.endTime) return {};

    const startTime = parseTimeString(session.startTime);
    const endTime = parseTimeString(session.endTime);

    // Calculate position based on local time (like original)
    const startPosition = (startTime.hours * 60 + startTime.minutes) / 60;
    const duration =
      (endTime.hours * 60 +
        endTime.minutes -
        (startTime.hours * 60 + startTime.minutes)) /
      60;

    return {
      top: `${startPosition * 60}px`,
      height: `${Math.max(duration * 60 - 4, 30)}px`,
    };
  };

  const getSessionColor = (session: Session) => {
    if (session.inviteStatus === "Accepted") {
      return "bg-green-600/90 border-l-green-400 text-white shadow-lg shadow-green-600/20";
    } else if (
      session.inviteStatus === "Declined" &&
      (session.rejectionReason === "SuggestedTopic" ||
        session.rejectionReason === "TimeConflict")
    ) {
      return "bg-yellow-600/90 border-l-yellow-400 text-white shadow-lg shadow-yellow-600/20";
    } else if (session.inviteStatus === "Declined") {
      return "bg-red-600/90 border-l-red-400 text-white shadow-lg shadow-red-600/20";
    } else if (session.inviteStatus === "Pending") {
      return "bg-blue-600/90 border-l-blue-400 text-white shadow-lg shadow-blue-600/20";
    } else {
      return "bg-gray-600/90 border-l-gray-400 text-white shadow-lg shadow-gray-600/20";
    }
  };

  const handleSlotClick = (
    date: Date,
    hour: number,
    sessionsInSlot: Session[]
  ) => {
    if (sessionsInSlot.length === 0) {
      handleEmptySlotClick(date, hour);
      return;
    }

    setSelectedSessions(sessionsInSlot);
    setSelectedDate(format(date, "EEEE, MMMM d, yyyy"));
    setSelectedTimeSlot(
      `${format(new Date().setHours(hour), "h a")} - ${format(
        new Date().setHours(hour + 1),
        "h a"
      )}`
    );
    setIsModalOpen(true);
  };

  const handleSessionClick = (session: Session) => {
    const sessionTime = parseTimeString(session.startTime);
    setSelectedSessions([session]);
    setSelectedDate(format(sessionTime.date, "EEEE, MMMM d, yyyy"));
    setSelectedTimeSlot(
      `${sessionTime.hours}:${sessionTime.minutes
        .toString()
        .padStart(2, "0")} - ${
        parseTimeString(session.endTime).hours
      }:${parseTimeString(session.endTime).minutes.toString().padStart(2, "0")}`
    );
    setIsModalOpen(true);
  };

  const handleSessionUpdate = (
    sessionId: string,
    updates: Partial<Session>
  ) => {
    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === sessionId ? { ...session, ...updates } : session
      )
    );
    fetchSessions(false);
  };

  const handleSessionDelete = (sessionId: string) => {
    setSessions((prevSessions) =>
      prevSessions.filter((session) => session.id !== sessionId)
    );
    fetchSessions(false);
  };

  const navigateWeek = (direction: "prev" | "next") => {
    setCurrentWeek(
      direction === "next" ? addDays(currentWeek, 7) : subDays(currentWeek, 7)
    );
  };

  // Calculate total faculty across all events
  const totalAvailableFaculty = Object.values(facultiesByEvent).flat().length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 p-6">
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => fetchSessions(true)}
            className="mt-2 text-red-400 hover:text-red-300 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="bg-gray-900 border-b border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Sessions Calendar
              </h1>
              <p className="text-gray-400">
                Database-connected schedule • Last updated: {lastUpdateTime}
                <span className="text-blue-400 ml-2">
                  • {events.length} events • {totalAvailableFaculty} faculty
                  available
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Database Connected
            </div>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={() => fetchSessions(true)}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleNewSessionClick}
              disabled={events.length === 0}
              title={
                events.length === 0
                  ? "No events available - please create events or upload faculty lists"
                  : "Create new session"
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              New Session
            </Button>
          </div>
        </div>

        {/* Status Alert */}
        {events.length === 0 && (
          <div className="mb-4 p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-300">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">
                No events found. Please create events in Event Management or
                upload faculty lists.
              </span>
            </div>
          </div>
        )}

        {/* Events Summary */}
        {events.length > 0 && (
          <div className="mb-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-300">
                <strong>{events.length}</strong> active events
              </span>
            </div>
            {events.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {event.name} ({event.facultyCount} faculty)
                </Badge>
              </div>
            ))}
            {events.length > 3 && (
              <span className="text-gray-400 text-xs">
                +{events.length - 3} more events
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateWeek("prev")}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-lg font-semibold text-white">
              {format(startOfWeek(currentWeek, { weekStartsOn: 1 }), "MMM d")} -{" "}
              {format(
                endOfWeek(currentWeek, { weekStartsOn: 1 }),
                "MMM d, yyyy"
              )}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateWeek("next")}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentWeek(new Date())}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Today
          </Button>
        </div>
      </div>

      {/* FIXED: Calendar Grid with corrected time positioning */}
      <div className="flex overflow-hidden">
        <div className="bg-gray-900 border-r border-gray-800 w-20 flex-shrink-0">
          <div className="h-16 border-b border-gray-800"></div>
          {timeSlots.map((slot) => (
            <div
              key={slot.hour}
              className="h-15 border-b border-gray-800/50 flex items-start justify-center pt-1"
              style={{ height: "60px" }}
            >
              <span className="text-xs text-gray-400 font-medium">
                {slot.displayLabel}
              </span>
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-x-auto">
          <div className="flex min-w-full">
            {weekDays.map((day) => (
              <div
                key={day.date.toISOString()}
                className="flex-1 border-r border-gray-800 min-w-0"
              >
                <div
                  className={`h-16 border-b border-gray-800 flex flex-col items-center justify-center ${
                    day.isToday
                      ? "bg-blue-600/20 border-blue-500"
                      : "bg-gray-900"
                  }`}
                >
                  <div className="text-xs font-medium text-gray-400 uppercase">
                    {day.dayName}
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      day.isToday ? "text-blue-400" : "text-white"
                    }`}
                  >
                    {day.dateNumber}
                  </div>
                </div>

                <div className="relative">
                  {timeSlots.map((slot) => {
                    const sessionsInSlot = getSessionsForSlot(
                      day.date,
                      slot.hour
                    );
                    return (
                      <div
                        key={slot.hour}
                        className="h-15 border-b border-gray-800/30 relative hover:bg-gray-800/20 cursor-pointer transition-colors"
                        style={{ height: "60px" }}
                        onClick={() =>
                          handleSlotClick(day.date, slot.hour, sessionsInSlot)
                        }
                      >
                        <div className="absolute inset-0" />
                      </div>
                    );
                  })}

                  {/* FIXED: Session positioning with correct time parsing */}
                  {sessions
                    .filter((session) => {
                      if (!session.startTime) return false;
                      const sessionTime = parseTimeString(session.startTime);
                      return isSameDay(sessionTime.date, day.date);
                    })
                    .map((session) => {
                      const style = getSessionStyle(session);
                      const colorClass = getSessionColor(session);

                      return (
                        <div
                          key={session.id}
                          className={`absolute left-2 right-2 rounded-lg border-l-4 p-3 text-xs hover:scale-[1.02] transition-all cursor-pointer ${colorClass}`}
                          style={style}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSessionClick(session);
                          }}
                        >
                          <div className="font-semibold truncate mb-1">
                            {session.title}
                          </div>
                          <div className="text-xs opacity-90 truncate mb-1">
                            {session.facultyName}
                          </div>

                          <div className="absolute top-1 right-1">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                session.inviteStatus === "Accepted"
                                  ? "bg-green-300"
                                  : session.inviteStatus === "Declined" &&
                                    (session.rejectionReason ===
                                      "SuggestedTopic" ||
                                      session.rejectionReason ===
                                        "TimeConflict")
                                  ? "bg-yellow-300"
                                  : session.inviteStatus === "Declined"
                                  ? "bg-red-300"
                                  : "bg-blue-300"
                              }`}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SessionDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sessions={selectedSessions}
        date={selectedDate}
        timeSlot={selectedTimeSlot}
        rooms={rooms}
        onSessionUpdate={handleSessionUpdate}
        onSessionDelete={handleSessionDelete}
      />

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        defaultDate={newSessionDate}
        defaultHour={newSessionHour}
        rooms={rooms}
        events={events}
        facultiesByEvent={facultiesByEvent}
        onCreate={() => {
          fetchSessions(true);
          setShowCreateModal(false);
        }}
      />
    </div>
  );
};

export default SessionsCalendarView;
