import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { query } from "@/lib/database/connection";

export const dynamic = "force-dynamic";

// GET - Get chat statistics for current user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUserId = session.user.id;

    // Get total unread messages count
    const unreadQuery = `
      SELECT COUNT(*) as unread_count
      FROM messages 
      WHERE receiver_id = $1 AND is_read = false
    `;

    const unreadResult = await query(unreadQuery, [currentUserId]);

    // Get total conversations count
    const conversationsQuery = `
      SELECT COUNT(*) as conversations_count
      FROM conversations 
      WHERE user1_id = $1 OR user2_id = $1
    `;

    const conversationsResult = await query(conversationsQuery, [
      currentUserId,
    ]);

    // ✅ Fixed: Get recent activity (messages sent/received in last 7 days)
    const activityQuery = `
      SELECT COUNT(*) as recent_activity
      FROM messages 
      WHERE (sender_id = $1 OR receiver_id = $1)
        AND created_at >= NOW() - INTERVAL '7 days'
    `;

    const activityResult = await query(activityQuery, [currentUserId]);

    return NextResponse.json({
      success: true,
      data: {
        unreadCount: parseInt(unreadResult.rows[0]?.unread_count || "0"),
        conversationsCount: parseInt(
          conversationsResult.rows[0]?.conversations_count || "0"
        ),
        recentActivity: parseInt(
          activityResult.rows[0]?.recent_activity || "0"
        ),
      },
    });
  } catch (error) {
    console.error("Error fetching chat stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch chat stats" },
      { status: 500 }
    );
  }
}
