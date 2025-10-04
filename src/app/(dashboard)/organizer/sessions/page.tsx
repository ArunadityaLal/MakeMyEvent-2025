"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { OrganizerLayout } from "@/components/dashboard/layout";
import { SessionForm } from "@/components/sessions/session-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Edit3,
  Trash2,
  Save,
  X,
  Search,
  Filter,
  RefreshCw,
  Users,
  Clock,
  MapPin,
  Mail,
  CheckCircle,
  AlertTriangle,
  Building2,
  FileText,
  Plus,
  Timer,
  CalendarDays,
  Send,
  User,
} from "lucide-react";

type InviteStatus = "Pending" | "Accepted" | "Declined";

type SessionRow = {
  eventName?: string | null;
  id: string;
  eventId?: string;
  title: string;
  facultyName: string;
  email: string;
  place: string;
  roomName?: string | null;
  roomId?: string | null;
  description?: string | null;
  memberDescription?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  status: "Draft" | "Confirmed";
  inviteStatus: InviteStatus;
  rejectionReason?: "NotInterested" | "SuggestedTopic" | "TimeConflict";
  suggestedTopic?: string | null;
  suggestedTimeStart?: string | null;
  suggestedTimeEnd?: string | null;
  optionalQuery?: string | null;
  facultyId?: string;
  duration?: string | null;
  formattedStartTime?: string | null;
  formattedEndTime?: string | null;
  eventInfo?: {
    id: string;
    name: string;
    location: string;
  };
};

type Event = {
  id: string;
  name: string;
  location: string;
  status: string;
  startDate: string;
  endDate: string;
  createdByName?: string;
  count: {
    sessions: number;
    registrations: number;
  };
};

type RoomLite = { id: string; name: string };
type Faculty = { id: string; name: string };

type DraftSession = {
  title: string;
  facultyName: string;
  email: string;
  place: string;
  roomId?: string;
  startTime?: string;
  endTime?: string;
  status: "Draft" | "Confirmed";
  description?: string;
  memberDescription?: string;
  inviteStatus: "Pending" | "Accepted" | "Declined";
};

const safeToLowerCase = (value: any): string => {
  if (value === null || value === undefined) {
    return "";
  }
  return String(value).toLowerCase();
};

const inviteStatusBadge = (s: InviteStatus) => {
  const base =
    "px-2 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1";
  if (s === "Accepted")
    return (
      <span
        className={`${base} bg-green-900/30 text-green-300 border border-green-700`}
      >
        <CheckCircle className="h-3 w-3" />
        Accepted
      </span>
    );
  if (s === "Declined")
    return (
      <span
        className={`${base} bg-red-900/30 text-red-300 border border-red-700`}
      >
        <X className="h-3 w-3" />
        Declined
      </span>
    );
  return (
    <span
      className={`${base} bg-yellow-900/30 text-yellow-300 border border-yellow-700`}
    >
      <Clock className="h-3 w-3" />
      Pending
    </span>
  );
};

const statusBadge = (s: "Draft" | "Confirmed") => {
  const base = "px-2 py-1 rounded-full text-xs font-medium";
  if (s === "Confirmed")
    return (
      <span
        className={`${base} bg-blue-900/30 text-blue-300 border border-blue-700`}
      >
        Confirmed
      </span>
    );
  return (
    <span
      className={`${base} bg-gray-700 text-gray-300 border border-gray-600`}
    >
      Draft
    </span>
  );
};

const toInputDateTime = (iso?: string | null) => {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
  } catch (error) {
    console.warn("Error parsing date:", iso, error);
    return "";
  }
};

