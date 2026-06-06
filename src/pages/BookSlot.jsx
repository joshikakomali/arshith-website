import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function BookSlot() {
  const [searchParams] = useSearchParams();
  const candidateId = searchParams.get("candidateId");
  const [slots, setSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingResult, setBookingResult] = useState(null);
  const [error, setError] = useState("");
  
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

  useEffect(() => {
    if (!candidateId) {
      setError("Invalid Access: candidateId is missing. Please apply first.");
      setLoading(false);
      return;
    }
    fetchSlots();
  }, [candidateId]);

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/slots`);
      if (res.ok) {
        const data = await res.json();
        setSlots(data);
      } else {
        setError("Failed to load interview slots");
      }
    } catch (err) {
      console.error(err);
      setError("Network Error: Make sure your server is running on port 5001");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedSlotId) {
      alert("Please select an interview slot.");
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/book-slot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidateId, slotId: selectedSlotId })
      });

      const data = await res.json();
      if (res.ok) {
        setBookingResult(data);
      } else {
        alert(data.message || "Failed to book slot.");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error - Ensure backend is running on port 5001");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Unique link copied to clipboard!");
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
          <h2 style={{ fontSize: "28px", color: "var(--text-main)", marginBottom: "12px" }}>Access Blocked</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>{error}</p>
          <a href="/internship-details" className="btn btn-primary">Go to Application Form</a>
        </div>
      </div>
    );
  }

  if (bookingResult) {
    return (
      <div className="container" style={{ padding: "10rem 10% 6rem", minHeight: "80vh" }}>
        <div style={{ maxWidth: "650px", margin: "0 auto", background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "40px", boxShadow: "0 20px 40px rgba(0,0,0,0.04)" }}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div style={{ width: "70px", height: "70px", background: "rgba(16, 185, 129, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "36px", color: "#10b981" }}>
              <i className="ri-checkbox-circle-line"></i>
            </div>
            <h2 style={{ fontSize: "32px", color: "var(--text-main)", marginBottom: "8px" }}>Booking Confirmed!</h2>
            <p style={{ color: "var(--text-muted)" }}>Your interview slot has been reserved successfully.</p>
          </div>

          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "20px", marginBottom: "30px" }}>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "15px", textAlign: "center" }}>
              <strong>CRITICAL INSTRUCTION:</strong> You will only be permitted to join the queue during your selected slot. Please save your unique access link below:
            </p>
            
            <div style={{ display: "flex", gap: "10px", background: "#fff", border: "1px solid var(--border)", borderRadius: "30px", padding: "6px 6px 6px 16px", alignItems: "center" }}>
              <input 
                type="text" 
                readOnly 
                value={bookingResult.interviewLink} 
                style={{ flex: 1, border: "none", outline: "none", fontSize: "13px", color: "var(--text-main)", fontWeight: "500" }} 
              />
              <button 
                onClick={() => copyToClipboard(bookingResult.interviewLink)}
                className="btn btn-secondary" 
                style={{ padding: "8px 16px", borderRadius: "20px", fontSize: "12px", border: "none", background: "var(--bg-card-hover)" }}
              >
                Copy Link
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <a 
              href={`/interview/${bookingResult.token}`} 
              className="btn btn-primary" 
              style={{ justifyContent: "center" }}
            >
              Enter Interview Lobby
            </a>
            <p style={{ textAlign: "center", fontSize: "12px", color: "var(--text-muted)" }}>
              We've also sent this unique link and confirmation details to your registered email.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "10rem 10% 6rem", minHeight: "90vh" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="section-header" style={{ textAlign: "center", margin: "0 auto 3rem" }}>
          <span className="eyebrow" style={{ display: "inline-block" }}>STEP 02</span>
          <h2>Select Interview Slot</h2>
          <p style={{ color: "var(--text-muted)" }}>
            Please select an interview slot. Double-check your slot times, as you can only join the waiting queue during the scheduled period.
          </p>
        </div>

        <form onSubmit={handleBooking}>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "35px" }}>
            {slots.map((slot) => {
              const isFull = slot.remaining_capacity <= 0 || slot.status === "UNAVAILABLE";
              const isSelected = selectedSlotId === slot.slot_id;

              // Format date nicely
              const slotDate = new Date(slot.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              });

              // Format times (removing seconds)
              const formatTime = (timeStr) => {
                const [h, m] = timeStr.split(":");
                const hr = parseInt(h);
                const ampm = hr >= 12 ? "PM" : "AM";
                const hr12 = hr % 12 || 12;
                return `${hr12}:${m} ${ampm}`;
              };

              const timeRange = `${formatTime(slot.start_time)} - ${formatTime(slot.end_time)}`;

              return (
                <div 
                  key={slot.slot_id}
                  onClick={() => !isFull && setSelectedSlotId(slot.slot_id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "24px 30px",
                    borderRadius: "var(--radius-lg)",
                    border: isSelected 
                      ? "2px solid var(--accent)" 
                      : "1px solid var(--border)",
                    background: isFull 
                      ? "rgba(0,0,0,0.02)" 
                      : isSelected 
                        ? "rgba(37, 99, 235, 0.03)" 
                        : "var(--bg-card)",
                    cursor: isFull ? "not-allowed" : "pointer",
                    transition: "var(--transition-fast)",
                    opacity: isFull ? 0.6 : 1,
                  }}
                  className="listed-card"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      border: isSelected ? "6px solid var(--accent)" : "2px solid var(--border)",
                      background: "#fff",
                      transition: "var(--transition-fast)"
                    }}></div>
                    <div>
                      <h4 style={{ fontSize: "18px", color: isSelected ? "var(--accent)" : "var(--text-main)", marginBottom: "4px" }}>{timeRange}</h4>
                      <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>{slotDate}</p>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    {isFull ? (
                      <span style={{ fontSize: "12px", background: "rgba(239,68,68,0.1)", color: "#ef4444", fontWeight: "700", padding: "6px 14px", borderRadius: "30px", textTransform: "uppercase" }}>Full</span>
                    ) : (
                      <span style={{ fontSize: "12px", background: "rgba(16,185,129,0.1)", color: "#10b981", fontWeight: "700", padding: "6px 14px", borderRadius: "30px" }}>
                        {slot.remaining_capacity} Seats Left
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: "100%", justifyContent: "center" }}
            disabled={!selectedSlotId}
          >
            Confirm Interview Slot Booking
          </button>
        </form>
      </div>
    </div>
  );
}
