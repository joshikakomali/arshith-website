const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const db = require("./database");
const emailTemplates = require("./emailTemplates");
const googleCalendar = require("./googleCalendar");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

/* MIDDLEWARE */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

/* CREATE UPLOADS FOLDER IF NOT EXISTS */
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* EXPOSE UPLOADS STATICALLY */
app.use("/uploads", express.static(uploadDir));

/* MULTER CONFIGURATION FOR PDF UPLOADS */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

/* NODEMAILER TRANSPORTER */
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || "doorzyconnect@gmail.com",
    pass: process.env.EMAIL_PASS || "doorzyconnect@gmail.com"
  }
});

// Helper to format date locally without timezone shift
function formatDateLocal(dateVal) {
  if (!dateVal) return "";
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return String(dateVal);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Helper to generate a valid-formatted Google Meet link (xxx-xxxx-xxx)
function generateMeetLink() {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const gen = (len) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `https://meet.google.com/${gen(3)}-${gen(4)}-${gen(3)}`;
}

// Helper to send email (fails gracefully with detailed console logging)
async function sendNotificationEmail({ to, subject, message, html, icalEvent }) {
  console.log(`\n================== EMAIL OUTBOX ==================`);
  console.log(`To:      ${to}`);
  console.log(`Subject: ${subject}`);
  if (html) {
    console.log(`HTML Email: YES (Check console/client for templates)`);
  } else {
    console.log(`Message:\n${message}`);
  }
  if (icalEvent) {
    console.log(`Calendar Invite: YES (.ics attachment included)`);
  }
  console.log(`==================================================\n`);

  try {
    const mailOptions = {
      from: `"Arshith Group" <${process.env.EMAIL_USER || "doorzyconnect@gmail.com"}>`,
      to,
      subject,
      text: message,
      html: html || undefined
    };

    if (icalEvent) {
      mailOptions.alternatives = [
        {
          contentType: "text/calendar; charset=utf-8; method=REQUEST",
          content: icalEvent
        }
      ];
      mailOptions.attachments = [
        {
          filename: "invite.ics",
          content: icalEvent,
          contentType: "application/ics"
        }
      ];
    } else {
      mailOptions.attachments = [];
    }

    if (html) {
      mailOptions.attachments.push({
        filename: 'logo.png',
        path: path.join(__dirname, '../public/assests/logo.png'),
        cid: 'logo'
      });
    }
    await transporter.sendMail(mailOptions);
    console.log(`[EMAIL SUCCESS] Email sent to ${to}`);
  } catch (error) {
    console.warn(`[EMAIL WARNING] Could not send email via SMTP: ${error.message}`);
    console.log(`[EMAIL INFO] Continuing backend workflow despite email SMTP failure.`);
  }
}

/* MIDDLEWARE TO PROTECT RECRUITER ROUTES */
const protectRecruiter = (req, res, next) => {
  const passcode = req.headers["x-passcode"] || req.query.passcode;
  const correctPasscode = process.env.RECRUITER_PASSWORD || "admin123";
  if (passcode === correctPasscode) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized: Invalid recruiter passcode" });
  }
};

/* API ENDPOINTS */

// 1. POST /apply - Submit internship application
app.post("/apply", upload.single("resume"), async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      college_name,
      degree,
      cgpa,
      role_applied,
      duration,
      mode,
      available_immediately
    } = req.body;

    if (!name || !email || !phone || !college_name || !degree || !cgpa || !role_applied || !duration || !mode || !available_immediately) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const resumeUrl = req.file ? `/uploads/${req.file.filename}` : null;
    if (!resumeUrl) {
      return res.status(400).json({ message: "Resume PDF upload is required!" });
    }

    const candidateId = await db.createCandidate({
      name,
      email,
      phone,
      college_name,
      degree,
      cgpa,
      role_applied,
      duration,
      mode,
      resume_url: resumeUrl,
      available_immediately
    });

    // Send acknowledgment email with link to book interview slot
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const bookingLink = `${frontendUrl}/book-slot?candidateId=${candidateId}`;
    
    await sendNotificationEmail({
      to: email,
      subject: "Application Received - Arshith Group",
      message: `Dear ${name},\n\nThank you for applying for the ${role_applied} role at Arshith Group. Please select your interview slot using the link below:\n\n${bookingLink}`,
      html: emailTemplates.getApplicationReceivedTemplate(name, role_applied, bookingLink)
    });

    // Notify recruiter dashboard in real-time
    io.to("recruiter").emit("dashboardUpdate");

    res.json({
      message: "Application Submitted Successfully",
      candidateId
    });
  } catch (error) {
    console.error("Apply error:", error);
    res.status(500).json({ message: "Server Error - Failed to save application" });
  }
});

