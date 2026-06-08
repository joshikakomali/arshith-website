const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

let jwtClient = null;

try {
  const credentialsPath = path.join(
    __dirname,
    process.env.GOOGLE_APPLICATION_CREDENTIALS || "arshith-website-002840d82e71.json"
  );

  if (fs.existsSync(credentialsPath)) {
    const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));
    jwtClient = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ["https://www.googleapis.com/auth/calendar"]
    });
    console.log("[CALENDAR] Google Calendar JWT Client successfully initialized.");
  } else {
    console.warn("[CALENDAR] Google credentials file not found at:", credentialsPath);
  }
} catch (error) {
  console.error("[CALENDAR] Failed to initialize JWT client:", error.message);
}

/**
 * Creates a Google Calendar Event with an auto-generated Google Meet video conference.
 * Automatically adds the candidate and recruiter as attendees and sends email updates.
 */
async function createCalendarEvent({
  candidateName,
  candidateEmail,
  date,
  startTime,
  endTime,
  candidatePhone,
  roleApplied,
  lobbyUrl,
  meetLink
}) {
  if (!jwtClient) {
    console.warn("[CALENDAR] Skipping event creation: Google Calendar JWT client not initialized.");
    return null;
  }

  const calendar = google.calendar({ version: "v3", auth: jwtClient });
  const recruiterEmail = process.env.RECRUITER_EMAIL || "joshikakomali@gmail.com";
  const finalMeetLink = meetLink || process.env.MEET_LINK_TEMPLATE || "https://meet.google.com/wko-xhsi-dei";
  // Format Date to YYYY-MM-DD
  let dateStr = date;
  if (date instanceof Date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    dateStr = `${y}-${m}-${d}`;
  } else if (typeof date === "string") {
    if (/^\d{4}-\d{2}-\d{2}/.test(date)) {
      dateStr = date.substring(0, 10);
    } else {
      const parsed = new Date(date);
      if (!isNaN(parsed.getTime())) {
        const y = parsed.getFullYear();
        const m = String(parsed.getMonth() + 1).padStart(2, "0");
        const d = String(parsed.getDate()).padStart(2, "0");
        dateStr = `${y}-${m}-${d}`;
      }
    }
  }

  // Build standard RFC3339 datetime strings (format: YYYY-MM-DDTHH:MM:SS) with +05:30 offset
  const startDateTime = `${dateStr}T${startTime}+05:30`;
  const endDateTime = `${dateStr}T${endTime}+05:30`;

  const event = {
    summary: `Interview: ${candidateName} - Arshith Group`,
    location: finalMeetLink,
    description: `Candidate Details:\n- Name: ${candidateName}\n- Email: ${candidateEmail}\n- Phone: ${candidatePhone || "N/A"}\n- Role Applied: ${roleApplied || "N/A"}\n\nAccess Details:\n- Lobby Link: ${lobbyUrl || "N/A"}\n- Join Google Meet: ${finalMeetLink}\n\nEnsure camera and microphone are functional before joining.`,
    start: {
      dateTime: startDateTime,
      timeZone: "Asia/Kolkata"
    },
    end: {
      dateTime: endDateTime,
      timeZone: "Asia/Kolkata"
    }
  };

  try {
    console.log(`[CALENDAR] Creating event on calendar: ${recruiterEmail} for ${candidateEmail}`);
    const response = await calendar.events.insert({
      calendarId: recruiterEmail,
      resource: event,
      sendUpdates: "all"
    });

    const createdEvent = response.data;
    console.log("[CALENDAR] Google Event created:", createdEvent.htmlLink);

    return {
      eventId: createdEvent.id,
      htmlLink: createdEvent.htmlLink,
      meetLink: finalMeetLink
    };
  } catch (error) {
    console.error("[CALENDAR] Error creating Google Calendar event:", error.message);
    return null;
  }
}

module.exports = {
  createCalendarEvent
};
