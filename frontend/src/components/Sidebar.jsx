

import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* BRAND SECTION */}
      <div className="brand">
        <div className="brand-logo">
          <img src="/sai.png" alt="Sai Baba" />
        </div>

        <div className="brand-text">
          <h2>Sai Crowd</h2>
          <p>Temple Monitoring</p>
        </div>
      </div>

      <NavLink
  to="/admin-profile"
  className={({ isActive }) =>
    isActive ? "nav-item active" : "nav-item"
  }
>
  <span className="nav-icon">👤</span>
  <span>Admin Profile</span>
</NavLink>


      {/* MENU LABEL */}
      <p className="sidebar-label">MAIN MENU</p>

      {/* NAVIGATION */}
      <nav className="sidebar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-icon">▦</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/zones"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-icon">⌖</span>
          <span>Crowd Zones</span>
        </NavLink>

        <NavLink
          to="/guards"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-icon">♙</span>
          <span>Security Guards</span>
        </NavLink>

        <NavLink
          to="/devices"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-icon">◉</span>
          <span>Guard Devices</span>
        </NavLink>

        <NavLink
          to="/alerts"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-icon">♢</span>
          <span>Crowd Alerts</span>
        </NavLink>
      </nav>

      {/* BOTTOM SECTION */}
      <div className="sidebar-bottom">
        <div className="sidebar-temple-card">
          <div className="temple-card-icon">🙏</div>

          <h3>Om Sai Ram</h3>

          <p>Devotee safety comes first.</p>
        </div>

        <div className="sidebar-footer">
          <span className="footer-dot"></span>

          <span>Crowd Monitoring System</span>
        </div>
      </div>


      
    </aside>
  );
}

export default Sidebar