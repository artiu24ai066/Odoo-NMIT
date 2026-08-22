import { useState } from "react";
import {
  CalendarDays,
  Plus,
  X,
  Paperclip,
  Clock3,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

function TimeOff() {
  const [activeType, setActiveType] = useState("Paid Time Off");

  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem("dayflow_timeoff");

    return saved ? JSON.parse(saved) : [];
  });

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    type: "Paid Time Off",
    startDate: "",
    endDate: "",
    reason: "",
    attachment: null,
  });

  const leaveBalances = {
    "Paid Time Off": 24,
    "Sick Leave": 7,
    "Unpaid Leave": 0,
  };

  const getDays = (startDate, endDate) => {
    if (!startDate || !endDate) {
      return 0;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      return 0;
    }

    const difference = end - start;

    return Math.floor(
      difference / (1000 * 60 * 60 * 24)
    ) + 1;
  };

  const requestedDays = getDays(
    formData.startDate,
    formData.endDate
  );

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const openRequestForm = () => {
    setFormData({
      type: activeType,
      startDate: "",
      endDate: "",
      reason: "",
      attachment: null,
    });

    setShowForm(true);
  };

  const closeRequestForm = () => {
    setShowForm(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.startDate ||
      !formData.endDate ||
      !formData.reason
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (requestedDays <= 0) {
      alert("Please select valid dates.");
      return;
    }

    if (
      formData.type !== "Unpaid Leave" &&
      requestedDays > leaveBalances[formData.type]
    ) {
      alert(
        `You only have ${leaveBalances[formData.type]} days available.`
      );
      return;
    }

    const newRequest = {
      id: Date.now(),
      employee: "John Doe",
      type: formData.type,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: requestedDays,
      reason: formData.reason,
      attachment: formData.attachment
        ? formData.attachment.name
        : null,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const updatedRequests = [
      newRequest,
      ...requests,
    ];

    setRequests(updatedRequests);

    localStorage.setItem(
      "dayflow_timeoff",
      JSON.stringify(updatedRequests)
    );

    setShowForm(false);

    setFormData({
      type: activeType,
      startDate: "",
      endDate: "",
      reason: "",
      attachment: null,
    });
  };

  const cancelRequest = (id) => {
    const updatedRequests = requests.filter(
      (request) => request.id !== id
    );

    setRequests(updatedRequests);

    localStorage.setItem(
      "dayflow_timeoff",
      JSON.stringify(updatedRequests)
    );
  };

  const getStatusIcon = (status) => {
    if (status === "Approved") {
      return <CheckCircle2 size={16} />;
    }

    if (status === "Rejected") {
      return <XCircle size={16} />;
    }

    return <Clock3 size={16} />;
  };

  const getStatusClass = (status) => {
    if (status === "Approved") {
      return "status-approved";
    }

    if (status === "Rejected") {
      return "status-rejected";
    }

    return "status-pending";
  };

  return (
    <div className="timeoff-page">

      {/* HEADER */}

      <div className="timeoff-header">
        <div>
          <p className="page-eyebrow">
            EMPLOYEE PORTAL
          </p>

          <h1>Time Off</h1>

          <p className="page-description">
            Manage your leave requests and available
            time off.
          </p>
        </div>

        <button
          className="new-timeoff-button"
          onClick={openRequestForm}
        >
          <Plus size={18} />

          New Request
        </button>
      </div>

      {/* LEAVE TYPE TABS */}

      <section className="leave-type-section">

        <div className="leave-tabs">

          <button
            className={
              activeType === "Paid Time Off"
                ? "leave-tab active"
                : "leave-tab"
            }
            onClick={() =>
              setActiveType("Paid Time Off")
            }
          >
            Paid Time Off
          </button>

          <button
            className={
              activeType === "Sick Leave"
                ? "leave-tab active"
                : "leave-tab"
            }
            onClick={() =>
              setActiveType("Sick Leave")
            }
          >
            Sick Leave
          </button>

          <button
            className={
              activeType === "Unpaid Leave"
                ? "leave-tab active"
                : "leave-tab"
            }
            onClick={() =>
              setActiveType("Unpaid Leave")
            }
          >
            Unpaid Leave
          </button>

        </div>

        <div className="leave-balance-card">

          <div>
            <span>Available</span>

            <strong>
              {leaveBalances[activeType]}
            </strong>

            <small>Days</small>
          </div>

          <CalendarDays size={26} />

        </div>

      </section>

      {/* INFORMATION */}

      <section className="timeoff-info">

        <AlertCircle size={18} />

        <p>
          Submit a time off request by selecting the
          leave type, validity period and reason.
          Requests will remain pending until approved
          by an Admin or HR Officer.
        </p>

      </section>

      {/* REQUESTS */}

      <section className="requests-section">

        <div className="section-heading">

          <div>
            <h2>My Requests</h2>

            <p>
              View your submitted time off requests.
            </p>
          </div>

        </div>

        {requests.length === 0 ? (

          <div className="empty-timeoff">

            <CalendarDays size={32} />

            <h3>No time off requests</h3>

            <p>
              You haven't submitted any leave requests
              yet.
            </p>

            <button
              onClick={openRequestForm}
              className="empty-request-button"
            >
              <Plus size={17} />

              Create Request
            </button>

          </div>

        ) : (

          <div className="requests-table-wrapper">

            <table className="requests-table">

              <thead>
                <tr>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Days</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {requests.map((request) => (

                  <tr key={request.id}>

                    <td>
                      <strong>
                        {request.type}
                      </strong>
                    </td>

                    <td>
                      {request.startDate}
                    </td>

                    <td>
                      {request.endDate}
                    </td>

                    <td>
                      {request.days}
                    </td>

                    <td>

                      <span
                        className={`request-status ${getStatusClass(
                          request.status
                        )}`}
                      >
                        {getStatusIcon(
                          request.status
                        )}

                        {request.status}
                      </span>

                    </td>

                    <td>

                      {request.status ===
                        "Pending" && (

                        <button
                          className="cancel-request-button"
                          onClick={() =>
                            cancelRequest(
                              request.id
                            )
                          }
                        >
                          Cancel
                        </button>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </section>

      {/* REQUEST MODAL */}

      {showForm && (

        <div
          className="timeoff-modal-overlay"
          onClick={closeRequestForm}
        >

          <div
            className="timeoff-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>
                <p className="page-eyebrow">
                  TIME OFF
                </p>

                <h2>New Time Off Request</h2>
              </div>

              <button
                className="modal-close-button"
                onClick={closeRequestForm}
              >
                <X size={20} />
              </button>

            </div>

            <form
              className="timeoff-form"
              onSubmit={handleSubmit}
            >

              {/* EMPLOYEE */}

              <div className="form-field">

                <label>
                  Employee
                </label>

                <input
                  type="text"
                  value="John Doe"
                  disabled
                />

              </div>

              {/* TYPE */}

              <div className="form-field">

                <label>
                  Time Off Type
                </label>

                <select
                  value={formData.type}
                  onChange={(event) =>
                    updateField(
                      "type",
                      event.target.value
                    )
                  }
                >

                  <option>
                    Paid Time Off
                  </option>

                  <option>
                    Sick Leave
                  </option>

                  <option>
                    Unpaid Leave
                  </option>

                </select>

              </div>

              {/* DATES */}

              <div className="form-row">

                <div className="form-field">

                  <label>
                    Start Date
                  </label>

                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(event) =>
                      updateField(
                        "startDate",
                        event.target.value
                      )
                    }
                    required
                  />

                </div>

                <div className="form-field">

                  <label>
                    End Date
                  </label>

                  <input
                    type="date"
                    value={formData.endDate}
                    min={formData.startDate}
                    onChange={(event) =>
                      updateField(
                        "endDate",
                        event.target.value
                      )
                    }
                    required
                  />

                </div>

              </div>

              {/* DAYS */}

              <div className="calculated-days">

                <CalendarDays size={17} />

                <span>
                  Requested days:
                </span>

                <strong>
                  {requestedDays}
                </strong>

              </div>

              {/* REASON */}

              <div className="form-field">

                <label>
                  Reason
                </label>

                <textarea
                  rows="4"
                  placeholder="Enter reason for your leave..."
                  value={formData.reason}
                  onChange={(event) =>
                    updateField(
                      "reason",
                      event.target.value
                    )
                  }
                  required
                />

              </div>

              {/* ATTACHMENT */}

              <div className="form-field">

                <label>
                  Attachment
                  <span className="optional-text">
                    {" "}
                    (optional)
                  </span>
                </label>

                <label className="attachment-input">

                  <Paperclip size={17} />

                  <span>
                    {formData.attachment
                      ? formData.attachment.name
                      : "Attach document"}
                  </span>

                  <input
                    type="file"
                    onChange={(event) =>
                      updateField(
                        "attachment",
                        event.target.files[0] ||
                          null
                      )
                    }
                  />

                </label>

              </div>

              {/* BUTTONS */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="modal-cancel-button"
                  onClick={closeRequestForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-submit-button"
                >
                  Submit Request
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default TimeOff;