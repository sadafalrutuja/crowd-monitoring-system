import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Camera,
  BarChart3,
  Bell,
  Users,
  Settings,
  Shield,
  LogOut,
  Activity,
  Menu,
  X,
  MapPin,
  Radio,
  CheckCircle,
  AlertTriangle,
  UserCheck,
  Clock,
  Video,
  Wifi,
  WifiOff
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

import "./App.css";

/* =========================
   MOCK DATA
========================= */

const zones = [
  {
    id: 1,
    name: "Chavadi",
    count: 68,
    capacity: 150,
    camera: "CAM-01",
    status: "Normal"
  },
  {
    id: 2,
    name: "Dwarkamai",
    count: 112,
    capacity: 150,
    camera: "CAM-02",
    status: "Moderate"
  },
  {
    id: 3,
    name: "Samadhi Mandir",
    count: 178,
    capacity: 200,
    camera: "CAM-03",
    status: "High"
  },
  {
    id: 4,
    name: "Gurusthan",
    count: 62,
    capacity: 120,
    camera: "CAM-04",
    status: "Normal"
  },
  {
    id: 5,
    name: "Datta Mandir",
    count: 101,
    capacity: 120,
    camera: "CAM-05",
    status: "High"
  },
  {
    id: 6,
    name: "Hanuman Mandir",
    count: 45,
    capacity: 100,
    camera: "CAM-06",
    status: "Normal"
  },
  {
    id: 7,
    name: "Lendi Baug",
    count: 88,
    capacity: 100,
    camera: "CAM-07",
    status: "High"
  }
];

const guards = [
  {
    id: 1,
    name: "Rahul Patil",
    zone: "Samadhi Mandir",
    status: "Online",
    task: "Responding to Alert"
  },
  {
    id: 2,
    name: "Amit Shinde",
    zone: "Dwarkamai",
    status: "Online",
    task: "Monitoring"
  },
  {
    id: 3,
    name: "Suresh Jadhav",
    zone: "Lendi Baug",
    status: "Online",
    task: "Monitoring"
  },
  {
    id: 4,
    name: "Vijay More",
    zone: "Chavadi",
    status: "Offline",
    task: "Off Duty"
  },
  {
    id: 5,
    name: "Akash Pawar",
    zone: "Datta Mandir",
    status: "Online",
    task: "Monitoring"
  }
];

const alerts = [
  {
    id: 1,
    zone: "Samadhi Mandir",
    type: "Critical Crowd",
    message: "Crowd density crossed 85%",
    time: "10:42 PM",
    level: "Critical"
  },
  {
    id: 2,
    zone: "Lendi Baug",
    type: "High Crowd",
    message: "Crowd density reached 88%",
    time: "10:38 PM",
    level: "High"
  },
  {
    id: 3,
    zone: "Datta Mandir",
    type: "Capacity Warning",
    message: "Approaching maximum capacity",
    time: "10:34 PM",
    level: "Moderate"
  }
];

const crowdData = [
  { time: "06 AM", crowd: 42 },
  { time: "08 AM", crowd: 68 },
  { time: "10 AM", crowd: 75 },
  { time: "12 PM", crowd: 82 },
  { time: "02 PM", crowd: 65 },
  { time: "04 PM", crowd: 71 },
  { time: "06 PM", crowd: 88 },
  { time: "08 PM", crowd: 94 },
  { time: "10 PM", crowd: 86 }
];

/* =========================
   HELPER
========================= */

function getDensity(count, capacity) {
  return Math.round((count / capacity) * 100);
}

function getStatus(density) {
  if (density >= 90) return "Critical";
  if (density >= 75) return "High";
  if (density >= 50) return "Moderate";
  return "Normal";
}

function getRequiredGuards(count) {
  if (count >= 180) return 5;
  if (count >= 130) return 4;
  if (count >= 80) return 3;
  if (count >= 40) return 2;
  return 1;
}

