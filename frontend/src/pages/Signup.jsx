import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Upload, X } from "lucide-react";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Image size must be less than 2 MB.");
      return;
    }

    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));
    setError("");
  };

  const removeLogo = () => {
    setLogo(null);
    setLogoPreview("");
  };

  const validateForm = () => {
    const {
      companyName,
      name,
      email,
      phone,
      password,
      confirmPassword,
    } = formData;

    if (
      !companyName.trim() ||
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password ||
      !confirmPassword
    ) {
      return "Please fill in all required fields.";
    }

    if (!email.includes("@")) {
      return "Please enter a valid email address.";
    }

    if (phone.length < 10) {
      return "Please enter a valid phone number.";
    }

    if (password.length < 6) {
      return "Password must contain at least 6 characters.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    /*
      Backend signup API will be connected here later.

      For now, we only demonstrate successful
      frontend form validation.
    */

    setSuccess(
      "Account details are valid. Backend registration will be connected next."
    );
  };

  return (
    <main className="auth-page signup-page">
      <section className="auth-card signup-card">

        {/* Logo */}
        <div className="logo-section">
          <div className="company-logo">
            DAYFLOW
          </div>

          <p className="logo-subtitle">
            Employee Management System
          </p>
        </div>

        {/* Heading */}
        <div className="auth-heading">
          <h1>Create Account</h1>

          <p>
            Register your company or employee account
          </p>
        </div>

        <form
          className="signup-form"
          onSubmit={handleSubmit}
        >

          {/* Company Name */}
          <div className="form-field">
            <label htmlFor="companyName">
              Company Name
            </label>

            <input
              id="companyName"
              name="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
            />
          </div>

          {/* Name */}
          <div className="form-field">
            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="form-field">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div className="form-field">
            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Password */}
          <div className="form-field">
            <label htmlFor="signup-password">
              Password
            </label>

            <div className="password-input-container">
              <input
                id="signup-password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-field">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <div className="password-input-container">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    (previous) => !previous
                  )
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          {/* Logo Upload */}
          <div className="form-field">
            <label>
              Profile / Company Logo
            </label>

            {!logoPreview ? (
              <label
                htmlFor="logo-upload"
                className="upload-box"
              >
                <Upload size={22} />

                <span>
                  Click to upload image
                </span>

                <small>
                  PNG, JPG or JPEG • Max 2 MB
                </small>

                <input
                  id="logo-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleLogoChange}
                  hidden
                />
              </label>
            ) : (
              <div className="logo-preview-container">

                <img
                  src={logoPreview}
                  alt="Uploaded logo preview"
                  className="logo-preview"
                />

                <div className="logo-file-info">
                  <span>
                    {logo?.name}
                  </span>

                  <button
                    type="button"
                    className="remove-logo"
                    onClick={removeLogo}
                  >
                    <X size={17} />
                  </button>
                </div>

              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="form-success">
              {success}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="signin-button"
          >
            SIGN UP
          </button>

        </form>

        {/* Login */}
        <div className="signup-section">
          <span>
            Already have an account?
          </span>

          <button
            type="button"
            className="signup-link"
            onClick={() => navigate("/")}
          >
            Sign In
          </button>
        </div>

      </section>
    </main>
  );
}

export default Signup;