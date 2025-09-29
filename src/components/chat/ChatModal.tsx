import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  Search,
  Users,
  MessageSquare,
  ArrowLeft,
  Loader2,
  UserPlus,
  Paperclip,
  Image as ImageIcon,
  Download,
  Eye,
  Copy,
  Reply,
  MoreHorizontal,
  CircleDot,
  Smile,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

interface Faculty {
  id: string;
  name: string;
  email: string;
  institution: string;
  designation: string;
  specialization: string;
  role: string;
  createdAt: string;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  senderName: string;
  senderEmail: string;
  receiverName: string;
  receiverEmail: string;
  messageType?: "text" | "image";
  imageUrl?: string;
  imageName?: string;
}

interface Conversation {
  id: string;
  lastMessageAt: string;
  otherUserId: string;
  otherUserName: string;
  otherUserEmail: string;
  otherUserInstitution: string;
  lastMessageContent: string;
  lastMessageSenderId: string;
  unreadCount: number;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  // Main state
  const [view, setView] = useState<"conversations" | "search" | "chat">(
    "conversations"
  );
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [selectedUser, setSelectedUser] = useState<Faculty | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Faculty[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Conversations state
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [conversationsLoading, setConversationsLoading] = useState(false);

  // Messages state
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  // Image upload state
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // UI state
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState<string>("");

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    if (messageInputRef.current) {
      messageInputRef.current.style.height = "auto";
      messageInputRef.current.style.height = `${messageInputRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [newMessage]);

  // Focus message input when chat opens
  useEffect(() => {
    if (view === "chat" && messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, [view]);

  // Reset state when modal closes
  useEffect(() => {
    if (isOpen) {
      fetchConversations();
    } else {
      resetChatState();
    }
  }, [isOpen]);

  const resetChatState = () => {
    setView("conversations");
    setSelectedConversation(null);
    setSelectedUser(null);
    setSearchQuery("");
    setSearchResults([]);
    setMessages([]);
    setNewMessage("");
    setSelectedImage(null);
    setImagePreview(null);
    setShowImageModal(false);
    setModalImageUrl("");
  };

  // Search faculty with debouncing
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        searchFaculty();
      }, 300);
    } else {
      setSearchResults([]);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const fetchConversations = async () => {
    setConversationsLoading(true);
    try {
      const response = await fetch("/api/conversations");
      const data = await response.json();

      if (data.success) {
        setConversations(data.data.conversations);
      } else {
        toast.error("Failed to load conversations");
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
      toast.error("Failed to load conversations");
    } finally {
      setConversationsLoading(false);
    }
  };

  const searchFaculty = async () => {
    if (!searchQuery.trim()) return;

    setSearchLoading(true);
    try {
      const response = await fetch(
        `/api/faculty/search?q=${encodeURIComponent(searchQuery)}&limit=20`
      );
      const data = await response.json();

      if (data.success) {
        setSearchResults(data.data.faculty);
      } else {
        toast.error("Failed to search faculty");
      }
    } catch (error) {
      console.error("Error searching faculty:", error);
      toast.error("Failed to search faculty");
    } finally {
      setSearchLoading(false);
    }
  };

  const fetchMessages = async (otherUserId: string) => {
    setMessagesLoading(true);
    try {
      const response = await fetch(
        `/api/messages?otherUserId=${otherUserId}&limit=50`
      );
      const data = await response.json();

      if (data.success) {
        setMessages(data.data.messages);
        fetchConversations();
      } else {
        toast.error("Failed to load messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImageSelection = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const sendMessage = async () => {
    if (
      (!newMessage.trim() && !selectedImage) ||
      !selectedUser ||
      sendingMessage
    )
      return;

    const messageContent = newMessage.trim();
    setSendingMessage(true);

    try {
      const formData = new FormData();
      formData.append("receiverId", selectedUser.id);

      if (selectedImage) {
        formData.append("image", selectedImage);
        formData.append("messageType", "image");
        if (messageContent) {
          formData.append("content", messageContent);
        } else {
          formData.append("content", "Image");
        }
      } else {
        formData.append("content", messageContent);
        formData.append("messageType", "text");
      }

      const response = await fetch("/api/messages", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [...prev, data.data.message]);
        setNewMessage("");
        clearImageSelection();
        fetchConversations();
        if (messageInputRef.current) {
          messageInputRef.current.style.height = "auto";
        }
      } else {
        toast.error(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setSendingMessage(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startNewChat = (faculty: Faculty) => {
    setSelectedUser(faculty);
    setSelectedConversation(faculty.id);
    setView("chat");
    setMessages([]);
    fetchMessages(faculty.id);
  };

  const openExistingChat = (conversation: Conversation) => {
    const faculty: Faculty = {
      id: conversation.otherUserId,
      name: conversation.otherUserName,
      email: conversation.otherUserEmail,
      institution: conversation.otherUserInstitution,
      designation: "",
      specialization: "",
      role: "FACULTY",
      createdAt: "",
    };

    setSelectedUser(faculty);
    setSelectedConversation(conversation.id);
    setView("chat");
    fetchMessages(conversation.otherUserId);
  };

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else if (diffInHours < 7 * 24) {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }
  };

  const formatLastMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = (now.getTime() - date.getTime()) / (1000 * 60);
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;

    if (diffInMinutes < 1) {
      return "now";
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}m`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else if (diffInDays < 7) {
      return `${Math.floor(diffInDays)}d`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const openImageModal = (imageUrl: string) => {
    setModalImageUrl(imageUrl);
    setShowImageModal(true);
  };

  const downloadImage = (imageUrl: string, imageName: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = imageName || "image";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-200 flex flex-col bg-white">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Faculty Chat</h2>
                  <p className="text-white/80 text-sm">
                    Connect with colleagues
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setView("conversations")}
              className={`flex-1 px-4 py-4 text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                view === "conversations"
                  ? "bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Chats</span>
            </button>
            <button
              onClick={() => setView("search")}
              className={`flex-1 px-4 py-4 text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                view === "search"
                  ? "bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            {/* Conversations View */}
            {view === "conversations" && (
              <div className="h-full overflow-y-auto">
                {conversationsLoading ? (
                  <div className="p-4 space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="animate-pulse flex space-x-3 p-4">
                        <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : conversations.length > 0 ? (
                  conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => openExistingChat(conversation)}
                      className={`p-4 border-b border-gray-50 hover:bg-indigo-50/50 cursor-pointer transition-all duration-200 ${
                        selectedConversation === conversation.id
                          ? "bg-indigo-50"
                          : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                            {conversation.otherUserName.charAt(0).toUpperCase()}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
                          {conversation.unreadCount > 0 && (
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                              {conversation.unreadCount > 9
                                ? "9+"
                                : conversation.unreadCount}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4
                              className={`font-semibold truncate ${
                                conversation.unreadCount > 0
                                  ? "font-bold text-gray-900"
                                  : "text-gray-900"
                              }`}
                            >
                              {conversation.otherUserName}
                            </h4>
                            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                              {formatLastMessageTime(
                                conversation.lastMessageAt
                              )}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate mb-1">
                            {conversation.otherUserInstitution}
                          </p>
                          {conversation.lastMessageContent &&
                            conversation.lastMessageContent !==
                              "No messages yet" && (
                              <p
                                className={`text-sm truncate ${
                                  conversation.unreadCount > 0
                                    ? "font-medium text-gray-700"
                                    : "text-gray-500"
                                }`}
                              >
                                {conversation.lastMessageSenderId === user?.id
                                  ? "You: "
                                  : ""}
                                {conversation.lastMessageContent}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-12 h-12 text-indigo-400" />
                    </div>
                    <p className="font-semibold mb-2 text-lg text-gray-700">
                      No conversations yet
                    </p>
                    <p className="text-sm mb-6 text-gray-500">
                      Start connecting with your colleagues
                    </p>
                    <button
                      onClick={() => setView("search")}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Find Faculty</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Search View */}
            {view === "search" && (
              <div className="h-full flex flex-col">
                {/* Search Input */}
                <div className="p-4 border-b border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search faculty by name, email, or institution..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 focus:bg-white transition-all duration-200"
                    />
                    {searchLoading && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Search Results */}
                <div className="flex-1 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map((faculty) => (
                      <div
                        key={faculty.id}
                        onClick={() => startNewChat(faculty)}
                        className="p-4 border-b border-gray-50 hover:bg-indigo-50/50 cursor-pointer transition-all duration-200"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                            {faculty.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 truncate">
                              {faculty.name}
                            </h4>
                            <p className="text-sm text-gray-600 truncate">
                              {faculty.email}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {faculty.institution}
                            </p>
                            {faculty.designation &&
                              faculty.designation !== "Faculty" && (
                                <p className="text-xs text-gray-400 truncate mt-1">
                                  {faculty.designation}
                                </p>
                              )}
                          </div>
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                              <MessageSquare className="w-5 h-5 text-indigo-600" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : searchQuery && !searchLoading ? (
                    <div className="p-8 text-center text-gray-500">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-10 h-10 text-gray-400" />
                      </div>
                      <p className="font-semibold mb-2">No faculty found</p>
                      <p className="text-sm">
                        Try searching with different keywords
                      </p>
                    </div>
                  ) : !searchQuery ? (
                    <div className="p-8 text-center text-gray-500">
                      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-10 h-10 text-indigo-400" />
                      </div>
                      <p className="font-semibold mb-2">Search Faculty</p>
                      <p className="text-sm">
                        Enter a name, email, or institution to find colleagues
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {view === "chat" && selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setView("conversations")}
                      className="lg:hidden p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                        {selectedUser.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {selectedUser.name}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <CircleDot className="w-3 h-3 text-green-500 mr-1" />
                        {selectedUser.institution}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messagesLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`flex ${
                          i % 2 === 0 ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div className="animate-pulse">
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                              i % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
                            }`}
                          >
                            <div className="h-4 bg-gray-400 rounded w-32 mb-2"></div>
                            <div className="h-3 bg-gray-400 rounded w-16"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : messages.length > 0 ? (
                  messages.map((message, index) => {
                    const isCurrentUser = message.senderId === user?.id;
                    const showAvatar =
                      index === 0 ||
                      messages[index - 1]?.senderId !== message.senderId;

                    return (
                      <div
                        key={message.id}
                        className={`flex ${
                          isCurrentUser ? "justify-end" : "justify-start"
                        } ${showAvatar ? "mt-6" : "mt-1"}`}
                      >
                        <div
                          className={`flex ${
                            isCurrentUser ? "flex-row-reverse" : "flex-row"
                          } items-end space-x-2 max-w-xs lg:max-w-md`}
                        >
                          {showAvatar && !isCurrentUser ? (
                            <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                              {message.senderName.charAt(0).toUpperCase()}
                            </div>
                          ) : !isCurrentUser ? (
                            <div className="w-8 h-8 flex-shrink-0"></div>
                          ) : null}

                          <div className="group relative">
                            <div
                              className={`px-4 py-3 rounded-2xl break-words shadow-sm ${
                                isCurrentUser
                                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-md"
                                  : "bg-white text-gray-900 border border-gray-200 rounded-bl-md"
                              }`}
                            >
                              {message.messageType === "image" ? (
                                <div className="space-y-2">
                                  <img
                                    src={message.imageUrl}
                                    alt={message.imageName || "Image"}
                                    className="max-w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                    onClick={() =>
                                      openImageModal(message.imageUrl!)
                                    }
                                  />
                                  {message.content &&
                                    message.content !== "Image" && (
                                      <p className="text-sm">
                                        {message.content}
                                      </p>
                                    )}
                                </div>
                              ) : (
                                <p className="text-sm">{message.content}</p>
                              )}

                              <div
                                className={`flex items-center justify-end space-x-1 mt-2 ${
                                  isCurrentUser
                                    ? "text-white/80"
                                    : "text-gray-500"
                                }`}
                              >
                                <span className="text-xs">
                                  {formatMessageTime(message.createdAt)}
                                </span>
                                {isCurrentUser && (
                                  <div className="w-4 h-4 flex items-center justify-center">
                                    {message.isRead ? (
                                      <div className="w-3 h-3 rounded-full bg-white/30"></div>
                                    ) : (
                                      <div className="w-3 h-3 rounded-full bg-white/60"></div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Message Actions */}
                            <div
                              className={`opacity-0 group-hover:opacity-100 transition-opacity absolute top-0 ${
                                isCurrentUser
                                  ? "left-0 -translate-x-full"
                                  : "right-0 translate-x-full"
                              } flex space-x-1 bg-white rounded-lg shadow-lg border px-2 py-1`}
                            >
                              <button
                                onClick={() => copyToClipboard(message.content)}
                                className="p-1 hover:bg-gray-100 rounded"
                                title="Copy message"
                              >
                                <Copy className="w-3 h-3 text-gray-500" />
                              </button>
                              {message.messageType === "image" && (
                                <button
                                  onClick={() =>
                                    downloadImage(
                                      message.imageUrl!,
                                      message.imageName || "image"
                                    )
                                  }
                                  className="p-1 hover:bg-gray-100 rounded"
                                  title="Download image"
                                >
                                  <Download className="w-3 h-3 text-gray-500" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-12 h-12 text-indigo-400" />
                      </div>
                      <p className="text-xl font-semibold mb-2 text-gray-700">
                        Start a conversation
                      </p>
                      <p className="text-sm">
                        Send a message to {selectedUser.name}
                      </p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="border-t border-gray-200 p-4 bg-white">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                      <button
                        onClick={clearImageSelection}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">
                        {selectedImage?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedImage
                          ? (selectedImage.size / 1024).toFixed(1)
                          : 0}{" "}
                        KB
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-end space-x-3">
                  <div className="flex space-x-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-3 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all duration-200"
                      title="Attach image"
                    >
                      <ImageIcon className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex-1 relative">
                    <textarea
                      ref={messageInputRef}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={`Message ${selectedUser.name}...`}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none max-h-32 bg-gray-50 focus:bg-white transition-all duration-200"
                      disabled={sendingMessage}
                      rows={1}
                    />
                  </div>

                  <button
                    onClick={sendMessage}
                    disabled={
                      (!newMessage.trim() && !selectedImage) || sendingMessage
                    }
                    className={`p-3 rounded-full transition-all duration-200 flex items-center justify-center ${
                      (newMessage.trim() || selectedImage) && !sendingMessage
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {sendingMessage ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="mt-2 text-xs text-gray-500 text-center">
                  Press Enter to send • Shift+Enter for new line • Max file
                  size: 5MB
                </div>
              </div>
            </>
          ) : (
            /* Default Chat Welcome Screen */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500 max-w-md">
                <div className="relative mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <MessageSquare className="w-16 h-16 text-indigo-400" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Users className="w-8 h-8 text-indigo-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Faculty Messenger
                </h3>
                <p className="text-lg mb-8 text-gray-600">
                  Connect and collaborate with your colleagues
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-3 p-4 bg-white rounded-xl shadow-sm border">
                    <Users className="w-5 h-5 text-indigo-500" />
                    <span className="text-sm">Real-time conversations</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 p-4 bg-white rounded-xl shadow-sm border">
                    <ImageIcon className="w-5 h-5 text-purple-500" />
                    <span className="text-sm">Share images and files</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 p-4 bg-white rounded-xl shadow-sm border">
                    <Search className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Find faculty instantly</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && modalImageUrl && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={modalImageUrl}
              alt="Full size"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={() => downloadImage(modalImageUrl, "image")}
                className="px-4 py-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatModal;
