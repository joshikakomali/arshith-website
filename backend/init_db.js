const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const connectionConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Komali@12",
  multipleStatements: true // Enable multiple statements execution
};

console.log("Connecting to MySQL server with config:", {
  host: connectionConfig.host,
  user: connectionConfig.user,
  database: process.env.DB_NAME || "internship_db"
});

const connection = mysql.createConnection(connectionConfig);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL server.");

  // Read schema.sql
  const schemaPath = path.join(__dirname, "schema.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf8");

  console.log("Executing schema.sql...");
  connection.query(schemaSql, (err, results) => {
    if (err) {
      console.error("Error executing schema:", err.message);
      connection.end();
      process.exit(1);
    }
    console.log("Schema tables created/verified successfully.");

    // Seed Recruiter and Slots
    seedData();
  });
});

function seedData() {
  // Use the database
  connection.query("USE internship_db", (err) => {
    if (err) {
      console.error("Error selecting database:", err.message);
      connection.end();
      process.exit(1);
    }

    // 1. Seed Recruiter if not exists
    const recruiterEmail = process.env.RECRUITER_EMAIL || "joshikakomali@gmail.com";
    connection.query(
      "SELECT * FROM Recruiters WHERE email = ?",
      [recruiterEmail],
      (err, rows) => {
        if (err) {
          console.error("Error querying recruiters:", err.message);
          connection.end();
          process.exit(1);
        }

        if (rows.length === 0) {
          connection.query(
            "INSERT INTO Recruiters (name, email) VALUES (?, ?)",
            ["Lead Recruiter", recruiterEmail],
            (err) => {
              if (err) console.error("Error seeding recruiter:", err.message);
              else console.log("Seeded default recruiter:", recruiterEmail);
              seedSlots();
            }
          );
        } else {
          console.log("Recruiter already exists.");
          seedSlots();
        }
      }
    );
  });
}

function seedSlots() {
  // Helper to format dates
  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const todayStr = formatDate(new Date());
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = formatDate(tomorrow);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  const dayAfterStr = formatDate(dayAfter);

  const slots = [
    // Today
    { date: todayStr, start_time: "10:00:00", end_time: "11:00:00", capacity: 5 },
    { date: todayStr, start_time: "12:00:00", end_time: "13:00:00", capacity: 5 },
    { date: todayStr, start_time: "15:00:00", end_time: "16:00:00", capacity: 5 },
    // Tomorrow
    { date: tomorrowStr, start_time: "10:00:00", end_time: "11:00:00", capacity: 5 },
    { date: tomorrowStr, start_time: "12:00:00", end_time: "13:00:00", capacity: 5 },
    { date: tomorrowStr, start_time: "15:00:00", end_time: "16:00:00", capacity: 5 },
    // Day After
    { date: dayAfterStr, start_time: "10:00:00", end_time: "11:00:00", capacity: 5 },
    { date: dayAfterStr, start_time: "12:00:00", end_time: "13:00:00", capacity: 5 },
    { date: dayAfterStr, start_time: "15:00:00", end_time: "16:00:00", capacity: 5 }
  ];

  console.log("Seeding slots...");

  let pending = slots.length;
  slots.forEach((s) => {
    connection.query(
      "SELECT * FROM Interview_Slots WHERE date = ? AND start_time = ?",
      [s.date, s.start_time],
      (err, rows) => {
        if (err) {
          console.error("Error checking slot:", err.message);
          pending--;
          if (pending === 0) finish();
          return;
        }

        if (rows.length === 0) {
          connection.query(
            "INSERT INTO Interview_Slots (date, start_time, end_time, capacity, status) VALUES (?, ?, ?, ?, 'AVAILABLE')",
            [s.date, s.start_time, s.end_time, s.capacity],
            (err) => {
              if (err) console.error("Error inserting slot:", err.message);
              pending--;
              if (pending === 0) finish();
            }
          );
        } else {
          pending--;
          if (pending === 0) finish();
        }
      }
    );
  });

  function finish() {
    console.log("Database initialization and seeding complete.");
    connection.end();
  }
}
