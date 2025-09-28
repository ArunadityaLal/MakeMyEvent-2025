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
  startTime?: string;
  endTime?: string;
  place?: string;
  status?: string;
  institution?: string;
}

interface UpdateResult {
  total: number;
  processed: number;
  updated: number;
  errors: string[];
  skipped: number;
  details: {
    usersUpdated: number;
    sessionsUpdated: number;
    metadataUpdated: number;
  };
  changes: Array<{
    email: string;
    sessionTitle: string;
    changes: string[];
  }>;
}

// Helper function to parse date strings
function parseDateTime(dateStr?: string): string | null {
  if (!dateStr) return null;

  try {
    // Handle various date formats
    let date: Date;

    // Handle Excel date formats
    if (typeof dateStr === "number") {
      // Excel date as number (days since 1900-01-01)
      date = new Date((dateStr - 25569) * 86400 * 1000);
    } else {
      // String formats
      const dateString = dateStr.toString().trim();

      // Common formats to handle
      if (dateString.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
        // YYYY-MM-DD HH:MM:SS
        date = new Date(dateString);
      } else if (dateString.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
        // ISO format
        date = new Date(dateString);
      } else if (dateString.match(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/)) {
        // MM/DD/YYYY HH:MM
        date = new Date(dateString);
      } else {
        // Try generic parsing
        date = new Date(dateString);
      }
    }

    if (isNaN(date.getTime())) return null;

    // Convert to ISO string without timezone
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

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("🔄 Starting bulk update process...");

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
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

    // Read Excel file
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array", cellDates: true });
    const sheetName = workbook.SheetNames[0];
    if (!sheetName) {
      return NextResponse.json(
        {
          success: false,
          error: "No sheets found in Excel file.",
        },
        { status: 400 }
      );
    }
    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
      return NextResponse.json(
        {
          success: false,
          error: "Worksheet not found in Excel file.",
        },
        { status: 400 }
      );
    }

    // Convert to JSON with proper handling of dates
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      raw: false, // This helps with date formatting
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

    // Log first row to see available columns
    console.log("📋 Sample row (first row):", jsonData[0]);

    // Process and validate data
    const bulkData: BulkUpdateRow[] = [];
    const errors: string[] = [];

    for (let i = 0; i < jsonData.length; i++) {
      const row = jsonData[i];
      const rowNum = i + 2; // Excel row number (accounting for header)

      // Get email and session title (both required as composite key)
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
        errors.push(
          `Row ${rowNum}: Email is required (found columns: ${Object.keys(
            row
          ).join(", ")})`
        );
        continue;
      }

      if (!sessionTitle) {
        errors.push(
          `Row ${rowNum}: Session Title is required (found columns: ${Object.keys(
            row
          ).join(", ")})`
        );
        continue;
      }

      if (!isValidEmail(email)) {
        errors.push(`Row ${rowNum}: Invalid email format: ${email}`);
        continue;
      }

      // Extract other updatable fields with flexible column naming
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
            "Required columns: Email, Session Title. Optional: Name, Description, Start Time, End Time, Place, Status, Institution",
          errors: errors.slice(0, 10), // Show first 10 errors
        },
        { status: 400 }
      );
    }

    // Start transaction
    await query("BEGIN");

    const result: UpdateResult = {
      total: bulkData.length,
      processed: 0,
      updated: 0,
      errors: [...errors],
      skipped: 0,
      details: {
        usersUpdated: 0,
        sessionsUpdated: 0,
        metadataUpdated: 0,
      },
      changes: [],
    };

    try {
      for (const row of bulkData) {
        await processSingleUpdate(row, result);
        result.processed++;
      }

      await query("COMMIT");
      console.log("✅ Bulk update completed successfully");
    } catch (error) {
      await query("ROLLBACK");
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: `Bulk update completed. ${result.updated} records updated out of ${result.processed} processed.`,
      data: result,
    });
  } catch (error) {
    console.error("❌ Error in bulk update:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error during bulk update",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

async function processSingleUpdate(
  row: BulkUpdateRow,
  result: UpdateResult
): Promise<void> {
  try {
    const changes: string[] = [];

    // ✅ NEW APPROACH: Find session by email + session title composite key
    const sessionQuery = `
      SELECT 
        cs.id as session_id,
        cs.title as session_title,
        cs.description,
        cs.start_time,
        cs.end_time,
        sm.place,
        sm.status,
        sm.id as metadata_id,
        sm.faculty_id,
        u.id as user_id,
        u.name as user_name,
        u.email as user_email,
        u.institution as user_institution
      FROM session_metadata sm
      JOIN conference_sessions cs ON sm.session_id = cs.id
      JOIN users u ON sm.faculty_id = u.id
      WHERE LOWER(u.email) = LOWER($1) AND LOWER(cs.title) = LOWER($2)
    `;

    const sessionResult = await query(sessionQuery, [
      row.email,
      row.sessionTitle,
    ]);

    if (sessionResult.rows.length === 0) {
      result.errors.push(
        `No session found for email: ${row.email} with session title: "${row.sessionTitle}"`
      );
      result.skipped++;
      return;
    }

    if (sessionResult.rows.length > 1) {
      result.errors.push(
        `Multiple sessions found for email: ${row.email} with session title: "${row.sessionTitle}". Skipping to avoid ambiguity.`
      );
      result.skipped++;
      return;
    }

    const session = sessionResult.rows[0];

    // 1. Update user table if name or institution changed
    const userUpdates: string[] = [];
    const userValues: any[] = [];
    let userParamIndex = 1;

    if (row.name && row.name.trim() !== session.user_name) {
      userUpdates.push(`name = $${userParamIndex++}`);
      userValues.push(row.name.trim());
      changes.push(`Name: "${session.user_name}" → "${row.name.trim()}"`);
    }

    if (
      row.institution &&
      row.institution.trim() !== session.user_institution
    ) {
      userUpdates.push(`institution = $${userParamIndex++}`);
      userValues.push(row.institution.trim());
      changes.push(
        `Institution: "${
          session.user_institution || "N/A"
        }" → "${row.institution.trim()}"`
      );
    }

    if (userUpdates.length > 0) {
      userUpdates.push("updated_at = NOW()");
      userValues.push(session.user_id);

      const userUpdateQuery = `
        UPDATE users 
        SET ${userUpdates.join(", ")} 
        WHERE id = $${userParamIndex}
      `;

      await query(userUpdateQuery, userValues);
      result.details.usersUpdated++;
      console.log(`👤 Updated user: ${row.email}`);
    }

    // 2. Update conference_sessions table
    const sessionUpdates: string[] = [];
    const sessionValues: any[] = [];
    let sessionParamIndex = 1;

    if (
      row.description !== undefined &&
      row.description !== session.description
    ) {
      sessionUpdates.push(`description = $${sessionParamIndex++}`);
      sessionValues.push(row.description || null);
      changes.push(
        `Description: "${session.description || "N/A"}" → "${
          row.description || "N/A"
        }"`
      );
    }

    if (row.startTime && row.startTime !== session.start_time) {
      sessionUpdates.push(`start_time = $${sessionParamIndex++}::timestamp`);
      sessionValues.push(row.startTime);
      changes.push(`Start Time: "${session.start_time}" → "${row.startTime}"`);
    }

    if (row.endTime && row.endTime !== session.end_time) {
      sessionUpdates.push(`end_time = $${sessionParamIndex++}::timestamp`);
      sessionValues.push(row.endTime);
      changes.push(`End Time: "${session.end_time}" → "${row.endTime}"`);
    }

    // Update conference_sessions if needed
    if (sessionUpdates.length > 0) {
      sessionUpdates.push("updated_at = NOW()");
      sessionValues.push(session.session_id);

      const sessionUpdateQuery = `
        UPDATE conference_sessions 
        SET ${sessionUpdates.join(", ")} 
        WHERE id = $${sessionParamIndex}
      `;

      await query(sessionUpdateQuery, sessionValues);
      result.details.sessionsUpdated++;
    }

    // 3. Update session_metadata table
    const metadataUpdates: string[] = [];
    const metadataValues: any[] = [];
    let metadataParamIndex = 1;

    if (row.place && row.place.trim() !== session.place) {
      metadataUpdates.push(`place = $${metadataParamIndex++}`);
      metadataValues.push(row.place.trim());
      changes.push(`Place: "${session.place}" → "${row.place.trim()}"`);
    }

    if (row.status && row.status.trim().toUpperCase() !== session.status) {
      metadataUpdates.push(`status = $${metadataParamIndex++}`);
      metadataValues.push(row.status.trim());
      changes.push(`Status: "${session.status}" → "${row.status.trim()}"`);
    }

    // Update session_metadata if needed
    if (metadataUpdates.length > 0) {
      metadataUpdates.push("updated_at = NOW()");
      metadataValues.push(session.metadata_id);

      const metadataUpdateQuery = `
        UPDATE session_metadata 
        SET ${metadataUpdates.join(", ")} 
        WHERE id = $${metadataParamIndex}
      `;

      await query(metadataUpdateQuery, metadataValues);
      result.details.metadataUpdated++;
    }

    if (changes.length > 0) {
      result.changes.push({
        email: row.email,
        sessionTitle: row.sessionTitle,
        changes,
      });
      result.updated++;
      console.log(`📊 Updated session for: ${row.email} - ${row.sessionTitle}`);
    } else {
      console.log(
        `ℹ️ No changes needed for: ${row.email} - ${row.sessionTitle}`
      );
    }
  } catch (error) {
    console.error(
      `❌ Error processing row for ${row.email} - ${row.sessionTitle}:`,
      error
    );
    result.errors.push(
      `Error updating ${row.email} - ${row.sessionTitle}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

// GET endpoint to download sample template
export async function GET() {
  try {
    // Create sample Excel template with required fields
    const sampleData = [
      {
        Email: "faculty@example.com",
        "Session Title": "Advanced Machine Learning",
        Name: "Dr. John Doe",
        Description: "Workshop on ML algorithms and applications",
        "Start Time": "2025-11-06 09:00:00",
        "End Time": "2025-11-06 17:00:00",
        Place: "Main Auditorium",
        Status: "CONFIRMED",
        Institution: "University of Technology",
      },
      {
        Email: "another@example.com",
        "Session Title": "Data Science Basics",
        Name: "Dr. Jane Smith",
        Description: "Introduction to data science concepts",
        "Start Time": "2025-11-07 10:00:00",
        "End Time": "2025-11-07 16:00:00",
        Place: "Conference Room A",
        Status: "DRAFT",
        Institution: "Tech Institute",
      },
      {
        Email: "faculty@example.com",
        "Session Title": "Deep Learning Workshop",
        Name: "Dr. John Doe",
        Description: "Hands-on deep learning session",
        "Start Time": "2025-11-08 14:00:00",
        "End Time": "2025-11-08 18:00:00",
        Place: "Lab Room 1",
        Status: "CONFIRMED",
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
      { wch: 20 }, // Start Time
      { wch: 20 }, // End Time
      { wch: 20 }, // Place
      { wch: 15 }, // Status
      { wch: 25 }, // Institution
    ];
    ws["!cols"] = colWidths;

    // Add header styling (optional)
    const headerCells = ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"];
    headerCells.forEach((cell) => {
      if (ws[cell]) {
        ws[cell].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "366092" } },
        };
      }
    });

    XLSX.utils.book_append_sheet(wb, ws, "Bulk Update Template");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

    return new NextResponse(excelBuffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition":
          'attachment; filename="bulk_update_template.xlsx"',
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
