import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

export default function InterviewLobby() {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(null);
  const [validation, setValidation] = useState("");
  
  // Queue state
  const [queueStatus, setQueueStatus] = useState(null);
  const [joinedQueue, setJoinedQueue] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const socketRef = useRef(null);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

  useEffect(() => {
    validateToken();
  }, [token]);

  // Handle Socket.IO connection when booking is loaded and validation is valid
  useEffect(() => {
    if (!booking || validation !== "VALID") return;

    const socket = io(apiUrl);
    socketRef.current = socket;

    socket.on("connect", () => {
      setSocketConnected(true);
      console.log("Connected to Socket.IO Server");
      // Register this candidate room
      socket.emit("joinCandidate", booking.candidate_id);
    });

    socket.on("disconnect", () => {
      setSocketConnected(false);
    });

    // Listen to waiting queue updates
    socket.on("queueUpdate", (data) => {
      if (data.candidate_id === booking.candidate_id) {
        setQueueStatus(data);
        setJoinedQueue(true);
      }
    });

    // Listen to admission
    socket.on("admitted", ({ meetLink }) => {
      setBooking((prev) => ({
        ...prev,
        session_status: "IN_INTERVIEW",
        meet_link: meetLink
      }));
      setQueueStatus((prev) => prev ? { ...prev, status: "IN_INTERVIEW", meet_link: meetLink } : null);
    });

    // Listen to interview final status changes
    socket.on("statusChanged", ({ status }) => {
      setBooking((prev) => ({
        ...prev,
        session_status: status
      }));
    });

    // Check if candidate is already in queue
    fetchQueueStatus();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [booking, validation]);

  const validateToken = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/interview/${token}`);
      const data = await res.json();
      
      if (res.ok) {
        setValidation(data.validation);
        setBooking(data.booking);
        
        // If candidate is already admitted or completed, show it
        if (data.booking.session_status && data.booking.session_status !== "SCHEDULED" && data.booking.session_status !== "WAITING") {
          setJoinedQueue(true);
        }
      } else {
        setError(data.message || "Failed to validate access link");
      }
    } catch (err) {
      console.error(err);
      setError("Network Error: Could not connect to recruitment server");
    } finally {
      setLoading(false);
    }
  };

  const fetchQueueStatus = async () => {
    if (!booking) return;
    try {
      const res = await fetch(`${apiUrl}/queue-status/${booking.candidate_id}`);
      if (res.ok) {
        const data = await res.json();
        setQueueStatus(data);
        setJoinedQueue(true);
      }
    } catch (err) {
      console.log("No queue status yet");
    }
  };

  const joinWaitingQueue = async () => {
    if (!booking) return;
    try {
      const res = await fetch(`${apiUrl}/join-queue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidateId: booking.candidate_id, slotId: booking.slot_id })
      });

      const data = await res.json();
      if (res.ok) {
        setQueueStatus(data.queueStatus);
        setJoinedQueue(true);
      } else {
        alert(data.message || "Failed to join queue");
      }
    } catch (err) {
      console.error(err);
      alert("Error joining waiting queue");
    }
  };

  const handleJoinMeet = async () => {
    if (!booking) return;
    try {
      await fetch(`${apiUrl}/join-meet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId: booking.candidate_id,
          slotId: booking.slot_id
        })
      });
    } catch (err) {
      console.error("Error notifying recruiter of join-meet:", err);
    }
  };

  // Helper to format time strings
  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [h, m] = String(timeStr).split(":");
    const hr = parseInt(h);
    const ampm = hr >= 12 ? "PM" : "AM";
    const hr12 = hr % 12 || 12;
    return `${hr12}:${m} ${ampm}`;
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", background: "var(--bg-dark)" }}>
        <div style={{ width: "50px", height: "50px", border: "5px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: "10rem 10% 6rem", minHeight: "80vh" }}>
        <div style={{ background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "var(--radius-lg)", padding: "40px", textAlign: "center" }}>
          <i className="ri-error-warning-line" style={{ fontSize: "50px", color: "#ef4444", marginBottom: "20px", display: "block" }}></i>
          <h2 style={{ fontSize: "28px", color: "var(--text-main)", marginBottom: "12px" }}>Access Denied</h2>
          <p style={{ color: "var(--text-muted)" }}>{error}</p>
        </div>
      </div>
    );
  }

  // State: BEFORE slot starts
  if (validation === "BEFORE" && booking) {
    const startStr = formatTime(booking.slot_start);
    return (
      <div className="container" style={{ padding: "10rem 10% 6rem", minHeight: "80vh" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "40px", textAlign: "center" }}>
          <i className="ri-time-line" style={{ fontSize: "60px", color: "var(--accent)", marginBottom: "20px", display: "block", animation: "pulse 2s infinite" }}></i>
          <h2 style={{ fontSize: "26px", color: "var(--text-main)", marginBottom: "16px" }}>Interview Slot Has Not Started</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: "1.6", marginBottom: "24px" }}>
            Your interview is scheduled for <strong>{booking.slot_date}</strong> at <strong>{startStr} - {formatTime(booking.slot_end)}</strong>.
            <br /><br />
            Please return and open this link during your assigned slot. You cannot enter the queue before this time.
          </p>
          <div style={{ padding: "15px", background: "var(--bg-card)", borderRadius: "var(--radius-md)", fontSize: "13px", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
            Server Time Checked. Entry will be allowed starting {startStr}.
          </div>
          <style>{`@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.08); } 100% { transform: scale(1); } }`}</style>
        </div>
      </div>
    );
  }

  // State: AFTER slot expires
  if (validation === "AFTER" && booking) {
    return (
      <div className="container" style={{ padding: "10rem 10% 6rem", minHeight: "80vh" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", background: "rgba(239, 68, 68, 0.02)", border: "1px solid rgba(239, 68, 68, 0.15)", borderRadius: "var(--radius-lg)", padding: "40px", textAlign: "center" }}>
          <i className="ri-error-warning-fill" style={{ fontSize: "60px", color: "#ef4444", marginBottom: "20px", display: "block" }}></i>
          <h2 style={{ fontSize: "26px", color: "var(--text-main)", marginBottom: "16px", fontWeight: "700" }}>Interview Slot Expired</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: "1.6", marginBottom: "24px" }}>
            Your assigned interview slot ({booking.slot_date} from {formatTime(booking.slot_start)} - {formatTime(booking.slot_end)}) has expired.
            <br /><br />
            You can no longer enter the waiting queue. Please contact the HR coordinator desk for rescheduling.
          </p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", fontSize: "13px", borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
            <div><strong>Email:</strong> support@arshithfresh.com</div>
            <div><strong>Call:</strong> +91 90145 74712</div>
          </div>
        </div>
      </div>
    );
  }

  // State: VALID (Within slot time)
  const isAdmitted = booking?.session_status === "IN_INTERVIEW";
  const finalStatus = booking?.session_status;
  const isFinished = ["COMPLETED", "SELECTED", "REJECTED", "HOLD"].includes(finalStatus);

  return (
    <div className="container" style={{ padding: "10rem 10% 6rem", minHeight: "80vh" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        
        {/* Connection Status indicator */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h2 style={{ fontSize: "28px", color: "var(--text-main)" }}>Interview Room</h2>
            <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>Candidate: {booking?.candidate_name} ({booking?.role_applied})</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", background: socketConnected ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)", color: socketConnected ? "#10b981" : "#ef4444", padding: "6px 14px", borderRadius: "30px", fontWeight: "600" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: socketConnected ? "#10b981" : "#ef4444", display: "inline-block", animation: socketConnected ? "pulse-green 1.5s infinite" : "none" }}></span>
            {socketConnected ? "Real-time Live" : "Connecting..."}
          </div>
        </div>

        {/* 1. If not joined queue yet */}
        {!joinedQueue && !isAdmitted && !isFinished && (
          <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "40px", textAlign: "center", boxShadow: "0 20px 40px rgba(0,0,0,0.03)" }}>
            <i className="ri-user-voice-line" style={{ fontSize: "55px", color: "var(--accent)", marginBottom: "20px", display: "block" }}></i>
            <h3 style={{ fontSize: "22px", marginBottom: "12px", color: "var(--text-main)" }}>Enter WAITING Queue</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "24px", lineHeight: "1.6" }}>
              Your scheduled interview window is open! You must join the queue to notify the recruiter that you are ready. The recruiter will admit candidates one by one.
            </p>
            <button onClick={joinWaitingQueue} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Join Waitlist Queue
            </button>
          </div>
        )}

        {/* 2. Joined queue & waiting for admission */}
        {joinedQueue && !isAdmitted && !isFinished && (
          <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "40px", textAlign: "center", boxShadow: "0 20px 40px rgba(0,0,0,0.03)" }}>
            
            {/* Spinning Radar Loader */}
            <div style={{ position: "relative", width: "90px", height: "90px", margin: "0 auto 25px" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, border: "4px solid rgba(37,99,235,0.1)", borderRadius: "50%" }}></div>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, border: "4px solid transparent", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 1.5s linear infinite" }}></div>
              <div style={{ position: "absolute", top: "20px", left: "20px", right: "20px", bottom: "20px", background: "rgba(37,99,235,0.06)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", fontSize: "24px" }}>
                <i className="ri-hourglass-line"></i>
              </div>
            </div>

            <h3 style={{ fontSize: "24px", color: "var(--text-main)", marginBottom: "8px" }}>Waiting in Queue</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "30px" }}>The recruiter has been notified. Please do not close this window.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", padding: "20px", borderRadius: "var(--radius-md)" }}>
                <span style={{ display: "block", fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Current Position</span>
                <span style={{ fontSize: "28px", fontWeight: "700", color: "var(--accent)" }}>{queueStatus?.position || "1"}</span>
              </div>
              <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", padding: "20px", borderRadius: "var(--radius-md)" }}>
                <span style={{ display: "block", fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>Est. Wait Time</span>
                <span style={{ fontSize: "28px", fontWeight: "700", color: "var(--text-main)" }}>
                  {queueStatus?.estimated_wait_time === 0 ? "You're Next!" : `${queueStatus?.estimated_wait_time || "15"} Mins`}
                </span>
              </div>
            </div>

            <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              Estimated wait is 15 minutes per candidate ahead of you. Real-time notifications will update this page automatically.
            </p>
          </div>
        )}

        {/* 3. Admitted (In Interview) - Show Google Meet Link */}
        {isAdmitted && (
          <div style={{ background: "rgba(16, 185, 129, 0.02)", border: "2px solid #10b981", borderRadius: "var(--radius-lg)", padding: "40px", textAlign: "center", boxShadow: "0 25px 50px rgba(16, 185, 129, 0.08)" }}>
            <div style={{ width: "70px", height: "70px", background: "rgba(16, 185, 129, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "36px", color: "#10b981", animation: "ping-green 1.8s infinite" }}>
              <i className="ri-live-line"></i>
            </div>
            
            <h3 style={{ fontSize: "26px", color: "var(--text-main)", marginBottom: "12px" }}>Recruiter is Ready!</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "15px", marginBottom: "30px", lineHeight: "1.6" }}>
              You have been admitted by the recruiter. Click the button below to join your Google Meet video interview session immediately.
            </p>

            <a 
              href={booking?.meet_link} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={handleJoinMeet}
              className="btn btn-primary" 
              style={{ 
                width: "100%", 
                justifyContent: "center", 
                background: "#10b981", 
                borderColor: "#10b981", 
                fontSize: "18px", 
                padding: "18px 30px", 
                boxShadow: "0 10px 20px rgba(16, 185, 129, 0.2)" 
              }}
            >
              <i className="ri-video-chat-line" style={{ marginRight: "8px" }}></i>
              Join Google Meet Session
            </a>
          </div>
        )}

        {/* 4. Finished State (Complete / Selected / Rejected / Hold) */}
        {isFinished && (
          <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "40px", textAlign: "center" }}>
            {finalStatus === "COMPLETED" && (
              <>
                <i className="ri-checkbox-circle-fill" style={{ fontSize: "60px", color: "var(--accent)", marginBottom: "20px", display: "block" }}></i>
                <h3 style={{ fontSize: "24px", color: "var(--text-main)", marginBottom: "12px" }}>Interview Concluded</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: "1.6" }}>
                  Your interview session has been completed successfully. Thank you for your time and interest in Arshith Group. Our HR department will review your evaluation notes and reach out to you shortly.
                </p>
              </>
            )}

            {finalStatus === "SELECTED" && (
              <>
                <i className="ri-award-fill" style={{ fontSize: "65px", color: "#10b981", marginBottom: "20px", display: "block", animation: "bounce 1.5s infinite" }}></i>
                <h3 style={{ fontSize: "26px", color: "#10b981", marginBottom: "12px" }}>Congratulations!</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: "1.6" }}>
                  We are excited to inform you that you have been selected for the internship position!
                  <br /><br />
                  Our recruiting coordinator will contact you via email and phone with the official offer details and onboarding documents. Welcome to the team!
                </p>
              </>
            )}

            {finalStatus === "REJECTED" && (
              <>
                <i className="ri-mail-open-line" style={{ fontSize: "60px", color: "#6b7280", marginBottom: "20px", display: "block" }}></i>
                <h3 style={{ fontSize: "22px", color: "var(--text-main)", marginBottom: "12px" }}>Evaluation Complete</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: "1.6" }}>
                  Thank you for taking the time to interview with Arshith Group. While we appreciate your interest and qualifications, we have decided to move forward with other candidates whose profiles align more closely with our current requirements.
                  <br /><br />
                  We will keep your details on file and contact you if another suitable opening matches your skillset. We wish you the best in your career pursuits.
                </p>
              </>
            )}

            {finalStatus === "HOLD" && (
              <>
                <i className="ri-pause-circle-line" style={{ fontSize: "60px", color: "#f59e0b", marginBottom: "20px", display: "block" }}></i>
                <h3 style={{ fontSize: "24px", color: "#f59e0b", marginBottom: "12px" }}>On Hold</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: "1.6" }}>
                  Your application and interview evaluation have been placed on hold. The recruitment team is currently reviewing additional profiles and will provide a status update as soon as a final decision is made.
                  <br /><br />
                  Thank you for your patience. Please feel free to reach out to our coordinator desk if you have any questions.
                </p>
              </>
            )}
          </div>
        )}

      </div>
      
      {/* Styles for loaders and pulse indicators */}
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes pulse-green {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        @keyframes ping-green {
          0% { transform: scale(0.95); opacity: 0.9; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
