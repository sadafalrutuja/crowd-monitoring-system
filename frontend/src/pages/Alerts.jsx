import { Link } from "react-router-dom";
import { templeZones, getCrowdStatus } from "../data/templeData";
import "../styles/Alerts.css";
function Alerts() {
  const highCrowdZones = templeZones.filter(
    (zone) => getCrowdStatus(zone) === "High"
  );

  return (
    <section>
      <div className="page-title">
        <span className="section-kicker">SECURITY UPDATES</span>
        <h1>Crowd Alerts</h1>
        <p>Review areas where the configured crowd threshold is exceeded.</p>
      </div>

      <div className="alert-summary">
        <div className="alert-summary-icon">⚠️</div>
        <div>
          <h3>{highCrowdZones.length} High-Crowd Zones</h3>
          <p>
            These areas may require additional crowd management
            and attention from security staff.
          </p>
        </div>
      </div>

      {highCrowdZones.length > 0 ? (
        <div className="zones-grid">
          {highCrowdZones.map((zone) => (
            <article className="information-card" key={zone.id}>
              <span className="status-badge high">High Crowd</span>

              <h2>{zone.name}</h2>

              <div className="information-row">
                <span>Estimated People</span>
                <strong>{zone.people}</strong>
              </div>

              <div className="information-row">
                <span>Allocated Guard</span>
                <strong>{zone.guard.name}</strong>
              </div>

              <div className="information-row">
                <span>Guard Device</span>
                <strong>{zone.device.id}</strong>
              </div>

              <Link
                to={`/zones/${zone.id}`}
                className="zone-details-button"
              >
                View Area and Guard →
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No high-crowd zones</h3>
        </div>
      )}

      <div className="alert-note">
        These are sample crowd alerts calculated from the demonstration data.
        Actual alerts require live AI crowd detection.
      </div>
    </section>
  );
}

export default Alerts;