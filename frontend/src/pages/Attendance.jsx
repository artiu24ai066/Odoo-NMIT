import { useState } from "react";
import {
  CalendarCheck,
  Clock3,
  LogIn,
  LogOut,
  CheckCircle2,
  XCircle,
} from "lucide-react";

function Attendance() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);

  const attendanceHistory = [
    {
      date: "Today",
      checkIn: checkInTime || "--",
      checkOut: "--",
      hours: checkedIn ? "Active" : "--",
      status: checkedIn ? "Present" : "Pending",
    },
    {
      date: "Yesterday",
      checkIn: "09:12 AM",
      checkOut: "06:05 PM",
      hours: "8h 53m",
      status: "Present",
    },
    {
      date: "Aug 20, 2026",
      checkIn: "09:05 AM",
      checkOut: "05:58 PM",
      hours: "8h 53m",
      status: "Present",
    },
    {
      date: "Aug 19, 2026",
      checkIn: "09:20 AM",
      checkOut: "06:10 PM",
      hours: "8h 50m",
      status: "Present",
    },
    {
      date: "Aug 18, 2026",
      checkIn: "--",
      checkOut: "--",
      hours: "--",
      status: "Absent",
    },
  ];

  const handleAttendance = () => {
    if (!checkedIn) {
      const now = new Date();

      setCheckInTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

      setCheckedIn(true);
    } else {
      setCheckedIn(false);
    }
  };

  return (
    <div className="attendance-page">

      {/* Header */}

      <div className="attendance-page-header">

        <div>
          <p className="page-eyebrow">
            Employee Portal
          </p>

          <h1>Attendance</h1>

          <p className="page-description">
            Track your daily attendance and working hours.
          </p>
        </div>

        <div className="attendance-month">
          <CalendarCheck size={16} />
          August 2026
        </div>

      </div>


      {/* Today's Attendance */}

      <section className="attendance-overview">

        <div className="attendance-overview-header">

          <div>
            <h2>Today's Attendance</h2>

            <p>
              {checkedIn
                ? "You are currently checked in."
                : "You haven't checked in yet."}
            </p>
          </div>

          <div
            className={`attendance-status-badge ${
              checkedIn ? "present" : "pending"
            }`}
          >
            {checkedIn ? (
              <>
                <CheckCircle2 size={14} />
                Present
              </>
            ) : (
              <>
                <Clock3 size={14} />
                Pending
              </>
            )}
          </div>

        </div>


        <div className="attendance-overview-content">

          <div className="attendance-overview-item">

            <span>Check In</span>

            <strong>
              {checkInTime || "-- : --"}
            </strong>

          </div>


          <div className="attendance-overview-item">

            <span>Check Out</span>

            <strong>
              --
            </strong>

          </div>


          <div className="attendance-overview-item">

            <span>Working Hours</span>

            <strong>
              {checkedIn ? "Active" : "0h 00m"}
            </strong>

          </div>


          <button
            className={`attendance-main-button ${
              checkedIn ? "checkout" : ""
            }`}
            onClick={handleAttendance}
          >

            {checkedIn ? (
              <>
                <LogOut size={17} />
                Check Out
              </>
            ) : (
              <>
                <LogIn size={17} />
                Check In
              </>
            )}

          </button>

        </div>

      </section>


      {/* History */}

      <section className="attendance-history">

        <div className="attendance-history-header">

          <div>
            <h2>Attendance History</h2>

            <p>
              Your recent attendance records.
            </p>
          </div>

        </div>


        <div className="attendance-table-wrapper">

          <table className="attendance-table">

            <thead>

              <tr>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Working Hours</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {attendanceHistory.map(
                (record, index) => (
                  <tr key={index}>

                    <td>
                      <strong>
                        {record.date}
                      </strong>
                    </td>

                    <td>
                      {record.checkIn}
                    </td>

                    <td>
                      {record.checkOut}
                    </td>

                    <td>
                      {record.hours}
                    </td>

                    <td>

                      <span
                        className={`history-status ${
                          record.status
                            .toLowerCase()
                            .replace(" ", "-")
                        }`}
                      >

                        {record.status === "Present" ||
                        record.status === "Pending" ? (
                          <CheckCircle2 size={13} />
                        ) : (
                          <XCircle size={13} />
                        )}

                        {record.status}

                      </span>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}

export default Attendance;