/* =========================
   LOGIN
========================= */

function Login({ onLogin }) {
  const [role, setRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    onLogin(role);
  };

  return (
    <div className="login-page">

      <div className="login-left">

        <div className="login-brand">
          <div className="brand-icon">
            <Shield size={32} />
          </div>

          <div>
            <h1>CrowdGuard AI</h1>
            <p>Temple Security Operations</p>
          </div>
        </div>

        <div className="login-content">
          <h2>
            Sai Baba Mandir
            <br />
            Crowd Monitoring System
          </h2>

          <p>
            AI-powered crowd monitoring and security
            operations platform for temple staff.
          </p>

          <div className="login-features">
            <div>
              <Activity size={20} />
              <span>Real-time AI monitoring</span>
            </div>

            <div>
              <Camera size={20} />
              <span>Multi-zone CCTV monitoring</span>
            </div>

            <div>
              <Radio size={20} />
              <span>Instant security alerts</span>
            </div>
          </div>
        </div>

      </div>

      <div className="login-right">

        <form className="login-box" onSubmit={handleLogin}>

          <div className="mobile-logo">
            <Shield size={30} />
          </div>

          <h2>Staff Login</h2>
          <p>Access the operations control panel</p>

          <label>Login As</label>

          <div className="role-buttons">

            <button
              type="button"
              className={role === "admin" ? "role-active" : ""}
              onClick={() => setRole("admin")}
            >
              <Shield size={18} />
              Admin
            </button>

            <button
              type="button"
              className={role === "guard" ? "role-active" : ""}
              onClick={() => setRole("guard")}
            >
              <UserCheck size={18} />
              Security Guard
            </button>

          </div>

          <label>Username</label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-button">
            Login to System
          </button>

          <div className="login-status">
            <Wifi size={15} />
            Secure system connection
          </div>

        </form>

      </div>

    </div>
  );
}

/* =========================
   SIDEBAR
========================= */

function Sidebar({
  activePage,
  setActivePage,
  role,
  mobileOpen,
  setMobileOpen,
  logout
}) {

  const adminMenu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      page: "dashboard"
    },
    {
      name: "Live Monitoring",
      icon: Camera,
      page: "monitoring"
    },
    {
      name: "Analytics",
      icon: BarChart3,
      page: "analytics"
    },
    {
      name: "Alerts",
      icon: Bell,
      page: "alerts"
    },
    {
      name: "Guard Management",
      icon: Users,
      page: "guards"
    },
    {
      name: "Camera Management",
      icon: Video,
      page: "cameras"
    },
    {
      name: "Settings",
      icon: Settings,
      page: "settings"
    }
  ];

  const guardMenu = [
    {
      name: "My Zone",
      icon: MapPin,
      page: "guard"
    },
    {
      name: "Alerts",
      icon: Bell,
      page: "alerts"
    }
  ];

  const menu = role === "admin" ? adminMenu : guardMenu;

  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>

        <div className="sidebar-logo">

          <div className="logo-icon">
            <Shield size={24} />
          </div>

          <div>
            <strong>CrowdGuard</strong>
            <small>AI Operations</small>
          </div>

          <button
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
          >
            <X size={22} />
          </button>

        </div>

        <div className="system-label">
          {role === "admin"
            ? "ADMIN PORTAL"
            : "SECURITY CONSOLE"}
        </div>

        <nav>

          {menu.map((item) => {

            const Icon = item.icon;

            return (
              <button
                key={item.page}
                className={
                  activePage === item.page
                    ? "nav-item active"
                    : "nav-item"
                }
                onClick={() => {
                  setActivePage(item.page);
                  setMobileOpen(false);
                }}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </button>
            );

          })}

        </nav>

        <div className="sidebar-bottom">

          <div className="connection-box">
            <div className="connection-dot"></div>

            <div>
              <strong>System Online</strong>
              <small>WebSocket Connected</small>
            </div>
          </div>

          <button className="logout-button" onClick={logout}>
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>
    </>
  );
}

/* =========================
   TOP BAR
========================= */

function TopBar({
  setMobileOpen,
  role
}) {

  return (
    <header className="topbar">

      <button
        className="menu-button"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={24} />
      </button>

      <div className="topbar-title">

        <h2>
          {role === "admin"
            ? "Operations Control Room"
            : "Security Guard Console"}
        </h2>

        <span>
          <Clock size={14} />
          Live monitoring
        </span>

      </div>

      <div className="topbar-right">

        <div className="websocket-status">
          <span></span>
          WebSocket Connected
        </div>

        <div className="temple-status">
          <Activity size={17} />
          Temple: High
        </div>

        <div className="user-avatar">
          {role === "admin" ? "A" : "G"}
        </div>

      </div>

    </header>
  );
}

/* =========================
   STAT CARD
========================= */

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  className = ""
}) {

  return (
    <div className={`stat-card ${className}`}>

      <div className="stat-icon">
        <Icon size={22} />
      </div>

      <div>
        <p>{title}</p>
        <h3>{value}</h3>
        <small>{subtitle}</small>
      </div>

    </div>
  );
}

/* =========================
   ZONE CARD
========================= */

function ZoneCard({ zone }) {

  const density = getDensity(zone.count, zone.capacity);
  const status = getStatus(density);
  const guardsRequired = getRequiredGuards(zone.count);

  return (
    <div className="zone-card">

      <div className="zone-video">

        <div className="video-overlay">

          <div className="live-badge">
            <span></span>
            LIVE
          </div>

          <div className="camera-name">
            {zone.camera}
          </div>

        </div>

        <div className="fake-camera">

          <Camera size={42} />

          <span>
            CCTV STREAM
          </span>

          <small>
            RTSP Camera Feed
          </small>

        </div>

        <div className="tracking-box box-one">
          P101
        </div>

        <div className="tracking-box box-two">
          P102
        </div>

      </div>

      <div className="zone-content">

        <div className="zone-heading">

          <div>
            <h3>{zone.name}</h3>
            <span>
              <MapPin size={13} />
              Zone {zone.id}
            </span>
          </div>

          <div className={`status-badge ${status.toLowerCase()}`}>
            {status}
          </div>

        </div>

        <div className="crowd-numbers">

          <div>
            <span>People</span>
            <strong>{zone.count}</strong>
          </div>

          <div>
            <span>Capacity</span>
            <strong>{zone.capacity}</strong>
          </div>

          <div>
            <span>Density</span>
            <strong>{density}%</strong>
          </div>

        </div>

        <div className="capacity-bar">

          <div
            style={{
              width: `${Math.min(density, 100)}%`
            }}
            className={`capacity-fill ${status.toLowerCase()}`}
          />

        </div>

        <div className="zone-footer">

          <span>
            <Users size={15} />
            {guardsRequired} guards required
          </span>

          <span>
            AI Tracking
          </span>

        </div>

      </div>

    </div>
  );
}

/* =========================
   ALERT PANEL
========================= */

