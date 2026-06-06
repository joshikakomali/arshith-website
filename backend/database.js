const mysql = require("mysql2/promise");
const crypto = require("crypto");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

let useFallback = false;
let pool = null;

// In-Memory Database Fallback Store
const memoryDb = {
  Candidates: [],
  Interview_Slots: [],
  Slot_Bookings: [],
  Interview_Queue: [],
  Recruiters: [
    { recruiter_id: 1, name: "Lead Recruiter", email: process.env.RECRUITER_EMAIL || "joshikakomali@gmail.com" }
  ],
  Interview_Sessions: []
};

// Seed In-Memory Slots (Today, Tomorrow, Day After)
const seedMemorySlots = () => {
  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const todayStr = formatDate(new Date());
  const tomorrowStr = formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000));
  const dayAfterStr = formatDate(new Date(Date.now() + 48 * 60 * 60 * 1000));

  const times = [
    { start: "10:00:00", end: "11:00:00" },
    { start: "12:00:00", end: "13:00:00" },
    { start: "15:00:00", end: "16:00:00" }
  ];

  let id = 1;
  [todayStr, tomorrowStr, dayAfterStr].forEach((dateStr) => {
    times.forEach((t) => {
      memoryDb.Interview_Slots.push({
        slot_id: id++,
        date: dateStr,
        start_time: t.start,
        end_time: t.end,
        capacity: 5,
        status: "AVAILABLE"
      });
    });
  });
};

seedMemorySlots();

// Initialize Database Connection
async function initDb() {
  const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Komali@12",
    database: process.env.DB_NAME || "internship_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };

  try {
    console.log("Attempting to connect to MySQL database...");
    // Try to connect to MySQL server (without database first, to ensure database exists)
    const initConn = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      multipleStatements: true
    });

    console.log("MySQL Server connected. Ensuring database exists...");
    await initConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
    await initConn.query(`USE \`${dbConfig.database}\`;`);
    
    // Create Tables
    const fs = require("fs");
    const schemaSql = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
    await initConn.query(schemaSql);
    console.log("Database tables verified/created.");

    // Seed Recruiter
    const recruiterEmail = process.env.RECRUITER_EMAIL || "joshikakomali@gmail.com";
    const [recruiters] = await initConn.query("SELECT * FROM Recruiters WHERE email = ?", [recruiterEmail]);
    if (recruiters.length === 0) {
      await initConn.query("INSERT INTO Recruiters (name, email) VALUES (?, ?)", ["Lead Recruiter", recruiterEmail]);
      console.log("Seeded default recruiter in MySQL.");
    }

    // Seed Slots if none exist
    const [slots] = await initConn.query("SELECT * FROM Interview_Slots");
    if (slots.length === 0) {
      const formatDate = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
      };
      const todayStr = formatDate(new Date());
      const tomorrowStr = formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000));
      const dayAfterStr = formatDate(new Date(Date.now() + 48 * 60 * 60 * 1000));
      const slotTimes = [
        { start: "10:00:00", end: "11:00:00" },
        { start: "12:00:00", end: "13:00:00" },
        { start: "15:00:00", end: "16:00:00" }
      ];

      for (const d of [todayStr, tomorrowStr, dayAfterStr]) {
        for (const t of slotTimes) {
          await initConn.query(
            "INSERT INTO Interview_Slots (date, start_time, end_time, capacity, status) VALUES (?, ?, ?, 5, 'AVAILABLE')",
            [d, t.start, t.end]
          );
        }
      }
      console.log("Seeded initial interview slots in MySQL.");
    }

    await initConn.end();

    // Create pool for runtime
    pool = mysql.createPool(dbConfig);
    console.log("MySQL Connection Pool initialized successfully.");
  } catch (error) {
    console.error("==========================================================");
    console.error("WARNING: MySQL connection failed:", error.message);
    console.error("FALLING BACK TO IN-MEMORY DATABASE FOR DEVELOPMENT/TESTING.");
    console.error("==========================================================");
    useFallback = true;
  }
}

