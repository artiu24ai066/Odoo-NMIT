function Dashboard() {
  return (
    <div className="dashboard-page">

      <div className="page-header">

        <div>
          <p className="page-eyebrow">
            Employee Portal
          </p>

          <h1>
            Welcome back, Employee
          </h1>

          <p className="page-description">
            Here's what's happening with your work today.
          </p>
        </div>

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <span>Today's Attendance</span>
          </div>

          <div className="dashboard-card-value">
            Not Checked In
          </div>

          <button className="dashboard-action">
            Check In
          </button>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <span>Time Off Balance</span>
          </div>

          <div className="dashboard-card-value">
            12 Days
          </div>

          <p className="dashboard-card-description">
            Available paid time off
          </p>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <span>Working Hours</span>
          </div>

          <div className="dashboard-card-value">
            0h 00m
          </div>

          <p className="dashboard-card-description">
            Today's working time
          </p>
        </div>

      </div>

      <div className="dashboard-section">

        <div className="section-title">
          Quick Actions
        </div>

        <div className="quick-actions">

          <button className="quick-action">
            Mark Attendance
          </button>

          <button className="quick-action">
            Request Time Off
          </button>

          <button className="quick-action">
            View Profile
          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;