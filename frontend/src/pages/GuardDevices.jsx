// // import { Link } from "react-router-dom";
// // import { templeZones } from "../data/templeData";
// // import "../styles/GuardDevices.css";
// // function GuardDevices() {
// //   return (
// //     <section>
// //       <div className="page-title">
// //         <span className="section-kicker">IOT MONITORING</span>
// //         <h1>Guard Alert Devices</h1>
// //         <p>
// //           View LoRa device information, battery levels, and assigned locations.
// //         </p>
// //       </div>

// //       <div className="zones-grid">
// //         {templeZones.map((zone) => (
// //           <article className="information-card" key={zone.id}>
// //             <div className="information-heading">
// //               <span>◉</span>
// //               <div>
// //                 <h2>{zone.device.id}</h2>
// //                 <p>{zone.device.type}</p>
// //               </div>
// //             </div>

// //             <div className="information-row">
// //               <span>Assigned Location</span>
// //               <strong>{zone.name}</strong>
// //             </div>

// //             <div className="information-row">
// //               <span>Allocated Guard</span>
// //               <strong>{zone.guard.name}</strong>
// //             </div>

// //             <div className="information-row">
// //               <span>Connection</span>
// //               <strong>{zone.device.connection}</strong>
// //             </div>

// //             <div className="information-row">
// //               <span>Battery</span>
// //               <strong>{zone.device.battery}%</strong>
// //             </div>

// //             <div className="battery-track">
// //               <div
// //                 className="battery-fill"
// //                 style={{ width: `${zone.device.battery}%` }}
// //               />
// //             </div>

// //             <div className="information-row">
// //               <span>Last Alert</span>
// //               <strong>{zone.device.lastAlert}</strong>
// //             </div>

// //             <Link
// //               to={`/zones/${zone.id}`}
// //               className="zone-details-button"
// //             >
// //               View Device Location →
// //             </Link>
// //           </article>
// //         ))}
// //       </div>

// //       <div className="alert-note">
// //         <strong>Important:</strong> Connection and battery values are
// //         demonstration values. Real device status requires telemetry from
// //         the LoRa gateway or guard device.
// //       </div>
// //     </section>
// //   );
// // }

// // export default GuardDevices;



// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { collection, onSnapshot } from "firebase/firestore";

// import { db } from "../firebase/firebase";
// import { templeZones } from "../data/templeData";
// import "../styles/GuardDevices.css";

// const normalize = (value) =>
//   String(value || "")
//     .toLowerCase()
//     .replace(/[^a-z0-9]/g, "");

// function GuardDevices() {
//   const [devices, setDevices] = useState([]);
//   const [guards, setGuards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch devices from Firestore
//   useEffect(() => {
//     const unsubscribeDevices = onSnapshot(
//       collection(db, "devices"),
//       (snapshot) => {
//         const firebaseDevices = snapshot.docs.map((doc) => ({
//           ...doc.data(),
//           documentId: doc.id,
//         }));

//         setDevices(firebaseDevices);
//         setLoading(false);
//         setError("");
//       },
//       (err) => {
//         console.error("Devices Firestore Error:", err);
//         setError(err.message);
//         setLoading(false);
//       }
//     );

//     return () => unsubscribeDevices();
//   }, []);

//   // Fetch guards from Firestore
//   useEffect(() => {
//     const unsubscribeGuards = onSnapshot(
//       collection(db, "guards"),
//       (snapshot) => {
//         const firebaseGuards = snapshot.docs.map((doc) => ({
//           ...doc.data(),
//           documentId: doc.id,
//         }));

//         setGuards(firebaseGuards);
//       },
//       (err) => {
//         console.error("Guards Firestore Error:", err);
//       }
//     );

//     return () => unsubscribeGuards();
//   }, []);

//   if (loading) {
//     return <h2>Loading Guard Devices...</h2>;
//   }

//   if (error) {
//     return <h3>Firebase Error: {error}</h3>;
//   }

//   return (
//     <section>
//       <div className="page-title">
//         <span className="section-kicker">IOT MONITORING</span>

//         <h1>Guard Alert Devices</h1>