// 1. Create Candidate
async function createCandidate(data) {
  if (useFallback) {
    const candidate_id = memoryDb.Candidates.length + 1;
    const candidate = {
      candidate_id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      college_name: data.college_name,
      degree: data.degree,
      cgpa: data.cgpa,
      role_applied: data.role_applied,
      duration: data.duration,
      mode: data.mode,
      resume_url: data.resume_url,
      available_immediately: data.available_immediately,
      created_at: new Date()
    };
    memoryDb.Candidates.push(candidate);
    return candidate_id;
  }

  const sql = `
    INSERT INTO Candidates 
    (name, email, phone, college_name, degree, cgpa, role_applied, duration, mode, resume_url, available_immediately)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const [result] = await pool.query(sql, [
    data.name,
    data.email,
    data.phone,
    data.college_name,
    data.degree,
    data.cgpa,
    data.role_applied,
    data.duration,
    data.mode,
    data.resume_url,
    data.available_immediately
  ]);
  return result.insertId;
}

// 2. Get Candidate By ID
async function getCandidateById(candidate_id) {
  if (useFallback) {
    return memoryDb.Candidates.find((c) => c.candidate_id === parseInt(candidate_id)) || null;
  }
  const [rows] = await pool.query("SELECT * FROM Candidates WHERE candidate_id = ?", [candidate_id]);
  return rows[0] || null;
}

// 3. Get All Slots
async function getSlots() {
  if (useFallback) {
    // Return slots and dynamically compute booked count/remaining capacity
    return memoryDb.Interview_Slots.map((slot) => {
      const bookedCount = memoryDb.Slot_Bookings.filter((b) => b.slot_id === slot.slot_id).length;
      return {
        ...slot,
        booked_count: bookedCount,
        remaining_capacity: Math.max(0, slot.capacity - bookedCount)
      };
    });
  }

  const sql = `
    SELECT s.*, 
           (SELECT COUNT(*) FROM Slot_Bookings b WHERE b.slot_id = s.slot_id) as booked_count
    FROM Interview_Slots s
  `;
  const [rows] = await pool.query(sql);
  return rows.map((s) => ({
    ...s,
    remaining_capacity: Math.max(0, s.capacity - s.booked_count)
  }));
}

// 4. Get Slot By ID
async function getSlotById(slot_id) {
  if (useFallback) {
    return memoryDb.Interview_Slots.find((s) => s.slot_id === parseInt(slot_id)) || null;
  }
  const [rows] = await pool.query("SELECT * FROM Interview_Slots WHERE slot_id = ?", [slot_id]);
  return rows[0] || null;
}

// 5. Book Slot
async function bookSlot({ candidate_id, slot_id, token }) {
  if (useFallback) {
    const booking_id = memoryDb.Slot_Bookings.length + 1;
    const booking = {
      booking_id,
      candidate_id: parseInt(candidate_id),
      slot_id: parseInt(slot_id),
      token,
      booking_status: "BOOKED",
      booked_at: new Date()
    };
    memoryDb.Slot_Bookings.push(booking);

    // Update slot status if capacity reached
    const slot = memoryDb.Interview_Slots.find((s) => s.slot_id === parseInt(slot_id));
    if (slot) {
      const bookedCount = memoryDb.Slot_Bookings.filter((b) => b.slot_id === slot.slot_id).length;
      if (bookedCount >= slot.capacity) {
        slot.status = "UNAVAILABLE";
      }
    }

    return booking_id;
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Insert booking
    const [result] = await connection.query(
      "INSERT INTO Slot_Bookings (candidate_id, slot_id, token, booking_status) VALUES (?, ?, ?, 'BOOKED')",
      [candidate_id, slot_id, token]
    );

    // Check capacity
    const [slotRows] = await connection.query("SELECT capacity FROM Interview_Slots WHERE slot_id = ?", [slot_id]);
    const capacity = slotRows[0].capacity;

    const [countRows] = await connection.query("SELECT COUNT(*) as booked_count FROM Slot_Bookings WHERE slot_id = ?", [slot_id]);
    const bookedCount = countRows[0].booked_count;

    if (bookedCount >= capacity) {
      await connection.query("UPDATE Interview_Slots SET status = 'UNAVAILABLE' WHERE slot_id = ?", [slot_id]);
    }

    await connection.commit();
    return result.insertId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

// 6. Get Booking By Token
async function getBookingByToken(token) {
  if (useFallback) {
    const booking = memoryDb.Slot_Bookings.find((b) => b.token === token);
    if (!booking) return null;

    const candidate = memoryDb.Candidates.find((c) => c.candidate_id === booking.candidate_id);
    const slot = memoryDb.Interview_Slots.find((s) => s.slot_id === booking.slot_id);
    const session = memoryDb.Interview_Sessions.find((s) => s.candidate_id === booking.candidate_id && s.slot_id === booking.slot_id);

    return {
      ...booking,
      candidate_name: candidate?.name,
      candidate_email: candidate?.email,
      candidate_phone: candidate?.phone,
      candidate_role: candidate?.role_applied,
      slot_date: slot?.date,
      slot_start: slot?.start_time,
      slot_end: slot?.end_time,
      session_status: session?.status || "SCHEDULED",
      meet_link: session?.meet_link || null
    };
  }

  const sql = `
    SELECT b.*, 
           c.name as candidate_name, c.email as candidate_email, c.phone as candidate_phone, c.role_applied as candidate_role,
           s.date as slot_date, s.start_time as slot_start, s.end_time as slot_end,
           se.status as session_status, se.meet_link
    FROM Slot_Bookings b
    JOIN Candidates c ON b.candidate_id = c.candidate_id
    JOIN Interview_Slots s ON b.slot_id = s.slot_id
    LEFT JOIN Interview_Sessions se ON b.candidate_id = se.candidate_id AND b.slot_id = se.slot_id
    WHERE b.token = ?
  `;
  const [rows] = await pool.query(sql, [token]);
  return rows[0] || null;
}

// 7. Get Booking By Candidate ID
async function getBookingByCandidateId(candidate_id) {
  if (useFallback) {
    return memoryDb.Slot_Bookings.find((b) => b.candidate_id === parseInt(candidate_id)) || null;
  }
  const [rows] = await pool.query("SELECT * FROM Slot_Bookings WHERE candidate_id = ?", [candidate_id]);
  return rows[0] || null;
}

// 8. Join Waiting Queue
async function joinQueue({ candidate_id, slot_id }) {
  const cid = parseInt(candidate_id);
  const sid = parseInt(slot_id);

  if (useFallback) {
    // Check if already in queue
    let record = memoryDb.Interview_Queue.find((q) => q.candidate_id === cid && q.slot_id === sid);
    if (record) {
      return record;
    }

    // Get number of active candidates in queue for position calculation
    const activeQueue = memoryDb.Interview_Queue.filter(
      (q) => q.slot_id === sid && (q.status === "WAITING" || q.status === "IN_INTERVIEW")
    );
    const position = activeQueue.length + 1;

    record = {
      queue_id: memoryDb.Interview_Queue.length + 1,
      candidate_id: cid,
      slot_id: sid,
      position,
      join_time: new Date(),
      status: "WAITING"
    };
    memoryDb.Interview_Queue.push(record);

    // Also update Slot_Booking status to WAITING
    const booking = memoryDb.Slot_Bookings.find((b) => b.candidate_id === cid && b.slot_id === sid);
    if (booking) {
      booking.booking_status = "WAITING";
    }

    // Upsert Interview Session
    let session = memoryDb.Interview_Sessions.find((se) => se.candidate_id === cid && se.slot_id === sid);
    if (!session) {
      session = {
        session_id: memoryDb.Interview_Sessions.length + 1,
        candidate_id: cid,
        slot_id: sid,
        recruiter_id: null,
        meet_link: null,
        start_time: null,
        end_time: null,
        status: "WAITING"
      };
      memoryDb.Interview_Sessions.push(session);
    } else {
      session.status = "WAITING";
    }

    return record;
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Check if already in queue
    const [existing] = await connection.query(
      "SELECT * FROM Interview_Queue WHERE candidate_id = ? AND slot_id = ?",
      [cid, sid]
    );

    if (existing.length > 0) {
      await connection.commit();
      return existing[0];
    }

    // Calculate queue position
    const [countRows] = await connection.query(
      "SELECT COUNT(*) as active_count FROM Interview_Queue WHERE slot_id = ? AND status IN ('WAITING', 'IN_INTERVIEW')",
      [sid]
    );
    const position = countRows[0].active_count + 1;

    // Insert queue record
    const [result] = await connection.query(
      "INSERT INTO Interview_Queue (candidate_id, slot_id, position, status) VALUES (?, ?, ?, 'WAITING')",
      [cid, sid, position]
    );

    // Update booking status
    await connection.query(
      "UPDATE Slot_Bookings SET booking_status = 'WAITING' WHERE candidate_id = ? AND slot_id = ?",
      [cid, sid]
    );

    // Upsert Interview Session
    const [sessions] = await connection.query(
      "SELECT * FROM Interview_Sessions WHERE candidate_id = ? AND slot_id = ?",
      [cid, sid]
    );

    if (sessions.length === 0) {
      await connection.query(
        "INSERT INTO Interview_Sessions (candidate_id, slot_id, status) VALUES (?, ?, 'WAITING')",
        [cid, sid]
      );
    } else {
      await connection.query(
        "UPDATE Interview_Sessions SET status = 'WAITING' WHERE candidate_id = ? AND slot_id = ?",
        [cid, sid]
      );
    }

    await connection.commit();

    const [newRecord] = await connection.query("SELECT * FROM Interview_Queue WHERE queue_id = ?", [result.insertId]);
    return newRecord[0];
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

// 9. Get Queue Status for Candidate
async function getQueueStatus(candidate_id) {
  const cid = parseInt(candidate_id);

  if (useFallback) {
    const queueRecord = memoryDb.Interview_Queue.find((q) => q.candidate_id === cid);
    if (!queueRecord) return null;

    // Calculate dynamic position (how many candidates are WAITING or IN_INTERVIEW before this candidate in the queue)
    const slotId = queueRecord.slot_id;
    
    // Sort all active queue entries by join_time
    const activeQueue = memoryDb.Interview_Queue
      .filter((q) => q.slot_id === slotId && (q.status === "WAITING" || q.status === "IN_INTERVIEW"))
      .sort((a, b) => new Date(a.join_time) - new Date(b.join_time));

    const index = activeQueue.findIndex((q) => q.candidate_id === cid);
    const dynamicPosition = index !== -1 ? index + 1 : queueRecord.position;

    // Estimate: 15 mins per candidate ahead in queue (index is number of people ahead)
    const peopleAhead = index !== -1 ? index : 0;
    const estimatedWaitMinutes = peopleAhead * 15;

    // Get meet link if admitted
    const session = memoryDb.Interview_Sessions.find((s) => s.candidate_id === cid && s.slot_id === slotId);

    return {
      queue_id: queueRecord.queue_id,
      candidate_id: cid,
      slot_id: slotId,
      position: dynamicPosition,
      status: session?.status || queueRecord.status,
      join_time: queueRecord.join_time,
      estimated_wait_time: estimatedWaitMinutes,
      meet_link: session?.meet_link || null
    };
  }

  // Find queue record
  const [queueRows] = await pool.query("SELECT * FROM Interview_Queue WHERE candidate_id = ?", [cid]);
  if (queueRows.length === 0) return null;

  const queueRecord = queueRows[0];
  const slotId = queueRecord.slot_id;

  // Calculate dynamic position based on join_time of active WAITING or IN_INTERVIEW candidates
  const sqlPosition = `
    SELECT COUNT(*) as ahead_count 
    FROM Interview_Queue 
    WHERE slot_id = ? 
      AND status IN ('WAITING', 'IN_INTERVIEW') 
      AND join_time < (SELECT join_time FROM Interview_Queue WHERE candidate_id = ?)
  `;
  const [positionRows] = await pool.query(sqlPosition, [slotId, cid]);
  const peopleAhead = positionRows[0].ahead_count;
  const dynamicPosition = peopleAhead + 1;
  const estimatedWaitMinutes = peopleAhead * 15;

  const [sessionRows] = await pool.query(
    "SELECT status, meet_link FROM Interview_Sessions WHERE candidate_id = ? AND slot_id = ?",
    [cid, slotId]
  );
  const session = sessionRows[0];

  return {
    queue_id: queueRecord.queue_id,
    candidate_id: cid,
    slot_id: slotId,
    position: dynamicPosition,
    status: session?.status || queueRecord.status,
    join_time: queueRecord.join_time,
    estimated_wait_time: estimatedWaitMinutes,
    meet_link: session?.meet_link || null
  };
}

// 10. Get Recruiter Dashboard Data
async function getRecruiterDashboard() {
  if (useFallback) {
    const list = memoryDb.Slot_Bookings.map((booking) => {
      const candidate = memoryDb.Candidates.find((c) => c.candidate_id === booking.candidate_id);
      const slot = memoryDb.Interview_Slots.find((s) => s.slot_id === booking.slot_id);
      const queue = memoryDb.Interview_Queue.find((q) => q.candidate_id === booking.candidate_id && q.slot_id === booking.slot_id);
      const session = memoryDb.Interview_Sessions.find((s) => s.candidate_id === booking.candidate_id && s.slot_id === booking.slot_id);

      // Determine status hierarchy: Session status > Queue status > Booking status
      let currentStatus = booking.booking_status;
      if (queue) currentStatus = queue.status;
      if (session) currentStatus = session.status;

      // Calculate dynamic position if in queue
      let position = queue?.position || null;
      if (queue && (queue.status === "WAITING" || queue.status === "IN_INTERVIEW")) {
        const activeQueue = memoryDb.Interview_Queue
          .filter((q) => q.slot_id === slot.slot_id && (q.status === "WAITING" || q.status === "IN_INTERVIEW"))
          .sort((a, b) => new Date(a.join_time) - new Date(b.join_time));
        const idx = activeQueue.findIndex((q) => q.candidate_id === booking.candidate_id);
        position = idx !== -1 ? idx + 1 : queue.position;
      }

      return {
        booking_id: booking.booking_id,
        candidate_id: booking.candidate_id,
        candidate_name: candidate?.name,
        candidate_email: candidate?.email,
        candidate_phone: candidate?.phone,
        role_applied: candidate?.role_applied,
        slot_id: booking.slot_id,
        slot_date: slot ? `${slot.date} ${slot.start_time} - ${slot.end_time}` : "N/A",
        join_time: queue?.join_time || null,
        queue_position: position,
        status: currentStatus,
        meet_link: session?.meet_link || null
      };
    });

    // Stats
    const totalApplied = memoryDb.Candidates.length;
    const scheduled = list.filter((item) => item.status === "BOOKED" || item.status === "SCHEDULED").length;
    const waiting = list.filter((item) => item.status === "WAITING").length;
    const inInterview = list.filter((item) => item.status === "IN_INTERVIEW").length;
    const completed = list.filter((item) => item.status === "COMPLETED" || item.status === "SELECTED" || item.status === "REJECTED" || item.status === "HOLD").length;

    return {
      candidates: list,
      stats: { totalApplied, scheduled, waiting, inInterview, completed }
    };
  }

  // Query MySQL
  const candidatesSql = `
    SELECT b.booking_id, b.candidate_id, c.name as candidate_name, c.email as candidate_email, c.phone as candidate_phone, c.role_applied,
           b.slot_id, CONCAT(s.date, ' ', s.start_time, ' - ', s.end_time) as slot_date,
           q.join_time, q.position as queue_position,
           COALESCE(se.status, q.status, b.booking_status) as status,
           se.meet_link
    FROM Slot_Bookings b
    JOIN Candidates c ON b.candidate_id = c.candidate_id
    JOIN Interview_Slots s ON b.slot_id = s.slot_id
    LEFT JOIN Interview_Queue q ON b.candidate_id = q.candidate_id AND b.slot_id = q.slot_id
    LEFT JOIN Interview_Sessions se ON b.candidate_id = se.candidate_id AND b.slot_id = se.slot_id
    ORDER BY q.join_time ASC, b.booked_at DESC
  `;

  const [candidates] = await pool.query(candidatesSql);

  // Re-calculate positions for WAITING / IN_INTERVIEW candidates dynamically
  const activeQueues = {}; // slot_id -> list of candidate ids
  const list = candidates.map((c) => {
    let position = c.queue_position;
    if (c.status === "WAITING" || c.status === "IN_INTERVIEW") {
      if (!activeQueues[c.slot_id]) {
        activeQueues[c.slot_id] = [];
      }
      activeQueues[c.slot_id].push(c);
      position = activeQueues[c.slot_id].length;
    }
    return {
      ...c,
      queue_position: position
    };
  });

  // Fetch stats counts
  const [[{ totalApplied }]] = await pool.query("SELECT COUNT(*) as totalApplied FROM Candidates");
  const [[{ scheduled }]] = await pool.query("SELECT COUNT(*) as scheduled FROM Slot_Bookings WHERE booking_status = 'BOOKED'");
  const [[{ waiting }]] = await pool.query("SELECT COUNT(*) as waiting FROM Interview_Queue WHERE status = 'WAITING'");
  const [[{ inInterview }]] = await pool.query("SELECT COUNT(*) as inInterview FROM Interview_Sessions WHERE status = 'IN_INTERVIEW'");
  const [[{ completed }]] = await pool.query("SELECT COUNT(*) as completed FROM Interview_Sessions WHERE status IN ('COMPLETED', 'SELECTED', 'REJECTED', 'HOLD')");

  return {
    candidates: list,
    stats: { totalApplied, scheduled, waiting, inInterview, completed }
  };
}

// 11. Admit Candidate
async function admitCandidate({ candidate_id, slot_id, meet_link }) {
  const cid = parseInt(candidate_id);
  const sid = parseInt(slot_id);

  if (useFallback) {
    // Update Interview Session
    let session = memoryDb.Interview_Sessions.find((s) => s.candidate_id === cid && s.slot_id === sid);
    if (!session) {
      session = {
        session_id: memoryDb.Interview_Sessions.length + 1,
        candidate_id: cid,
        slot_id: sid,
        recruiter_id: 1,
        meet_link,
        start_time: new Date(),
        end_time: null,
        status: "IN_INTERVIEW"
      };
      memoryDb.Interview_Sessions.push(session);
    } else {
      session.meet_link = meet_link;
      session.start_time = new Date();
      session.status = "IN_INTERVIEW";
      session.recruiter_id = 1;
    }

    // Update Queue record status
    const queueRecord = memoryDb.Interview_Queue.find((q) => q.candidate_id === cid && q.slot_id === sid);
    if (queueRecord) {
      queueRecord.status = "IN_INTERVIEW";
    }

    // Update Slot Booking status
    const booking = memoryDb.Slot_Bookings.find((b) => b.candidate_id === cid && b.slot_id === sid);
    if (booking) {
      booking.booking_status = "IN_INTERVIEW";
    }

    return session;
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Get Lead Recruiter ID
    const [recruiters] = await connection.query("SELECT recruiter_id FROM Recruiters LIMIT 1");
    const recruiterId = recruiters[0]?.recruiter_id || 1;

    // Update Interview Session
    const [sessions] = await connection.query(
      "SELECT * FROM Interview_Sessions WHERE candidate_id = ? AND slot_id = ?",
      [cid, sid]
    );

    let sessionId;
    if (sessions.length === 0) {
      const [res] = await connection.query(
        "INSERT INTO Interview_Sessions (candidate_id, slot_id, recruiter_id, meet_link, start_time, status) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, 'IN_INTERVIEW')",
        [cid, sid, recruiterId, meet_link]
      );
      sessionId = res.insertId;
    } else {
      await connection.query(
        "UPDATE Interview_Sessions SET recruiter_id = ?, meet_link = ?, start_time = CURRENT_TIMESTAMP, status = 'IN_INTERVIEW' WHERE candidate_id = ? AND slot_id = ?",
        [recruiterId, meet_link, cid, sid]
      );
      sessionId = sessions[0].session_id;
    }

    // Update queue record status
    await connection.query(
      "UPDATE Interview_Queue SET status = 'IN_INTERVIEW' WHERE candidate_id = ? AND slot_id = ?",
      [cid, sid]
    );

    // Update booking status
    await connection.query(
      "UPDATE Slot_Bookings SET booking_status = 'IN_INTERVIEW' WHERE candidate_id = ? AND slot_id = ?",
      [cid, sid]
    );

    await connection.commit();

    const [updatedSession] = await connection.query("SELECT * FROM Interview_Sessions WHERE session_id = ?", [sessionId]);
    return updatedSession[0];
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

// 12. Complete Interview
async function completeInterview({ candidate_id, slot_id, status }) {
  const cid = parseInt(candidate_id);
  const sid = parseInt(slot_id);

  if (useFallback) {
    // Update Interview Session
    const session = memoryDb.Interview_Sessions.find((s) => s.candidate_id === cid && s.slot_id === sid);
    if (session) {
      session.status = status; // COMPLETED, SELECTED, REJECTED, HOLD
      session.end_time = new Date();
    }

    // Update Queue record status
    const queueRecord = memoryDb.Interview_Queue.find((q) => q.candidate_id === cid && q.slot_id === sid);
    if (queueRecord) {
      queueRecord.status = status;
    }

    // Update Slot Booking status
    const booking = memoryDb.Slot_Bookings.find((b) => b.candidate_id === cid && b.slot_id === sid);
    if (booking) {
      booking.booking_status = status;
    }

    return session;
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Update Interview Session
    await connection.query(
      "UPDATE Interview_Sessions SET status = ?, end_time = CURRENT_TIMESTAMP WHERE candidate_id = ? AND slot_id = ?",
      [status, cid, sid]
    );

    // Update queue record status
    await connection.query(
      "UPDATE Interview_Queue SET status = ? WHERE candidate_id = ? AND slot_id = ?",
      [status, cid, sid]
    );

    // Update booking status
    await connection.query(
      "UPDATE Slot_Bookings SET booking_status = ? WHERE candidate_id = ? AND slot_id = ?",
      [status, cid, sid]
    );

    await connection.commit();

    const [session] = await connection.query(
      "SELECT * FROM Interview_Sessions WHERE candidate_id = ? AND slot_id = ?",
      [cid, sid]
    );
    return session[0] || null;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

// 13. Create custom Slot (Recruiter helper)
async function createSlot({ date, start_time, end_time, capacity }) {
  if (useFallback) {
    const slot_id = memoryDb.Interview_Slots.length + 1;
    const slot = {
      slot_id,
      date,
      start_time,
      end_time,
      capacity: parseInt(capacity),
      status: "AVAILABLE"
    };
    memoryDb.Interview_Slots.push(slot);
    return slot_id;
  }

  const [result] = await pool.query(
    "INSERT INTO Interview_Slots (date, start_time, end_time, capacity, status) VALUES (?, ?, ?, ?, 'AVAILABLE')",
    [date, start_time, end_time, capacity]
  );
  return result.insertId;
}

// 14. Delete custom Slot
async function deleteSlot(slot_id) {
  const sid = parseInt(slot_id);
  if (useFallback) {
    memoryDb.Interview_Slots = memoryDb.Interview_Slots.filter((s) => s.slot_id !== sid);
    memoryDb.Slot_Bookings = memoryDb.Slot_Bookings.filter((b) => b.slot_id !== sid);
    memoryDb.Interview_Queue = memoryDb.Interview_Queue.filter((q) => q.slot_id !== sid);
    memoryDb.Interview_Sessions = memoryDb.Interview_Sessions.filter((s) => s.slot_id !== sid);
    return true;
  }

  await pool.query("DELETE FROM Interview_Slots WHERE slot_id = ?", [sid]);
  return true;
}

module.exports = {
  initDb,
  createCandidate,
  getCandidateById,
  getSlots,
  getSlotById,
  bookSlot,
  getBookingByToken,
  getBookingByCandidateId,
  joinQueue,
  getQueueStatus,
  getRecruiterDashboard,
  admitCandidate,
  completeInterview,
  createSlot,
  deleteSlot,
  useFallback: () => useFallback
};
