import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { query } from "@/lib/database/connection";
import * as XLSX from "xlsx";

export const dynamic = "force-dynamic";

interface BulkUpdateRow {
  email: string;
  sessionTitle: string;
  name?: string;
  description?: string;
  memberDescription?: string;
  startTime?: string;
  endTime?: string;
  place?: string;
  status?: string;
  institution?: string;
  inviteStatus?: string;
}

interface UpdateResult {
  total: number;
  processed: number;
  created: number;
  updated: number;
  errors: string[];
  skipped: number;
  details: {
    usersCreated: number;
    usersUpdated: number;
    sessionsCreated: number;
    sessionsUpdated: number;
    metadataUpdated: number;
  };
  changes: Array<{
    email: string;
    sessionTitle: string;
    action:
      | "CREATED_USER"
      | "CREATED_SESSION"
      | "UPDATED_USER"
      | "UPDATED_SESSION";
    changes: string[];
  }>;
}

// Helper function to parse date strings
function parseDateTime(dateStr?: string): string | null {
  if (!dateStr) return null;

  try {
    let date: Date;

    if (typeof dateStr === "number") {
      date = new Date((dateStr - 25569) * 86400 * 1000);
    } else {
      const dateString = dateStr.toString().trim();

      if (dateString.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
        date = new Date(dateString);
      } else if (dateString.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
        date = new Date(dateString);
      } else if (dateString.match(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/)) {
        date = new Date(dateString);
      } else {
        date = new Date(dateString);
      }
    }

    if (isNaN(date.getTime())) return null;
    return date.toISOString().slice(0, 19);
  } catch (error) {
    console.warn("Error parsing date:", dateStr, error);
    return null;
  }
}

