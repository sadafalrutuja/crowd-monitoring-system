// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { ref, onValue } from "firebase/database";

// import { database } from "../firebase/firebase";
// import ZoneCard from "../components/ZoneCard";
// import "../styles/Dashboard.css";

// function Dashboard() {
//   const [templeZones, setTempleZones] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Firebase Realtime Database Integration
//   useEffect(() => {
//     const zoneOrder = [
//       "chavdi",
//       "datta_mandir",
//       "shani_mandir",
//       "dwarkamai",
//       "hanuman_mandir",
//       "gurusthan",
//       "nanddeep_mandir",
//       "samadhi_temple",
//     ];

//     const zonesRef = ref(database, "crowdZones");

//     const unsubscribe = onValue(
//       zonesRef,
//       (snapshot) => {
//         if (snapshot.exists()) {
//           const firebaseData = snapshot.val();

//           const zones = Object.entries(firebaseData).map(
//             ([id, data]) => {
//               const people = Number(
//                 data.currentPeopleCount ?? 0
//               );

//               const capacity = Number(data.capacity ?? 0);

//               const occupancy =
//                 capacity > 0
//                   ? Math.round((people / capacity) * 100)
//                   : 0;

//               const crowdLevel =
//                 data.crowdLevel ||
//                 (occupancy >= 70
//                   ? "high"
//                   : occupancy >= 40
//                     ? "medium"
//                     : "low");

//               return {
//                 id,
//                 name: data.zoneName || id,
//                 people,
//                 capacity,
//                 threshold: Number(data.threshold ?? 0),
//                 crowdLevel,
//                 direction: data.direction || "Not Available",
//                 status: data.status || "active",
//                 guard: data.guard || null,
//                 device: data.device || null,
//                 icon: data.icon || "📍",
//                 cameraId: data.cameraId || "Not Assigned",
//               };
//             }
//           );

//           // Sort zones in predefined order
//           zones.sort((a, b) => {
//             const indexA = zoneOrder.indexOf(a.id);
//             const indexB = zoneOrder.indexOf(b.id);

//             return (
//               (indexA === -1 ? 999 : indexA) -
//               (indexB === -1 ? 999 : indexB)
//             );
//           });

//           setTempleZones(zones);
//         } else {
//           setTempleZones([]);
//         }

//         setLoading(false);
//         setError("");
//       },
//       (firebaseError) => {
//         console.error("Dashboard Firebase Error:", firebaseError);
//         setError(firebaseError.message);
//         setLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, []);

//   // Total people detected
//   const totalPeople = templeZones.reduce(
//     (total, zone) => total + zone.people,
//     0
//   );

//   // High crowd zones
//   const highZones = templeZones.filter((zone) => {
//     const occupancy =
//       zone.capacity > 0
//         ? (zone.people / zone.capacity) * 100
//         : 0;

//     return (
//       occupancy >= 70 ||
//       zone.crowdLevel.toLowerCase() === "high"
//     );
//   }).length;

//   // Assigned devices
//   const totalDevices = templeZones.filter(
//     (zone) => zone.device?.id
//   ).length;

//   if (loading) {
//     return (
//       <div className="dashboard-loading">
//         <h2>Loading Dashboard...</h2>
//         <p>Connecting to Sai Baba Temple live data.</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="dashboard-error">
//         <h2>Unable to Load Dashboard</h2>
//         <p>{error}</p>
//         <button onClick={() => window.location.reload()}>
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <section>
//       {/* Welcome Banner */}
//       <div className="welcome-banner">
//         <div className="welcome-content">
//           <span className="welcome-tag">
//             ✦ OM SAI RAM ✦
//           </span>

//           <h1>
//             Sai Baba Temple
//             <br />
//             <span>Crowd Detector</span>
//           </h1>

//           <p>
//             Monitor temple crowds, allocated guards, and LoRa
//             alert devices from one simple dashboard.
//           </p>

//           <Link to="/zones" className="primary-button">
//             Explore Crowd Zones →
//           </Link>
//         </div>

//         <div className="banner-art">
//           <div className="sun-circle">
//             <span>ॐ</span>
//           </div>

//           <span className="banner-bottom-text">
//             SHIRDI TEMPLE
//           </span>
//         </div>
//       </div>

//       {/* Dashboard Statistics */}
//       <div className="stats-grid">
//         <div className="stat-card">
//           <div className="stat-icon yellow">👥</div>
//           <div className="stat-content">
//             <p>People Detected</p>
//             <h2>{totalPeople.toLocaleString("en-IN")}</h2>
//             <span>Live crowd count</span>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon cream">📍</div>
//           <div className="stat-content">
//             <p>Temple Zones</p>
//             <h2>{templeZones.length}</h2>
//             <span>Connected locations</span>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon red">⚠️</div>
//           <div className="stat-content">
//             <p>High Crowd Zones</p>
//             <h2>{highZones}</h2>
//             <span>Live crowd alerts</span>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon green">◉</div>
//           <div className="stat-content">
//             <p>Guard Devices</p>
//             <h2>{totalDevices}</h2>
//             <span>Configured device entries</span>
//           </div>
//         </div>
//       </div>

//       {/* Crowd Overview */}
//       <div className="section-heading">
//         <div>
//           <span className="section-kicker">
//             TEMPLE LOCATIONS
//           </span>

//           <h2>Crowd Overview</h2>

//           <p>
//             Check each area and its allocated security resources.
//           </p>
//         </div>

//         <Link to="/zones" className="text-button">
//           View All →
//         </Link>
//       </div>

//       {/* Zone Cards */}
//       {templeZones.length > 0 ? (
//         <div className="zones-grid">
//           {templeZones.slice(0, 4).map((zone) => (
//             <ZoneCard key={zone.id} zone={zone} />
//           ))}
//         </div>
//       ) : (
//         <p>No temple zones found in Firebase.</p>
//       )}

//       {/* Bottom Information */}
//       <div className="bottom-info-grid">
//         <div className="info-card">
//           <div className="info-icon">🛡️</div>

//           <div>
//             <h3>Security Guard Management</h3>

//             <p>
//               Check allocated guards and their assigned temple locations.
//             </p>

//             <Link to="/guards" className="text-button">
//               View Guards →
//             </Link>
//           </div>
//         </div>

//         <div className="info-card">
//           <div className="info-icon">📡</div>

//           <div>
//             <h3>LoRa Guard Devices</h3>

//             <p>
//               Review device IDs, battery values, and connection statuses.
//             </p>

//             <Link to="/devices" className="text-button">
//               View Devices →
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ref, onValue } from "firebase/database";
import { collection, onSnapshot } from "firebase/firestore";

import { database, db } from "../firebase/firebase";

import ZoneCard from "../components/ZoneCard";
import "../styles/Dashboard.css";

function Dashboard() {
  const [templeZones, setTempleZones] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [alertError, setAlertError] = useState("");

  // ==================================
  // 1. FIREBASE REALTIME DATABASE
  // CROWD ZONES INTEGRATION
  // ==================================

  useEffect(() => {
    const zoneOrder = [
      "chavdi",
      "datta_mandir",
      "shani_mandir",
      "dwarkamai",
      "hanuman_mandir",
      "gurusthan",
      "nanddeep_mandir",
      "samadhi_temple",
    ];

    const zonesRef = ref(database, "crowdZones");

    const unsubscribe = onValue(
      zonesRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const firebaseData = snapshot.val();

          const zones = Object.entries(firebaseData).map(
            ([id, data]) => {
              const people = Number(data.currentPeopleCount ?? 0);
              const capacity = Number(data.capacity ?? 0);

              const occupancy =
                capacity > 0
                  ? Math.round((people / capacity) * 100)
                  : 0;

              const crowdLevel =
                data.crowdLevel ||
                (occupancy >= 70
                  ? "high"
                  : occupancy >= 40
                    ? "medium"
                    : "low");

              return {
                id,
                name: data.zoneName || id,
                people,
                capacity,
                threshold: Number(data.threshold ?? 0),
                crowdLevel,
                direction: data.direction || "Not Available",
                status: data.status || "active",
                guard: data.guard || null,
                device: data.device || null,
                icon: data.icon || "📍",
                cameraId: data.cameraId || "Not Assigned",
              };
            }
          );

          zones.sort((a, b) => {
            const indexA = zoneOrder.indexOf(a.id);
            const indexB = zoneOrder.indexOf(b.id);

            return (
              (indexA === -1 ? 999 : indexA) -
              (indexB === -1 ? 999 : indexB)
            );
          });

          setTempleZones(zones);
        } else {
          setTempleZones([]);
        }

        setLoading(false);
        setError("");
      },
      (firebaseError) => {
        console.error("Dashboard Firebase Error:", firebaseError);
        setError(firebaseError.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ==================================
  // 2. FIRESTORE ALERTS INTEGRATION
  // ==================================

  useEffect(() => {
    const alertsRef = collection(db, "alerts");

    const unsubscribe = onSnapshot(
      alertsRef,
      (snapshot) => {
        const alertsData = snapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            zoneId: data.zoneId || data.zonedId || "",
            zoneName: data.zoneName || "Unknown Zone",
            message: data.message || "Crowd alert",
            severity: (
              data.severity || data.saverity || "medium"
            ).toLowerCase(),
            status: (data.status || "active").toLowerCase(),
            people: Number(
              data.currentPeopleCount ??
              data.currentPepoleCount ??
              0
            ),
            capacity: Number(data.capacity || 0),
            threshold: Number(data.threshold || 0),
            timestamp: data.timestamp?.toDate
              ? data.timestamp.toDate()
              : data.timestamp
                ? new Date(data.timestamp)
                : null,
          };
        });

        // Latest alerts first
        alertsData.sort(
          (a, b) =>
            (b.timestamp?.getTime() || 0) -
            (a.timestamp?.getTime() || 0)
        );

        setAlerts(alertsData);
        setAlertError("");
      },
      (firebaseError) => {
        console.error("Dashboard Alerts Error:", firebaseError);
        setAlertError("Unable to load alert information.");
      }
    );

    return () => unsubscribe();
  }, []);

  // ==================================
  // 3. DASHBOARD CALCULATIONS
  // ==================================

  const totalPeople = templeZones.reduce(
    (total, zone) => total + zone.people,
    0
  );

  const highZones = templeZones.filter((zone) => {
    const occupancy =
      zone.capacity > 0
        ? (zone.people / zone.capacity) * 100
        : 0;

    return (
      occupancy >= 70 ||
      zone.crowdLevel.toLowerCase() === "high"
    );
  }).length;

  const totalDevices = templeZones.filter(
    (zone) => zone.device?.id
  ).length;

  // Active alerts
  const activeAlerts = alerts.filter(
    (alert) => alert.status === "active"
  );

  // Critical alerts
  const criticalAlerts = activeAlerts.filter(
    (alert) => alert.severity === "high"
  );

  // Warning alerts
  const warningAlerts = activeAlerts.filter(
    (alert) => alert.severity === "medium"
  );

  // Latest 5 alerts
  const recentAlerts = alerts.slice(0, 5);

  // Format timestamp
  const formatDate = (timestamp) => {
    if (!timestamp || Number.isNaN(timestamp.getTime())) {
      return "Time unavailable";
    }

    return timestamp.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // ==================================
  // 4. LOADING AND ERROR
  // ==================================

  if (loading) {
    return (
      <div className="dashboard-loading">
        <h2>Loading Dashboard...</h2>
        <p>Connecting to Sai Baba Temple live data.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <h2>Unable to Load Dashboard</h2>
        <p>{error}</p>

        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  // ==================================
  // 5. DASHBOARD UI
  // ==================================

  return (
    <section>
      {/* Welcome Banner */}

      <div className="welcome-banner">
        <div className="welcome-content">
          <span className="welcome-tag">
            ✦ OM SAI RAM ✦
          </span>

          <h1>
            Sai Baba Temple
            <br />
            <span>Crowd Detector</span>
          </h1>

          <p>
            Monitor temple crowds, allocated guards, and LoRa
            alert devices from one simple dashboard.
          </p>

          <Link to="/zones" className="primary-button">
            Explore Crowd Zones →
          </Link>
        </div>

        <div className="banner-art">
          <div className="sun-circle">
            <span>ॐ</span>
          </div>

          <span className="banner-bottom-text">
            SHIRDI TEMPLE
          </span>
        </div>
      </div>

      {/* Dashboard Statistics */}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon yellow">👥</div>

          <div className="stat-content">
            <p>People Detected</p>
            <h2>{totalPeople.toLocaleString("en-IN")}</h2>
            <span>Live crowd count</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon cream">📍</div>

          <div className="stat-content">
            <p>Temple Zones</p>
            <h2>{templeZones.length}</h2>
            <span>Connected locations</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon red">⚠️</div>

          <div className="stat-content">
            <p>High Crowd Zones</p>
            <h2>{highZones}</h2>
            <span>Live crowd alerts</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">◉</div>

          <div className="stat-content">
            <p>Guard Devices</p>
            <h2>{totalDevices}</h2>
            <span>Configured device entries</span>
          </div>
        </div>

        {/* New Alert Statistics */}

        <div className="stat-card">
          <div className="stat-icon red">🚨</div>

          <div className="stat-content">
            <p>Total Active Alerts</p>
            <h2>{activeAlerts.length}</h2>
            <span>Active Firestore alerts</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon red">🔴</div>

          <div className="stat-content">
            <p>Critical Alerts</p>
            <h2>{criticalAlerts.length}</h2>
            <span>High severity alerts</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon yellow">🟡</div>

          <div className="stat-content">
            <p>Warning Alerts</p>
            <h2>{warningAlerts.length}</h2>
            <span>Medium severity alerts</span>
          </div>
        </div>
      </div>

      {/* Crowd Overview */}

      <div className="section-heading">
        <div>
          <span className="section-kicker">
            TEMPLE LOCATIONS
          </span>

          <h2>Crowd Overview</h2>

          <p>
            Check each area and its allocated security resources.
          </p>
        </div>

        <Link to="/zones" className="text-button">
          View All →
        </Link>
      </div>

      {/* Zone Cards */}

      {templeZones.length > 0 ? (
        <div className="zones-grid">
          {templeZones.slice(0, 4).map((zone) => (
            <ZoneCard key={zone.id} zone={zone} />
          ))}
        </div>
      ) : (
        <p>No temple zones found in Firebase.</p>
      )}

      {/* Recent Alerts */}

      <div className="section-heading">
        <div>
          <span className="section-kicker">
            SECURITY UPDATES
          </span>

          <h2>Recent Alerts</h2>

          <p>
            Latest crowd alerts received from monitored locations.
          </p>
        </div>

        <Link to="/alerts" className="text-button">
          View All →
        </Link>
      </div>

      {alertError ? (
        <div className="empty-state">
          <p>{alertError}</p>
        </div>
      ) : recentAlerts.length > 0 ? (
        <div className="zones-grid">
          {recentAlerts.map((alert) => (
            <article
              className="information-card"
              key={alert.id}
            >
              <span
                className={`status-badge ${
                  alert.severity === "high"
                    ? "high"
                    : "medium"
                }`}
              >
                {alert.severity.toUpperCase()} ALERT
              </span>

              <h2>{alert.zoneName}</h2>

              <p>{alert.message}</p>

              <div className="information-row">
                <span>Estimated People</span>
                <strong>{alert.people}</strong>
              </div>

              <div className="information-row">
                <span>Alert Status</span>
                <strong>{alert.status.toUpperCase()}</strong>
              </div>

              <div className="information-row">
                <span>Alert Time</span>
                <strong>{formatDate(alert.timestamp)}</strong>
              </div>

              {alert.zoneId && (
                <Link
                  to={`/zones/${alert.zoneId}`}
                  className="zone-details-button"
                >
                  View Area Details →
                </Link>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No recent alerts</h3>
          <p>New crowd alerts will appear here.</p>
        </div>
      )}

      {/* Bottom Information */}

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
              Review device IDs, battery values, and connection statuses.
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