// 2. GET /slots - Fetch all interview slots
app.get("/slots", async (req, res) => {
  try {
    const slots = await db.getSlots();
    res.json(slots);
  } catch (error) {
    console.error("Get slots error:", error);
    res.status(500).json({ message: "Server Error - Failed to fetch interview slots" });
  }
});

// 3. POST /book-slot - Book an interview slot
app.post("/book-slot", async (req, res) => {
  try {
    const { candidateId, slotId } = req.body;
    if (!candidateId || !slotId) {
      return res.status(400).json({ message: "candidateId and slotId are required" });
    }

    const candidate = await db.getCandidateById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Check if candidate already booked a slot
    const existingBooking = await db.getBookingByCandidateId(candidateId);
    if (existingBooking) {
      return res.status(400).json({ message: "You have already booked an interview slot." });
    }

    const slot = await db.getSlotById(slotId);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    // Check capacity
    const slots = await db.getSlots();
    const targetSlot = slots.find((s) => s.slot_id === parseInt(slotId));
    if (!targetSlot || targetSlot.remaining_capacity <= 0) {
      return res.status(400).json({ message: "This slot is full. Please select another slot." });
    }

    // Generate unique token
    const token = crypto.randomBytes(16).toString("hex");

    await db.bookSlot({
      candidate_id: candidateId,
      slot_id: slotId,
      token
    });

    const recruiterEmail = process.env.RECRUITER_EMAIL || "joshikakomali@gmail.com";
    const slotDetailsStr = `${slot.date} at ${slot.start_time} - ${slot.end_time}`;
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const interviewLink = `${frontendUrl}/interview/${token}`;

    // Create Google Calendar event with configured Meet link
    const { createCalendarEvent } = require("./googleCalendar");
    let meetLink = null;
    try {
      const dbMeetLink = await db.getSetting("default_meet_link");
      const activeMeetLink = dbMeetLink || process.env.MEET_LINK_TEMPLATE || "https://meet.google.com/wko-xhsi-dei";

      const calendarResult = await createCalendarEvent({
        candidateName: candidate.name,
        candidateEmail: candidate.email,
        date: slot.date,
        startTime: slot.start_time,
        endTime: slot.end_time,
        candidatePhone: candidate.phone,
        roleApplied: candidate.role_applied,
        lobbyUrl: interviewLink,
        meetLink: activeMeetLink
      });

      if (calendarResult && calendarResult.meetLink) {
        meetLink = calendarResult.meetLink;
        console.log("[SERVER] Google Calendar event created. Meet link:", meetLink);
        
        // Save the Google Meet link in the database
        await db.upsertInterviewSession({
          candidate_id: candidateId,
          slot_id: slotId,
          meet_link: meetLink,
          status: "SCHEDULED"
        });
      }
    } catch (calErr) {
      console.error("[SERVER] Google Calendar sync failed (ignoring to allow booking):", calErr.message);
    }

    // Generate iCal ICS invite string for candidate and recruiter
    let icsContent = null;
    try {
      const activeMeetLink = meetLink || process.env.MEET_LINK_TEMPLATE || "https://meet.google.com/wko-xhsi-dei";
      
      const formatICSDate = (dateVal, timeVal) => {
        let baseDateStr = "";
        if (dateVal instanceof Date) {
          const y = dateVal.getFullYear();
          const m = String(dateVal.getMonth() + 1).padStart(2, "0");
          const d = String(dateVal.getDate()).padStart(2, "0");
          baseDateStr = `${y}-${m}-${d}`;
        } else {
          baseDateStr = String(dateVal).substring(0, 10);
        }
        
        const localDateTimeStr = `${baseDateStr}T${timeVal}+05:30`;
        const dObj = new Date(localDateTimeStr);
        
        const pad = (num) => String(num).padStart(2, "0");
        const y = dObj.getUTCFullYear();
        const m = pad(dObj.getUTCMonth() + 1);
        const d = pad(dObj.getUTCDate());
        const hh = pad(dObj.getUTCHours());
        const mm = pad(dObj.getUTCMinutes());
        const ss = pad(dObj.getUTCSeconds());
        return `${y}${m}${d}T${hh}${mm}${ss}Z`;
      };

      const dtStart = formatICSDate(slot.date, slot.start_time);
      const dtEnd = formatICSDate(slot.date, slot.end_time);
      
      const formatStampDate = (dateObj) => {
        const pad = (num) => String(num).padStart(2, "0");
        const y = dateObj.getUTCFullYear();
        const m = pad(dateObj.getUTCMonth() + 1);
        const d = pad(dateObj.getUTCDate());
        const hh = pad(dateObj.getUTCHours());
        const mm = pad(dateObj.getUTCMinutes());
        const ss = pad(dateObj.getUTCSeconds());
        return `${y}${m}${d}T${hh}${mm}${ss}Z`;
      };
      const dtStamp = formatStampDate(new Date());

      icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Arshith Group//Interview Scheduler//EN",
        "METHOD:REQUEST",
        "BEGIN:VEVENT",
        `UID:interview-${candidateId}-${slotId}-${Date.now()}@arshith-website`,
        `DTSTAMP:${dtStamp}`,
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `SUMMARY:Interview: ${candidate.name} - Arshith Group`,
        `DESCRIPTION:Candidate Details:\\n- Name: ${candidate.name}\\n- Email: ${candidate.email}\\n- Phone: ${candidate.phone || "N/A"}\\n- Role Applied: ${candidate.role_applied || "N/A"}\\n\\nAccess Details:\\n- Lobby Link: ${interviewLink}\\n- Join Google Meet: ${activeMeetLink}\\n\\nEnsure camera and microphone are functional before joining.`,
        `LOCATION:${activeMeetLink}`,
        `ORGANIZER;CN="Recruitment Panel":mailto:${recruiterEmail}`,
        "STATUS:CONFIRMED",
        "SEQUENCE:0",
        "BEGIN:VALARM",
        "TRIGGER:-PT15M",
        "ACTION:DISPLAY",
        "DESCRIPTION:Reminder",
        "END:VALARM",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");
    } catch (icsErr) {
      console.error("[SERVER] Failed to generate ICS calendar file:", icsErr.message);
    }

    // Recruiter notification email
    await sendNotificationEmail({
      to: recruiterEmail,
      subject: `Interview Slot Selected: ${candidate.name}`,
      message: `Dear Recruiter,\n\nA candidate has booked an interview slot.\n\nCandidate Name: ${candidate.name}\nSelected Slot: ${slotDetailsStr}\nMeet Link: ${meetLink || "Not generated yet"}`,
      html: emailTemplates.getRecruiterSlotSelectedTemplate(candidate.name, candidate.email, candidate.role_applied, slot.date, slot.start_time, slot.end_time),
      icalEvent: icsContent
    });

    // Candidate confirmation email
    await sendNotificationEmail({
      to: candidate.email,
      subject: "Interview Slot Booking Confirmation - Arshith Group",
      message: `Dear ${candidate.name},\n\nYour interview has been scheduled for ${slotDetailsStr}.\n\nAccess Link: ${interviewLink}\nMeet Link: ${meetLink || "Will be shared when admitted"}`,
      html: emailTemplates.getBookingConfirmationTemplate(candidate.name, slot.date, slot.start_time, slot.end_time, interviewLink),
      icalEvent: icsContent
    });

    // Notify recruiter dashboard in real-time
    io.to("recruiter").emit("dashboardUpdate");

    res.json({
      message: "Slot booked successfully",
      token,
      interviewLink,
      meetLink
    });
  } catch (error) {
    console.error("Book slot error:", error);
    res.status(500).json({ message: "Server error during slot booking" });
  }
});

