import { useState } from "react";
import {
  Clock3,
  CalendarDays,
  CheckCircle2,
  Timer,
  ArrowUpRight,
  LogIn,
  LogOut,
} from "lucide-react";

function Dashboard() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);

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
      setCheckInTime(null);
    }
  };

  return (
    <div className="dashboard-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="dashboard-header">

        <div>
          <p className="page-eyebrow">
            Employee Portal
          </p>

          <h1>
            Good morning, Employee
          </h1>

          <p className="page-description">
            Here's your work overview for today.
          </p>
        </div>

        <div className="dashboard-date">
          <CalendarDays size={17} />

          <span>
            {new Date().toLocaleDateString([], {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

      </div>


      {/* =====================================
          STAT CARDS
      ===================================== */}

      <div className="dashboard-stats">

        {/* Attendance */}

        <div className="stat-card">

          <div className="stat-card-top">
            <span>Attendance</span>

            <div className="stat-icon">
              <CheckCircle2 size={18} />
            </div>
          </div>

          <h2>
            {checkedIn ? "Checked In" : "Not Checked In"}
          </h2>

          <p>
            {checkInTime
              ? `Since ${checkInTime}`
              : "Start your workday"}
          </p>

        </div>


        {/* Working Hours */}

        <div className="stat-card">

          <div className="stat-card-top">
            <span>Working Hours</span>

            <div className="stat-icon">
              <Timer size={18} />
            </div>
          </div>

          <h2>
            {checkedIn ? "Active" : "0h 00m"}
          </h2>

          <p>
            Today's working time
          </p>

        </div>


        {/* Leave */}

        <div className="stat-card">

          <div className="stat-card-top">
            <span>Leave Balance</span>

            <div className="stat-icon">
              <CalendarDays size={18} />
            </div>
          </div>

          <h2>
            12 Days
          </h2>

          <p>
            Available paid leave
          </p>

        </div>


        {/* Monthly Hours */}

        <div className="stat-card">

          <div className="stat-card-top">
            <span>This Month</span>

            <div className="stat-icon">
              <Clock3 size={18} />
            </div>
          </div>

          <h2>
            142h
          </h2>

          <p>
            Total working hours
          </p>

        </div>

      </div>


      {/* =====================================
          ATTENDANCE SECTION
      ===================================== */}

      <div className="dashboard-main-grid">

        <section className="dashboard-panel attendance-panel">

          <div className="panel-header">

            <div>
              <h3>
                Today's Attendance
              </h3>

              <p>
                Manage your workday attendance
              </p>
            </div>

            <Clock3 size={20} />

          </div>


          <div className="attendance-status">

            <div className="attendance-time">

              <span>
                {checkedIn
                  ? checkInTime
                  : "-- : --"}
              </span>

              <small>
                Check-in time
              </small>

            </div>

            <div className="attendance-line" />

            <div className="attendance-time">

              <span>
                {checkedIn
                  ? "-- : --"
                  : "Not yet"}
              </span>

              <small>
                Check-out time
              </small>

            </div>

          </div>


          <button
            className={`attendance-button ${
              checkedIn
                ? "checkout"
                : ""
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

        </section>


        {/* =====================================
            QUICK ACTIONS
        ===================================== */}

        <section className="dashboard-panel">

          <div className="panel-header">

            <div>
              <h3>
                Quick Actions
              </h3>

              <p>
                Common employee actions
              </p>
            </div>

          </div>


          <div className="quick-action-list">

            <button className="dashboard-action-row">

              <div>
                <strong>
                  Request Time Off
                </strong>

                <span>
                  Submit a leave request
                </span>
              </div>

              <ArrowUpRight size={17} />

            </button>


            <button className="dashboard-action-row">

              <div>
                <strong>
                  View Attendance
                </strong>

                <span>
                  Check your attendance history
                </span>
              </div>

              <ArrowUpRight size={17} />

            </button>


            <button className="dashboard-action-row">

              <div>
                <strong>
                  Update Profile
                </strong>

                <span>
                  Manage your personal details
                </span>
              </div>

              <ArrowUpRight size={17} />

            </button>

          </div>

        </section>

      </div>


      {/* =====================================
          RECENT ACTIVITY
      ===================================== */}

      <section className="dashboard-panel recent-panel">

        <div className="panel-header">

          <div>
            <h3>
              Recent Activity
            </h3>

            <p>
              Your latest employee activity
            </p>
          </div>

        </div>


        <div className="activity-list">

          <div className="activity-item">

            <div className="activity-dot">
              <CheckCircle2 size={15} />
            </div>

            <div className="activity-content">

              <strong>
                Attendance recorded
              </strong>

              <span>
                Yesterday · 09:12 AM
              </span>

            </div>

          </div>


          <div className="activity-item">

            <div className="activity-dot">
              <CalendarDays size={15} />
            </div>

            <div className="activity-content">

              <strong>
                Leave balance updated
              </strong>

              <span>
                3 days ago
              </span>

            </div>

          </div>


          <div className="activity-item">

            <div className="activity-dot">
              <Clock3 size={15} />
            </div>

            <div className="activity-content">

              <strong>
                Working hours completed
              </strong>

              <span>
                5 days ago · 8h 14m
              </span>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;