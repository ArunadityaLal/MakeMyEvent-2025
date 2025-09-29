import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  Search,
  Users,
  MessageSquare,
  Clock,
  User,
  CheckCircle,
  Circle,
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Loader2,
  UserPlus,
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

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus message input when chat opens
  useEffect(() => {
    if (view === "chat" && messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, [view]);

  // Fetch conversations on modal open
  useEffect(() => {
    if (isOpen) {
      fetchConversations();
    } else {
      // Reset state when closing
      setView("conversations");
      setSelectedConversation(null);
      setSelectedUser(null);
      setSearchQuery("");
      setSearchResults([]);
      setMessages([]);
      setNewMessage("");
    }
  }, [isOpen]);

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
        // Refresh conversations to update unread counts
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

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser || sendingMessage) return;

    const messageContent = newMessage.trim();
    setSendingMessage(true);
    setNewMessage(""); // Clear input immediately for better UX

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiverId: selectedUser.id,
          content: messageContent,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [...prev, data.data.message]);
        fetchConversations(); // Refresh conversations
        // Remove toast for better UX - too many notifications
        // toast.success('Message sent');
      } else {
        setNewMessage(messageContent); // Restore message on error
        toast.error(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setNewMessage(messageContent); // Restore message on error
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
    setMessages([]); // Clear previous messages
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
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
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
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInDays < 7) {
      return `${Math.floor(diffInDays)}d ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-6 h-6" />
                <div>
                  <h2 className="text-xl font-bold">Faculty Chat</h2>
                  <p className="text-blue-100 text-sm">
                    Connect with colleagues
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 bg-white">
            <button
              onClick={() => setView("conversations")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
                view === "conversations"
                  ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Chats</span>
            </button>
            <button
              onClick={() => setView("search")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
                view === "search"
                  ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
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
              <div className="h-full overflow-y-auto bg-white">
                {conversationsLoading ? (
                  <div className="p-4 space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="animate-pulse flex space-x-3 p-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
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
                      className="p-4 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                            {conversation.otherUserName.charAt(0).toUpperCase()}
                          </div>
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
                              className={`font-medium truncate ${
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
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p className="font-medium mb-2 text-lg">
                      No conversations yet
                    </p>
                    <p className="text-sm mb-4">
                      Start chatting with your colleagues
                    </p>
                    <button
                      onClick={() => setView("search")}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
              <div className="h-full flex flex-col bg-white">
                {/* Search Input */}
                <div className="p-4 border-b border-gray-200">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search faculty by name, email, or institution..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {searchLoading && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
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
                        className="p-4 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
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
                            <MessageSquare className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : searchQuery && !searchLoading ? (
                    <div className="p-8 text-center text-gray-500">
                      <Search className="w-16 h-16 mx-auto mb-4 opacity-30" />
                      <p className="font-medium mb-2">No faculty found</p>
                      <p className="text-sm">
                        Try searching with different keywords
                      </p>
                    </div>
                  ) : !searchQuery ? (
                    <div className="p-8 text-center text-gray-500">
                      <Search className="w-16 h-16 mx-auto mb-4 opacity-30" />
                      <p className="font-medium mb-2">Search Faculty</p>
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
        <div className="flex-1 flex flex-col">
          {view === "chat" && selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setView("conversations")}
                    className="lg:hidden p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {selectedUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedUser.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedUser.institution}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                    title="Voice Call (Coming Soon)"
                  >
                    <Phone className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                    title="Video Call (Coming Soon)"
                  >
                    <Video className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                    title="More Options"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
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
                        } ${showAvatar ? "mt-4" : "mt-1"}`}
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

                          <div
                            className={`px-4 py-2 rounded-2xl break-words ${
                              isCurrentUser
                                ? "bg-blue-600 text-white rounded-br-md"
                                : "bg-white text-gray-900 border border-gray-200 rounded-bl-md"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <div
                              className={`flex items-center justify-end space-x-1 mt-1 ${
                                isCurrentUser
                                  ? "text-blue-200"
                                  : "text-gray-500"
                              }`}
                            >
                              <span className="text-xs">
                                {formatMessageTime(message.createdAt)}
                              </span>
                              {isCurrentUser &&
                                (message.isRead ? (
                                  <CheckCircle className="w-3 h-3" />
                                ) : (
                                  <Circle className="w-3 h-3" />
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MessageSquare className="w-20 h-20 mx-auto mb-4 opacity-30" />
                      <p className="text-xl font-medium mb-2">
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

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-end space-x-3">
                  <div className="flex-1 relative">
                    <input
                      ref={messageInputRef}
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={`Message ${selectedUser.name}...`}
                      className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12 resize-none"
                      disabled={sendingMessage}
                    />
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim() || sendingMessage}
                    className={`p-3 rounded-full transition-all duration-200 flex items-center justify-center ${
                      newMessage.trim() && !sendingMessage
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
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
                  Press Enter to send, Shift+Enter for new line
                </div>
              </div>
            </>
          ) : (
            /* Default Chat Welcome Screen */
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
              <div className="text-center text-gray-500 max-w-md">
                <div className="relative mb-8">
                  <MessageSquare className="w-32 h-32 mx-auto opacity-20" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Users className="w-16 h-16 text-blue-400 opacity-60" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-700 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Faculty Messenger
                </h3>
                <p className="text-lg mb-8 text-gray-600">
                  Connect and collaborate with your colleagues
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span>View your conversations in the sidebar</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                    <Search className="w-5 h-5 text-green-500" />
                    <span>Search for faculty to start a new chat</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                    <MessageSquare className="w-5 h-5 text-purple-500" />
                    <span>Real-time messaging with read receipts</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