// 4. GET /interview/:token - Fetch & validate interview access token
app.get("/interview/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const booking = await db.getBookingByToken(token);

    if (!booking) {
      return res.status(404).json({ message: "Invalid access token" });
    }

    // Current Server Time Validation
    const now = new Date();
    
    const slotDateStr = formatDateLocal(booking.slot_date);
    
    const [startH, startM, startS] = String(booking.slot_start).split(":");
    const [endH, endM, endS] = String(booking.slot_end).split(":");

    const startDateTime = new Date(slotDateStr);
    startDateTime.setHours(parseInt(startH), parseInt(startM), parseInt(startS) || 0);

    const endDateTime = new Date(slotDateStr);
    endDateTime.setHours(parseInt(endH), parseInt(endM), parseInt(endS) || 0);

    let validation = "VALID";
    if (now < startDateTime) {
      validation = "BEFORE";
    } else if (now > endDateTime) {
      validation = "AFTER";
    }

    res.json({
      validation,
      booking: {
        candidate_id: booking.candidate_id,
        candidate_name: booking.candidate_name,
        candidate_email: booking.candidate_email,
        candidate_phone: booking.candidate_phone,
        role_applied: booking.candidate_role,
        slot_id: booking.slot_id,
        slot_date: slotDateStr,
        slot_start: booking.slot_start,
        slot_end: booking.slot_end,
        session_status: booking.session_status,
        meet_link: booking.meet_link
      }
    });
  } catch (error) {
    console.error("Interview token error:", error);
    res.status(500).json({ message: "Server error verifying token" });
  }
});

