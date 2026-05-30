const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

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

/* MYSQL CONNECTION */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Komali@12",
  database: "internship_db"
});

/* CONNECT DATABASE */
db.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL:", err.message);
  } else {
    console.log("MySQL Connected successfully");
  }
});

/* FORM SUBMIT API WITH RESUME FILE UPLOAD */
app.post("/apply", upload.single("resume"), (req, res) => {
  const {
    name,
    email,
    phone,
    degree,
    domain,
    months,
    mode,
    comments
  } = req.body;

  // Store the relative URL to access the uploaded file
  const resumePath = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = `
  INSERT INTO internship_applications
  (name, email, phone, degree, domain_name, months, mode, comments, resume_path)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      email,
      phone,
      degree,
      domain,
      months,
      mode,
      comments,
      resumePath
    ],
    (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        res.status(500).json({
          message: "Database Error - Failed to save enrollment details"
        });
      } else {
        res.json({
          message: "Application Submitted Successfully"
        });
      }
    }
  );
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

/* SERVER */
app.listen(5001, () => {
  console.log("Server Running On Port 5001");
});
