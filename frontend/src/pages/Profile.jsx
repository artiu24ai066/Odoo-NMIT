import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building2,
  BriefcaseBusiness,
  Hash,
  Pencil,
  Save,
  X,
} from "lucide-react";

function Profile() {
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Employee",
    employeeId: "EMP001",
    email: "employee@example.com",
    phone: "+91 9876543210",
    department: "Engineering",
    position: "Software Engineer",
    company: "Dayflow",
  });

  const [formData, setFormData] = useState(profile);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setFormData(profile);
    setEditing(true);
  };

  const handleCancel = () => {
    setFormData(profile);
    setEditing(false);
  };

  const handleSave = () => {
    setProfile(formData);
    setEditing(false);
  };

  return (
    <div className="profile-page">

      {/* Header */}

      <div className="profile-page-header">

        <div>
          <p className="page-eyebrow">
            Employee Portal
          </p>

          <h1>My Profile</h1>

          <p className="page-description">
            View and manage your personal information.
          </p>
        </div>

        {!editing ? (
          <button
            className="profile-edit-button"
            onClick={handleEdit}
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        ) : (
          <div className="profile-edit-actions">

            <button
              className="profile-cancel-button"
              onClick={handleCancel}
            >
              <X size={16} />
              Cancel
            </button>

            <button
              className="profile-save-button"
              onClick={handleSave}
            >
              <Save size={16} />
              Save Changes
            </button>

          </div>
        )}

      </div>


      {/* Profile Card */}

      <section className="profile-card">

        {/* Profile Header */}

        <div className="profile-card-header">

          <div className="large-profile-avatar">
            <User size={38} />
          </div>

          <div className="profile-main-info">

            <h2>
              {profile.name}
            </h2>

            <p>
              {profile.position}
            </p>

            <span>
              {profile.employeeId}
            </span>

          </div>

        </div>


        {/* Information */}

        <div className="profile-information">

          <h3>
            Personal Information
          </h3>

          <div className="profile-fields">

            {/* Name */}

            <div className="profile-field">

              <label>
                Full Name
              </label>

              {editing ? (
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              ) : (
                <div className="profile-field-value">
                  <User size={16} />
                  {profile.name}
                </div>
              )}

            </div>


            {/* Email */}

            <div className="profile-field">

              <label>
                Email
              </label>

              {editing ? (
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              ) : (
                <div className="profile-field-value">
                  <Mail size={16} />
                  {profile.email}
                </div>
              )}

            </div>


            {/* Phone */}

            <div className="profile-field">

              <label>
                Phone Number
              </label>

              {editing ? (
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              ) : (
                <div className="profile-field-value">
                  <Phone size={16} />
                  {profile.phone}
                </div>
              )}

            </div>


            {/* Employee ID */}

            <div className="profile-field">

              <label>
                Employee ID
              </label>

              <div className="profile-field-value">
                <Hash size={16} />
                {profile.employeeId}
              </div>

            </div>


            {/* Department */}

            <div className="profile-field">

              <label>
                Department
              </label>

              {editing ? (
                <input
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                />
              ) : (
                <div className="profile-field-value">
                  <Building2 size={16} />
                  {profile.department}
                </div>
              )}

            </div>


            {/* Position */}

            <div className="profile-field">

              <label>
                Job Position
              </label>

              {editing ? (
                <input
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                />
              ) : (
                <div className="profile-field-value">
                  <BriefcaseBusiness size={16} />
                  {profile.position}
                </div>
              )}

            </div>


            {/* Company */}

            <div className="profile-field">

              <label>
                Company
              </label>

              <div className="profile-field-value">
                <Building2 size={16} />
                {profile.company}
              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Profile;