// 5. POST /join-queue - Join the waiting list
app.post("/join-queue", async (req, res) => {
  try {
    const { candidateId, slotId } = req.body;
    if (!candidateId || !slotId) {
      return res.status(400).json({ message: "candidateId and slotId are required" });
    }

    // Verify time slot is active
    const candidate = await db.getCandidateById(candidateId);
    const slot = await db.getSlotById(slotId);

    if (!candidate || !slot) {
      return res.status(404).json({ message: "Candidate or slot not found" });
    }

    const now = new Date();
    const slotDateStr = formatDateLocal(slot.date);
    const [startH, startM, startS] = String(slot.start_time).split(":");
    const [endH, endM, endS] = String(slot.end_time).split(":");

    const startDateTime = new Date(slotDateStr);
    startDateTime.setHours(parseInt(startH), parseInt(startM), parseInt(startS) || 0);

    const endDateTime = new Date(slotDateStr);
    endDateTime.setHours(parseInt(endH), parseInt(endM), parseInt(endS) || 0);

    if (now < startDateTime) {
      return res.status(403).json({ message: "Your interview slot has not started yet. Please join during your scheduled time." });
    } else if (now > endDateTime) {
      return res.status(403).json({ message: "Your interview slot has expired. Please contact HR." });
    }

    // Join queue in DB
    const queueRecord = await db.joinQueue({ candidate_id: candidateId, slot_id: slotId });
    const queueStatus = await db.getQueueStatus(candidateId);

    // Immediate Recruiter Email Notification
    const recruiterEmail = process.env.RECRUITER_EMAIL || "joshikakomali@gmail.com";
    const slotStr = `${slotDateStr} ${slot.start_time} - ${slot.end_time}`;
    const joinTimeStr = new Date(queueStatus.join_time).toLocaleTimeString();

    await sendNotificationEmail({
      to: recruiterEmail,
      subject: `Candidate Waiting For Interview: ${candidate.name}`,
      message: `Dear Recruiter,\n\nCandidate ${candidate.name} is waiting in the queue.`,
      html: emailTemplates.getRecruiterCandidateWaitingTemplate(candidate.name, candidate.email, candidate.role_applied, slotDateStr, `${slot.start_time} - ${slot.end_time}`, queueStatus.position)
    });

    // Notify recruiter dashboard in real-time
    io.to("recruiter").emit("dashboardUpdate");
    
    // Broadcast queue update to specific candidate room
    io.to(`candidate_${candidateId}`).emit("queueUpdate", queueStatus);

    res.json({
      message: "Successfully entered the waiting queue",
      queueStatus
    });
  } catch (error) {
    console.error("Join queue error:", error);
    res.status(500).json({ message: "Server error joining waiting queue" });
  }
});

