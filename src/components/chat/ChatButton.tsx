import React, { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatButtonProps {
  onClick: () => void;
  className?: string;
}

interface ChatStats {
  unreadCount: number;
  conversationsCount: number;
  recentActivity: number;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, className = "" }) => {
  const [stats, setStats] = useState<ChatStats>({
    unreadCount: 0,
    conversationsCount: 0,
    recentActivity: 0,
  });

  const fetchChatStats = async () => {
    try {
      const response = await fetch("/api/chat/stats");
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching chat stats:", error);
    }
  };

  useEffect(() => {
    fetchChatStats();

    // Refresh stats every 30 seconds
    const interval = setInterval(fetchChatStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Button
      onClick={onClick}
      variant="outline"
      className={`relative border-green-600 text-green-600 hover:bg-green-50 ${className}`}
    >
      <MessageSquare className="h-4 w-4 mr-2" />
      Faculty Chat
      {stats.unreadCount > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
          {stats.unreadCount > 9 ? "9+" : stats.unreadCount}
        </div>
      )}
    </Button>
  );
};

export default ChatButton;
