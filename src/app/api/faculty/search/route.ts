import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { query } from "@/lib/database/connection";

export const dynamic = "force-dynamic";

// GET - Search faculty members
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("q") || "";
    const limit = parseInt(searchParams.get("limit") || "20");
    const currentUserId = session.user.id;

    if (!searchQuery.trim()) {
      return NextResponse.json({
        success: true,
        data: { faculty: [] },
      });
    }

    console.log("🔍 Searching faculty with query:", searchQuery);

    const searchFacultyQuery = `
      SELECT DISTINCT
        u.id,
        u.name,
        u.email,
        COALESCE(u.institution, 'Unknown Institution') as institution,
        COALESCE(u.designation, 'Faculty') as designation,
        COALESCE(u.specialization, 'General') as specialization,
        u.role,
        u.created_at as "createdAt"
      FROM users u
      WHERE u.id != $1 
        AND (u.role = 'FACULTY' OR u.role = 'ORGANIZER')
        AND (
          LOWER(COALESCE(u.name, '')) LIKE LOWER($2) 
          OR LOWER(COALESCE(u.email, '')) LIKE LOWER($2)
          OR LOWER(COALESCE(u.institution, '')) LIKE LOWER($2)
          OR LOWER(COALESCE(u.designation, '')) LIKE LOWER($2)
          OR LOWER(COALESCE(u.specialization, '')) LIKE LOWER($2)
        )
      ORDER BY u.name ASC
      LIMIT $3
    `;

    const searchPattern = `%${searchQuery}%`;
    const result = await query(searchFacultyQuery, [
      currentUserId,
      searchPattern,
      limit,
    ]);

    console.log("✅ Found", result.rows.length, "faculty members");

    return NextResponse.json({
      success: true,
      data: {
        faculty: result.rows,
        query: searchQuery,
      },
    });
  } catch (error) {
    console.error("❌ Error searching faculty:", error);
    return NextResponse.json(
      { success: false, error: "Failed to search faculty" },
      { status: 500 }
    );
  }
}
