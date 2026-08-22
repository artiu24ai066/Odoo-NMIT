import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Clock3,
  LogIn,
  LogOut,
  CheckCircle2,
} from "lucide-react";

function Attendance() {
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem("dayflow_attendance");

    return saved
      ? JSON.parse(saved)
      : {
          checkIn: null,
          checkOut: null,
          status: "Not Checked In",
        };
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "dayflow_attendance",
      JSON.stringify(attendance)
    );
  }, [attendance]);

  const formatTime = (date) => {
    if (!date) return "--:--";

    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleCheckIn = () => {
    if (attendance.checkIn) return;

    const now = new Date().toISOString();

    setAttendance({
      checkIn: now,
      checkOut: null,
      status: "Present",
    });
  };

  const handleCheckOut = () => {
    if (!attendance.checkIn || attendance.checkOut) return;

    const now = new Date().toISOString();

    setAttendance((prev) => ({
      ...prev,
      checkOut: now,
      status: "Completed",
    }));
  };

  const calculateWorkingHours = () => {
    if (!attendance.checkIn || !attendance.checkOut) {
      return "0h 0m";
    }

    const start = new Date(attendance.checkIn);
    const end = new Date(attendance.checkOut);

    const difference = end - start;

    const totalMinutes = Math.floor(difference / 60000);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="attendance-page">
      <div className="page-header">
        <div>
          <p className="page-eyebrow">EMPLOYEE PORTAL</p>

          <h1>Attendance</h1>

          <p className="page-description">
            Track your daily attendance and working hours.
          </p>
        </div>
      </div>

      {/* DATE AND CURRENT TIME */}

      <section className="attendance-top-card">
        <div className="attendance-date">
          <CalendarCheck size={20} />

          <div>
            <span className="attendance-label">
              Today
            </span>

            <strong>{formatDate()}</strong>
          </div>
        </div>

        <div className="attendance-current-time">
          <Clock3 size={20} />

          <div>
            <span className="attendance-label">
              Current Time
            </span>

            <strong>
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </strong>
          </div>
        </div>
      </section>

      {/* STATUS */}

      <section className="attendance-status-card">
        <div className="attendance-status-header">
          <div>
            <p className="card-eyebrow">
              TODAY'S STATUS
            </p>

            <h2>
              {attendance.status}
            </h2>
          </div>

          <div
            className={`attendance-status-dot ${
              attendance.status === "Present" ||
              attendance.status === "Completed"
                ? "status-active"
                : ""
            }`}
          />
        </div>

        <div className="attendance-status-line" />

        <div className="attendance-actions">
          <button
            className="attendance-button check-in-button"
            onClick={handleCheckIn}
            disabled={Boolean(attendance.checkIn)}
          >
            <LogIn size={18} />

            {attendance.checkIn
              ? "Checked In"
              : "Check In"}
          </button>

          <button
            className="attendance-button check-out-button"
            onClick={handleCheckOut}
            disabled={
              !attendance.checkIn ||
              Boolean(attendance.checkOut)
            }
          >
            <LogOut size={18} />

            {attendance.checkOut
              ? "Checked Out"
              : "Check Out"}
          </button>
        </div>
      </section>

      {/* ATTENDANCE DETAILS */}

      <section className="attendance-details-grid">
        <div className="attendance-detail-card">
          <div className="detail-icon">
            <LogIn size={18} />
          </div>

          <div>
            <span>Check In</span>

            <strong>
              {formatTime(attendance.checkIn)}
            </strong>
          </div>
        </div>

        <div className="attendance-detail-card">
          <div className="detail-icon">
            <LogOut size={18} />
          </div>

          <div>
            <span>Check Out</span>

            <strong>
              {formatTime(attendance.checkOut)}
            </strong>
          </div>
        </div>

        <div className="attendance-detail-card">
          <div className="detail-icon">
            <Clock3 size={18} />
          </div>

          <div>
            <span>Working Hours</span>

            <strong>
              {calculateWorkingHours()}
            </strong>
          </div>
        </div>
      </section>

      {/* INFORMATION */}

      <section className="attendance-info-card">
        <div className="attendance-info-icon">
          <CheckCircle2 size={20} />
        </div>

        <div>
          <h3>Attendance Information</h3>

          <p>
            Check in when you start your workday and
            check out when your workday is complete.
            Your attendance status and working hours
            are automatically calculated.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Attendance;