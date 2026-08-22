import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!loginId.trim()) {
      setError("Please enter your Login ID or Email.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    /*
      Backend authentication will be connected here later.

      For now, successful login takes the user
      to the dashboard so we can test the UI flow.
    */

    navigate("/dashboard");
  };

  return (
    <main className="auth-page">
      <section className="auth-card">

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
          <h1>Welcome Back</h1>

          <p>
            Sign in to continue to your account
          </p>
        </div>

        {/* Form */}
        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          {/* Login ID */}
          <div className="form-field">
            <label htmlFor="loginId">
              Login ID / Email
            </label>

            <input
              id="loginId"
              type="text"
              value={loginId}
              onChange={(event) => {
                setLoginId(event.target.value);
                setError("");
              }}
              placeholder="Enter your Login ID or Email"
              autoComplete="username"
            />
          </div>

          {/* Password */}
          <div className="form-field">
            <label htmlFor="password">
              Password
            </label>

            <div className="password-input-container">

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                placeholder="Enter your password"
                autoComplete="current-password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
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

          {/* Error */}
          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          {/* Sign In */}
          <button
            type="submit"
            className="signin-button"
          >
            SIGN IN
          </button>

        </form>

        {/* Signup */}
        <div className="signup-section">

          <span>
            Don't have an account?
          </span>

          <button
            type="button"
            className="signup-link"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>

        </div>

      </section>
    </main>
  );
}

export default Login;