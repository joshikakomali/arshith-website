/**
 * Arshith Group Email HTML Templates Helper
 */

const getBaseTemplate = (title, contentHtml) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .email-container {
      max-width: 600px;
      margin: 30px auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }
    .email-header {
      background: #ffffff; /* White background for dark logo visibility */
      padding: 25px 30px;
      text-align: center;
      border-bottom: 3px solid #0f4c3a; /* Deep forest green accent border */
    }
    .email-logo-img {
      height: 45px;
      width: auto;
      display: block;
      margin: 0 auto;
    }
    .email-subheader {
      color: #64748b; /* Muted gray text for readability */
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-top: 8px;
      font-weight: 600;
    }
    .email-body {
      padding: 35px 40px;
      color: #334155;
      line-height: 1.6;
      font-size: 15px;
    }
    .email-title {
      font-size: 18px;
      font-weight: 700;
      color: #0f4c3a;
      margin-top: 0;
      margin-bottom: 20px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 10px;
    }
    .details-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 18px;
      margin: 20px 0;
    }
    .details-row {
      margin-bottom: 8px;
      font-size: 14px;
    }
    .details-row:last-child {
      margin-bottom: 0;
    }
    .details-label {
      font-weight: 600;
      color: #475569;
      display: inline-block;
      width: 140px;
    }
    .details-value {
      color: #0f172a;
    }
    .btn-container {
      text-align: center;
      margin: 25px 0 10px;
    }
    .btn-action {
      display: inline-block;
      background: #0f4c3a;
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 5px;
      font-weight: 600;
      font-size: 14px;
      text-align: center;
      box-shadow: 0 4px 6px -1px rgba(15, 76, 58, 0.2);
    }
    .btn-action:hover {
      background: #0b3d2e;
    }
    .email-footer {
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      padding: 25px 30px;
      font-size: 12px;
      color: #64748b;
      line-height: 1.5;
    }
    .footer-links {
      margin-bottom: 12px;
      text-align: center;
    }
    .footer-links a {
      color: #0f4c3a;
      text-decoration: none;
      margin: 0 8px;
      font-weight: 600;
    }
    .footer-text {
      text-align: center;
      margin-bottom: 12px;
    }
    .confidentiality-notice {
      font-size: 10px;
      color: #94a3b8;
      text-align: justify;
      line-height: 1.4;
      border-top: 1px dashed #cbd5e1;
      padding-top: 12px;
      margin-top: 12px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <img src="cid:logo" alt="Arshith Group Logo" class="email-logo-img" />
      <div class="email-subheader">Group Recruitment Coordinator</div>
    </div>
    <div class="email-body">
      ${contentHtml}
    </div>
    <div class="email-footer">
      <div class="footer-links">
        <a href="https://arshithfresh.com">Company Home</a> | 
        <a href="https://arshithfresh.com/careers">Careers</a> | 
        <a href="mailto:support@arshithfresh.com">Support Desk</a>
      </div>
      <div class="footer-text">
        © 2026 Arshith Group of Companies. All rights reserved.<br>
        Corporate HQ: Plot #45, VIP Road, Siripuram, Visakhapatnam, Andhra Pradesh 530003, India.
      </div>
      <div class="confidentiality-notice">
        <strong>CONFIDENTIALITY NOTICE:</strong> This email transmission, and any documents, files or previous email messages attached to it, may contain confidential information that is legally privileged. If you are not the intended recipient, or a person responsible for delivering it to the intended recipient, you are hereby notified that any disclosure, copying, distribution or use of any of the information contained in or attached to this transmission is STRICTLY PROHIBITED. If you have received this transmission in error, please immediately notify the sender by reply email and destroy the original transmission and its attachments without reading or saving in any manner. Thank you for your cooperation.
      </div>
    </div>
  </div>
</body>
</html>
  `;
};

module.exports = {
  // 1. Candidate Application Received (acknowledgment)
  getApplicationReceivedTemplate: (name, role, selectSlotUrl) => {
    const title = "Application Received - Arshith Group";
    const contentHtml = `
      <h2 class="email-title">Application Acknowledgment</h2>
      <p>Dear <strong>${name}</strong>,</p>
      <p>Thank you for submitting your application for the <strong>${role}</strong> internship/job position at Arshith Group. We are excited about your interest in joining our enterprise team.</p>
      <p>Your application profile has been successfully recorded in our recruitment system. The next step is to select your preferred interview slot from our coordinator scheduler.</p>
      <div class="btn-container">
        <a href="${selectSlotUrl}" class="btn-action">Select Interview Slot</a>
      </div>
      <p style="font-size: 13px; color: #64748b; margin-top: 15px;">Please select your slot as soon as possible, as slot capacities are limited and handled on a first-come, first-served basis.</p>
      <p>Best regards,<br><strong>Recruitment Team</strong><br>Arshith Group</p>
    `;
    return getBaseTemplate(title, contentHtml);
  },

  // 2. Candidate Slot Booking Confirmation
  getBookingConfirmationTemplate: (name, date, startTime, endTime, lobbyUrl) => {
    const title = "Interview Slot Confirmed - Arshith Group";
    const contentHtml = `
      <h2 class="email-title">Interview Confirmation Letter</h2>
      <p>Dear <strong>${name}</strong>,</p>
      <p>We are pleased to confirm that your interview slot has been booked and scheduled successfully.</p>
      <p>Please review your schedule details below:</p>
      <div class="details-box">
        <div class="details-row">
          <span class="details-label">Interview Date:</span>
          <span class="details-value">${date}</span>
        </div>
        <div class="details-row">
          <span class="details-label">Time Window:</span>
          <span class="details-value">${startTime} - ${endTime}</span>
        </div>
        <div class="details-row">
          <span class="details-label">Access Method:</span>
          <span class="details-value">Unique Lobby Token URL</span>
        </div>
      </div>
      <p><strong>Important Instructions:</strong></p>
      <ul>
        <li>You will ONLY be permitted to enter the waiting queue and meet the recruiter during your assigned time window.</li>
        <li>Access will be blocked before the start time and after the end time.</li>
        <li>Please keep your unique access link secure. Do not share this link.</li>
      </ul>
      <div class="btn-container">
        <a href="${lobbyUrl}" class="btn-action">Go to Interview Lobby</a>
      </div>
      <p>Best regards,<br><strong>Recruitment Coordinator Office</strong><br>Arshith Group</p>
    `;
    return getBaseTemplate(title, contentHtml);
  },

  // 3. Recruiter Notification about Slot Selected
  getRecruiterSlotSelectedTemplate: (candidateName, candidateEmail, role, date, startTime, endTime) => {
    const title = "New Interview Scheduled - Arshith Group";
    const contentHtml = `
      <h2 class="email-title">New Interview Booking Recorded</h2>
      <p>Dear Recruiter,</p>
      <p>A new candidate has successfully selected an interview slot for evaluation.</p>
      <div class="details-box">
        <div class="details-row">
          <span class="details-label">Candidate Name:</span>
          <span class="details-value">${candidateName}</span>
        </div>
        <div class="details-row">
          <span class="details-label">Email Address:</span>
          <span class="details-value">${candidateEmail}</span>
        </div>
        <div class="details-row">
          <span class="details-label">Applied Role:</span>
          <span class="details-value">${role}</span>
        </div>
        <div class="details-row">
          <span class="details-label">Selected Date:</span>
          <span class="details-value">${date}</span>
        </div>
        <div class="details-row">
          <span class="details-label">Time Window:</span>
          <span class="details-value">${startTime} - ${endTime}</span>
        </div>
      </div>
      <p>This booking has been added to your coordinator records. Please open your dashboard to track and admit this candidate when their session begins.</p>
      <p>Best regards,<br><strong>System Automation Registry</strong><br>Arshith Group</p>
    `;
    return getBaseTemplate(title, contentHtml);
  },

  // 4. Candidate Admitted (Starting Now)
  getCandidateAdmittedTemplate: (name, meetLink) => {
    const title = "Your Interview is Starting Now!";
    const contentHtml = `
      <h2 class="email-title">Recruiter is Ready to Connect</h2>
      <p>Dear <strong>${name}</strong>,</p>
      <p>You have been admitted by the recruiter to your interview session. The coordinator is waiting for you in the Google Meet room.</p>
      <p>Please click the action button below to join the Google Meet room immediately:</p>
      <div class="btn-container">
        <a href="${meetLink}" class="btn-action" style="background: #10b981; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2);">Join Google Meet Session</a>
      </div>
      <p>Ensure your camera and microphone are connected and working correctly. Good luck with your interview!</p>
      <p>Best regards,<br><strong>Recruitment Panel</strong><br>Arshith Group</p>
    `;
    return getBaseTemplate(title, contentHtml);
  },

  // 5. Recruiter Candidate Waiting in Lobby
  getRecruiterCandidateWaitingTemplate: (name, email, role, date, timeStr, position) => {
    const title = "Candidate Waiting in Queue";
    const contentHtml = `
      <h2 class="email-title">Candidate Ready in Waiting Queue</h2>
      <p>Dear Recruiter,</p>
      <p>A scheduled candidate has logged into their unique lobby during their valid time window and is waiting for admission.</p>
      <div class="details-box">
        <div class="details-row">
          <span class="details-label">Candidate Name:</span>
          <span class="details-value">${name}</span>
        </div>
        <div class="details-row">
          <span class="details-label">Email:</span>
          <span class="details-value">${email}</span>
        </div>
        <div class="details-row">
          <span class="details-label">Applied Role:</span>
          <span class="details-value">${role}</span>
        </div>
        <div class="details-row">
          <span class="details-label">Assigned Slot:</span>
          <span class="details-value">${date} (${timeStr})</span>
        </div>
        <div class="details-row">
          <span class="details-label">Queue Position:</span>
          <span class="details-value">Position #${position}</span>
        </div>
      </div>
      <p>Please open the Recruiter Dashboard to admit this candidate to the session.</p>
      <p>Best regards,<br><strong>Queue Monitor System</strong><br>Arshith Group</p>
    `;
    return getBaseTemplate(title, contentHtml);
  },

  // 6. Recruiter Candidate Joined Meet Notification
  getRecruiterCandidateJoinedMeetTemplate: (name, email, role) => {
    const title = "Candidate Entered Google Meet";
    const contentHtml = `
      <h2 class="email-title">Candidate Joined Meeting Room</h2>
      <p>Dear Recruiter,</p>
      <p>Candidate <strong>${name}</strong> (${email}) has clicked the <strong>Join Google Meet</strong> button in their waiting room and is entering the meeting room.</p>
      <p>Please join the session immediately to start the interview.</p>
      <div class="details-box">
        <div class="details-row">
          <span class="details-label">Candidate:</span>
          <span class="details-value">${name}</span>
        </div>
        <div class="details-row">
          <span class="details-label">Applied Role:</span>
          <span class="details-value">${role}</span>
        </div>
      </div>
      <p>Best regards,<br><strong>Lobby Coordinator</strong><br>Arshith Group</p>
    `;
    return getBaseTemplate(title, contentHtml);
  }
};