// 6. GET /queue-status/:candidateId - Get current position and wait time
app.get("/queue-status/:candidateId", async (req, res) => {
  try {
    const { candidateId } = req.params;
    const status = await db.getQueueStatus(candidateId);
    if (!status) {
      return res.status(404).json({ message: "Candidate queue record not found" });
    }
    res.json(status);
  } catch (error) {
    console.error("Queue status error:", error);
    res.status(500).json({ message: "Server error fetching queue status" });
  }
});

// 7. GET /recruiter/dashboard - Recruiter dashboard statistics & candidate table
app.get("/recruiter/dashboard", protectRecruiter, async (req, res) => {
  try {
    const data = await db.getRecruiterDashboard();
    res.json(data);
  } catch (error) {
    console.error("Recruiter dashboard error:", error);
    res.status(500).json({ message: "Server error loading dashboard" });
  }
});

// 8. POST /admit-candidate - Recruit admits candidate (reveal Meet link)
app.post("/admit-candidate", protectRecruiter, async (req, res) => {
  try {
    const { candidateId, slotId, meetLink: customMeetLink } = req.body;
    if (!candidateId || !slotId) {
      return res.status(400).json({ message: "candidateId and slotId are required" });
    }

    // Check if there is a pre-generated Meet link from the Google Calendar event
    let preGeneratedMeetLink = null;
    try {
      const dashboardData = await db.getRecruiterDashboard();
      const candInfo = dashboardData.candidates.find(
        (c) => c.candidate_id === parseInt(candidateId) && c.slot_id === parseInt(slotId)
      );
      if (candInfo && candInfo.meet_link) {
        preGeneratedMeetLink = candInfo.meet_link;
      }
    } catch (e) {
      console.error("[SERVER] Failed to retrieve pre-generated meet link:", e.message);
    }

    // Google Meet Link (from request, pre-generated calendar link, database setting, environment template, or dynamically generated)
    const dbMeetLink = await db.getSetting("default_meet_link");
    const meetLink = customMeetLink || preGeneratedMeetLink || dbMeetLink || process.env.MEET_LINK_TEMPLATE || generateMeetLink();

    const session = await db.admitCandidate({
      candidate_id: candidateId,
      slot_id: slotId,
      meet_link: meetLink
    });

    const candidate = await db.getCandidateById(candidateId);

    // Email candidate immediately
    if (candidate) {
      await sendNotificationEmail({
        to: candidate.email,
        subject: "Your Interview is Starting Now! - Arshith Group",
        message: `Dear ${candidate.name},\n\nThe recruiter has admitted you to the interview. Join the Google Meet session immediately using the link below:\n\n${meetLink}`,
        html: emailTemplates.getCandidateAdmittedTemplate(candidate.name, meetLink)
      });
    }

    // Emit live Socket.IO update to candidate and recruiter
    io.to(`candidate_${candidateId}`).emit("admitted", { meetLink });
    io.to("recruiter").emit("dashboardUpdate");

    res.json({
      message: "Candidate admitted successfully",
      session
    });
  } catch (error) {
    console.error("Admit candidate error:", error);
    res.status(500).json({ message: "Server error admitting candidate" });
  }
});

// 8b. GET /recruiter/settings - Get settings (like default Google Meet link)
app.get("/recruiter/settings", protectRecruiter, async (req, res) => {
  try {
    const dbMeetLink = await db.getSetting("default_meet_link");
    const defaultMeetLink = dbMeetLink || process.env.MEET_LINK_TEMPLATE || "";
    res.json({ default_meet_link: defaultMeetLink });
  } catch (error) {
    console.error("Get settings error:", error);
    res.status(500).json({ message: "Server error loading settings" });
  }
});

// 8c. POST /recruiter/settings - Save settings (like default Google Meet link)
app.post("/recruiter/settings", protectRecruiter, async (req, res) => {
  try {
    const { default_meet_link } = req.body;
    if (default_meet_link === undefined) {
      return res.status(400).json({ message: "default_meet_link is required" });
    }
    await db.setSetting("default_meet_link", default_meet_link.trim());
    res.json({ message: "Settings saved successfully" });
  } catch (error) {
    console.error("Save settings error:", error);
    res.status(500).json({ message: "Server error saving settings" });
  }
});

