import { Link } from "react-router-dom";
import { templeZones } from "../data/templeData";
import "../styles/GuardDevices.css";
function GuardDevices() {
  return (
    <section>
      <div className="page-title">
        <span className="section-kicker">IOT MONITORING</span>
        <h1>Guard Alert Devices</h1>
        <p>
          View LoRa device information, battery levels, and assigned locations.
        </p>
      </div>

      <div className="zones-grid">
        {templeZones.map((zone) => (
          <article className="information-card" key={zone.id}>
            <div className="information-heading">
              <span>◉</span>
              <div>
                <h2>{zone.device.id}</h2>
                <p>{zone.device.type}</p>
              </div>
            </div>

            <div className="information-row">
              <span>Assigned Location</span>
              <strong>{zone.name}</strong>
            </div>

            <div className="information-row">
              <span>Allocated Guard</span>
              <strong>{zone.guard.name}</strong>
            </div>

            <div className="information-row">
              <span>Connection</span>
              <strong>{zone.device.connection}</strong>
            </div>

            <div className="information-row">
              <span>Battery</span>
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

            <Link
              to={`/zones/${zone.id}`}
              className="zone-details-button"
            >
              View Device Location →
            </Link>
          </article>
        ))}
      </div>

      <div className="alert-note">
        <strong>Important:</strong> Connection and battery values are
        demonstration values. Real device status requires telemetry from
        the LoRa gateway or guard device.
      </div>
    </section>
  );
}

export default GuardDevices;