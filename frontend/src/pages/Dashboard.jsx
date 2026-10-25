import { Link } from "react-router-dom";
import { templeZones, getCrowdStatus } from "../data/templeData";
import ZoneCard from "../components/ZoneCard";
import "../styles/Dashboard.css";

function Dashboard() {
  const totalPeople = templeZones.reduce(
    (sum, zone) => sum + zone.people,
    0
  );

  const highZones = templeZones.filter(
    (zone) => getCrowdStatus(zone) === "High"
  ).length;

  return (
    <section>
      <div className="welcome-banner">
        <div className="welcome-content">
          <span className="welcome-tag">✦ OM SAI RAM ✦</span>

          <h1>
            Sai Baba Temple
            <br />
            <span>Crowd Detector</span>
          </h1>

          <p>
            Monitor temple crowds, allocated guards, and LoRa alert devices
            from one simple dashboard.
          </p>

          <Link to="/zones" className="primary-button">
            Explore Crowd Zones →
          </Link>
        </div>

        <div className="banner-art">
          <div className="sun-circle">
            <span>ॐ</span>
          </div>
          <span className="banner-bottom-text">SHIRDI TEMPLE</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon yellow">👥</div>
          <div className="stat-content">
            <p>People Detected</p>
            <h2>{totalPeople.toLocaleString("en-IN")}</h2>
            <span>Sample crowd count</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon cream">📍</div>
          <div className="stat-content">
            <p>Temple Zones</p>
            <h2>{templeZones.length}</h2>
            <span>Configured locations</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon red">⚠️</div>
          <div className="stat-content">
            <p>High Crowd Zones</p>
            <h2>{highZones}</h2>
            <span>Sample threshold alerts</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">◉</div>
          <div className="stat-content">
            <p>Guard Devices</p>
            <h2>{templeZones.length}</h2>
            <span>Configured device entries</span>
          </div>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <span className="section-kicker">TEMPLE LOCATIONS</span>
          <h2>Crowd Overview</h2>
          <p>Check each area and its allocated security resources.</p>
        </div>

        <Link to="/zones" className="text-button">
          View All →
        </Link>
      </div>

      <div className="zones-grid">
        {templeZones.slice(0, 4).map((zone) => (
          <ZoneCard key={zone.id} zone={zone} />
        ))}
      </div>

      <div className="bottom-info-grid">
        <div className="info-card">
          <div className="info-icon">🛡️</div>
          <div>
            <h3>Security Guard Management</h3>
            <p>
              Check allocated guards and their assigned temple locations.
            </p>
            <Link to="/guards" className="text-button">
              View Guards →
            </Link>
          </div>
        </div>

        <div className="info-card">
          <div className="info-icon">📡</div>
          <div>
            <h3>LoRa Guard Devices</h3>
            <p>
              Review device IDs, battery values, and demonstration statuses.
            </p>
            <Link to="/devices" className="text-button">
              View Devices →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;