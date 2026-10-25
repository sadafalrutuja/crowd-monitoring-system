import { Link } from "react-router-dom";
import { getCrowdStatus, getOccupancy } from "../data/templeData";

function ZoneCard({ zone }) {
  const status = getCrowdStatus(zone);
  const percentage = getOccupancy(zone);

  return (
    <article className="zone-card">
      <div className="zone-card-top">
        <div className="zone-icon">{zone.icon}</div>

        <span className={`status-badge ${status.toLowerCase()}`}>
          {status} Crowd
        </span>
      </div>

      <h3>{zone.name}</h3>

      <p className="camera-label">
        Camera: {zone.cameraId}
      </p>

      <div className="people-row">
        <div>
          <h2>{zone.people}</h2>
          <span>Estimated people</span>
        </div>

        <div className="percentage-box">
          <strong>{percentage}%</strong>
          <span>Capacity used</span>
        </div>
      </div>

      <div className="progress-track">
        <div
          className={`progress-fill ${status.toLowerCase()}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      <div className="zone-card-footer">
        <span>Guard: {zone.guard.name}</span>
        <span>Device: {zone.device.id}</span>
      </div>

      <Link to={`/zones/${zone.id}`} className="zone-details-button">
        View Area Details →
      </Link>
    </article>
  );
}

export default ZoneCard;