const calculateDuration = (
  startTime?: string | null,
  endTime?: string | null
) => {
  if (!startTime || !endTime) return "";
  try {
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return "";

    const minutes = Math.round((end.getTime() - start.getTime()) / (1000 * 60));
    if (minutes <= 0) return "";

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${minutes} min`;
  } catch (error) {
    console.warn("Error calculating duration:", error);
    return "";
  }
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const AllSessions: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast, ToastContainer } = useToast();

  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [rooms, setRooms] = useState<RoomLite[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "Draft" | "Confirmed"
  >("all");
  const [inviteFilter, setInviteFilter] = useState<
    "all" | InviteStatus | "all"
  >("all");
  const [selectedEventId, setSelectedEventId] = useState<string>("all");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [preselectedEventId, setPreselectedEventId] = useState<string>("");

  const [editing, setEditing] = useState<Record<string, boolean>>({});
  const [draft, setDraft] = useState<Record<string, DraftSession>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [deleting, setDeleting] = useState<Record<string, boolean>>({});
  const [sendingEmail, setSendingEmail] = useState<Record<string, boolean>>({});

  const [originalValues, setOriginalValues] = useState<
    Record<string, SessionRow>
  >({});

  const eventIdFromUrl = searchParams.get("eventId");
  const actionFromUrl = searchParams.get("action");

  useEffect(() => {
    if (eventIdFromUrl) {
      setSelectedEventId(eventIdFromUrl);
      setPreselectedEventId(eventIdFromUrl);
    }
    if (actionFromUrl === "create") {
      setShowCreateModal(true);
    }
  }, [eventIdFromUrl, actionFromUrl]);

  const loadEvents = async () => {
    try {
      setEventsLoading(true);
      console.log("📋 Fetching events for sessions page...");

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
      console.log("📊 Events API Response:", data);

      let eventsArray: any[];
      if (data.success && data.data && data.data.events) {
        eventsArray = data.data.events;
      } else if (data.events) {
        eventsArray = data.events;
      } else if (Array.isArray(data)) {
        eventsArray = data;
      } else {
        console.warn("⚠️ Unexpected events API response format:", data);
        eventsArray = [];
      }

      const processedEvents: Event[] = eventsArray.map((event: any) => ({
        id: event.id,
        name: event.name || "Unnamed Event",
        location: event.venue || event.location || "TBA",
        status: event.status || "DRAFT",
        startDate: event.startdate || event.startDate,
        endDate: event.enddate || event.endDate,
        createdByName: event.createdbyname || event.createdByName,
        count: {
          sessions: event.count?.sessions || 0,
          registrations: event.count?.registrations || 0,
        },
      }));

      console.log(
        `✅ Successfully loaded ${processedEvents.length} events for sessions`
      );
      setEvents(processedEvents);
    } catch (error) {
      console.error("❌ Error loading events:", error);

      const fallbackEvents: Event[] = [
        {
          id: "event-1",
          name: "Academic Excellence Conference 2025",
          location: "University Campus",
          status: "PUBLISHED",
          startDate: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
          endDate: new Date(
            Date.now() + 32 * 24 * 60 * 60 * 1000
          ).toISOString(),
          count: { sessions: 0, registrations: 0 },
        },
      ];
      setEvents(fallbackEvents);
    } finally {
      setEventsLoading(false);
    }
  };

  const load = async (showLoading = true) => {
    if (showLoading) setLoading(true);

    try {
      await loadEvents();

      const [sRes, rRes, fRes] = await Promise.all([
        fetch(
          `/api/sessions${
            selectedEventId !== "all" ? `?eventId=${selectedEventId}` : ""
          }`,
          { cache: "no-store" }
        ),
        fetch("/api/rooms", { cache: "no-store" }),
        fetch("/api/faculties", { cache: "no-store" }),
      ]);

      if (!sRes.ok || !rRes.ok || !fRes.ok) {
        throw new Error("Failed to fetch session data");
      }

      const [sData, rData, fData] = await Promise.all([
        sRes.json(),
        rRes.json(),
        fRes.json(),
      ]);

      console.log("📊 Raw session data from API:", sData);

      const sessionsList = sData.data?.sessions || sData.sessions || sData;

      // ✅ FIX: Map member_description properly from API response
      const mapped: SessionRow[] = sessionsList.map((s: any) => {
        const roomId =
          s.roomId ?? rData.find((r: any) => r.name === s.roomName)?.id;
        const duration = calculateDuration(s.startTime, s.endTime);

        // ✅ Log the raw session data to debug
        console.log(`Session ${s.id} raw data:`, {
          memberDescription: s.memberDescription,
          member_description: s.member_description,
          description: s.description,
        });

        return {
          ...s,
          id: s.id || "",
          title: s.title || "Untitled Session",
          facultyName: s.facultyName || "Unknown Faculty",
          email: s.email || "",
          place: s.place || "",
          roomName: s.roomName || null,
          roomId: roomId || null,
          description: s.description || null,
          // ✅ CRITICAL FIX: Check multiple possible field names from API
          memberDescription:
            s.memberDescription ||
            s.member_description ||
            s.memberdescription ||
            null,
          eventName: s.eventName || null,
          startTime: s.startTime || s.time || null,
          endTime: s.endTime || null,
          status: s.status || "Draft",
          inviteStatus: s.inviteStatus || "Pending",
          duration,
          formattedStartTime: s.startTime
            ? new Date(s.startTime).toLocaleString()
            : null,
          formattedEndTime: s.endTime
            ? new Date(s.endTime).toLocaleString()
            : null,
        };
      });

      console.log("✅ Mapped sessions with member descriptions:", mapped);

      setSessions(mapped);
      setRooms(rData || []);
      setFaculties(fData || []);
    } catch (e) {
      console.error("❌ Failed to load data:", e);
      toast({
        type: "error",
        title: "Loading Error",
        description: "Failed to load session data. Please refresh the page.",
      });
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(() => load(false), 10000);
    return () => clearInterval(id);
  }, [selectedEventId]);

  const detectChanges = (
    sessionId: string,
    originalSession: SessionRow,
    updatedData: DraftSession
  ) => {
    const changes: { field: string; oldValue: any; newValue: any }[] = [];

    if (originalSession.title !== updatedData.title) {
      changes.push({
        field: "title",
        oldValue: originalSession.title,
        newValue: updatedData.title,
      });
    }

    if (originalSession.facultyName !== updatedData.facultyName) {
      changes.push({
        field: "facultyName",
        oldValue: originalSession.facultyName,
        newValue: updatedData.facultyName,
      });
    }

    if (originalSession.email !== updatedData.email) {
      changes.push({
        field: "email",
        oldValue: originalSession.email,
        newValue: updatedData.email,
      });
    }

    if (originalSession.place !== updatedData.place) {
      changes.push({
        field: "place",
        oldValue: originalSession.place,
        newValue: updatedData.place,
      });
    }

    if (originalSession.roomId !== updatedData.roomId) {
      const oldRoomName =
        rooms.find((r) => r.id === originalSession.roomId)?.name ||
        originalSession.roomName;
      const newRoomName = rooms.find((r) => r.id === updatedData.roomId)?.name;
      changes.push({
        field: "roomId",
        oldValue: oldRoomName,
        newValue: newRoomName,
      });
    }

    if (originalSession.status !== updatedData.status) {
      changes.push({
        field: "status",
        oldValue: originalSession.status,
        newValue: updatedData.status,
      });
    }

    if (originalSession.inviteStatus !== updatedData.inviteStatus) {
      changes.push({
        field: "inviteStatus",
        oldValue: originalSession.inviteStatus,
        newValue: updatedData.inviteStatus,
      });
    }

    if (originalSession.description !== updatedData.description) {
      changes.push({
        field: "description",
        oldValue: originalSession.description,
        newValue: updatedData.description,
      });
    }

    // ✅ Check member description changes
    if (originalSession.memberDescription !== updatedData.memberDescription) {
      changes.push({
        field: "memberDescription",
        oldValue: originalSession.memberDescription,
        newValue: updatedData.memberDescription,
      });
    }

    const originalStartTime = originalSession.startTime;
    const newStartTime = updatedData.startTime
      ? new Date(updatedData.startTime).toISOString()
      : null;

    if (originalStartTime !== newStartTime) {
      changes.push({
        field: "startTime",
        oldValue: originalStartTime,
        newValue: newStartTime,
      });
    }

    const originalEndTime = originalSession.endTime;
    const newEndTime = updatedData.endTime
      ? new Date(updatedData.endTime).toISOString()
      : null;

    if (originalEndTime !== newEndTime) {
      changes.push({
        field: "endTime",
        oldValue: originalEndTime,
        newValue: newEndTime,
      });
    }

    return changes;
  };

  const sendSessionUpdateEmail = async (sessionId: string, changes: any[]) => {
    const session = sessions.find((s) => s.id === sessionId);
    const event = events.find((e) => e.id === session?.eventId);

    if (!session || !session.email) {
      console.log("No session or email found for update notification");
      return { success: false };
    }

    try {
      setSendingEmail((prev) => ({ ...prev, [sessionId]: true }));

      const response = await fetch("/api/send-session-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: session.id,
          facultyEmail: session.email,
          facultyName: session.facultyName,
          sessionTitle: session.title,
          eventName: event?.name || session.eventName || "Conference",
          place: session.place,
          roomName: session.roomName || "TBA",
          startTime: session.startTime,
          endTime: session.endTime,
          status: session.status,
          inviteStatus: session.inviteStatus,
          description: session.description,
          memberDescription: session.memberDescription,
          changes: changes,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          type: "success",
          title: "Email Sent",
          description: `Update notification sent to ${session.facultyName}`,
        });
        return { success: true };
      } else {
        console.error("Email sending failed:", result);
        toast({
          type: "warning",
          title: "Email Failed",
          description: "Session updated but email notification failed to send",
        });
        return { success: false };
      }
    } catch (error) {
      console.error("Error sending update email:", error);
      toast({
        type: "warning",
        title: "Email Error",
        description: "Session updated but email notification failed",
      });
      return { success: false };
    } finally {
      setSendingEmail((prev) => ({ ...prev, [sessionId]: false }));
    }
  };

  const handleEventChange = (eventId: string) => {
    setSelectedEventId(eventId);
    const newUrl = new URL(window.location.href);
    if (eventId === "all") {
      newUrl.searchParams.delete("eventId");
    } else {
      newUrl.searchParams.set("eventId", eventId);
    }
    window.history.replaceState({}, "", newUrl.toString());
  };

  const handleCreateSession = (eventId?: string) => {
    setPreselectedEventId(
      eventId || (selectedEventId !== "all" ? selectedEventId : "")
    );
    setShowCreateModal(true);
  };

  const handleSessionCreated = (session: any) => {
    setShowCreateModal(false);
    setPreselectedEventId("");
    load(false);
    toast({
      type: "success",
      title: "Session Created",
      description: `New session "${
        session.title || "Untitled"
      }" has been created successfully`,
    });
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setPreselectedEventId("");
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete("action");
    window.history.replaceState({}, "", newUrl.toString());
  };

  const filteredSessions = sessions.filter((session) => {
    try {
      const searchTermLower = safeToLowerCase(searchTerm);
      const matchesSearch =
        searchTermLower === "" ||
        safeToLowerCase(session.title).includes(searchTermLower) ||
        safeToLowerCase(session.facultyName).includes(searchTermLower) ||
        safeToLowerCase(session.email).includes(searchTermLower) ||
        safeToLowerCase(session.place).includes(searchTermLower) ||
        safeToLowerCase(session.eventName).includes(searchTermLower) ||
        safeToLowerCase(session.roomName).includes(searchTermLower) ||
        safeToLowerCase(session.memberDescription).includes(searchTermLower);

      const matchesStatus =
        statusFilter === "all" || session.status === statusFilter;
      const matchesInvite =
        inviteFilter === "all" || session.inviteStatus === inviteFilter;

      return matchesSearch && matchesStatus && matchesInvite;
    } catch (error) {
      console.warn("Error filtering session:", session.id, error);
      return true;
    }
  });

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  const onEdit = (id: string) => {
    const row = sessions.find((s) => s.id === id);
    if (!row) return;

    setOriginalValues((prev) => ({ ...prev, [id]: row }));

    setEditing((e) => ({ ...e, [id]: true }));
    setDraft((d) => ({
      ...d,
      [id]: {
        title: row.title || "",
        facultyName: row.facultyName || "",
        email: row.email || "",
        place: row.place || "",
        roomId: row.roomId || "",
        startTime: toInputDateTime(row.startTime),
        endTime: toInputDateTime(row.endTime),
        status: row.status,
        description: row.description || "",
        memberDescription: row.memberDescription || "",
        inviteStatus: row.inviteStatus || "Pending",
      },
    }));
  };

  const onCancel = (id: string) => {
    setEditing((e) => ({ ...e, [id]: false }));
    setDraft((d) => {
      const nd = { ...d };
      delete nd[id];
      return nd;
    });
    setOriginalValues((prev) => {
      const newOriginal = { ...prev };
      delete newOriginal[id];
      return newOriginal;
    });
  };

  const onChangeDraft = (
    id: string,
    field: keyof DraftSession,
    value: string
  ) => {
    setDraft((d) => ({
      ...d,
      [id]: { ...d[id], [field]: value } as DraftSession,
    }));
  };

  const onSave = async (id: string) => {
    const body = draft[id];
    const originalSession = originalValues[id];

    if (!body || !originalSession) return;

    if (!body.title.trim()) {
      toast({
        type: "error",
        title: "Validation Error",
        description: "Session title cannot be empty",
      });
      return;
    }

    if (!body.facultyName.trim()) {
      toast({
        type: "error",
        title: "Validation Error",
        description: "Faculty name cannot be empty",
      });
      return;
    }

    if (!body.email.trim()) {
      toast({
        type: "error",
        title: "Validation Error",
        description: "Email cannot be empty",
      });
      return;
    }

    if (!isValidEmail(body.email)) {
      toast({
        type: "error",
        title: "Validation Error",
        description: "Please enter a valid email address",
      });
      return;
    }

    let isoStartTime: string | null = null;
    let isoEndTime: string | null = null;

    if (body.startTime && body.startTime.length === 16) {
      isoStartTime = new Date(body.startTime).toISOString();
    }
    if (body.endTime && body.endTime.length === 16) {
      isoEndTime = new Date(body.endTime).toISOString();
    }

    if (isoStartTime && isoEndTime) {
      const start = new Date(isoStartTime);
      const end = new Date(isoEndTime);
      if (end <= start) {
        toast({
          type: "error",
          title: "Invalid Time",
          description: "End time must be after start time",
        });
        return;
      }
      const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
      if (durationMinutes < 15) {
        toast({
          type: "error",
          title: "Invalid Duration",
          description: "Session must be at least 15 minutes long",
        });
        return;
      }
    }

    // ✅ CRITICAL FIX: Include memberDescription in payload
    const payload = {
      title: body.title.trim(),
      facultyName: body.facultyName.trim(),
      email: body.email.trim(),
      place: body.place.trim(),
      roomId: body.roomId,
      startTime: isoStartTime,
      endTime: isoEndTime,
      status: body.status,
      inviteStatus: body.inviteStatus,
      description: body.description?.trim(),
      memberDescription: body.memberDescription?.trim() || null,
    };

    console.log("📤 Saving session with payload:", payload);

    const changes = detectChanges(id, originalSession, body);

    setSaving((s) => ({ ...s, [id]: true }));

    try {
      const res = await fetch(`/api/sessions?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast({
          type: "error",
          title: "Update Failed",
          description: err.error || "Failed to update session",
        });
        return;
      }

      const responseData = await res.json();
      console.log("✅ Session updated successfully:", responseData);

      toast({
        type: "success",
        title: "Session Updated",
        description: `Session "${body.title}" has been updated successfully`,
        duration: 4000,
      });

      if (changes.length > 0) {
        toast({
          type: "info",
          title: "Sending Email",
          description: "Sending update notification to faculty member...",
          duration: 3000,
        });

        await sendSessionUpdateEmail(id, changes);
      }

      await load(false);
      onCancel(id);
    } catch (e) {
      console.error("Session update error:", e);
      toast({
        type: "error",
        title: "Update Error",
        description: "Failed to update session. Please try again.",
      });
    } finally {
      setSaving((s) => ({ ...s, [id]: false }));
    }
  };

  const onDelete = async (id: string) => {
    const session = sessions.find((s) => s.id === id);
    const sessionTitle = session?.title || "this session";

    if (
      !confirm(
        `Are you sure you want to delete "${sessionTitle}"? This action cannot be undone.`
      )
    )
      return;

    setDeleting((d) => ({ ...d, [id]: true }));

    try {
      const res = await fetch(`/api/sessions?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast({
          type: "error",
          title: "Delete Failed",
          description: err.error || "Failed to delete session",
        });
        return;
      }

      const responseData = await res.json();
      console.log("✅ Session deleted successfully:", responseData);

      toast({
        type: "success",
        title: "Session Deleted",
        description: `Session "${sessionTitle}" has been deleted successfully`,
      });

      await load(false);
    } catch (e) {
      console.error("Delete error:", e);
      toast({
        type: "error",
        title: "Delete Error",
        description: "Failed to delete session. Please try again.",
      });
    } finally {
      setDeleting((d) => ({ ...d, [id]: false }));
    }
  };

  return (
    <OrganizerLayout>
      <div className="min-h-screen bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                  <Calendar className="h-7 w-7" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                    Session Management
                  </h1>
                  <p className="text-gray-300 text-lg mt-1">
                    Event-based session management with comprehensive editing & notifications
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={() => handleCreateSession()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Session
                </Button>
                <Button
                  onClick={() => load(true)}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  disabled={loading || eventsLoading}
                >
                  <RefreshCw
                    className={`h-4 w-4 mr-2 ${
                      loading || eventsLoading ? "animate-spin" : ""
                    }`}
                  />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Event Selection */}
            <Card className="border-gray-700 bg-gray-900/50 backdrop-blur mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-gray-400" />
                    <label className="text-sm font-medium text-gray-300">
                      Filter by Event
                    </label>
                  </div>
                  <div className="flex-1 max-w-md">
                    {eventsLoading ? (
                      <div className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 flex items-center">
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin text-blue-500" />
                        <span className="text-gray-300">
                          Loading events from database...
                        </span>
                      </div>
                    ) : events.length === 0 ? (
                      <div className="bg-red-900/20 border border-red-600 rounded-lg px-3 py-2 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-red-400" />
                        <span className="text-red-300">
                          No events available. Please create events first.
                        </span>
                      </div>
                    ) : (
                      <Select
                        value={selectedEventId}
                        onValueChange={handleEventChange}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue placeholder="Select an event" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Events</SelectItem>
                          {events.map((event) => (
                            <SelectItem key={event.id} value={event.id}>
                              <div className="flex flex-col">
                                <div className="font-medium">{event.name}</div>
                                <div className="text-xs text-gray-400">
                                  {event.location} • {event.count.sessions} sessions
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  {selectedEvent && (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-gray-300">
                        {selectedEvent.status}
                      </Badge>
                      <span className="text-sm text-gray-400">
                        {selectedEvent.count.sessions} sessions
                      </span>
                    </div>
                  )}
                  {selectedEventId !== "all" && events.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCreateSession(selectedEventId)}
                      className="border-blue-600 text-blue-400 hover:bg-blue-900/20"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Session to Event
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="border-gray-700 bg-gray-900/50 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-900/30">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {
                          filteredSessions.filter(
                            (s) => s.inviteStatus === "Accepted"
                          ).length
                        }
                      </div>
                      <div className="text-sm text-gray-400">Accepted</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-gray-700 bg-gray-900/50 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-yellow-900/30">
                      <Clock className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {
                          filteredSessions.filter(
                            (s) => s.inviteStatus === "Pending"
                          ).length
                        }
                      </div>
                      <div className="text-sm text-gray-400">Pending</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-gray-700 bg-gray-900/50 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-900/30">
                      <Calendar className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {
                          filteredSessions.filter(
                            (s) => s.status === "Confirmed"
                          ).length
                        }
                      </div>
                      <div className="text-sm text-gray-400">Confirmed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-gray-700 bg-gray-900/50 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-900/30">
                      <AlertTriangle className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {
                          filteredSessions.filter(
                            (s) => s.rejectionReason === "TimeConflict"
                          ).length
                        }
                      </div>
                      <div className="text-sm text-gray-400">Time Conflicts</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <Card className="border-gray-700 bg-gray-900/50 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 flex-1 min-w-[300px]">
                    <Search className="h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search sessions, faculty, or member description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                    >
                      <option value="all">All Status</option>
                      <option value="Draft">Draft</option>
                      <option value="Confirmed">Confirmed</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <select
                      value={inviteFilter}
                      onChange={(e) => setInviteFilter(e.target.value as any)}
                      className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 focus:outline-none"
                    >
                      <option value="all">All Invites</option>
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </div>
                  <div className="text-sm text-gray-400">
                    Showing {filteredSessions.length} of {sessions.length} sessions
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          {loading ? (
            <Card className="border-gray-700 bg-gray-900/50 backdrop-blur">
              <CardContent className="p-12 text-center">
                <RefreshCw className="h-12 w-12 animate-spin text-blue-400 mx-auto mb-4" />
                <div className="text-xl text-gray-300 mb-2">Loading Sessions</div>
                <div className="text-gray-400">
                  Fetching session data from database...
                </div>
              </CardContent>
            </Card>
          ) : filteredSessions.length === 0 ? (
            <Card className="border-gray-700 bg-gray-900/50 backdrop-blur">
              <CardContent className="p-12 text-center">
                <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-6" />
                <div className="text-2xl font-semibold text-gray-300 mb-3">
                  No Sessions Found
                </div>
                <div className="text-gray-400 mb-6 max-w-md mx-auto">
                  {selectedEventId !== "all"
                    ? "This event doesn't have any sessions yet. Create the first session to get started."
                    : "No sessions match your current filters. Try adjusting your search criteria or create a new session."}
                </div>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() => handleCreateSession()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Session
                  </Button>
                  {(searchTerm || statusFilter !== "all" || inviteFilter !== "all") && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("all");
                        setInviteFilter("all");
                      }}
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-gray-700 bg-gray-900/50 backdrop-blur shadow-2xl">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-800 border-b border-gray-700">
                      <tr>
                        <th className="text-left p-4 font-semibold text-gray-200 min-w-[250px]">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Session Title
                          </div>
                        </th>
                        {selectedEventId === "all" && (
                          <th className="text-left p-4 font-semibold text-gray-200 min-w-[200px]">
                            <div className="flex items-center gap-2">
                              <CalendarDays className="h-4 w-4" />
                              Event
                            </div>
                          </th>
                        )}
                        <th className="text-left p-4 font-semibold text-gray-200 min-w-[160px]">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Faculty Name
                          </div>
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-200 min-w-[220px]">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email
                          </div>
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-200 min-w-[220px]">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Member Description
                          </div>
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-200 min-w-[150px]">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            Room
                          </div>
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-200 min-w-[200px]">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Schedule
                          </div>
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-200 min-w-[100px]">
                          Status
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-200 min-w-[120px]">
                          Invite Status
                        </th>
                        <th className="text-left p-4 font-semibold text-gray-200 min-w-[140px]">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {filteredSessions.map((s, index) => {
                        const isEditing = editing[s.id];
                        const d = draft[s.id];
                        const isSaving = saving[s.id];
                        const isDeleting = deleting[s.id];
                        const isSendingEmail = sendingEmail[s.id];

                        return (
                          <tr
                            key={s.id}
                            className={`hover:bg-gray-800/50 transition-colors ${
                              isEditing
                                ? "bg-blue-900/10 border border-blue-800/30"
                                : index % 2 === 0
                                ? "bg-gray-900/20"
                                : "bg-gray-900/40"
                            }`}
                          >
                            <td className="p-4 align-top">
                              {isEditing ? (
                                <div className="space-y-2">
                                  <input
                                    className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-sm focus:border-blue-500 focus:outline-none"
                                    placeholder="Session Title"
                                    value={d?.title || ""}
                                    onChange={(e) =>
                                      onChangeDraft(s.id, "title", e.target.value)
                                    }
                                  />
                                  <textarea
                                    className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-xs focus:border-blue-500 focus:outline-none resize-none"
                                    placeholder="Description"
                                    rows={2}
                                    value={d?.description || ""}
                                    onChange={(e) =>
                                      onChangeDraft(s.id, "description", e.target.value)
                                    }
                                  />
                                </div>
                              ) : (
                                <div>
                                  <div className="font-medium text-white">{s.title}</div>
                                  {s.description && (
                                    <div className="text-xs text-gray-400 mt-1 line-clamp-2">
                                      {s.description}
                                    </div>
                                  )}
                                </div>
                              )}
                            </td>

                            {selectedEventId === "all" && (
                              <td className="p-4 align-top">
                                <div className="text-gray-200">{s.eventName || "-"}</div>
                                <div className="text-xs text-gray-400 mt-1">
                                  {s.place || "-"}
                                </div>
                              </td>
                            )}

                            <td className="p-4 align-top">
                              {isEditing ? (
                                <input
                                  className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-sm focus:border-blue-500 focus:outline-none"
                                  placeholder="Faculty Name"
                                  value={d?.facultyName || ""}
                                  onChange={(e) =>
                                    onChangeDraft(s.id, "facultyName", e.target.value)
                                  }
                                />
                              ) : (
                                <div className="text-gray-200">{s.facultyName}</div>
                              )}
                            </td>

                            <td className="p-4 align-top">
                              {isEditing ? (
                                <input
                                  type="email"
                                  className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-sm focus:border-blue-500 focus:outline-none"
                                  placeholder="faculty@example.com"
                                  value={d?.email || ""}
                                  onChange={(e) =>
                                    onChangeDraft(s.id, "email", e.target.value)
                                  }
                                />
                              ) : (
                                <div className="text-gray-300 text-xs">{s.email}</div>
                              )}
                            </td>

                            <td className="p-4 align-top">
                              {isEditing ? (
                                <textarea
                                  className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-xs focus:border-blue-500 focus:outline-none resize-none"
                                  placeholder="Member description..."
                                  rows={2}
                                  value={d?.memberDescription || ""}
                                  onChange={(e) =>
                                    onChangeDraft(s.id, "memberDescription", e.target.value)
                                  }
                                />
                              ) : (
                                <div className="text-xs text-gray-400 line-clamp-2">
                                  {s.memberDescription || "-"}
                                </div>
                              )}
                            </td>

                            <td className="p-4 align-top">
                              {isEditing ? (
                                <select
                                  className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-sm focus:border-blue-500 focus:outline-none"
                                  value={d?.roomId || s.roomId || ""}
                                  onChange={(e) =>
                                    onChangeDraft(s.id, "roomId", e.target.value)
                                  }
                                >
                                  <option value="">Select Room</option>
                                  {rooms.map((r) => (
                                    <option key={r.id} value={r.id}>
                                      {r.name}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <div className="text-gray-200">{s.roomName || "-"}</div>
                              )}
                            </td>

                            <td className="p-4 align-top">
                              {isEditing ? (
                                <div className="space-y-2">
                                  <input
                                    type="datetime-local"
                                    className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-xs focus:border-blue-500 focus:outline-none"
                                    value={d?.startTime || ""}
                                    onChange={(e) =>
                                      onChangeDraft(s.id, "startTime", e.target.value)
                                    }
                                  />
                                  <input
                                    type="datetime-local"
                                    className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-xs focus:border-blue-500 focus:outline-none"
                                    value={d?.endTime || ""}
                                    onChange={(e) =>
                                      onChangeDraft(s.id, "endTime", e.target.value)
                                    }
                                  />
                                </div>
                              ) : s.startTime && s.endTime ? (
                                <div className="text-xs space-y-1">
                                  {s.startTime && (
                                    <div className="text-green-300">
                                      <span className="text-gray-400">Start:</span>{" "}
                                      {s.formattedStartTime}
                                    </div>
                                  )}
                                  {s.endTime && (
                                    <div className="text-red-300">
                                      <span className="text-gray-400">End:</span>{" "}
                                      {s.formattedEndTime}
                                    </div>
                                  )}
                                  {s.duration && (
                                    <div className="text-blue-300">
                                      <span className="text-gray-400">Duration:</span>{" "}
                                      {s.duration}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="text-gray-500 text-xs">Not scheduled</div>
                              )}
                            </td>

                            <td className="p-4 align-top">
                              {isEditing ? (
                                <select
                                  className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-sm focus:border-blue-500 focus:outline-none"
                                  value={d?.status || s.status}
                                  onChange={(e) =>
                                    onChangeDraft(s.id, "status", e.target.value as "Draft" | "Confirmed")
                                  }
                                >
                                  <option value="Draft">Draft</option>
                                  <option value="Confirmed">Confirmed</option>
                                </select>
                              ) : (
                                statusBadge(s.status)
                              )}
                            </td>

                            <td className="p-4 align-top">
                              {isEditing ? (
                                <Select
                                  value={d?.inviteStatus || s.inviteStatus}
                                  onValueChange={(value) =>
                                    onChangeDraft(s.id, "inviteStatus", value as InviteStatus)
                                  }
                                >
                                  <SelectTrigger className="w-full bg-gray-800 border-gray-600 rounded px-2 py-1 text-white text-sm focus:border-blue-500 focus:outline-none">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Pending">
                                      <div className="flex items-center gap-2">
                                        <Clock className="h-3 w-3 text-yellow-400" />
                                        <span>Pending</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="Accepted">
                                      <div className="flex items-center gap-2">
                                        <CheckCircle className="h-3 w-3 text-green-400" />
                                        <span>Accepted</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="Declined">
                                      <div className="flex items-center gap-2">
                                        <X className="h-3 w-3 text-red-400" />
                                        <span>Declined</span>
                                      </div>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              ) : (
                                inviteStatusBadge(s.inviteStatus)
                              )}
                            </td>

                            <td className="p-4 align-top">
                              {isEditing ? (
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => onSave(s.id)}
                                    disabled={isSaving || isSendingEmail}
                                    className="bg-green-600 hover:bg-green-700 text-white h-8 px-2"
                                  >
                                    {isSaving ? (
                                      <RefreshCw className="h-3 w-3 animate-spin" />
                                    ) : (
                                      <Save className="h-3 w-3" />
                                    )}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => onCancel(s.id)}
                                    disabled={isSaving || isSendingEmail}
                                    className="border-gray-600 text-gray-300 hover:bg-gray-800 h-8 px-2"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => onEdit(s.id)}
                                    className="border-blue-600 text-blue-400 hover:bg-blue-900/20 h-8 px-2"
                                  >
                                    <Edit3 className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => onDelete(s.id)}
                                    disabled={isDeleting}
                                    className="border-red-600 text-red-400 hover:bg-red-900/20 h-8 px-2"
                                  >
                                    {isDeleting ? (
                                      <RefreshCw className="h-3 w-3 animate-spin" />
                                    ) : (
                                      <Trash2 className="h-3 w-3" />
                                    )}
                                  </Button>
                                </div>
                              )}
                              {isSendingEmail && (
                                <div className="text-xs text-blue-400 mt-1 flex items-center gap-1">
                                  <Send className="h-3 w-3 animate-pulse" />
                                  Sending email...
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {filteredSessions.length > 0 && (
            <div className="mt-6 text-center text-sm text-gray-400">
              Last updated: {new Date().toLocaleTimeString()} • Auto-refresh every 10 seconds
            </div>
          )}
        </div>

        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Session</DialogTitle>
            </DialogHeader>
            <SessionForm
              eventId={preselectedEventId}
              session={undefined}
              onSuccess={handleSessionCreated}
              onCancel={handleCloseCreateModal}
              halls={[]}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ToastContainer />
    </OrganizerLayout>
  );
};

const SuspenseWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AllSessions />
  </Suspense>
);

export default SuspenseWrapper;
