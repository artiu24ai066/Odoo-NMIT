import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock3,
  Eye,
} from "lucide-react";

function AdminTimeOff() {
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem("dayflow_timeoff");

    return saved ? JSON.parse(saved) : [];
  });

  const [selectedRequest, setSelectedRequest] =
    useState(null);

  const updateRequestStatus = (id, status) => {
    const updatedRequests = requests.map((request) =>
      request.id === id
        ? {
            ...request,
            status,
          }
        : request
    );

    setRequests(updatedRequests);

    localStorage.setItem(
      "dayflow_timeoff",
      JSON.stringify(updatedRequests)
    );

    if (selectedRequest?.id === id) {
      setSelectedRequest({
        ...selectedRequest,
        status,
      });
    }
  };

  const pendingRequests = requests.filter(
    (request) => request.status === "Pending"
  );

  const approvedRequests = requests.filter(
    (request) => request.status === "Approved"
  );

  const rejectedRequests = requests.filter(
    (request) => request.status === "Rejected"
  );

  const getStatusClass = (status) => {
    if (status === "Approved") {
      return "admin-status-approved";
    }

    if (status === "Rejected") {
      return "admin-status-rejected";
    }

    return "admin-status-pending";
  };

  return (
    <div className="admin-timeoff-page">

      {/* HEADER */}

      <div className="admin-timeoff-header">

        <div>
          <p className="page-eyebrow">
            ADMINISTRATION
          </p>

          <h1>Time Off Requests</h1>

          <p className="page-description">
            Review and manage employee time off
            requests.
          </p>
        </div>

      </div>

      {/* SUMMARY */}

      <section className="admin-timeoff-summary">

        <div className="admin-summary-card">

          <div className="admin-summary-icon pending">
            <Clock3 size={19} />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingRequests.length}</strong>
          </div>

        </div>

        <div className="admin-summary-card">

          <div className="admin-summary-icon approved">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <span>Approved</span>
            <strong>{approvedRequests.length}</strong>
          </div>

        </div>

        <div className="admin-summary-card">

          <div className="admin-summary-icon rejected">
            <XCircle size={19} />
          </div>

          <div>
            <span>Rejected</span>
            <strong>{rejectedRequests.length}</strong>
          </div>

        </div>

        <div className="admin-summary-card">

          <div className="admin-summary-icon total">
            <CalendarDays size={19} />
          </div>

          <div>
            <span>Total Requests</span>
            <strong>{requests.length}</strong>
          </div>

        </div>

      </section>

      {/* REQUEST TABLE */}

      <section className="admin-requests-section">

        <div className="admin-section-heading">

          <div>
            <h2>Employee Requests</h2>

            <p>
              Review submitted time off requests.
            </p>
          </div>

        </div>

        {requests.length === 0 ? (

          <div className="admin-empty-state">

            <CalendarDays size={34} />

            <h3>No requests available</h3>

            <p>
              Employee time off requests will appear
              here.
            </p>

          </div>

        ) : (

          <div className="admin-table-wrapper">

            <table className="admin-requests-table">

              <thead>

                <tr>
                  <th>Employee</th>
                  <th>Leave Type</th>
                  <th>Duration</th>
                  <th>Days</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {requests.map((request) => (

                  <tr key={request.id}>

                    <td>
                      <div className="admin-employee-cell">

                        <div className="admin-avatar">
                          {request.employee
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {request.employee}
                          </strong>

                          <span>
                            Employee
                          </span>
                        </div>

                      </div>
                    </td>

                    <td>
                      {request.type}
                    </td>

                    <td>
                      <div className="admin-duration">

                        <span>
                          {request.startDate}
                        </span>

                        <span>
                          →
                        </span>

                        <span>
                          {request.endDate}
                        </span>

                      </div>
                    </td>

                    <td>
                      {request.days}
                    </td>

                    <td>

                      <span
                        className={`admin-request-status ${getStatusClass(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>

                    </td>

                    <td>

                      <button
                        className="admin-view-button"
                        onClick={() =>
                          setSelectedRequest(
                            request
                          )
                        }
                      >
                        <Eye size={15} />
                        View
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </section>

      {/* REQUEST DETAILS MODAL */}

      {selectedRequest && (

        <div
          className="admin-modal-overlay"
          onClick={() =>
            setSelectedRequest(null)
          }
        >

          <div
            className="admin-request-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="admin-modal-header">

              <div>
                <p className="page-eyebrow">
                  TIME OFF REQUEST
                </p>

                <h2>
                  Request Details
                </h2>
              </div>

              <button
                className="admin-modal-close"
                onClick={() =>
                  setSelectedRequest(null)
                }
              >
                ×
              </button>

            </div>

            <div className="admin-request-details">

              <div className="admin-detail-row">
                <span>Employee</span>
                <strong>
                  {selectedRequest.employee}
                </strong>
              </div>

              <div className="admin-detail-row">
                <span>Leave Type</span>
                <strong>
                  {selectedRequest.type}
                </strong>
              </div>

              <div className="admin-detail-row">
                <span>Start Date</span>
                <strong>
                  {selectedRequest.startDate}
                </strong>
              </div>

              <div className="admin-detail-row">
                <span>End Date</span>
                <strong>
                  {selectedRequest.endDate}
                </strong>
              </div>

              <div className="admin-detail-row">
                <span>Total Days</span>
                <strong>
                  {selectedRequest.days}
                </strong>
              </div>

              <div className="admin-detail-row">
                <span>Status</span>

                <span
                  className={`admin-request-status ${getStatusClass(
                    selectedRequest.status
                  )}`}
                >
                  {selectedRequest.status}
                </span>

              </div>

              <div className="admin-reason">

                <span>Reason</span>

                <p>
                  {selectedRequest.reason}
                </p>

              </div>

              {selectedRequest.attachment && (

                <div className="admin-attachment">

                  <span>
                    Attachment
                  </span>

                  <strong>
                    {selectedRequest.attachment}
                  </strong>

                </div>

              )}

            </div>

            {/* ACTIONS */}

            {selectedRequest.status ===
              "Pending" && (

              <div className="admin-modal-actions">

                <button
                  className="admin-reject-button"
                  onClick={() =>
                    updateRequestStatus(
                      selectedRequest.id,
                      "Rejected"
                    )
                  }
                >
                  <XCircle size={17} />

                  Reject
                </button>

                <button
                  className="admin-approve-button"
                  onClick={() =>
                    updateRequestStatus(
                      selectedRequest.id,
                      "Approved"
                    )
                  }
                >
                  <CheckCircle2 size={17} />

                  Approve
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminTimeOff;