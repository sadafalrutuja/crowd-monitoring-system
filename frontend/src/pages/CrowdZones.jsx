// import { useState } from "react";
// import { templeZones } from "../data/templeData";
// import ZoneCard from "../components/ZoneCard";
// import "../styles/CrowdZones.css";

// function CrowdZones() {
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All");

//   const filteredZones = templeZones.filter((zone) => {
//     const matchesSearch = zone.name
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     const percentage = (zone.people / zone.capacity) * 100;

//     const status =
//       percentage >= 70
//         ? "High"
//         : percentage >= 40
//           ? "Medium"
//           : "Low";

//     return (
//       matchesSearch &&
//       (filter === "All" || status === filter)
//     );
//   });

//   return (
//     <section>
//       <div className="page-title">
//         <span className="section-kicker">SHIRDI TEMPLE</span>
//         <h1>Crowd Zones</h1>
//         <p>
//           Monitor crowd levels, allocated guards, and devices at
//           each temple location.
//         </p>
//       </div>

//       <div className="filter-panel">
//         <input
//           className="zone-search"
//           type="text"
//           placeholder="Search temple location..."
//           value={search}
//           onChange={(event) => setSearch(event.target.value)}
//         />

//         <div className="filter-buttons">
//           {["All", "Low", "Medium", "High"].map((item) => (
//             <button
//               key={item}
//               className={`filter-button ${
//                 filter === item ? "selected" : ""
//               }`}
//               onClick={() => setFilter(item)}
//             >
//               {item}
//             </button>
//           ))}
//         </div>
//       </div>

//       <p className="results-label">
//         Showing {filteredZones.length} of {templeZones.length} locations
//       </p>

//       {filteredZones.length > 0 ? (
//         <div className="zones-grid">
//           {filteredZones.map((zone) => (
//             <ZoneCard key={zone.id} zone={zone} />
//           ))}
//         </div>
//       ) : (
//         <div className="empty-state">
//           <h3>No locations found</h3>
//           <p>Try another location name or crowd filter.</p>
//         </div>
//       )}
//     </section>
//   );
// }

// export default CrowdZones;


import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";

import { database } from "../firebase/firebase";
import ZoneCard from "../components/ZoneCard";
import "../styles/CrowdZones.css";

function CrowdZones() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [templeZones, setTempleZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch live zones from Firebase Realtime Database
  useEffect(() => {
    const zonesRef = ref(database, "crowdZones");

    const unsubscribe = onValue(
      zonesRef,
      (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const zones = Object.entries(data).map(([id, zone]) => ({
            id,
            name: zone.zoneName || id,
            people: Number(zone.currentPeopleCount || 0),
            capacity: Number(zone.capacity || 0),
            crowdLevel: zone.crowdLevel || "low",
            threshold: Number(zone.threshold || 0),
            direction: zone.direction || "",
            status: zone.status || "active",
          }));

          setTempleZones(zones);
        } else {
          setTempleZones([]);
        }

        setLoading(false);
        setError("");
      },
      (firebaseError) => {
        console.error("Firebase Realtime Database Error:", firebaseError);
        setError("Unable to load crowd zones. Please check Firebase permissions.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Search and filter
  const filteredZones = templeZones.filter((zone) => {
    const matchesSearch = zone.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const percentage =
      zone.capacity > 0
        ? (zone.people / zone.capacity) * 100
        : 0;

    const status =
      percentage >= 70
        ? "High"
        : percentage >= 40
          ? "Medium"
          : "Low";

    return (
      matchesSearch &&
      (filter === "All" || status === filter)
    );
  });

  return (
    <section>
      <div className="page-title">
        <span className="section-kicker">SHIRDI TEMPLE</span>

        <h1>Crowd Zones</h1>

        <p>
          Monitor crowd levels, allocated guards, and devices at
          each temple location.
        </p>
      </div>

      <div className="filter-panel">
        <input
          className="zone-search"
          type="text"
          placeholder="Search temple location..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="filter-buttons">
          {["All", "Low", "Medium", "High"].map((item) => (
            <button
              key={item}
              className={`filter-button ${
                filter === item ? "selected" : ""
              }`}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="empty-state">
          <h3>Loading Crowd Zones...</h3>
          <p>Fetching live data from Firebase.</p>
        </div>
      ) : error ? (
        <div className="empty-state">
          <h3>Something went wrong</h3>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <p className="results-label">
            Showing {filteredZones.length} of {templeZones.length} locations
          </p>

          {filteredZones.length > 0 ? (
            <div className="zones-grid">
              {filteredZones.map((zone) => (
                <ZoneCard key={zone.id} zone={zone} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No locations found</h3>
              <p>
                Try another location name or crowd filter.
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default CrowdZones;