//         <p>
//           View LoRa device information, battery levels, and assigned locations.
//         </p>
//       </div>

//       {devices.length === 0 ? (
//         <p>No guard devices found in Firebase.</p>
//       ) : (
//         <div className="zones-grid">
//           {devices.map((device) => {
//             const assignedGuard = guards.find(
//               (guard) =>
//                 normalize(guard.guardId || guard.documentId) ===
//                 normalize(device.assignedGuardId)
//             );

//             const assignedZone = templeZones.find(
//               (zone) =>
//                 normalize(zone.id) === normalize(device.assignedZone) ||
//                 normalize(zone.name) === normalize(device.assignedZone)
//             );

//             const battery = Math.max(
//               0,
//               Math.min(100, Number(device.batteryLevel ?? 0))
//             );

//             const connection = device.connectionStatus || "Unknown";

//             const isOnline = connection.toLowerCase() === "online";

//             return (
//               <article
//                 className="information-card"
//                 key={device.documentId}
//               >
//                 <div className="information-heading">
//                   <span>◉</span>

//                   <div>
//                     <h2>{device.deviceId || device.documentId}</h2>
//                     <p>{device.deviceName || "LoRa Alert Device"}</p>
//                   </div>
//                 </div>

//                 <div className="information-row">
//                   <span>Assigned Location</span>
//                   <strong>{device.assignedZone || "Not Assigned"}</strong>
//                 </div>

//                 <div className="information-row">
//                   <span>Allocated Guard</span>
//                   <strong>
//                     {assignedGuard?.name ||
//                       device.assignedGuardId ||
//                       "Not Assigned"}
//                   </strong>
//                 </div>

//                 <div className="information-row">
//                   <span>Guard ID</span>
//                   <strong>
//                     {device.assignedGuardId || "Not Assigned"}
//                   </strong>
//                 </div>

//                 <div className="information-row">
//                   <span>Connection</span>
//                   <strong className={isOnline ? "status-online" : "status-offline"}>
//                     {connection}
//                   </strong>
//                 </div>

//                 <div className="information-row">
//                   <span>Battery</span>
//                   <strong>{battery}%</strong>
//                 </div>

//                 <div className="battery-track">
//                   <div
//                     className="battery-fill"
//                     style={{ width: `${battery}%` }}
//                   />
//                 </div>

//                 <div className="information-row">
//                   <span>Frequency</span>
//                   <strong>{device.frequency || "Not Available"}</strong>
//                 </div>

//                 <div className="information-row">
//                   <span>Receiver Model</span>
//                   <strong>{device.receiverModel || "Not Available"}</strong>
//                 </div>

//                 <div className="information-row">
//                   <span>Last Alert</span>
//                   <strong>
//                     {device.lastAlert || "No recent alert"}
//                   </strong>
//                 </div>

//                 {assignedZone && (
//                   <Link
//                     to={`/zones/${assignedZone.id}`}
//                     className="zone-details-button"
//                   >
//                     View Device Location →
//                   </Link>
//                 )}
//               </article>
//             );
//           })}
//         </div>
//       )}

//       <div className="alert-note">
//         <strong>Important:</strong> Device information is fetched from
//         Firebase. Real-time connection and battery updates require
//         telemetry from the LoRa gateway or guard device.
//       </div>
//     </section>
//   );
// }

// export default GuardDevices;



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "../firebase/firebase";
import { templeZones } from "../data/templeData";
import "../styles/GuardDevices.css";

const normalize = (value) =>
String(value || "")
.toLowerCase()
.replace(/[^a-z0-9]/g, "");

