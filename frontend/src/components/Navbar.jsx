import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
  Users,
  CalendarCheck,
  Clock,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Employees",
      path: "/employees",
      icon: Users,
    },
    {
      label: "Attendance",
      path: "/attendance",
      icon: CalendarCheck,
    },
    {
      label: "Time Off",
      path: "/time-off",
      icon: Clock,
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <header className="navbar">

      <div className="navbar-inner">

        {/* Logo */}
        <button
          className="navbar-logo"
          onClick={() => navigate("/dashboard")}
        >
          DAYFLOW
        </button>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.path;

            return (
              <button
                key={item.path}
                className={`nav-item ${
                  isActive ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation(item.path)
                }
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="navbar-right">

          {/* Profile */}
          <div className="profile-container">

            <button
              className="profile-button"
              onClick={() =>
                setProfileOpen((previous) => !previous)
              }
            >
              <div className="profile-avatar">
                <User size={17} />
              </div>

              <div className="profile-info">
                <span className="profile-name">
                  Employee
                </span>

                <span className="profile-role">
                  Employee
                </span>
              </div>

              <ChevronDown
                size={16}
                className={
                  profileOpen
                    ? "chevron rotated"
                    : "chevron"
                }
              />
            </button>

            {profileOpen && (
              <div className="profile-dropdown">

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/profile");
                  }}
                >
                  <User size={16} />
                  My Profile
                </button>

                <div className="dropdown-divider" />

                <button
                  className="logout-button"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Logout
                </button>

              </div>
            )}

          </div>

          {/* Mobile Menu */}
          <button
            className="mobile-menu-button"
            onClick={() =>
              setMenuOpen((previous) => !previous)
            }
            aria-label="Toggle navigation"
          >
            {menuOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>

        </div>

      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="mobile-nav">

          {navItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.path;

            return (
              <button
                key={item.path}
                className={`mobile-nav-item ${
                  isActive ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation(item.path)
                }
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}

        </nav>
      )}

    </header>
  );
}

export default Navbar;