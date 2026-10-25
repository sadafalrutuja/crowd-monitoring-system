import { Link } from "react-router-dom";
import { templeZones } from "../data/templeData";
import "../styles/SecurityGuards.css";
function SecurityGuards() {
  return (
    <section>
      <div className="page-title">
        <span className="section-kicker">SECURITY TEAM</span>
        <h1>Security Guards</h1>
        <p>View allocated guards and their assigned temple locations.</p>
      </div>

      <div className="zones-grid">
        {templeZones.map((zone) => (
          <article className="information-card guard-list-card" key={zone.id}>
            <div className="guard-profile">
              <div className="guard-avatar">♙</div>

              <div>
                <h3>{zone.guard.name}</h3>
                <p>{zone.guard.id}</p>
              </div>

              <span className="status-badge low">
                {zone.guard.availability}
              </span>
            </div>

            <div className="information-row">
              <span>Allocated Location</span>
              <strong>{zone.name}</strong>
            </div>

            <div className="information-row">
              <span>Shift</span>
              <strong>{zone.guard.shift}</strong>
            </div>

            <div className="information-row">
              <span>Guard Device</span>
              <strong>{zone.device.id}</strong>
            </div>

            <Link
              to={`/zones/${zone.id}`}
              className="zone-details-button"
            >
              View Assigned Area →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SecurityGuards;