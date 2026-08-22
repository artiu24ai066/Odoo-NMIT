import { useState } from "react";
import {
  Clock3,
  CheckCircle2,
  XCircle,
  CalendarDays,
  Search,
  User,
} from "lucide-react";

const initialRequests = [
  {
    id: 1,
    employee: "John Doe",
    employeeId: "EMP0001",
    type: "Paid Time Off",
    startDate: "28/10/2026",
    endDate: "30/10/2026",
    days: 3,
    reason: "Family vacation",
    status: "Pending",
  },
  {
    id: 2,
    employee: "Priya Sharma",
    employeeId: "EMP0002",
    type: "Sick Leave",
    startDate: "02/11/2026",
    endDate: "03/11/2026",
    days: 2,
    reason: "Medical appointment",
    status: "Pending",
  },
  {
    id: 3,
    employee: "Rahul Kumar",
    employeeId: "EMP0003",
    type: "Paid Time Off",
    startDate: "10/11/2026",
    endDate: "11/11/2026",
    days: 2,
    reason: "Personal work",
    status: "Approved",
  },
];

function TimeOff() {
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState("");

  const updateStatus = (id, status) => {
    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === id
          ? { ...request, status }
          : request
      )
    );
  };

  const filteredRequests = requests.filter((request) => {
    const searchText = search.toLowerCase();

    return (
      request.employee.toLowerCase().includes(searchText) ||
      request.employeeId.toLowerCase().includes(searchText) ||
      request.type.toLowerCase().includes(searchText)
    );
  });

  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const approvedCount = requests.filter(
    (request) => request.status === "Approved"
  ).length;

  const rejectedCount = requests.filter(
    (request) => request.status === "Rejected"
  ).length;

  return (
    <div className="page-container">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <p className="page-eyebrow">ADMINISTRATION</p>

          <h1>Time Off Requests</h1>

          <p className="page-description">
            Review and manage employee time off requests.
          </p>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon pending">
            <Clock3 size={20} />
          </div>

          <div>
            <p>Pending</p>
            <strong>{pendingCount}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon approved">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <p>Approved</p>
            <strong>{approvedCount}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon rejected">
            <XCircle size={20} />
          </div>

          <div>
            <p>Rejected</p>
            <strong>{rejectedCount}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon total">
            <CalendarDays size={20} />
          </div>

          <div>
            <p>Total Requests</p>
            <strong>{requests.length}</strong>
          </div>
        </div>

      </div>

      {/* REQUEST SECTION */}
      <section className="content-section">

        <div className="section-header">
          <div>
            <h2>Employee Requests</h2>

            <p>
              Review submitted time off requests.
            </p>
          </div>

          {/* SEARCH */}
          <div className="search-box">
            <Search size={17} />

            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>
        </div>

        {/* REQUESTS */}
        {filteredRequests.length === 0 ? (

          <div className="empty-state">
            <CalendarDays size={42} />

            <h3>No requests available</h3>

            <p>
              Employee time off requests will appear here.
            </p>
          </div>

        ) : (

          <div className="request-list">

            {filteredRequests.map((request) => (

              <div
                className="request-card"
                key={request.id}
              >

                {/* EMPLOYEE */}
                <div className="request-employee">

                  <div className="employee-avatar">
                    <User size={20} />
                  </div>

                  <div>
                    <h3>{request.employee}</h3>

                    <span>
                      {request.employeeId}
                    </span>
                  </div>

                </div>

                {/* LEAVE DETAILS */}
                <div className="request-details">

                  <div>
                    <span className="detail-label">
                      Leave Type
                    </span>

                    <strong>
                      {request.type}
                    </strong>
                  </div>

                  <div>
                    <span className="detail-label">
                      Duration
                    </span>

                    <strong>
                      {request.startDate} - {request.endDate}
                    </strong>
                  </div>

                  <div>
                    <span className="detail-label">
                      Days
                    </span>

                    <strong>
                      {request.days}
                    </strong>
                  </div>

                  <div>
                    <span className="detail-label">
                      Reason
                    </span>

                    <strong>
                      {request.reason}
                    </strong>
                  </div>

                </div>

                {/* STATUS + ACTIONS */}
                <div className="request-actions">

                  <span
                    className={`status-badge ${request.status.toLowerCase()}`}
                  >
                    {request.status}
                  </span>

                  {request.status === "Pending" && (
                    <div className="action-buttons">

                      <button
                        className="approve-button"
                        onClick={() =>
                          updateStatus(
                            request.id,
                            "Approved"
                          )
                        }
                      >
                        <CheckCircle2 size={16} />
                        Approve
                      </button>

                      <button
                        className="reject-button"
                        onClick={() =>
                          updateStatus(
                            request.id,
                            "Rejected"
                          )
                        }
                      >
                        <XCircle size={16} />
                        Reject
                      </button>

                    </div>
                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default TimeOff;