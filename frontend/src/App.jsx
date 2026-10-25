// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Sidebar from "./components/Sidebar";
// import Topbar from "./components/Topbar";

// import Dashboard from "./pages/Dashboard";
// import CrowdZones from "./pages/CrowdZones";
// import ZoneDetails from "./pages/ZoneDetails";
// import SecurityGuards from "./pages/SecurityGuards";
// import GuardDevices from "./pages/GuardDevices";
// import Alerts from "./pages/Alerts";

// function Layout() {
//   return (
//     <div className="app-shell">
//       <Sidebar />

//       <main className="main-content">
//         <Topbar />

//         <div className="page-container">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/zones" element={<CrowdZones />} />
//             <Route path="/zones/:zoneId" element={<ZoneDetails />} />
//             <Route path="/guards" element={<SecurityGuards />} />
//             <Route path="/devices" element={<GuardDevices />} />
//             <Route path="/alerts" element={<Alerts />} />
//           </Routes>

//           <footer className="page-footer">
//             <span>ॐ Sai Baba Crowd Detector</span>
//             <span>Frontend demonstration</span>
//           </footer>
//         </div>
//       </main>
//     </div>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <Layout />
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import CrowdZones from "./pages/CrowdZones";
import ZoneDetails from "./pages/ZoneDetails";
import SecurityGuards from "./pages/SecurityGuards";
import GuardDevices from "./pages/GuardDevices";
import Alerts from "./pages/Alerts";

import FirebaseTest from "./FirebaseTest";

function Layout() {
return ( <div className="app-shell"> <Sidebar />

  <main className="main-content">
    <Topbar />

    <div className="page-container">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/zones" element={<CrowdZones />} />
        <Route path="/zones/:zoneId" element={<ZoneDetails />} />
        <Route path="/guards" element={<SecurityGuards />} />
        <Route path="/devices" element={<GuardDevices />} />
        <Route path="/alerts" element={<Alerts />} />
      </Routes>

      <footer className="page-footer">
        <span>ॐ Sai Baba Crowd Detector</span>
        <span>Frontend demonstration</span>
      </footer>
    </div>
  </main>
</div>


);
}

function App() {
return ( <BrowserRouter> <Routes>
<Route path="/firebase-test" element={<FirebaseTest />} />
<Route path="/*" element={<Layout />} /> </Routes> </BrowserRouter>
);
}

export default App;
