import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">ॐ</div>

        <div>
          <h2>Sai Crowd</h2>
          <p>Temple Monitoring</p>
        </div>
      </div>

      <p className="sidebar-label">MAIN MENU</p>

      <nav className="sidebar-nav">
        <NavLink to="/" end className="nav-item">
          <span>▦</span>
          Dashboard
        </NavLink>

        <NavLink to="/zones" className="nav-item">
          <span>⌖</span>
          Crowd Zones
        </NavLink>

        <NavLink to="/guards" className="nav-item">
          <span>♙</span>
          Security Guards
        </NavLink>

        <NavLink to="/devices" className="nav-item">
          <span>◉</span>
          Guard Devices
        </NavLink>

        <NavLink to="/alerts" className="nav-item">
          <span>♢</span>
          Crowd Alerts
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-temple-card">
          <span>🙏</span>
          <h3>Om Sai Ram</h3>
          <p>Devotee safety comes first.</p>
        </div>

        <p className="sidebar-footer">
          <span className="footer-dot"></span>
          Crowd Monitoring System
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;