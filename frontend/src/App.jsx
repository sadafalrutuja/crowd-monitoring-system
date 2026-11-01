import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

// COMPONENTS
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

// PAGES
import Dashboard from "./pages/Dashboard";
import CrowdZones from "./pages/CrowdZones";
import ZoneDetails from "./pages/ZoneDetails";
import SecurityGuards from "./pages/SecurityGuards";
import GuardDevices from "./pages/GuardDevices";
import Alerts from "./pages/Alerts";
import Login from "./pages/Login";
import AdminProfile from "./pages/AdminProfile";

// FIREBASE TEST
import FirebaseTest from "./FirebaseTest";


// ========================================
// DASHBOARD LAYOUT
// Sidebar + Topbar + Pages
// ========================================

function Layout() {
  return (
    <div className="app-shell">

      <Sidebar />

      <main className="main-content">

        <Topbar />

        <div className="page-container">

          <Routes>

            {/* DASHBOARD */}
            <Route
              path="/"
              element={<Dashboard />}
            />

            {/* CROWD ZONES */}
            <Route
              path="/zones"
              element={<CrowdZones />}
            />

            {/* ZONE DETAILS */}
            <Route
              path="/zones/:zoneId"
              element={<ZoneDetails />}
            />

            {/* SECURITY GUARDS */}
            <Route
              path="/guards"
              element={<SecurityGuards />}
            />

            {/* GUARD DEVICES */}
            <Route
              path="/devices"
              element={<GuardDevices />}
            />

            {/* CROWD ALERTS */}
            <Route
              path="/alerts"
              element={<Alerts />}
            />

            {/* ADMIN PROFILE */}
            <Route
              path="/admin-profile"
              element={<AdminProfile />}
            />

            {/* UNKNOWN PAGE */}
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

          </Routes>

          {/* FOOTER */}
          <footer className="page-footer">

            <span>ॐ Sai Baba Crowd Detector</span>

            <span>Smart Crowd Monitoring System</span>

          </footer>

        </div>

      </main>

    </div>
  );
}


// ========================================
// AUTHENTICATION AND ROUTING
// ========================================

function AppRoutes() {

  const [user, setUser] = useState(null);

  const [checkingAuth, setCheckingAuth] = useState(true);

  const location = useLocation();


  // FIREBASE AUTH STATE LISTENER
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,

      (currentUser) => {

        setUser(currentUser);

        setCheckingAuth(false);

      },

      (error) => {

        console.error(
          "Authentication state error:",
          error
        );

        setUser(null);

        setCheckingAuth(false);

      }
    );

    return () => unsubscribe();

  }, []);


  // AUTH LOADING SCREEN
  if (
    checkingAuth &&
    location.pathname !== "/firebase-test"
  ) {

    return (

      <div className="auth-loading">

        <div className="auth-loading-spinner"></div>

        <p>Loading Sai Baba Crowd Detector...</p>

      </div>

    );

  }


  return (

    <Routes>

      {/* LOGIN PAGE */}
      <Route
        path="/login"
        element={
          user
            ? <Navigate to="/" replace />
            : <Login />
        }
      />


      {/* FIREBASE TEST PAGE */}
      <Route
        path="/firebase-test"
        element={<FirebaseTest />}
      />


      {/* PROTECTED DASHBOARD PAGES */}
      <Route
        path="/*"
        element={
          user
            ? <Layout />
            : <Navigate to="/login" replace />
        }
      />

    </Routes>

  );

}


// ========================================
// MAIN APP
// ========================================

function App() {

  return (

    <BrowserRouter>

      <AppRoutes />

    </BrowserRouter>

  );

}

export default App