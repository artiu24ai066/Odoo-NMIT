import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Clock3,
  UserRound,
} from "lucide-react";

import TimeOff from "./pages/TimeOff";
import Attendance from "./pages/Attendance";
import Profile from "./pages/Profile";
import AdminTimeOff from "./pages/AdminTimeOff";

import "./App.css";


/* =========================================
   PLACEHOLDER DASHBOARD
========================================= */

function Dashboard() {
  return (
    <div className="placeholder-page">
      <p className="page-eyebrow">
        Employee Portal
      </p>

      <h1>
        Dashboard
      </h1>

      <p className="page-description">
        Dashboard content will be available here.
      </p>
    </div>
  );
}


/* =========================================
   PLACEHOLDER EMPLOYEES
========================================= */

function Employees() {
  return (
    <div className="placeholder-page">
      <p className="page-eyebrow">
        Employee Portal
      </p>

      <h1>
        Employees
      </h1>

      <p className="page-description">
        Employee management will be available here.
      </p>
    </div>
  );
}


/* =========================================
   NAVIGATION
========================================= */

function Navigation() {
  return (
    <header className="top-navigation">

      <div className="navigation-container">

        {/* LOGO */}

        <NavLink
          to="/dashboard"
          className="brand-logo"
        >
          DAYFLOW
        </NavLink>


        {/* NAVIGATION */}

        <nav className="main-navigation">

          {/* DASHBOARD */}

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `navigation-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <LayoutDashboard size={17} />

            <span>
              Dashboard
            </span>
          </NavLink>


          {/* EMPLOYEES */}

          <NavLink
            to="/employees"
            className={({ isActive }) =>
              `navigation-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <Users size={17} />

            <span>
              Employees
            </span>
          </NavLink>


          {/* ATTENDANCE */}

          <NavLink
            to="/attendance"
            className={({ isActive }) =>
              `navigation-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <CalendarCheck size={17} />

            <span>
              Attendance
            </span>
          </NavLink>


          {/* TIME OFF */}

          <NavLink
            to="/time-off"
            className={({ isActive }) =>
              `navigation-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <Clock3 size={17} />

            <span>
              Time Off
            </span>
          </NavLink>


          {/* MY PROFILE */}

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `navigation-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <UserRound size={17} />

            <span>
              My Profile
            </span>
          </NavLink>

        </nav>

      </div>

    </header>
  );
}


/* =========================================
   APP
========================================= */

function App() {
  return (
    <BrowserRouter>

      <Navigation />

      <main className="app-content">

        <Routes>

          {/* ROOT */}

          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />


          {/* DASHBOARD */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          {/* EMPLOYEES */}

          <Route
            path="/employees"
            element={<Employees />}
          />


          {/* ATTENDANCE */}

          <Route
            path="/attendance"
            element={<Attendance />}
          />


          {/* TIME OFF */}

          <Route
            path="/time-off"
            element={<TimeOff />}
          />


          {/* PROFILE */}

          <Route
            path="/profile"
            element={<Profile />}
          />


          {/* INVALID ROUTE */}

          <Route
            path="*"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          <Route
            path="/admin/time-off"
            element={<AdminTimeOff />}
          />

        </Routes>

      </main>

    </BrowserRouter>
  );
}

export default App;