import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  return (
    <main className="auth-page">
      <section className="auth-card">

        <div className="logo-section">
          <div className="company-logo">
            DAYFLOW
          </div>

          <p className="logo-subtitle">
            Employee Management System
          </p>
        </div>

        <div className="auth-heading">
          <h1>Create Account</h1>

          <p>
            Create your Dayflow account
          </p>
        </div>

        <div className="signup-placeholder">

          <p>
            Signup form will be added next.
          </p>

          <button
            type="button"
            className="signin-button"
            onClick={() => navigate("/")}
          >
            BACK TO SIGN IN
          </button>

        </div>

      </section>
    </main>
  );
}

export default Signup;