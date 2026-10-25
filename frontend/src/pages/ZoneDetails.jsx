import { Link, useParams } from "react-router-dom";
import {
  templeZones,
  getCrowdStatus,
  getOccupancy,
} from "../data/templeData";
import "../styles/ZoneDetails.css";
function ZoneDetails() {
  const { zoneId } = useParams();

  const zone = templeZones.find((item) => item.id === zoneId);

  if (!zone) {
    return (
      <div className="empty-state">
        <h2>Temple location not found</h2>
        <Link to="/zones" className="zone-details-button">
          Back to Crowd Zones
        </Link>
      </div>
    );
  }

  const status = getCrowdStatus(zone);
  const occupancy = getOccupancy(zone);

  return (
    <section className="zone-details-page">
      <Link to="/zones" className="back-link">
        ← Back to Crowd Zones
      </Link>

      <div className="zone-details-banner">
        <div className="zone-details-icon">{zone.icon}</div>

        <div>
          <span className="section-kicker">TEMPLE AREA DETAILS</span>
          <h1>{zone.name}</h1>
          <p>Location ID: {zone.id}</p>
        </div>

        <span className={`status-badge ${status.toLowerCase()}`}>
          {status} Crowd
        </span>
      </div>

      <div className="details-stats-grid">
        <div className="detail-stat">
          <span>👥</span>
          <p>Estimated People</p>
          <h2>{zone.people}</h2>
        </div>

        <div className="detail-stat">
          <span>📊</span>
          <p>Occupancy</p>
          <h2>{occupancy}%</h2>
        </div>

        <div className="detail-stat">
          <span>📹</span>
          <p>Camera ID</p>
          <h2>{zone.cameraId}</h2>
        </div>
      </div>

      <div className="details-two-column">
        <article className="information-card">
          <div className="information-heading">
            <span>♙</span>
            <div>
              <h2>Allocated Security Guard</h2>
              <p>Guard assigned to this area</p>
            </div>
          </div>

          <div className="guard-profile">
            <div className="guard-avatar">♙</div>

            <div>
              <h3>{zone.guard.name}</h3>
              <p>Guard ID: {zone.guard.id}</p>
            </div>

            <span
              className={`status-badge ${
                zone.guard.availability === "On Duty"
                  ? "low"
                  : "medium"
              }`}
            >
              {zone.guard.availability}
            </span>
          </div>

          <div className="information-row">
            <span>Assigned Location</span>
            <strong>{zone.name}</strong>
          </div>

          <div className="information-row">
            <span>Duty Shift</span>
            <strong>{zone.guard.shift}</strong>
          </div>

          <div className="information-row">
            <span>Contact Information</span>
            <strong>{zone.guard.phone}</strong>
          </div>
        </article>

        <article className="information-card">
          <div className="information-heading">
            <span>◉</span>
            <div>
              <h2>Guard Alert Device</h2>
              <p>LoRa-based guard notification device</p>
            </div>
          </div>

          <div className="device-id-box">
            <span>DEVICE ID</span>
            <h3>{zone.device.id}</h3>
            <p>{zone.device.type}</p>
          </div>

          <div className="information-row">
            <span>Connection Status</span>
            <strong>{zone.device.connection}</strong>
          </div>

          <div className="information-row">
            <span>Battery Level</span>
            <strong>{zone.device.battery}%</strong>
          </div>

          <div className="battery-track">
            <div
              className="battery-fill"
              style={{ width: `${zone.device.battery}%` }}
            />
          </div>

          <div className="information-row">
            <span>Last Alert</span>
            <strong>{zone.device.lastAlert}</strong>
          </div>

          <div className="device-note">
            Device information is sample data until connected to the
            real LoRa gateway.
          </div>
        </article>
      </div>

      <article className="information-card capacity-card">
        <h2>Crowd Capacity</h2>
        <p>
          Estimated {zone.people} people out of a configured capacity
          of {zone.capacity}.
        </p>

        <div className="progress-track capacity-progress">
          <div
            className={`progress-fill ${status.toLowerCase()}`}
            style={{ width: `${Math.min(occupancy, 100)}%` }}
          />
        </div>

        <div className="capacity-label">
          <span>{occupancy}% occupied</span>
          <span>{Math.max(0, zone.capacity - zone.people)} spaces remaining</span>
        </div>
      </article>
    </section>
  );
}

export default ZoneDetails;