function GuardDevices() {
const [devices, setDevices] = useState([]);
const [guards, setGuards] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

// Fetch devices from Firestore
useEffect(() => {
const unsubscribeDevices = onSnapshot(
collection(db, "devices"),
(snapshot) => {
const firebaseDevices = snapshot.docs.map((doc) => ({
...doc.data(),
documentId: doc.id,
}));


    setDevices(firebaseDevices);
    setLoading(false);
    setError("");
  },
  (err) => {
    console.error("Devices Firestore Error:", err);
    setError(err.message);
    setLoading(false);
  }
);

return () => unsubscribeDevices();


}, []);

// Fetch guards from Firestore
useEffect(() => {
const unsubscribeGuards = onSnapshot(
collection(db, "guards"),
(snapshot) => {
const firebaseGuards = snapshot.docs.map((doc) => ({
...doc.data(),
documentId: doc.id,
}));


    setGuards(firebaseGuards);
  },
  (err) => {
    console.error("Guards Firestore Error:", err);
  }
);

return () => unsubscribeGuards();


}, []);

if (loading) {
return <h2>Loading Guard Devices...</h2>;
}

if (error) {
return <h3>Firebase Error: {error}</h3>;
}

return ( <section> <div className="page-title"> <span className="section-kicker">IOT MONITORING</span>


    <h1>Guard Alert Devices</h1>

    <p>
      View LoRa transmitter and receiver information,
      battery levels, and assigned locations.
    </p>
  </div>

  {devices.length === 0 ? (
    <p>No guard devices found in Firebase.</p>
  ) : (
    <div className="zones-grid">
      {devices.map((device) => {
        const assignedGuard = guards.find(
          (guard) =>
            normalize(guard.guardId || guard.documentId) ===
            normalize(device.assignedGuardId)
        );

        const assignedZone =
          normalize(device.assignedZone) === "controlroom"
            ? null
            : templeZones.find(
                (zone) =>
                  normalize(zone.id) ===
                    normalize(device.assignedZone) ||
                  normalize(zone.name) ===
                    normalize(device.assignedZone)
              );

        const battery = Math.max(
          0,
          Math.min(100, Number(device.batteryLevel ?? 0))
        );

        const connection = device.connectionStatus || "Unknown";

        const isOnline = connection.toLowerCase() === "online";

        const deviceType =
          device.deviceType ||
          (normalize(device.assignedZone) === "controlroom"
            ? "Transmitter"
            : "Receiver");

        return (
          <article
            className="information-card"
            key={device.documentId}
          >
            <div className="information-heading">
              <span>◉</span>

              <div>
                <h2>
                  {device.deviceId || device.documentId}
                </h2>

                <p>
                  {device.deviceName || "LoRa Alert Device"}
                </p>

                <p>{deviceType}</p>
              </div>
            </div>

            <div className="information-row">
              <span>Device Type</span>
              <strong>{deviceType}</strong>
            </div>

            <div className="information-row">
              <span>Assigned Location</span>
              <strong>
                {device.assignedZone || "Not Assigned"}
              </strong>
            </div>

            <div className="information-row">
              <span>Allocated Guard</span>
              <strong>
                {assignedGuard?.name ||
                  (device.assignedGuardId === "Not Applicable"
                    ? "Not Applicable"
                    : device.assignedGuardId || "Not Assigned")}
              </strong>
            </div>

            <div className="information-row">
              <span>Connection</span>
              <strong
                className={
                  isOnline ? "status-online" : "status-offline"
                }
              >
                {connection}
              </strong>
            </div>

            <div className="information-row">
              <span>Battery</span>
              <strong>
                {device.batteryLevel != null
                  ? `${battery}%`
                  : "Not Available"}
              </strong>
            </div>

            <div className="battery-track">
              <div
                className="battery-fill"
                style={{ width: `${battery}%` }}
              />
            </div>

            <div className="information-row">
              <span>Frequency</span>
              <strong>
                {device.frequency || "Not Available"}
              </strong>
            </div>

            <div className="information-row">
              <span>Receiver Model</span>
              <strong>
                {device.receiverModel || "Not Available"}
              </strong>
            </div>

            <div className="information-row">
              <span>Last Alert</span>
              <strong>
                {device.lastAlert || "No recent alert"}
              </strong>
            </div>

            {assignedZone && (
              <Link
                to={`/zones/${assignedZone.id}`}
                className="zone-details-button"
              >
                View Device Location →
              </Link>
            )}
          </article>
        );
      })}
    </div>
  )}

  <div className="alert-note">
    <strong>Important:</strong> Device information is fetched
    from Firebase. Real-time connection and battery updates
    require telemetry from the LoRa gateway or guard device.
  </div>
</section>


);
}

export default GuardDevices;
