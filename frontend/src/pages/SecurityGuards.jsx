// import { Link } from "react-router-dom";
// import { templeZones } from "../data/templeData";
// import "../styles/SecurityGuards.css";
// function SecurityGuards() {
//   return (
//     <section>
//       <div className="page-title">
//         <span className="section-kicker">SECURITY TEAM</span>
//         <h1>Security Guards</h1>
//         <p>View allocated guards and their assigned temple locations.</p>
//       </div>

//       <div className="zones-grid">
//         {templeZones.map((zone) => (
//           <article className="information-card guard-list-card" key={zone.id}>
//             <div className="guard-profile">
//               <div className="guard-avatar">♙</div>

//               <div>
//                 <h3>{zone.guard.name}</h3>
//                 <p>{zone.guard.id}</p>
//               </div>

//               <span className="status-badge low">
//                 {zone.guard.availability}
//               </span>
//             </div>

//             <div className="information-row">
//               <span>Allocated Location</span>
//               <strong>{zone.name}</strong>
//             </div>

//             <div className="information-row">
//               <span>Shift</span>
//               <strong>{zone.guard.shift}</strong>
//             </div>

//             <div className="information-row">
//               <span>Guard Device</span>
//               <strong>{zone.device.id}</strong>
//             </div>

//             <Link
//               to={`/zones/${zone.id}`}
//               className="zone-details-button"
//             >
//               View Assigned Area →
//             </Link>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default SecurityGuards;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

import { templeZones } from "../data/templeData";

import "../styles/SecurityGuards.css";

function SecurityGuards() {
  const [guards, setGuards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Firebase Real-time Guards Integration
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "guards"),

      (snapshot) => {
        const firebaseGuards = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Map Firebase guards with existing temple zones
        const updatedGuards = templeZones.map((zone) => {
          const staticGuard = zone.guard || {};

          const firebaseGuard = firebaseGuards.find((guard) => {
            const guardId =
              guard.guardId || guard.id || guard.uid || "";

            const guardZone =
              guard.zoneId ||
              guard.assignedZone ||
              guard.zoneName ||
              "";

            return (
              guardId === staticGuard.id ||
              guardZone.toLowerCase() === zone.id.toLowerCase() ||
              guardZone.toLowerCase() === zone.name.toLowerCase()
            );
          });

          return {
            zoneId: zone.id,
            zoneName: zone.name,

            guard: {
              name:
                firebaseGuard?.name ||
                firebaseGuard?.guardName ||
                staticGuard.name ||
                "Not Assigned",

              id:
                firebaseGuard?.guardId ||
                firebaseGuard?.id ||
                staticGuard.id ||
                "N/A",

              availability:
                firebaseGuard?.availability ||
                firebaseGuard?.status ||
                staticGuard.availability ||
                "Not Available",

              shift:
                firebaseGuard?.shift ||
                staticGuard.shift ||
                "Not Assigned",
            },

            device: {
              id:
                firebaseGuard?.deviceId ||
                firebaseGuard?.device?.id ||
                zone.device?.id ||
                "Not Assigned",
            },
          };
        });

        setGuards(updatedGuards);
        setLoading(false);
        setError("");
      },

      (err) => {
        console.error("Firestore Guards Error:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <h2>Loading Security Guards...</h2>;
  }

  if (error) {
    return <h3>Firebase Error: {error}</h3>;
  }

  return (
    <section>
      <div className="page-title">
        <span className="section-kicker">SECURITY TEAM</span>

        <h1>Security Guards</h1>

        <p>
          View allocated guards and their assigned temple locations.
        </p>
      </div>

      <div className="zones-grid">
        {guards.map((item) => (
          <article
            className="information-card guard-list-card"
            key={item.zoneId}
          >
            <div className="guard-profile">
              <div className="guard-avatar">♙</div>

              <div>
                <h3>{item.guard.name}</h3>
                <p>{item.guard.id}</p>
              </div>

              <span className="status-badge low">
                {item.guard.availability}
              </span>
            </div>

            <div className="information-row">
              <span>Allocated Location</span>
              <strong>{item.zoneName}</strong>
            </div>

            <div className="information-row">
              <span>Shift</span>
              <strong>{item.guard.shift}</strong>
            </div>

            <div className="information-row">
              <span>Guard Device</span>
              <strong>{item.device.id}</strong>
            </div>

            <Link
              to={`/zones/${item.zoneId}`}
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