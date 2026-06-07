-- MySQL Schema Setup for Interview Scheduling and Waiting Queue System

-- Create the database if it does not exist
CREATE DATABASE IF NOT EXISTS internship_db;

-- Use the database
USE internship_db;

-- 1. Candidates Table
CREATE TABLE IF NOT EXISTS Candidates (
  candidate_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  college_name VARCHAR(255) NOT NULL,
  degree VARCHAR(100) NOT NULL,
  cgpa VARCHAR(50) NOT NULL,
  role_applied VARCHAR(100) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  mode VARCHAR(50) NOT NULL,
  resume_url VARCHAR(500) NOT NULL,
  available_immediately VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Interview_Slots Table
CREATE TABLE IF NOT EXISTS Interview_Slots (
  slot_id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  capacity INT NOT NULL,
  status VARCHAR(50) DEFAULT 'AVAILABLE'
);

-- 3. Slot_Bookings Table
CREATE TABLE IF NOT EXISTS Slot_Bookings (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  candidate_id INT NOT NULL,
  slot_id INT NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  booking_status VARCHAR(50) DEFAULT 'BOOKED',
  booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidate_id) REFERENCES Candidates(candidate_id) ON DELETE CASCADE,
  FOREIGN KEY (slot_id) REFERENCES Interview_Slots(slot_id) ON DELETE CASCADE
);

-- 4. Interview_Queue Table
CREATE TABLE IF NOT EXISTS Interview_Queue (
  queue_id INT AUTO_INCREMENT PRIMARY KEY,
  candidate_id INT NOT NULL,
  slot_id INT NOT NULL,
  position INT NOT NULL,
  join_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'WAITING',
  FOREIGN KEY (candidate_id) REFERENCES Candidates(candidate_id) ON DELETE CASCADE,
  FOREIGN KEY (slot_id) REFERENCES Interview_Slots(slot_id) ON DELETE CASCADE
);

-- 5. Recruiters Table
CREATE TABLE IF NOT EXISTS Recruiters (
  recruiter_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

-- 6. Interview_Sessions Table
CREATE TABLE IF NOT EXISTS Interview_Sessions (
  session_id INT AUTO_INCREMENT PRIMARY KEY,
  candidate_id INT NOT NULL,
  slot_id INT NOT NULL,
  recruiter_id INT DEFAULT NULL,
  meet_link VARCHAR(500) DEFAULT NULL,
  start_time TIMESTAMP NULL DEFAULT NULL,
  end_time TIMESTAMP NULL DEFAULT NULL,
  status VARCHAR(50) DEFAULT 'SCHEDULED',
  FOREIGN KEY (candidate_id) REFERENCES Candidates(candidate_id) ON DELETE CASCADE,
  FOREIGN KEY (slot_id) REFERENCES Interview_Slots(slot_id) ON DELETE CASCADE,
  FOREIGN KEY (recruiter_id) REFERENCES Recruiters(recruiter_id) ON DELETE SET NULL
);

-- 7. Recruiter_Settings Table
CREATE TABLE IF NOT EXISTS Recruiter_Settings (
  setting_key VARCHAR(50) PRIMARY KEY,
  setting_value TEXT
);

