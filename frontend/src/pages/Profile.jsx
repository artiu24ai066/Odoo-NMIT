import { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  Building2,
  CalendarDays,
  Pencil,
  Plus,
  ShieldCheck,
  Lock,
} from "lucide-react";

function Profile() {
  const [activeTab, setActiveTab] = useState("private");
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "John Doe",
    employeeId: "EMP0001",
    email: "john.doe@company.com",
    mobile: "+91 98765 43210",
    company: "DAYFLOW",
    department: "Engineering",
    jobPosition: "Software Engineer",
    manager: "Rahul Sharma",
    location: "Hyderabad",
    dateOfBirth: "15/05/2002",
    joiningDate: "01/08/2022",
    nationality: "Indian",
    gender: "Male",
    maritalStatus: "Single",
    personalEmail: "john.personal@gmail.com",
    address: "Hyderabad, Telangana",
  });

  const [skills, setSkills] = useState([
    "React",
    "JavaScript",
    "Node.js",
    "MongoDB",
  ]);

  const [certifications, setCertifications] = useState([
    "Full Stack Development",
    "JavaScript Certification",
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSkill = () => {
    const skill = window.prompt("Enter skill:");

    if (skill && skill.trim()) {
      setSkills((prev) => [...prev, skill.trim()]);
    }
  };

  const addCertification = () => {
    const certification = window.prompt(
      "Enter certification:"
    );

    if (certification && certification.trim()) {
      setCertifications((prev) => [
        ...prev,
        certification.trim(),
      ]);
    }
  };

  return (
    <div className="profile-page">

      {/* PAGE HEADER */}

      <div className="profile-page-header">

        <div>
          <p className="page-eyebrow">
            Employee Portal
          </p>

          <h1>
            My Profile
          </h1>

          <p className="page-description">
            View and manage your employee information.
          </p>
        </div>

        <button
          className="profile-edit-button"
          onClick={() => setEditing((prev) => !prev)}
        >
          <Pencil size={15} />

          {editing ? "Save Changes" : "Edit Profile"}
        </button>

      </div>


      {/* PROFILE HEADER */}

      <section className="profile-header-card">

        <div className="profile-avatar">

          <UserRound size={38} />

          <button
            className="avatar-edit-button"
            title="Change profile picture"
          >
            <Pencil size={12} />
          </button>

        </div>


        <div className="profile-main-info">

          <h2>
            {profile.name}
          </h2>

          <p className="profile-position">
            {profile.jobPosition}
          </p>

          <div className="profile-meta">

            <span>
              <Mail size={14} />
              {profile.email}
            </span>

            <span>
              <Phone size={14} />
              {profile.mobile}
            </span>

            <span>
              <MapPin size={14} />
              {profile.location}
            </span>

          </div>

        </div>


        <div className="profile-company-info">

          <div>
            <span>Employee ID</span>
            <strong>{profile.employeeId}</strong>
          </div>

          <div>
            <span>Department</span>
            <strong>{profile.department}</strong>
          </div>

          <div>
            <span>Company</span>
            <strong>{profile.company}</strong>
          </div>

          <div>
            <span>Manager</span>
            <strong>{profile.manager}</strong>
          </div>

        </div>

      </section>


      {/* TABS */}

      <div className="profile-tabs">

        <button
          className={
            activeTab === "private"
              ? "profile-tab active"
              : "profile-tab"
          }
          onClick={() => setActiveTab("private")}
        >
          Private Info
        </button>

        <button
          className={
            activeTab === "salary"
              ? "profile-tab active"
              : "profile-tab"
          }
          onClick={() => setActiveTab("salary")}
        >
          Salary Info
        </button>

        <button
          className={
            activeTab === "security"
              ? "profile-tab active"
              : "profile-tab"
          }
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>

      </div>


      {/* PRIVATE INFO */}

      {activeTab === "private" && (

        <div className="profile-content-grid">

          <section className="profile-section">

            <div className="profile-section-header">

              <div>
                <h2>
                  Private Information
                </h2>

                <p>
                  Personal information associated
                  with your account.
                </p>
              </div>

              <UserRound size={18} />

            </div>


            <div className="profile-fields">

              <ProfileField
                label="Date of Birth"
                name="dateOfBirth"
                value={profile.dateOfBirth}
                editing={editing}
                onChange={handleChange}
              />

              <ProfileField
                label="Joining Date"
                name="joiningDate"
                value={profile.joiningDate}
                editing={editing}
                onChange={handleChange}
              />

              <ProfileField
                label="Nationality"
                name="nationality"
                value={profile.nationality}
                editing={editing}
                onChange={handleChange}
              />

              <ProfileField
                label="Gender"
                name="gender"
                value={profile.gender}
                editing={editing}
                onChange={handleChange}
              />

              <ProfileField
                label="Marital Status"
                name="maritalStatus"
                value={profile.maritalStatus}
                editing={editing}
                onChange={handleChange}
              />

              <ProfileField
                label="Personal Email"
                name="personalEmail"
                value={profile.personalEmail}
                editing={editing}
                onChange={handleChange}
              />

              <ProfileField
                label="Mobile"
                name="mobile"
                value={profile.mobile}
                editing={editing}
                onChange={handleChange}
              />

              <ProfileField
                label="Address"
                name="address"
                value={profile.address}
                editing={editing}
                onChange={handleChange}
              />

            </div>

          </section>


          {/* ABOUT */}

          <section className="profile-section">

            <div className="profile-section-header">

              <div>
                <h2>
                  About
                </h2>

                <p>
                  Information about the employee.
                </p>
              </div>

              <UserRound size={18} />

            </div>


            <div className="about-content">

              <h3>
                Job Position
              </h3>

              <p>
                {profile.jobPosition}
              </p>

              <h3>
                Department
              </h3>

              <p>
                {profile.department}
              </p>

              <h3>
                Manager
              </h3>

              <p>
                {profile.manager}
              </p>

            </div>

          </section>


          {/* SKILLS */}

          <section className="profile-section">

            <div className="profile-section-header">

              <div>
                <h2>
                  Skills
                </h2>

                <p>
                  Technical and professional skills.
                </p>
              </div>

              <button
                className="small-add-button"
                onClick={addSkill}
              >
                <Plus size={14} />
                Add Skill
              </button>

            </div>


            <div className="profile-tags">

              {skills.map((skill, index) => (
                <span
                  className="profile-tag"
                  key={index}
                >
                  {skill}
                </span>
              ))}

            </div>

          </section>


          {/* CERTIFICATIONS */}

          <section className="profile-section">

            <div className="profile-section-header">

              <div>
                <h2>
                  Certifications
                </h2>

                <p>
                  Professional certifications.
                </p>
              </div>

              <button
                className="small-add-button"
                onClick={addCertification}
              >
                <Plus size={14} />
                Add
              </button>

            </div>


            <div className="certification-list">

              {certifications.map(
                (certification, index) => (

                  <div
                    className="certification-item"
                    key={index}
                  >

                    <div className="certification-icon">
                      <ShieldCheck size={16} />
                    </div>

                    <span>
                      {certification}
                    </span>

                  </div>

                )
              )}

            </div>

          </section>

        </div>
      )}


      {/* SALARY */}

      {activeTab === "salary" && (

        <section className="salary-section">

          <div className="salary-header">

            <div>
              <h2>
                Salary Information
              </h2>

              <p>
                Compensation information.
              </p>
            </div>

            <span className="admin-only-badge">
              Admin / HR Only
            </span>

          </div>


          <div className="salary-warning">

            <Lock size={16} />

            <span>
              Salary information is restricted
              to authorized users.
            </span>

          </div>


          <div className="salary-summary">

            <div>
              <span>Monthly Wage</span>
              <strong>₹50,000</strong>
            </div>

            <div>
              <span>Yearly Wage</span>
              <strong>₹6,00,000</strong>
            </div>

            <div>
              <span>Working Days</span>
              <strong>5 Days</strong>
            </div>

            <div>
              <span>Break Time</span>
              <strong>1 Hour</strong>
            </div>

          </div>


          <div className="salary-components">

            <h3>
              Salary Components
            </h3>

            <SalaryRow
              name="Basic Salary"
              amount="₹25,000"
            />

            <SalaryRow
              name="House Rent Allowance"
              amount="₹12,500"
            />

            <SalaryRow
              name="Performance Bonus"
              amount="₹2,082"
            />

            <SalaryRow
              name="Fixed Allowance"
              amount="₹2,918"
            />

          </div>

        </section>
      )}


      {/* SECURITY */}

      {activeTab === "security" && (

        <section className="profile-section">

          <div className="profile-section-header">

            <div>
              <h2>
                Security
              </h2>

              <p>
                Account and security information.
              </p>
            </div>

            <Lock size={18} />

          </div>


          <div className="security-grid">

            <div className="security-group">

              <h3>
                Account
              </h3>

              <ProfileField
                label="Email"
                value={profile.email}
              />

              <ProfileField
                label="Employee ID"
                value={profile.employeeId}
              />

            </div>


            <div className="security-group">

              <h3>
                Security
              </h3>

              <ProfileField
                label="Password"
                value="••••••••••"
              />

              <ProfileField
                label="Two-Factor Authentication"
                value="Not Enabled"
              />

            </div>

          </div>

        </section>
      )}

    </div>
  );
}


/* =========================================
   PROFILE FIELD
========================================= */

function ProfileField({
  label,
  name,
  value,
  editing,
  onChange,
}) {
  return (
    <div className="profile-field">

      <label>
        {label}
      </label>

      {editing && name ? (
        <input
          name={name}
          value={value}
          onChange={onChange}
        />
      ) : (
        <span>
          {value || "--"}
        </span>
      )}

    </div>
  );
}


/* =========================================
   SALARY ROW
========================================= */

function SalaryRow({
  name,
  amount,
}) {
  return (
    <div className="salary-row">

      <div>
        <strong>
          {name}
        </strong>

        <small>
          Salary component
        </small>
      </div>

      <span>
        {amount}
      </span>

    </div>
  );
}

export default Profile;