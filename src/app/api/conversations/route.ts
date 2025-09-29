import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { query } from "@/lib/database/connection";

export const dynamic = "force-dynamic";

// GET - Fetch all conversations for current user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUserId = session.user.id; // ✅ Now guaranteed to be string

    const conversationsQuery = `
      SELECT 
        c.id,
        c.last_message_at as "lastMessageAt",
        c.user1_unread_count as "user1UnreadCount", 
        c.user2_unread_count as "user2UnreadCount",
        CASE 
          WHEN c.user1_id = $1 THEN c.user2_id 
          ELSE c.user1_id 
        END as "otherUserId",
        CASE 
          WHEN c.user1_id = $1 THEN COALESCE(u2.name, 'Unknown User')
          ELSE COALESCE(u1.name, 'Unknown User')
        END as "otherUserName",
        CASE 
          WHEN c.user1_id = $1 THEN COALESCE(u2.email, 'unknown@email.com')
          ELSE COALESCE(u1.email, 'unknown@email.com')
        END as "otherUserEmail",
        CASE 
          WHEN c.user1_id = $1 THEN COALESCE(u2.institution, 'Unknown Institution')
          ELSE COALESCE(u1.institution, 'Unknown Institution')
        END as "otherUserInstitution",
        COALESCE(m.content, 'No messages yet') as "lastMessageContent",
        m.sender_id as "lastMessageSenderId",
        CASE 
          WHEN c.user1_id = $1 THEN c.user1_unread_count 
          ELSE c.user2_unread_count 
        END as "unreadCount"
      FROM conversations c
      LEFT JOIN users u1 ON c.user1_id = u1.id
      LEFT JOIN users u2 ON c.user2_id = u2.id  
      LEFT JOIN messages m ON c.last_message_id = m.id
      WHERE c.user1_id = $1 OR c.user2_id = $1
      ORDER BY c.last_message_at DESC
    `;

    const result = await query(conversationsQuery, [currentUserId]);

    return NextResponse.json({
      success: true,
      data: {
        conversations: result.rows,
      },
    });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch conversations" },
      { status: 500 }
    );
  }
}
