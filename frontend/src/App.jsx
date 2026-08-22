import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import TimeOff from "./pages/TimeOff";
import Profile from "./pages/Profile";

import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Authentication */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />


        {/* Application */}

        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/employees"
          element={
            <Layout>
              <Employees />
            </Layout>
          }
        />

        <Route
          path="/attendance"
          element={
            <Layout>
              <Attendance />
            </Layout>
          }
        />

        <Route
          path="/time-off"
          element={
            <Layout>
              <TimeOff />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;