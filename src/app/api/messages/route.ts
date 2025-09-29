import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { query } from "@/lib/database/connection";
import { writeFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

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

// GET - Fetch messages between two users
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const otherUserId = searchParams.get("otherUserId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = (page - 1) * limit;

    if (!otherUserId) {
      return NextResponse.json(
        { error: "otherUserId is required" },
        { status: 400 }
      );
    }

    const currentUserId = session.user.id;

    // Fetch messages between current user and other user
    const messagesQuery = `
      SELECT 
        m.id,
        m.sender_id as "senderId",
        m.receiver_id as "receiverId", 
        m.content,
        m.is_read as "isRead",
        m.created_at as "createdAt",
        m.updated_at as "updatedAt",
        m.message_type as "messageType",
        m.image_url as "imageUrl",
        m.image_name as "imageName",
        COALESCE(s.name, 'Unknown User') as "senderName",
        COALESCE(s.email, 'unknown@email.com') as "senderEmail",
        COALESCE(r.name, 'Unknown User') as "receiverName", 
        COALESCE(r.email, 'unknown@email.com') as "receiverEmail"
      FROM messages m
      LEFT JOIN users s ON m.sender_id = s.id
      LEFT JOIN users r ON m.receiver_id = r.id
      WHERE (m.sender_id = $1 AND m.receiver_id = $2) 
         OR (m.sender_id = $2 AND m.receiver_id = $1)
      ORDER BY m.created_at DESC
      LIMIT $3 OFFSET $4
    `;

    const result = await query(messagesQuery, [
      currentUserId,
      otherUserId,
      limit,
      offset,
    ]);

    // Mark messages as read where current user is receiver
    const markReadQuery = `
      UPDATE messages 
      SET is_read = true, updated_at = NOW()
      WHERE receiver_id = $1 AND sender_id = $2 AND is_read = false
    `;

    await query(markReadQuery, [currentUserId, otherUserId]);

    // Update conversation unread count
    await updateConversationUnreadCount(currentUserId, otherUserId);

    return NextResponse.json({
      success: true,
      data: {
        messages: result.rows.reverse(), // Reverse to show oldest first
        pagination: {
          page,
          limit,
          hasMore: result.rows.length === limit,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

// POST - Send a new message (text or image)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentUserId = session.user.id;
    const formData = await request.formData();

    const receiverId = formData.get("receiverId") as string;
    const content = formData.get("content") as string;
    const messageType = (formData.get("messageType") as string) || "text";
    const imageFile = formData.get("image") as File;

    if (!receiverId || !content?.trim()) {
      return NextResponse.json(
        { error: "receiverId and content are required" },
        { status: 400 }
      );
    }

    const messageId = `msg_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    let imageUrl = null;
    let imageName = null;

    // Handle image upload
    if (messageType === "image" && imageFile) {
      try {
        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(
          process.cwd(),
          "public",
          "uploads",
          "chat"
        );

        // Generate unique filename
        const fileExtension = imageFile.name.split(".").pop();
        const fileName = `${messageId}_${Date.now()}.${fileExtension}`;
        const filePath = path.join(uploadsDir, fileName);

        // Save file
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        // Set image URL and name
        imageUrl = `/uploads/chat/${fileName}`;
        imageName = imageFile.name;

        console.log("✅ Image uploaded successfully:", imageUrl);
      } catch (uploadError) {
        console.error("❌ Image upload failed:", uploadError);
        return NextResponse.json(
          { success: false, error: "Failed to upload image" },
          { status: 500 }
        );
      }
    }

    // Insert message
    const insertMessageQuery = `
      INSERT INTO messages (id, sender_id, receiver_id, content, message_type, image_url, image_name, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      RETURNING id, created_at as "createdAt"
    `;

    const messageResult = await query(insertMessageQuery, [
      messageId,
      currentUserId,
      receiverId,
      content.trim(),
      messageType,
      imageUrl,
      imageName,
    ]);

    if (!messageResult.rows.length) {
      console.error("❌ Failed to create message");
      return NextResponse.json(
        { success: false, error: "Failed to create message" },
        { status: 500 }
      );
    }

    console.log("✅ Message created successfully");

    // Create or update conversation
    await createOrUpdateConversation(currentUserId, receiverId, messageId);

    // Fetch complete message data for response
    const fetchMessageQuery = `
      SELECT 
        m.id,
        m.sender_id as "senderId",
        m.receiver_id as "receiverId", 
        m.content,
        m.is_read as "isRead",
        m.created_at as "createdAt",
        m.updated_at as "updatedAt",
        m.message_type as "messageType",
        m.image_url as "imageUrl",
        m.image_name as "imageName",
        COALESCE(s.name, 'Unknown User') as "senderName",
        COALESCE(s.email, 'unknown@email.com') as "senderEmail",
        COALESCE(r.name, 'Unknown User') as "receiverName", 
        COALESCE(r.email, 'unknown@email.com') as "receiverEmail"
      FROM messages m
      LEFT JOIN users s ON m.sender_id = s.id
      LEFT JOIN users r ON m.receiver_id = r.id
      WHERE m.id = $1
    `;

    const completeMessage = await query(fetchMessageQuery, [messageId]);

    if (!completeMessage.rows.length) {
      console.error("❌ Failed to fetch complete message");
      return NextResponse.json(
        { success: false, error: "Failed to fetch message data" },
        { status: 500 }
      );
    }

    console.log("✅ Message sent successfully");

    return NextResponse.json({
      success: true,
      data: {
        message: completeMessage.rows[0],
      },
    });
  } catch (error) {
    console.error("❌ Error sending message:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}

// Helper function to create or update conversation
async function createOrUpdateConversation(
  user1Id: string,
  user2Id: string,
  messageId: string
): Promise<void> {
  try {
    console.log(
      "🔄 Creating/updating conversation for users:",
      user1Id,
      user2Id
    );

    const [smallerId, largerId] = [user1Id, user2Id].sort();
    const conversationKey = `${smallerId}:${largerId}`;

    const existingConvQuery = `
      SELECT id, user1_id, user2_id 
      FROM conversations 
      WHERE conversation_key = $1
    `;

    const existing = await query(existingConvQuery, [conversationKey]);

    if (existing.rows.length > 0) {
      console.log("📝 Updating existing conversation");

      const conv = existing.rows[0];
      const isUser1Sender = user1Id === conv.user1_id;

      let updateQuery: string;
      if (isUser1Sender) {
        updateQuery = `
          UPDATE conversations 
          SET 
            last_message_id = $1,
            last_message_at = NOW(),
            user2_unread_count = user2_unread_count + 1,
            updated_at = NOW()
          WHERE conversation_key = $2
        `;
      } else {
        updateQuery = `
          UPDATE conversations 
          SET 
            last_message_id = $1,
            last_message_at = NOW(),
            user1_unread_count = user1_unread_count + 1,
            updated_at = NOW()
          WHERE conversation_key = $2
        `;
      }

      await query(updateQuery, [messageId, conversationKey]);
      console.log("✅ Conversation updated");
    } else {
      console.log("📝 Creating new conversation");

      const conversationId = `conv_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      const insertQuery = `
        INSERT INTO conversations (
          id, user1_id, user2_id, last_message_id, last_message_at,
          user1_unread_count, user2_unread_count, created_at, updated_at, conversation_key
        ) VALUES ($1, $2, $3, $4, NOW(), $5, $6, NOW(), NOW(), $7)
      `;

      const user1UnreadCount = user1Id === smallerId ? 0 : 1;
      const user2UnreadCount = user2Id === largerId ? 0 : 1;

      await query(insertQuery, [
        conversationId,
        smallerId,
        largerId,
        messageId,
        user1UnreadCount,
        user2UnreadCount,
        conversationKey,
      ]);

      console.log("✅ New conversation created");
    }
  } catch (error) {
    console.error("❌ Error in createOrUpdateConversation:", error);
    throw error;
  }
}

// Helper function to update unread count
async function updateConversationUnreadCount(
  currentUserId: string,
  otherUserId: string
): Promise<void> {
  try {
    const [smallerId, largerId] = [currentUserId, otherUserId].sort();
    const conversationKey = `${smallerId}:${largerId}`;

    const isCurrentUserUser1 = currentUserId === smallerId;

    let updateQuery: string;
    if (isCurrentUserUser1) {
      updateQuery = `
        UPDATE conversations 
        SET user1_unread_count = 0, updated_at = NOW()
        WHERE conversation_key = $1
      `;
    } else {
      updateQuery = `
        UPDATE conversations 
        SET user2_unread_count = 0, updated_at = NOW()
        WHERE conversation_key = $1
      `;
    }

    await query(updateQuery, [conversationKey]);
  } catch (error) {
    console.error("❌ Error in updateConversationUnreadCount:", error);
  }
}
