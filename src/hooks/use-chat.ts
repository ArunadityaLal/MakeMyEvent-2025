import { useState, useEffect, useCallback } from "react";

interface ChatStats {
  unreadCount: number;
  conversationsCount: number;
  recentActivity: number;
}

export const useChat = () => {
  const [stats, setStats] = useState<ChatStats>({
    unreadCount: 0,
    conversationsCount: 0,
    recentActivity: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/chat/stats");
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching chat stats:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  const refreshStats = useCallback(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    refreshStats,
  };
};