// 9. POST /complete-interview - Complete, Select, Reject, Hold candidate
app.post("/complete-interview", protectRecruiter, async (req, res) => {
  try {
    const { candidateId, slotId, status } = req.body;
    if (!candidateId || !slotId || !status) {
      return res.status(400).json({ message: "candidateId, slotId, and status are required" });
    }

    const validStatuses = ["COMPLETED", "SELECTED", "REJECTED", "HOLD"];
    if (!validStatuses.includes(status.toUpperCase())) {
      return res.status(400).json({ message: "Invalid status selection" });
    }

    const session = await db.completeInterview({
      candidate_id: candidateId,
      slot_id: slotId,
      status: status.toUpperCase()
    });

    // Notify candidate and recruiter dashboard
    io.to(`candidate_${candidateId}`).emit("statusChanged", { status: status.toUpperCase() });
    io.to("recruiter").emit("dashboardUpdate");

    res.json({
      message: `Interview status updated to ${status}`,
      session
    });
  } catch (error) {
    console.error("Complete interview error:", error);
    res.status(500).json({ message: "Server error concluding interview" });
  }
});

// 10. POST /recruiter/slots - Create interview slot
app.post("/recruiter/slots", protectRecruiter, async (req, res) => {
  try {
    const { date, start_time, end_time, capacity } = req.body;
    if (!date || !start_time || !end_time || !capacity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const slotId = await db.createSlot({ date, start_time, end_time, capacity });
    io.to("recruiter").emit("dashboardUpdate");

    res.json({ message: "Slot created successfully", slotId });
  } catch (error) {
    console.error("Create slot error:", error);
    res.status(500).json({ message: "Server error creating slot" });
  }
});

// 11. DELETE /recruiter/slots/:id - Delete interview slot
app.delete("/recruiter/slots/:id", protectRecruiter, async (req, res) => {
  try {
    const slotId = req.params.id;
    await db.deleteSlot(slotId);
    io.to("recruiter").emit("dashboardUpdate");
    res.json({ message: "Slot deleted successfully" });
  } catch (error) {
    console.error("Delete slot error:", error);
    res.status(500).json({ message: "Server error deleting slot" });
  }
});

// 12. POST /join-meet - Candidate clicks Google Meet link and officially enters the session
app.post("/join-meet", async (req, res) => {
  try {
    const { candidateId, slotId } = req.body;
    if (!candidateId || !slotId) {
      return res.status(400).json({ message: "candidateId and slotId are required" });
    }

    const candidate = await db.getCandidateById(candidateId);
    
    // Send email to recruiter
    await sendNotificationEmail({
      to: process.env.RECRUITER_EMAIL || "joshikakomali@gmail.com",
      subject: `Candidate Entered Google Meet - ${candidate?.name || "Candidate"}`,
      message: `Dear Recruiter,\n\nCandidate ${candidate?.name || "Candidate"} has entered the Google Meet session.`,
      html: emailTemplates.getRecruiterCandidateJoinedMeetTemplate(candidate?.name || "Candidate", candidate?.email || "", candidate?.role_applied || "")
    });

    // We can also notify the recruiter dashboard real-time via Socket.IO
    io.to("recruiter").emit("dashboardUpdate");

    res.json({ message: "Recruiter notified of join-meet click successfully" });
  } catch (error) {
    console.error("Join meet notify error:", error);
    res.status(500).json({ message: "Server error notifying join-meet" });
  }
});

/* SOCKET.IO CONNECTIONS */
io.on("connection", (socket) => {
  // Join specific rooms
  socket.on("joinCandidate", (candidateId) => {
    socket.join(`candidate_${candidateId}`);
    console.log(`[SOCKET] Candidate joined room: candidate_${candidateId}`);
  });

  socket.on("joinRecruiter", () => {
    socket.join("recruiter");
    console.log(`[SOCKET] Recruiter joined room: recruiter`);
  });

  socket.on("disconnect", () => {
    console.log("[SOCKET] Client disconnected");
  });
});

/* ERROR HANDLING MIDDLEWARE FOR UPLOADS */
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: `Upload Error: ${err.message}` });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

/* SERVER INITS */
const PORT = process.env.PORT || 5001;
db.initDb().then(() => {
  server.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT} with Socket.IO enabled.`);
  });
});
