-- MySQL Schema Setup for Arshith Group Internship Database

-- Create the database if it does not exist
CREATE DATABASE IF NOT EXISTS internship_db;

-- Use the database
USE internship_db;

-- Create the internship applications table
CREATE TABLE IF NOT EXISTS internship_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  degree VARCHAR(100) NOT NULL,
  domain_name VARCHAR(100) NOT NULL,
  months VARCHAR(50) NOT NULL,
  mode VARCHAR(50) NOT NULL,
  comments TEXT,
  resume_path VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
