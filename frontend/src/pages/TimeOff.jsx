import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  Send,
} from "lucide-react";

function TimeOff() {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    type: "Paid Leave",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [requests, setRequests] = useState([
    {
      type: "Paid Leave",
      startDate: "28/10/2025",
      endDate: "30/10/2025",
      days: 3,
      status: "Approved",
    },
    {
      type: "Sick Leave",
      startDate: "15/09/2025",
      endDate: "15/09/2025",
      days: 1,
      status: "Approved",
    },
  ]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) {
      return 1;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    const difference =
      Math.ceil(
        (end - start) / (1000 * 60 * 60 * 24)
      ) + 1;

    return difference > 0 ? difference : 1;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "--";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.startDate ||
      !formData.endDate ||
      !formData.reason
    ) {
      alert("Please fill all the fields.");
      return;
    }

    const newRequest = {
      type: formData.type,
      startDate: formatDate(formData.startDate),
      endDate: formatDate(formData.endDate),
      days: calculateDays(),
      status: "Pending",
    };

    setRequests((previous) => [
      newRequest,
      ...previous,
    ]);

    setFormData({
      type: "Paid Leave",
      startDate: "",
      endDate: "",
      reason: "",
    });

    setShowForm(false);
  };

  return (
    <div className="timeoff-page">

      {/* PAGE HEADER */}

      <div className="timeoff-page-header">

        <div>
          <p className="page-eyebrow">
            Employee Portal
          </p>

          <h1>Time Off</h1>

          <p className="page-description">
            Manage your leave balance and time-off requests.
          </p>
        </div>

        <button
          className="request-leave-button"
          onClick={() =>
            setShowForm((previous) => !previous)
          }
        >
          <CalendarDays size={16} />

          {showForm
            ? "Close Request"
            : "Request Time Off"}
        </button>

      </div>


      {/* LEAVE BALANCE */}

      <div className="leave-balance-grid">

        <div className="leave-balance-card">

          <span>
            Paid Time Off
          </span>

          <strong>
            24
          </strong>

          <small>
            days available
          </small>

        </div>


        <div className="leave-balance-card">

          <span>
            Sick Time Off
          </span>

          <strong>
            7
          </strong>

          <small>
            days available
          </small>

        </div>


        <div className="leave-balance-card">

          <span>
            Pending Requests
          </span>

          <strong>
            {
              requests.filter(
                (request) =>
                  request.status === "Pending"
              ).length
            }
          </strong>

          <small>
            awaiting approval
          </small>

        </div>

      </div>


      {/* REQUEST FORM */}

      {showForm && (
        <section className="leave-request-form">

          <div className="leave-form-header">

            <div>

              <h2>
                Time Off Type Request
              </h2>

              <p>
                Submit a request for leave.
              </p>

            </div>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="leave-form-grid">

              {/* EMPLOYEE */}

              <div className="leave-form-field">

                <label>
                  Employee
                </label>

                <input
                  type="text"
                  value="Current Employee"
                  disabled
                />

              </div>


              {/* LEAVE TYPE */}

              <div className="leave-form-field">

                <label>
                  Time Off Type
                </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >

                  <option>
                    Paid Leave
                  </option>

                  <option>
                    Sick Leave
                  </option>

                  <option>
                    Unpaid Leave
                  </option>

                </select>

              </div>


              {/* START DATE */}

              <div className="leave-form-field">

                <label>
                  Start Date
                </label>

                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />

              </div>


              {/* END DATE */}

              <div className="leave-form-field">

                <label>
                  End Date
                </label>

                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />

              </div>


              {/* DAYS */}

              <div className="leave-form-field">

                <label>
                  Allocation
                </label>

                <input
                  type="text"
                  value={`${calculateDays()} day${
                    calculateDays() !== 1
                      ? "s"
                      : ""
                  }`}
                  disabled
                />

              </div>


              {/* REASON */}

              <div className="leave-form-field leave-reason">

                <label>
                  Reason
                </label>

                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Enter the reason for your leave..."
                  rows="4"
                />

              </div>

            </div>


            <div className="leave-form-actions">

              <button
                type="button"
                className="cancel-leave-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="submit-leave-button"
              >
                <Send size={15} />
                Submit Request
              </button>

            </div>

          </form>

        </section>
      )}


      {/* REQUEST HISTORY */}

      <section className="leave-history">

        <div className="leave-history-header">

          <div>

            <h2>
              Time Off Requests
            </h2>

            <p>
              View your previous and pending requests.
            </p>

          </div>

        </div>


        <div className="leave-table-wrapper">

          <table className="leave-table">

            <thead>

              <tr>

                <th>
                  Time Off Type
                </th>

                <th>
                  Start Date
                </th>

                <th>
                  End Date
                </th>

                <th>
                  Days
                </th>

                <th>
                  Status
                </th>

              </tr>

            </thead>


            <tbody>

              {requests.map(
                (request, index) => (

                  <tr key={index}>

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
                        className={`leave-status ${
                          request.status.toLowerCase()
                        }`}
                      >

                        {request.status ===
                        "Approved" ? (
                          <CheckCircle2 size={13} />
                        ) : request.status ===
                          "Rejected" ? (
                          <XCircle size={13} />
                        ) : (
                          <Clock3 size={13} />
                        )}

                        {request.status}

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

export default TimeOff;