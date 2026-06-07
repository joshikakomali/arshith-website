import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function RecruiterDashboard() {
  const [passcode, setPasscode] = useState(localStorage.getItem("recruiter_passcode") || "");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeError, setPasscodeError] = useState("");
  
  // Dashboard stats & candidates
  const [candidates, setCandidates] = useState([]);
  const [stats, setStats] = useState({ totalApplied: 0, scheduled: 0, waiting: 0, inInterview: 0, completed: 0 });
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  // Slot management state
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({ date: "", start_time: "", end_time: "", capacity: 5 });
  const [showSlotPanel, setShowSlotPanel] = useState(false);

  const socketRef = useRef(null);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

  // Login verification
  useEffect(() => {
    if (passcode) {
      verifyPasscode();
    }
  }, []);

  // Socket.IO real-time binding
  useEffect(() => {
    if (!isAuthenticated) return;

    // Fetch initial data
    fetchDashboardData();
    fetchSlotsData();

    // Setup Socket
    const socket = io(apiUrl);
    socketRef.current = socket;

    socket.on("connect", () => {
      setSocketConnected(true);
      console.log("[SOCKET] Dashboard connected");
      socket.emit("joinRecruiter");
    });

    socket.on("disconnect", () => {
      setSocketConnected(false);
    });

    // Refresh when socket alerts of database change
    socket.on("dashboardUpdate", () => {
      console.log("[SOCKET] Dashboard change notified, refreshing data...");
      fetchDashboardData();
      fetchSlotsData();
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [isAuthenticated]);

  const verifyPasscode = async () => {
    setLoading(true);
    setPasscodeError("");
    try {
      const res = await fetch(`${apiUrl}/recruiter/dashboard?passcode=${passcode}`);
      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem("recruiter_passcode", passcode);
      } else {
        setPasscodeError("Invalid passcode. Access Denied.");
        localStorage.removeItem("recruiter_passcode");
      }
    } catch (err) {
      console.error(err);
      setPasscodeError("Server connection error. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("recruiter_passcode");
    setPasscode("");
    setIsAuthenticated(false);
  };

  const fetchDashboardData = async () => {
    try {
      const res = await fetch(`${apiUrl}/recruiter/dashboard?passcode=${passcode}`);
      if (res.ok) {
        const data = await res.json();
        setCandidates(data.candidates);
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  const fetchSlotsData = async () => {
    try {
      const res = await fetch(`${apiUrl}/slots`);
      if (res.ok) {
        const data = await res.json();
        setSlots(data);
      }
    } catch (err) {
      console.error("Error fetching slots:", err);
    }
  };

  const handleAdmit = async (candidateId, slotId) => {
    try {
      const res = await fetch(`${apiUrl}/admit-candidate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-passcode": passcode
        },
        body: JSON.stringify({ candidateId, slotId })
      });
      if (res.ok) {
        console.log("Candidate admitted.");
        fetchDashboardData();
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to admit candidate");
      }
    } catch (err) {
      console.error(err);
      alert("Error admitting candidate");
    }
  };

  const handleConclude = async (candidateId, slotId, status) => {
    try {
      const res = await fetch(`${apiUrl}/complete-interview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-passcode": passcode
        },
        body: JSON.stringify({ candidateId, slotId, status })
      });
      if (res.ok) {
        console.log(`Candidate marked as ${status}`);
        fetchDashboardData();
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to update interview");
      }
    } catch (err) {
      console.error(err);
      alert("Error concluding interview");
    }
  };

  const handleCreateSlot = async (e) => {
    e.preventDefault();
    if (!newSlot.date || !newSlot.start_time || !newSlot.end_time || !newSlot.capacity) {
      alert("Please fill all fields");
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/recruiter/slots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-passcode": passcode
        },
        body: JSON.stringify(newSlot)
      });
      if (res.ok) {
        setNewSlot({ date: "", start_time: "", end_time: "", capacity: 5 });
        setShowSlotPanel(false);
        fetchSlotsData();
        fetchDashboardData();
      } else {
        alert("Failed to create slot");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating slot");
    }
  };

  const handleDeleteSlot = async (slotId) => {
    if (!window.confirm("Are you sure you want to delete this slot? All bookings will be affected.")) return;
    try {
      const res = await fetch(`${apiUrl}/recruiter/slots/${slotId}`, {
        method: "DELETE",
        headers: {
          "x-passcode": passcode
        }
      });
      if (res.ok) {
        fetchSlotsData();
        fetchDashboardData();
      } else {
        alert("Failed to delete slot");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting slot");
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

  // Recruiter Passcode Authentication view
  if (!isAuthenticated) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh", background: "var(--bg-dark)", padding: "20px" }}>
        <div style={{ maxWidth: "450px", width: "100%", background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "40px", boxShadow: "0 20px 50px rgba(0,0,0,0.05)", marginTop: "80px" }}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div style={{ width: "65px", height: "65px", background: "rgba(37, 99, 235, 0.08)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "30px", color: "var(--accent)" }}>
              <i className="ri-shield-keyhole-line"></i>
            </div>
            <h2 style={{ fontSize: "28px", color: "var(--text-main)", marginBottom: "6px" }}>Recruiter Access</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Enter passcode to access candidate waiting queues.</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); verifyPasscode(); }}>
            <div className="form-group-luxury" style={{ marginBottom: "20px" }}>
              <input
                type="password"
                placeholder="Recruiter Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
                style={{ textAlign: "center", letterSpacing: "4px", fontSize: "18px" }}
              />
            </div>

            {passcodeError && (
              <p style={{ color: "#ef4444", fontSize: "13px", textAlign: "center", marginBottom: "15px", fontWeight: "500" }}>
                {passcodeError}
              </p>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={loading}>
              {loading ? "Verifying..." : "Verify & Open Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg-dark)", minHeight: "100vh", padding: "100px 6% 60px" }}>
      
      {/* Top Action Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "20px", marginBottom: "40px" }}>
        <div>
          <h1 style={{ fontSize: "32px", color: "var(--text-main)" }}>Recruiter Dashboard</h1>
          <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>Manage waiting list queues, slots, and interview completions in real-time.</p>
        </div>

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          {/* Socket Connection Status */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", background: socketConnected ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)", color: socketConnected ? "#10b981" : "#ef4444", padding: "8px 16px", borderRadius: "30px", fontWeight: "600" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: socketConnected ? "#10b981" : "#ef4444", display: "inline-block", animation: socketConnected ? "pulse-green 1.5s infinite" : "none" }}></span>
            {socketConnected ? "Real-time Live Sync" : "Syncing..."}
          </div>

          <button onClick={() => setShowSlotPanel(!showSlotPanel)} className="btn btn-secondary" style={{ padding: "10px 20px", fontSize: "13px" }}>
            <i className="ri-calendar-event-line" style={{ marginRight: "4px" }}></i>
            Manage Slots
          </button>

          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: "10px 20px", fontSize: "13px", borderColor: "rgba(239,68,68,0.3)", color: "#ef4444" }}>
            <i className="ri-logout-box-r-line"></i>
          </button>
        </div>
      </div>

      {/* Slots Management Dialog/Drawer */}
      {showSlotPanel && (
        <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "30px", marginBottom: "35px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "15px", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "20px", color: "var(--text-main)" }}>Manage Interview Slots</h3>
            <button onClick={() => setShowSlotPanel(false)} style={{ border: "none", background: "none", fontSize: "18px", cursor: "pointer", color: "var(--text-muted)" }}>✕</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "40px" }}>
            {/* Create Slot Form */}
            <form onSubmit={handleCreateSlot} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <h4 style={{ fontSize: "16px", color: "var(--accent)", marginBottom: "5px" }}>Create New Slot</h4>
              <div className="form-group-luxury">
                <input 
                  type="date" 
                  value={newSlot.date} 
                  onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })} 
                  required 
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                <div className="form-group-luxury">
                  <label style={{ fontSize: "11px", color: "var(--text-muted)" }}>Start Time</label>
                  <input 
                    type="time" 
                    value={newSlot.start_time} 
                    onChange={(e) => setNewSlot({ ...newSlot, start_time: e.target.value })} 
                    required 
                  />
                </div>
                <div className="form-group-luxury">
                  <label style={{ fontSize: "11px", color: "var(--text-muted)" }}>End Time</label>
                  <input 
                    type="time" 
                    value={newSlot.end_time} 
                    onChange={(e) => setNewSlot({ ...newSlot, end_time: e.target.value })} 
                    required 
                  />
                </div>
              </div>
              <div className="form-group-luxury">
                <input 
                  type="number" 
                  placeholder="Capacity (e.g. 5)" 
                  value={newSlot.capacity} 
                  onChange={(e) => setNewSlot({ ...newSlot, capacity: parseInt(e.target.value) })} 
                  required 
                  min="1"
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ justifyContent: "center" }}>Create Slot</button>
            </form>

            {/* List Active Slots */}
            <div style={{ maxHeight: "350px", overflowY: "auto", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "15px" }}>
              <h4 style={{ fontSize: "16px", color: "var(--text-main)", marginBottom: "15px" }}>Active Slots</h4>
              {slots.length === 0 ? (
                <p style={{ fontSize: "13px", color: "var(--text-muted)", textAlign: "center" }}>No active slots. Add one on the left.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {slots.map((s) => (
                    <div key={s.slot_id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 15px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "13px" }}>
                      <div>
                        <strong>{s.date}</strong> | {formatTime(s.start_time)} - {formatTime(s.end_time)}
                        <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Capacity: {s.capacity} | Status: {s.status}</div>
                      </div>
                      <button 
                        onClick={() => handleDeleteSlot(s.slot_id)} 
                        style={{ border: "none", background: "rgba(239,68,68,0.1)", color: "#ef4444", padding: "6px 12px", borderRadius: "20px", fontSize: "11px", cursor: "pointer", fontWeight: "600" }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Statistics Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "20px", marginBottom: "40px" }}>
        
        {/* Stat 1 */}
        <div style={{ background: "#fff", border: "1px solid var(--border)", padding: "20px", borderRadius: "var(--radius-md)" }}>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Applicants</span>
          <h3 style={{ fontSize: "28px", color: "var(--text-main)", marginTop: "6px" }}>{stats.totalApplied}</h3>
        </div>

        {/* Stat 2 */}
        <div style={{ background: "#fff", border: "1px solid var(--border)", padding: "20px", borderRadius: "var(--radius-md)" }}>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Booked Slots</span>
          <h3 style={{ fontSize: "28px", color: "var(--text-main)", marginTop: "6px" }}>{stats.scheduled}</h3>
        </div>

        {/* Stat 3 */}
        <div style={{ background: "#fff", border: "1px solid var(--border)", padding: "20px", borderRadius: "var(--radius-md)", borderLeft: "4px solid #f59e0b" }}>
          <span style={{ fontSize: "12px", color: "#f59e0b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Waiting in Queue</span>
          <h3 style={{ fontSize: "28px", color: "#f59e0b", marginTop: "6px" }}>{stats.waiting}</h3>
        </div>

        {/* Stat 4 */}
        <div style={{ background: "#fff", border: "1px solid var(--border)", padding: "20px", borderRadius: "var(--radius-md)", borderLeft: "4px solid #10b981" }}>
          <span style={{ fontSize: "12px", color: "#10b981", textTransform: "uppercase", letterSpacing: "0.05em" }}>In Interview</span>
          <h3 style={{ fontSize: "28px", color: "#10b981", marginTop: "6px" }}>{stats.inInterview}</h3>
        </div>

        {/* Stat 5 */}
        <div style={{ background: "#fff", border: "1px solid var(--border)", padding: "20px", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--accent)" }}>
          <span style={{ fontSize: "12px", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Concluded</span>
          <h3 style={{ fontSize: "28px", color: "var(--accent)", marginTop: "6px" }}>{stats.completed}</h3>
        </div>
      </div>

      {/* Main Queue Management Table */}
      <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "0 15px 30px rgba(0,0,0,0.02)" }}>
        <div style={{ padding: "20px 30px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "20px", color: "var(--text-main)" }}>Candidates Queue Management</h3>
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Total records: {candidates.length}</span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border)", color: "var(--text-main)", fontWeight: "600" }}>
                <th style={{ padding: "15px 20px" }}>Candidate Name</th>
                <th style={{ padding: "15px 20px" }}>Email / Phone</th>
                <th style={{ padding: "15px 20px" }}>Applied Role</th>
                <th style={{ padding: "15px 20px" }}>Selected Slot</th>
                <th style={{ padding: "15px 20px" }}>Join Time</th>
                <th style={{ padding: "15px 20px" }}>Position</th>
                <th style={{ padding: "15px 20px" }}>Status</th>
                <th style={{ padding: "15px 20px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>
                    No candidates found. Applications or bookings will appear here.
                  </td>
                </tr>
              ) : (
                candidates.map((c) => {
                  
                  // Status Pill Styling
                  let pillBg = "rgba(0,0,0,0.05)";
                  let pillColor = "var(--text-muted)";
                  let isPulsing = false;

                  if (c.status === "WAITING") {
                    pillBg = "rgba(245, 158, 11, 0.15)";
                    pillColor = "#d97706";
                    isPulsing = true;
                  } else if (c.status === "IN_INTERVIEW") {
                    pillBg = "rgba(16, 185, 129, 0.15)";
                    pillColor = "#059669";
                    isPulsing = true;
                  } else if (c.status === "COMPLETED" || c.status === "SELECTED") {
                    pillBg = "rgba(37, 99, 235, 0.1)";
                    pillColor = "var(--accent)";
                  } else if (c.status === "REJECTED") {
                    pillBg = "rgba(239, 68, 68, 0.1)";
                    pillColor = "#ef4444";
                  } else if (c.status === "HOLD") {
                    pillBg = "rgba(107, 114, 128, 0.1)";
                    pillColor = "#4b5563";
                  }

                  return (
                    <tr key={c.booking_id} style={{ borderBottom: "1px solid var(--border)", verticalAlign: "middle" }}>
                      <td style={{ padding: "20px" }}>
                        <div style={{ fontWeight: "600", color: "var(--text-main)" }}>{c.candidate_name}</div>
                        <a 
                          href={`${apiUrl}${c.meet_link ? "" : ""}`} // fallback resume link
                          onClick={(e) => {
                            // If resume is PDF, open in new tab
                            e.preventDefault();
                            if (c.candidate_id) {
                              // Let's retrieve candidate to open resume URL
                              fetch(`${apiUrl}/recruiter/dashboard?passcode=${passcode}`)
                                .then(res => res.json())
                                .then(data => {
                                  const cand = data.candidates.find(item => item.candidate_id === c.candidate_id);
                                  if (cand && cand.meet_link) {
                                    // wait, let's open the candidate resume
                                  }
                                });
                              
                              // We can open the resume in a new window:
                              window.open(`${apiUrl}/uploads/resume-${c.candidate_id}.pdf`, "_blank");
                            }
                          }}
                          style={{ fontSize: "11px", color: "var(--accent)", textDecoration: "underline", cursor: "pointer" }}
                        >
                          View PDF Resume
                        </a>
                      </td>
                      <td style={{ padding: "20px" }}>
                        <div style={{ color: "var(--text-main)" }}>{c.candidate_email}</div>
                        <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{c.candidate_phone}</div>
                      </td>
                      <td style={{ padding: "20px" }}>
                        <span style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-main)" }}>{c.role_applied}</span>
                      </td>
                      <td style={{ padding: "20px" }}>
                        <div style={{ fontSize: "13px", color: "var(--text-main)", maxWidth: "150px" }}>{c.slot_date}</div>
                      </td>
                      <td style={{ padding: "20px" }}>
                        <div style={{ color: "var(--text-main)" }}>
                          {c.join_time ? new Date(c.join_time).toLocaleTimeString() : "-"}
                        </div>
                      </td>
                      <td style={{ padding: "20px", fontWeight: "700", color: "var(--accent)" }}>
                        {c.queue_position ? `#${c.queue_position}` : "-"}
                      </td>
                      <td style={{ padding: "20px" }}>
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "6px 14px",
                          borderRadius: "30px",
                          background: pillBg,
                          color: pillColor,
                          fontSize: "12px",
                          fontWeight: "700"
                        }}>
                          {isPulsing && (
                            <span style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: pillColor,
                              animation: "pulse-tag 1.2s infinite"
                            }}></span>
                          )}
                          {c.status}
                        </span>
                      </td>
                      
                      {/* Action buttons */}
                      <td style={{ padding: "20px", textAlign: "right" }}>
                        
                        {/* WAITING status -> Admit button */}
                        {c.status === "WAITING" && (
                          <button 
                            onClick={() => handleAdmit(c.candidate_id, c.slot_id)} 
                            className="btn btn-primary"
                            style={{ padding: "8px 18px", fontSize: "12px", borderRadius: "30px", background: "#10b981", borderColor: "#10b981" }}
                          >
                            <i className="ri-login-box-line" style={{ marginRight: "4px" }}></i>
                            Admit Candidate
                          </button>
                        )}

                        {/* IN_INTERVIEW status -> status conclusions */}
                        {c.status === "IN_INTERVIEW" && (
                          <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", alignItems: "center" }}>
                            
                            {/* Join Meet */}
                            {c.meet_link && (
                              <a 
                                href={c.meet_link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", background: "#10b981", color: "#fff", padding: "6px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", cursor: "pointer" }}
                              >
                                <i className="ri-video-chat-line" style={{ marginRight: "4px" }}></i>
                                Join Meet
                              </a>
                            )}

                            {/* Complete */}
                            <button 
                              onClick={() => handleConclude(c.candidate_id, c.slot_id, "COMPLETED")} 
                              style={{ border: "none", background: "rgba(37,99,235,0.1)", color: "var(--accent)", padding: "6px 12px", borderRadius: "20px", fontSize: "11px", cursor: "pointer", fontWeight: "600" }}
                            >
                              Complete
                            </button>

                            {/* Select */}
                            <button 
                              onClick={() => handleConclude(c.candidate_id, c.slot_id, "SELECTED")} 
                              style={{ border: "none", background: "rgba(16,185,129,0.1)", color: "#10b981", padding: "6px 12px", borderRadius: "20px", fontSize: "11px", cursor: "pointer", fontWeight: "600" }}
                            >
                              Select
                            </button>

                            {/* Hold */}
                            <button 
                              onClick={() => handleConclude(c.candidate_id, c.slot_id, "HOLD")} 
                              style={{ border: "none", background: "rgba(245,158,11,0.1)", color: "#d97706", padding: "6px 12px", borderRadius: "20px", fontSize: "11px", cursor: "pointer", fontWeight: "600" }}
                            >
                              Hold
                            </button>

                            {/* Reject */}
                            <button 
                              onClick={() => handleConclude(c.candidate_id, c.slot_id, "REJECTED")} 
                              style={{ border: "none", background: "rgba(239,68,68,0.1)", color: "#ef4444", padding: "6px 12px", borderRadius: "20px", fontSize: "11px", cursor: "pointer", fontWeight: "600" }}
                            >
                              Reject
                            </button>

                          </div>
                        )}

                        {/* Other Concluded Statuses */}
                        {!["WAITING", "IN_INTERVIEW"].includes(c.status) && (
                          <span style={{ fontSize: "12px", color: "var(--text-muted)", fontStyle: "italic" }}>Concluded</span>
                        )}

                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Global CSS for tagging animations */}
      <style>{`
        @keyframes pulse-green {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        @keyframes pulse-tag {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