// Helper function to validate email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Generate UUID for new records
function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ✅ NEW: Helper function to generate temporary password
function generateTemporaryPassword(): string {
  const crypto = require("crypto");

  // Generate a secure random password
  const randomBytes = crypto.randomBytes(4).toString("hex");
  const tempPassword = `Faculty${randomBytes}!`;

  return tempPassword;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("🔄 Starting bulk create/update process...");

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const defaultEventId = formData.get("defaultEventId") as string;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    if (!defaultEventId) {
      return NextResponse.json(
        {
          success: false,
          error: "Default event ID is required. Please select an event first.",
        },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid file type. Please upload Excel files (.xlsx or .xls) only.",
        },
        { status: 400 }
      );
    }

    console.log("📁 Processing file:", file.name, "Size:", file.size);
    console.log("🎯 Default Event ID from selection:", defaultEventId);

    // Validate that the selected event exists
    const eventValidationQuery = `SELECT id, name FROM events WHERE id = $1`;
    const eventValidationResult = await query(eventValidationQuery, [
      defaultEventId,
    ]);

    if (eventValidationResult.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Selected event (ID: ${defaultEventId}) not found. Please select a valid event.`,
        },
        { status: 400 }
      );
    }

    const selectedEventName = eventValidationResult.rows[0].name;
    console.log(`✅ Using event: ${selectedEventName} (${defaultEventId})`);

    // Read Excel file
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array", cellDates: true });
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
      return NextResponse.json(
        { success: false, error: "No sheets found in Excel file." },
        { status: 400 }
      );
    }

    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
      return NextResponse.json(
        { success: false, error: "Worksheet not found in Excel file." },
        { status: 400 }
      );
    }

    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      raw: false,
      dateNF: "yyyy-mm-dd hh:mm:ss",
    }) as any[];

    console.log("📊 Excel data parsed. Rows found:", jsonData.length);

    if (jsonData.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No data found in Excel file. Please check if the file has data and proper headers.",
        },
        { status: 400 }
      );
    }

    console.log("📋 Sample row (first row):", jsonData[0]);

    // Process and validate data
    const bulkData: BulkUpdateRow[] = [];
    const errors: string[] = [];

    for (let i = 0; i < jsonData.length; i++) {
      const row = jsonData[i];
      const rowNum = i + 2;

      // Only email and session title are required
      const email = (
        row.Email ||
        row.email ||
        row.EMAIL ||
        row["Email Address"] ||
        row["Faculty Email"] ||
        row.facultyEmail ||
        ""
      )
        .toString()
        .trim()
        .toLowerCase();

      const sessionTitle = (
        row["Session Title"] ||
        row.sessionTitle ||
        row.title ||
        row.Title ||
        row.session ||
        row.Session ||
        row["Session Name"] ||
        ""
      )
        .toString()
        .trim();

      if (!email) {
        errors.push(`Row ${rowNum}: Email is required`);
        continue;
      }

      if (!sessionTitle) {
        errors.push(`Row ${rowNum}: Session Title is required`);
        continue;
      }

      if (!isValidEmail(email)) {
        errors.push(`Row ${rowNum}: Invalid email format: ${email}`);
        continue;
      }

      // Extract all fields (Event ID comes from modal, not Excel)
      const processedRow: BulkUpdateRow = {
        email: email,
        sessionTitle: sessionTitle,
        name:
          (row.Name || row.name || row.NAME || row["Faculty Name"] || "")
            .toString()
            .trim() || undefined,
        description:
          (row.Description || row.description || row.DESCRIPTION || "")
            .toString()
            .trim() || undefined,
        memberDescription:
          (
            row["Member Description"] ||
            row.memberDescription ||
            row["Member_Description"] ||
            row.member_description ||
            ""
          )
            .toString()
            .trim() || undefined,
        startTime:
          row["Start Time"] ||
          row.startTime ||
          row["start_time"] ||
          row.StartTime ||
          undefined,
        endTime:
          row["End Time"] ||
          row.endTime ||
          row["end_time"] ||
          row.EndTime ||
          undefined,
        place:
          (
            row.Place ||
            row.place ||
            row.PLACE ||
            row.Location ||
            row.location ||
            ""
          )
            .toString()
            .trim() || undefined,
        status:
          (row.Status || row.status || row.STATUS || "").toString().trim() ||
          undefined,
        institution:
          (
            row.Institution ||
            row.institution ||
            row.INSTITUTION ||
            row.Organization ||
            ""
          )
            .toString()
            .trim() || undefined,
        inviteStatus:
          (
            row["Invite Status"] ||
            row.inviteStatus ||
            row["Invite_Status"] ||
            row.invite_status ||
            ""
          )
            .toString()
            .trim() || undefined,
      };

      // Validate and parse dates if provided
      if (processedRow.startTime) {
        const parsedStartTime = parseDateTime(processedRow.startTime);
        if (!parsedStartTime) {
          errors.push(
            `Row ${rowNum}: Invalid start time format: ${processedRow.startTime}`
          );
          continue;
        }
        processedRow.startTime = parsedStartTime;
      }

      if (processedRow.endTime) {
        const parsedEndTime = parseDateTime(processedRow.endTime);
        if (!parsedEndTime) {
          errors.push(
            `Row ${rowNum}: Invalid end time format: ${processedRow.endTime}`
          );
          continue;
        }
        processedRow.endTime = parsedEndTime;
      }

      // Validate date logic if both times provided
      if (processedRow.startTime && processedRow.endTime) {
        const start = new Date(processedRow.startTime + "T00:00:00");
        const end = new Date(processedRow.endTime + "T00:00:00");
        if (end <= start) {
          errors.push(`Row ${rowNum}: End time must be after start time`);
          continue;
        }
      }

      // Validate status if provided
      if (processedRow.status) {
        const validStatuses = ["DRAFT", "CONFIRMED", "PENDING", "CANCELLED"];
        if (!validStatuses.includes(processedRow.status.toUpperCase())) {
          console.warn(
            `Row ${rowNum}: Invalid status "${processedRow.status}", will be ignored`
          );
          processedRow.status = undefined;
        } else {
          processedRow.status = processedRow.status.toUpperCase();
        }
      }

      // Validate invite status if provided
      if (processedRow.inviteStatus) {
        const validInviteStatuses = ["PENDING", "ACCEPTED", "DECLINED"];
        if (
          !validInviteStatuses.includes(processedRow.inviteStatus.toUpperCase())
        ) {
          console.warn(
            `Row ${rowNum}: Invalid invite status "${processedRow.inviteStatus}", will be ignored`
          );
          processedRow.inviteStatus = undefined;
        } else {
          processedRow.inviteStatus = processedRow.inviteStatus.toUpperCase();
        }
      }

      bulkData.push(processedRow);
    }

    console.log(
      `✅ Processed ${bulkData.length} valid rows, ${errors.length} errors`
    );

    if (bulkData.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No valid data to process. Please check your Excel file format.",
          details:
            "Required columns: Email, Session Title. Optional: Name, Description, Member Description, Start Time, End Time, Place, Status, Institution, Invite Status. Event ID is handled by your event selection.",
          errors: errors.slice(0, 10),
        },
        { status: 400 }
      );
    }

    const result: UpdateResult = {
      total: bulkData.length,
      processed: 0,
      created: 0,
      updated: 0,
      errors: [...errors],
      skipped: 0,
      details: {
        usersCreated: 0,
        usersUpdated: 0,
        sessionsCreated: 0,
        sessionsUpdated: 0,
        metadataUpdated: 0,
      },
      changes: [],
    };

    try {
      // Check if user.id is available
      if (!session.user.id) {
        return NextResponse.json(
          {
            success: false,
            error: "User ID not found in session. Please login again.",
          },
          { status: 401 }
        );
      }

      const currentUserId = session.user.id;

      // ✅ FIXED: Process each record individually with proper error handling
      for (const row of bulkData) {
        try {
          // Start individual transaction for each record
          await query("BEGIN");
          await processSingleRecord(row, result, currentUserId, defaultEventId);
          await query("COMMIT");
          console.log(
            `✅ Successfully processed: ${row.email} - ${row.sessionTitle}`
          );
        } catch (recordError) {
          await query("ROLLBACK");
          console.error(
            `❌ Error processing record for ${row.email} - ${row.sessionTitle}:`,
            recordError
          );
          result.errors.push(
            `Error processing ${row.email} - ${row.sessionTitle}: ${
              recordError instanceof Error
                ? recordError.message
                : String(recordError)
            }`
          );
          result.skipped++;
        }
        result.processed++;
      }

      console.log(
        `✅ Bulk create/update completed. Processed: ${result.processed}, Created: ${result.created}, Updated: ${result.updated}, Skipped: ${result.skipped}`
      );
    } catch (error) {
      console.error("❌ Fatal error in bulk create/update:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Fatal error during bulk process",
          details: error instanceof Error ? error.message : String(error),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Bulk process completed for "${selectedEventName}". ${result.created} created, ${result.updated} updated out of ${result.processed} processed.`,
      data: result,
    });
  } catch (error) {
    console.error("❌ Error in bulk create/update:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error during bulk process",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// ✅ COMPLETELY UPDATED: processSingleRecord with proper password handling
async function processSingleRecord(
  row: BulkUpdateRow,
  result: UpdateResult,
  currentUserId: string,
  defaultEventId: string
): Promise<void> {
  const changes: string[] = [];

  // Step 1: Check if user exists
  const userQuery = `SELECT id, name, email, institution FROM users WHERE LOWER(email) = LOWER($1)`;
  const userResult = await query(userQuery, [row.email]);

  let userId: string;
  let userAction: "CREATED_USER" | "UPDATED_USER" | null = null;

  if (userResult.rows.length === 0) {
    // User doesn't exist - CREATE USER
    userId = generateUUID();

    // ✅ FIXED: Include password and role when creating new user
    const createUserQuery = `
      INSERT INTO users (id, name, email, password, role, institution, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
    `;

    // ✅ Generate a temporary password
    const temporaryPassword = generateTemporaryPassword();

    await query(createUserQuery, [
      userId,
      row.name || "Unknown Faculty",
      row.email,
      temporaryPassword, // ✅ FIXED: Provide password (required field)
      "FACULTY", // ✅ Set role as FACULTY by default
      row.institution || null,
    ]);

    result.details.usersCreated++;
    changes.push(`Created new user: ${row.name || "Unknown Faculty"}`);
    changes.push(
      `Temporary password: ${temporaryPassword} (user should reset password)`
    );
    userAction = "CREATED_USER";

    console.log(
      `👤 Created new user: ${row.email} with temporary password: ${temporaryPassword}`
    );
  } else {
    // User exists - UPDATE USER if needed
    const existingUser = userResult.rows[0];
    userId = existingUser.id;

    const userUpdates: string[] = [];
    const userValues: any[] = [];
    let userParamIndex = 1;

    if (row.name && row.name.trim() !== existingUser.name) {
      userUpdates.push(`name = $${userParamIndex++}`);
      userValues.push(row.name.trim());
      changes.push(
        `Updated name: "${existingUser.name}" → "${row.name.trim()}"`
      );
    }

    if (
      row.institution &&
      row.institution.trim() !== existingUser.institution
    ) {
      userUpdates.push(`institution = $${userParamIndex++}`);
      userValues.push(row.institution.trim());
      changes.push(
        `Updated institution: "${
          existingUser.institution || "N/A"
        }" → "${row.institution.trim()}"`
      );
    }

    if (userUpdates.length > 0) {
      userUpdates.push("updated_at = NOW()");
      userValues.push(userId);

      const userUpdateQuery = `UPDATE users SET ${userUpdates.join(
        ", "
      )} WHERE id = $${userParamIndex}`;
      await query(userUpdateQuery, userValues);

      result.details.usersUpdated++;
      userAction = "UPDATED_USER";

      console.log(`👤 Updated user: ${row.email}`);
    }
  }

  // Step 2: Check if session exists for this user and event
  const sessionQuery = `
    SELECT 
      cs.id as session_id,
      cs.title as session_title,
      cs.description,
      cs.start_time,
      cs.end_time,
      cs.event_id,
      sm.id as metadata_id,
      sm.place,
      sm.status,
      sm.invite_status,
      sm.member_description,
      sm.faculty_email
    FROM conference_sessions cs
    LEFT JOIN session_metadata sm ON cs.id = sm.session_id
    WHERE LOWER(cs.title) = LOWER($1) AND cs.event_id = $2 AND cs.id IN (
      SELECT session_id FROM session_metadata WHERE faculty_id = $3
    )
  `;

  const sessionResult = await query(sessionQuery, [
    row.sessionTitle,
    defaultEventId,
    userId,
  ]);

  if (sessionResult.rows.length === 0) {
    // Session doesn't exist - CREATE SESSION
    const sessionId = generateUUID();
    const metadataId = generateUUID();

    // Create conference_session with defaultEventId
    const createSessionQuery = `
      INSERT INTO conference_sessions (id, title, description, start_time, end_time, event_id, created_at, updated_at)
      VALUES ($1, $2, $3, $4::timestamp, $5::timestamp, $6, NOW(), NOW())
    `;

    await query(createSessionQuery, [
      sessionId,
      row.sessionTitle,
      row.description || null,
      row.startTime || null,
      row.endTime || null,
      defaultEventId,
    ]);

    // ✅ FIXED: Create session_metadata with faculty_email (NOT NULL constraint)
    const createMetadataQuery = `
      INSERT INTO session_metadata (
        id, session_id, faculty_id, faculty_email, place, status, invite_status, 
        member_description, created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
    `;

    await query(createMetadataQuery, [
      metadataId,
      sessionId,
      userId,
      row.email, // ✅ FIXED: Include faculty_email (required field)
      row.place || null,
      row.status || "PENDING",
      row.inviteStatus || "PENDING",
      row.memberDescription || null,
    ]);

    result.details.sessionsCreated++;
    result.created++;
    changes.push(
      `Created new session: "${row.sessionTitle}" for selected event`
    );
    if (row.memberDescription) {
      changes.push(`Added member description: "${row.memberDescription}"`);
    }

    result.changes.push({
      email: row.email,
      sessionTitle: row.sessionTitle,
      action: "CREATED_SESSION",
      changes,
    });

    console.log(
      `📊 Created new session for: ${row.email} - ${row.sessionTitle} (Event: ${defaultEventId})`
    );
  } else {
    // Session exists - UPDATE SESSION
    const existingSession = sessionResult.rows[0];
    let sessionUpdated = false;

    // Update conference_sessions table
    const sessionUpdates: string[] = [];
    const sessionValues: any[] = [];
    let sessionParamIndex = 1;

    if (
      row.description !== undefined &&
      row.description !== existingSession.description
    ) {
      sessionUpdates.push(`description = $${sessionParamIndex++}`);
      sessionValues.push(row.description || null);
      changes.push(
        `Updated description: "${existingSession.description || "N/A"}" → "${
          row.description || "N/A"
        }"`
      );
    }

    if (row.startTime && row.startTime !== existingSession.start_time) {
      sessionUpdates.push(`start_time = $${sessionParamIndex++}::timestamp`);
      sessionValues.push(row.startTime);
      changes.push(
        `Updated start time: "${existingSession.start_time}" → "${row.startTime}"`
      );
    }

    if (row.endTime && row.endTime !== existingSession.end_time) {
      sessionUpdates.push(`end_time = $${sessionParamIndex++}::timestamp`);
      sessionValues.push(row.endTime);
      changes.push(
        `Updated end time: "${existingSession.end_time}" → "${row.endTime}"`
      );
    }

    if (sessionUpdates.length > 0) {
      sessionUpdates.push("updated_at = NOW()");
      sessionValues.push(existingSession.session_id);

      const sessionUpdateQuery = `UPDATE conference_sessions SET ${sessionUpdates.join(
        ", "
      )} WHERE id = $${sessionParamIndex}`;
      await query(sessionUpdateQuery, sessionValues);

      result.details.sessionsUpdated++;
      sessionUpdated = true;
    }

    // Update session_metadata table
    const metadataUpdates: string[] = [];
    const metadataValues: any[] = [];
    let metadataParamIndex = 1;

    if (row.place && row.place.trim() !== existingSession.place) {
      metadataUpdates.push(`place = $${metadataParamIndex++}`);
      metadataValues.push(row.place.trim());
      changes.push(
        `Updated place: "${existingSession.place}" → "${row.place.trim()}"`
      );
    }

    if (
      row.status &&
      row.status.trim().toUpperCase() !== existingSession.status
    ) {
      metadataUpdates.push(`status = $${metadataParamIndex++}`);
      metadataValues.push(row.status.trim());
      changes.push(
        `Updated status: "${existingSession.status}" → "${row.status.trim()}"`
      );
    }

    if (
      row.inviteStatus &&
      row.inviteStatus.trim().toUpperCase() !== existingSession.invite_status
    ) {
      metadataUpdates.push(`invite_status = $${metadataParamIndex++}`);
      metadataValues.push(row.inviteStatus.trim());
      changes.push(
        `Updated invite status: "${
          existingSession.invite_status
        }" → "${row.inviteStatus.trim()}"`
      );
    }

    if (
      row.memberDescription !== undefined &&
      row.memberDescription !== existingSession.member_description
    ) {
      metadataUpdates.push(`member_description = $${metadataParamIndex++}`);
      metadataValues.push(row.memberDescription || null);
      changes.push(
        `Updated member description: "${
          existingSession.member_description || "N/A"
        }" → "${row.memberDescription || "N/A"}"`
      );
    }

    // ✅ Ensure faculty_email is always updated if it's null
    if (!existingSession.faculty_email) {
      metadataUpdates.push(`faculty_email = $${metadataParamIndex++}`);
      metadataValues.push(row.email);
      changes.push(`Added missing faculty email: "${row.email}"`);
    }

    if (metadataUpdates.length > 0) {
      metadataUpdates.push("updated_at = NOW()");
      metadataValues.push(existingSession.metadata_id);

      const metadataUpdateQuery = `UPDATE session_metadata SET ${metadataUpdates.join(
        ", "
      )} WHERE id = $${metadataParamIndex}`;
      await query(metadataUpdateQuery, metadataValues);

      result.details.metadataUpdated++;
      sessionUpdated = true;
    }

    if (sessionUpdated) {
      result.updated++;
      result.changes.push({
        email: row.email,
        sessionTitle: row.sessionTitle,
        action: "UPDATED_SESSION",
        changes,
      });

      console.log(`📊 Updated session for: ${row.email} - ${row.sessionTitle}`);
    } else {
      console.log(
        `ℹ️ No session changes needed for: ${row.email} - ${row.sessionTitle}`
      );
    }
  }

  // Add user action to changes if it was the primary action
  if (
    userAction &&
    !result.changes.some(
      (c) => c.email === row.email && c.sessionTitle === row.sessionTitle
    )
  ) {
    result.changes.push({
      email: row.email,
      sessionTitle: row.sessionTitle,
      action: userAction,
      changes,
    });
  }
}

// GET endpoint to download sample template
export async function GET() {
  try {
    // Create sample Excel template - Event ID is handled by modal selection
    const sampleData = [
      {
        Email: "faculty@example.com",
        "Session Title": "Advanced Machine Learning",
        Name: "Dr. John Doe",
        Description: "Workshop on ML algorithms and applications",
        "Member Description":
          "Senior faculty member with 15+ years experience in AI/ML research",
        "Start Time": "2025-11-06 09:00:00",
        "End Time": "2025-11-06 17:00:00",
        Place: "Main Auditorium",
        Status: "CONFIRMED",
        "Invite Status": "ACCEPTED",
        Institution: "University of Technology",
      },
      {
        Email: "newuser@example.com",
        "Session Title": "Data Science Basics",
        Name: "Dr. Jane Smith",
        Description: "Introduction to data science concepts",
        "Member Description": "Data science expert and published researcher",
        "Start Time": "2025-11-07 10:00:00",
        "End Time": "2025-11-07 16:00:00",
        Place: "Conference Room A",
        Status: "DRAFT",
        "Invite Status": "PENDING",
        Institution: "Tech Institute",
      },
      {
        Email: "faculty@example.com",
        "Session Title": "Deep Learning Workshop",
        Name: "Dr. John Doe",
        Description: "Hands-on deep learning session",
        "Member Description":
          "Expert in neural networks and deep learning architectures",
        "Start Time": "2025-11-08 14:00:00",
        "End Time": "2025-11-08 18:00:00",
        Place: "Lab Room 1",
        Status: "CONFIRMED",
        "Invite Status": "ACCEPTED",
        Institution: "University of Technology",
      },
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(sampleData);

    // Set column widths for better readability
    const colWidths = [
      { wch: 30 }, // Email
      { wch: 35 }, // Session Title
      { wch: 20 }, // Name
      { wch: 40 }, // Description
      { wch: 50 }, // Member Description
      { wch: 20 }, // Start Time
      { wch: 20 }, // End Time
      { wch: 20 }, // Place
      { wch: 15 }, // Status
      { wch: 15 }, // Invite Status
      { wch: 25 }, // Institution
    ];
    ws["!cols"] = colWidths;

    // Add header styling
    const headerCells = [
      "A1",
      "B1",
      "C1",
      "D1",
      "E1",
      "F1",
      "G1",
      "H1",
      "I1",
      "J1",
      "K1",
    ];
    headerCells.forEach((cell) => {
      if (ws[cell]) {
        ws[cell].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "366092" } },
        };
      }
    });

    XLSX.utils.book_append_sheet(wb, ws, "Bulk Create Update Template");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

    return new NextResponse(excelBuffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition":
          'attachment; filename="bulk_create_update_template.xlsx"',
      },
    });
  } catch (error) {
    console.error("Error generating template:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate template" },
      { status: 500 }
    );
  }
}
