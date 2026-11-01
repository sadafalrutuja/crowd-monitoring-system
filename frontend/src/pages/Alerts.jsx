

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "../styles/Alerts.css";

// Zone name to ID mapping
const zoneIdMap = {
  Chavdi: "chavdi",
  "Datta Mandir": "datta_mandir",
  Shani_Mandir: "shani_mandir",
  Dwarkamai: "dwarkamai",
  Hanuman_Mandir: "hanuman_mandir",
  Gutusthan: "gurusthan",
  Gurusthan: "gurusthan",
  Nanddeep_Mandir: "nanddeep_mandir",
  Samadhi_Temple: "samadhi_temple",
};

function getZoneId(zoneId, zoneName) {
  if (zoneId && zoneId.trim() !== "") {
    return zoneId;
  }

  return zoneIdMap[zoneName] || "";
}

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const alertsRef = collection(db, "alerts");

    const unsubscribe = onSnapshot(
      alertsRef,
      (snapshot) => {
        const alertsData = snapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            zoneId: getZoneId(data.zoneId, data.zoneName),
            zoneName: data.zoneName || "Unknown Zone",
            people: Number(
              data.currentPeopleCount ?? data.currentPepoleCount ?? 0
            ),
            capacity: Number(data.capacity || 0),
            threshold: Number(data.threshold || 0),
            message: data.message || "Crowd threshold exceeded",
            severity: (
              data.severity || data.saverity || "medium"
            ).toLowerCase(),
            status: (data.status || "active").toLowerCase(),
            timestamp: data.timestamp?.toDate
              ? data.timestamp.toDate()
              : data.timestamp
                ? new Date(data.timestamp)
                : null,
          };
        });

        alertsData.sort(
          (a, b) =>
            (b.timestamp?.getTime() || 0) -
            (a.timestamp?.getTime() || 0)
        );

        setAlerts(alertsData);
        setLoading(false);
        setError("");
      },
      (err) => {
        console.error("Firestore Alerts Error:", err);
        setError("Unable to load alerts. Please check Firebase permissions.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const activeAlerts = alerts.filter(
    (alert) => alert.status === "active"
  );

  const highCrowdAlerts = activeAlerts.filter(
    (alert) =>
      alert.severity === "high" ||
      (alert.threshold > 0 && alert.people >= alert.threshold)
  );

  const getDateTime = (timestamp) => {
    if (!timestamp || Number.isNaN(timestamp.getTime())) {
      return "Time unavailable";
    }

    return timestamp.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <section>
      <div className="page-title">
        <span className="section-kicker">SECURITY UPDATES</span>
        <h1>Crowd Alerts</h1>
        <p>
          Review areas where the configured crowd threshold is exceeded.
        </p>
      </div>

      <div className="alert-summary">
        <div className="alert-summary-icon">⚠️</div>

        <div>
          <h3>{highCrowdAlerts.length} Active High-Crowd Alerts</h3>
          <p>
            These areas may require additional crowd management
            and attention from security staff.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="empty-state">
          <h3>Loading alerts...</h3>
        </div>
      ) : error ? (
        <div className="empty-state">
          <h3>{error}</h3>
        </div>
      ) : highCrowdAlerts.length > 0 ? (
        <div className="zones-grid">
          {highCrowdAlerts.map((alert) => (
            <article className="information-card" key={alert.id}>
              <span className="status-badge high">
                {alert.severity.toUpperCase()} ALERT
              </span>

              <h2>{alert.zoneName}</h2>

              <p>{alert.message}</p>

              <div className="information-row">
                <span>Estimated People</span>
                <strong>{alert.people}</strong>
              </div>

              <div className="information-row">
                <span>Zone Capacity</span>
                <strong>{alert.capacity}</strong>
              </div>

              <div className="information-row">
                <span>Crowd Threshold</span>
                <strong>{alert.threshold}</strong>
              </div>

              <div className="information-row">
                <span>Alert Status</span>
                <strong>{alert.status.toUpperCase()}</strong>
              </div>

              <div className="information-row">
                <span>Alert Time</span>
                <strong>{getDateTime(alert.timestamp)}</strong>
              </div>

              {alert.zoneId ? (
                <Link
                  to={`/zones/${alert.zoneId}`}
                  className="zone-details-button"
                >
                  View Area Details →
                </Link>
              ) : (
                <p className="alert-note">
                  Zone details are unavailable for this alert.
                </p>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No active high-crowd alerts</h3>
          <p>
            All monitored areas are currently below the alert condition.
          </p>
        </div>
      )}

      <div className="alert-note">
        Alerts are fetched from Firestore and updated in real time.
      </div>
    </section>
  );
}

export default Alerts;