function AlertPanel({ compact = false }) {

  return (
    <div className={`panel ${compact ? "compact" : ""}`}>

      <div className="panel-header">

        <div>
          <h3>Active Alerts</h3>
          <p>Real-time security notifications</p>
        </div>

        <Bell size={20} />

      </div>

      <div className="alerts-list">

        {alerts.map((alert) => (

          <div
            className={`alert-item ${alert.level.toLowerCase()}`}
            key={alert.id}
          >

            <div className="alert-icon">

              {alert.level === "Critical"
                ? <AlertTriangle size={19} />
                : <Bell size={18} />}

            </div>

            <div className="alert-info">

              <strong>
                {alert.type}
              </strong>

              <span>
                {alert.zone}
              </span>

              <p>
                {alert.message}
              </p>

              <small>
                {alert.time}
              </small>

            </div>

            <button className="ack-button">
              Acknowledge
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

/* =========================
   GUARD TABLE
========================= */

function GuardTable() {

  return (
    <div className="panel">

      <div className="panel-header">

        <div>
          <h3>Security Guard Roster</h3>
          <p>Current deployment status</p>
        </div>

        <button className="secondary-button">
          Manage Guards
        </button>

      </div>

      <div className="table-wrapper">

        <table>

          <thead>
            <tr>
              <th>Guard</th>
              <th>Assigned Zone</th>
              <th>Status</th>
              <th>Current Task</th>
            </tr>
          </thead>

          <tbody>

            {guards.map((guard) => (

              <tr key={guard.id}>

                <td>
                  <div className="guard-name">
                    <div className="guard-avatar">
                      {guard.name.charAt(0)}
                    </div>

                    <strong>
                      {guard.name}
                    </strong>
                  </div>
                </td>

                <td>
                  {guard.zone}
                </td>

                <td>

                  <span
                    className={
                      guard.status === "Online"
                        ? "online-status"
                        : "offline-status"
                    }
                  >
                    <span></span>
                    {guard.status}
                  </span>

                </td>

                <td>
                  {guard.task}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

/* =========================
   DASHBOARD
========================= */

function AdminDashboard() {

  return (
    <div className="page">

      <div className="page-heading">

        <div>
          <h1>Temple Overview</h1>
          <p>
            Real-time AI crowd monitoring across all zones
          </p>
        </div>

        <div className="date-display">
          <Clock size={17} />
          28 September 2026
        </div>

      </div>

      <div className="stats-grid">

        <StatCard
          title="Total People"
          value="654"
          subtitle="Across 7 zones"
          icon={Users}
        />

        <StatCard
          title="Average Density"
          value="68%"
          subtitle="Current temple level"
          icon={Activity}
        />

        <StatCard
          title="Active Guards"
          value="12 / 15"
          subtitle="Currently online"
          icon={Shield}
        />

        <StatCard
          title="Active Alerts"
          value="3"
          subtitle="Require attention"
          icon={Bell}
          className="alert-stat"
        />

      </div>

      <div className="section-title">
        <div>
          <h2>Live Zone Monitoring</h2>
          <p>CCTV + YOLO + ByteTrack</p>
        </div>

        <button className="view-button">
          View Full Monitoring
        </button>
      </div>

      <div className="zones-grid">

        {zones.map((zone) => (
          <ZoneCard
            key={zone.id}
            zone={zone}
          />
        ))}

      </div>

      <div className="dashboard-two-column">

        <AlertPanel compact />

        <div className="panel">

          <div className="panel-header">

            <div>
              <h3>Crowd Trend</h3>
              <p>Today's average density</p>
            </div>

            <BarChart3 size={20} />

          </div>

          <div className="chart-container">

            <ResponsiveContainer
              width="100%"
              height={280}
            >

              <LineChart data={crowdData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="time" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="crowd"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      <GuardTable />

    </div>
  );
}

/* =========================
   MONITORING
========================= */

function Monitoring() {

  return (
    <div className="page">

      <div className="page-heading">

        <div>
          <h1>Live AI Monitoring</h1>
          <p>
            Real-time CCTV streams and AI detection
          </p>
        </div>

        <div className="live-system">
          <span></span>
          All cameras operational
        </div>

      </div>

      <div className="monitor-grid">

        {zones.map((zone) => (
          <ZoneCard
            key={zone.id}
            zone={zone}
          />
        ))}

      </div>

    </div>
  );
}

/* =========================
   ANALYTICS
========================= */

function Analytics() {

  const zoneAnalytics = zones.map((zone) => ({
    name: zone.name.split(" ")[0],
    density: getDensity(zone.count, zone.capacity)
  }));

  return (
    <div className="page">

      <div className="page-heading">

        <div>
          <h1>Analytics & Reports</h1>
          <p>
            Historical crowd and security analysis
          </p>
        </div>

        <div className="export-buttons">
          <button className="secondary-button">
            Export CSV
          </button>

          <button className="primary-button">
            Export PDF
          </button>
        </div>

      </div>

      <div className="analytics-grid">

        <div className="panel large-panel">

          <div className="panel-header">
            <div>
              <h3>Hourly Crowd Density</h3>
              <p>Average temple crowd density</p>
            </div>
          </div>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <LineChart data={crowdData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="time" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="crowd"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        <div className="panel">

          <div className="panel-header">

            <div>
              <h3>Zone Comparison</h3>
              <p>Current density</p>
            </div>

          </div>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart data={zoneAnalytics}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="density"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="panel">

        <div className="panel-header">

          <div>
            <h3>Incident Summary</h3>
            <p>Recent security events</p>
          </div>

        </div>

        <div className="incident-grid">

          <div className="incident-card">
            <AlertTriangle />
            <strong>24</strong>
            <span>Crowd Alerts</span>
          </div>

          <div className="incident-card">
            <Shield />
            <strong>18</strong>
            <span>Guard Responses</span>
          </div>

          <div className="incident-card">
            <CheckCircle />
            <strong>21</strong>
            <span>Resolved Alerts</span>
          </div>

          <div className="incident-card">
            <Activity />
            <strong>3</strong>
            <span>Critical Events</span>
          </div>

        </div>

      </div>

    </div>
  );
}

/* =========================
   ALERTS
========================= */

function Alerts() {

  return (
    <div className="page">

      <div className="page-heading">

        <div>
          <h1>Security Alerts</h1>
          <p>
            Monitor and respond to crowd incidents
          </p>
        </div>

        <div className="alert-count">
          3 Active
        </div>

      </div>

      <AlertPanel />

      <div className="panel">

        <div className="panel-header">

          <div>
            <h3>Alert History</h3>
            <p>Previous incidents and responses</p>
          </div>

        </div>

        <div className="history-list">

          <div>
            <span>28 Sep 2026 • 09:32 PM</span>
            <strong>Samadhi Mandir</strong>
            <p>
              Crowd exceeded high-density threshold.
            </p>
            <b>Resolved</b>
          </div>

          <div>
            <span>28 Sep 2026 • 08:47 PM</span>
            <strong>Dwarkamai</strong>
            <p>
              Crowd density crossed warning level.
            </p>
            <b>Resolved</b>
          </div>

          <div>
            <span>28 Sep 2026 • 07:16 PM</span>
            <strong>Lendi Baug</strong>
            <p>
              High crowd concentration detected.
            </p>
            <b>Resolved</b>
          </div>

        </div>

      </div>

    </div>
  );
}

/* =========================
   GUARDS
========================= */

function Guards() {

  return (
    <div className="page">

      <div className="page-heading">

        <div>
          <h1>Guard Management</h1>
          <p>
            Manage security deployment and guard status
          </p>
        </div>

        <button className="primary-button">
          + Add Guard
        </button>

      </div>

      <div className="stats-grid">

        <StatCard
          title="Total Guards"
          value="15"
          subtitle="Registered staff"
          icon={Users}
        />

        <StatCard
          title="Online"
          value="12"
          subtitle="Currently on duty"
          icon={Wifi}
        />

        <StatCard
          title="Responding"
          value="2"
          subtitle="Handling incidents"
          icon={AlertTriangle}
        />

        <StatCard
          title="Offline"
          value="3"
          subtitle="Not available"
          icon={WifiOff}
        />

      </div>

      <GuardTable />

    </div>
  );
}

/* =========================
   CAMERAS
========================= */

function Cameras() {

  return (
    <div className="page">

      <div className="page-heading">

        <div>
          <h1>Camera Management</h1>
          <p>
            Configure CCTV/IP cameras and RTSP streams
          </p>
        </div>

        <button className="primary-button">
          + Add Camera
        </button>

      </div>

      <div className="camera-management-grid">

        {zones.map((zone) => (

          <div className="camera-management-card" key={zone.id}>

            <div className="camera-preview">
              <Camera size={35} />
              <span>LIVE</span>
            </div>

            <div className="camera-details">

              <div>
                <h3>{zone.camera}</h3>
                <p>{zone.name}</p>
              </div>

              <span className="camera-online">
                <span></span>
                Online
              </span>

            </div>

            <div className="camera-info">

              <span>
                Protocol
                <strong>RTSP</strong>
              </span>

              <span>
                AI
                <strong>YOLO + ByteTrack</strong>
              </span>

            </div>

            <button className="secondary-button full-button">
              Configure Camera
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

/* =========================
   SETTINGS
========================= */

function SettingsPage() {

  const [capacity, setCapacity] = useState(200);
  const [threshold, setThreshold] = useState(75);

  return (
    <div className="page">

      <div className="page-heading">

        <div>
          <h1>System Settings</h1>
          <p>
            Configure AI monitoring and zone parameters
          </p>
        </div>

        <button className="primary-button">
          Save Changes
        </button>

      </div>

      <div className="settings-grid">

        <div className="panel">

          <div className="panel-header">
            <div>
              <h3>Zone Configuration</h3>
              <p>Set safe crowd limits</p>
            </div>
          </div>

          <div className="form-group">

            <label>Zone</label>

            <select>
              {zones.map((zone) => (
                <option key={zone.id}>
                  {zone.name}
                </option>
              ))}
            </select>

          </div>

          <div className="form-group">

            <label>
              Maximum Capacity
            </label>

            <input
              type="number"
              value={capacity}
              onChange={(e) =>
                setCapacity(e.target.value)
              }
            />

          </div>

          <div className="form-group">

            <label>
              High Crowd Threshold (%)
            </label>

            <input
              type="number"
              value={threshold}
              onChange={(e) =>
                setThreshold(e.target.value)
              }
            />

          </div>

        </div>

        <div className="panel">

          <div className="panel-header">
            <div>
              <h3>AI Detection</h3>
              <p>YOLO and tracking configuration</p>
            </div>
          </div>

          <div className="setting-row">

            <div>
              <strong>YOLO Detection</strong>
              <span>Enable person detection</span>
            </div>

            <input
              type="checkbox"
              defaultChecked
            />

          </div>

          <div className="setting-row">

            <div>
              <strong>ByteTrack</strong>
              <span>Enable person tracking</span>
            </div>

            <input
              type="checkbox"
              defaultChecked
            />

          </div>

          <div className="setting-row">

            <div>
              <strong>Automatic Alerts</strong>
              <span>Trigger alerts automatically</span>
            </div>

            <input
              type="checkbox"
              defaultChecked
            />

          </div>

          <div className="setting-row">

            <div>
              <strong>Audio Alarm</strong>
              <span>Enable critical alerts</span>
            </div>

            <input
              type="checkbox"
              defaultChecked
            />

          </div>

        </div>

      </div>

    </div>
  );
}

/* =========================
   GUARD DASHBOARD
========================= */

function GuardDashboard() {

  const assignedZone = zones[2];

  const density = getDensity(
    assignedZone.count,
    assignedZone.capacity
  );

  const status = getStatus(density);

  return (
    <div className="guard-page">

      <div className="guard-header">

        <div>
          <span>SECURITY GUARD</span>
          <h1>Good Evening, Rahul</h1>
          <p>Assigned to Samadhi Mandir</p>
        </div>

        <div className="duty-status">
          <span></span>
          On Duty
        </div>

      </div>

      <div className={`guard-alert-banner ${status.toLowerCase()}`}>

        <AlertTriangle size={32} />

        <div>
          <strong>
            {status === "Critical"
              ? "CRITICAL CROWD ALERT"
              : "HIGH CROWD ALERT"}
          </strong>

          <p>
            Crowd density in your assigned zone is {density}%.
            Immediate monitoring required.
          </p>
        </div>

      </div>

      <div className="guard-zone-card">

        <div className="guard-camera">

          <Camera size={55} />

          <span>LIVE CCTV</span>

          <div className="tracking-box guard-box">
            P101
          </div>

          <div className="tracking-box guard-box-two">
            P102
          </div>

        </div>

        <div className="guard-zone-info">

          <div className="guard-zone-title">

            <div>
              <span>ASSIGNED ZONE</span>
              <h2>{assignedZone.name}</h2>
            </div>

            <div className={`status-badge ${status.toLowerCase()}`}>
              {status}
            </div>

          </div>

          <div className="guard-big-stats">

            <div>
              <Users size={25} />
              <span>People</span>
              <strong>{assignedZone.count}</strong>
            </div>

            <div>
              <Activity size={25} />
              <span>Density</span>
              <strong>{density}%</strong>
            </div>

            <div>
              <Shield size={25} />
              <span>Required Guards</span>
              <strong>
                {getRequiredGuards(assignedZone.count)}
              </strong>
            </div>

          </div>

        </div>

      </div>

      <div className="guard-actions">

        <button className="critical-action">
          <CheckCircle size={25} />
          Acknowledge Alert
        </button>

        <button className="guard-action">
          <Radio size={25} />
          Responding to Alert
        </button>

        <button className="guard-action">
          <Clock size={25} />
          On Break
        </button>

      </div>

      <div className="panel guard-alerts">

        <div className="panel-header">

          <div>
            <h3>Recent Alerts</h3>
            <p>Alerts related to your assigned zone</p>
          </div>

        </div>

        {alerts
          .filter((a) => a.zone === assignedZone.name)
          .map((alert) => (

            <div className="guard-alert-item" key={alert.id}>

              <AlertTriangle />

              <div>
                <strong>{alert.type}</strong>
                <p>{alert.message}</p>
                <small>{alert.time}</small>
              </div>

            </div>

          ))}

      </div>

    </div>
  );
}

/* =========================
   APP
========================= */

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("admin");
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  /*
    Mock WebSocket simulation.
    Replace this later with your FastAPI WebSocket.
  */

  useEffect(() => {

    if (!loggedIn) return;

    const interval = setInterval(() => {

      console.log(
        "WebSocket: requesting latest crowd data..."
      );

    }, 5000);

    return () => clearInterval(interval);

  }, [loggedIn]);

  const login = (selectedRole) => {

    setRole(selectedRole);
    setLoggedIn(true);

    if (selectedRole === "admin") {
      setActivePage("dashboard");
    } else {
      setActivePage("guard");
    }

  };

  const logout = () => {

    setLoggedIn(false);
    setRole("admin");
    setActivePage("dashboard");

  };

  if (!loggedIn) {
    return (
      <Login onLogin={login} />
    );
  }

  let content;

  switch (activePage) {

    case "dashboard":
      content = <AdminDashboard />;
      break;

    case "monitoring":
      content = <Monitoring />;
      break;

    case "analytics":
      content = <Analytics />;
      break;

    case "alerts":
      content = <Alerts />;
      break;

    case "guards":
      content = <Guards />;
      break;

    case "cameras":
      content = <Cameras />;
      break;

    case "settings":
      content = <SettingsPage />;
      break;

    case "guard":
      content = <GuardDashboard />;
      break;

    default:
      content = <AdminDashboard />;

  }

  return (

    <div className="app">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        role={role}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        logout={logout}
      />

      <main className="main">

        <TopBar
          setMobileOpen={setMobileOpen}
          role={role}
        />

        <div className="content">
          {content}
        </div>

      </main>

    </div>

  );
}

export default App;
