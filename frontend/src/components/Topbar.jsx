import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import "../styles/Topbar.css";

function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const confirmSignOut = window.confirm(
      "Are you sure you want to sign out?"
    );

    if (!confirmSignOut) return;

    

    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Sign out failed:", error);
      alert("Sign out failed. Please try again.");
    }
  };

  const getPageName = () => {
    if (location.pathname === "/") return "Dashboard";
    if (location.pathname === "/zones") return "Crowd Zones";
    if (location.pathname === "/guards") return "Security Guards";
    if (location.pathname === "/devices") return "Guard Devices";
    if (location.pathname === "/alerts") return "Crowd Alerts";

    if (location.pathname.startsWith("/zones/")) {
      return "Zone Details";
    }

    return "Sai Crowd";
  };

  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span>Shirdi Temple</span>
        <span>/</span>
        <strong>{getPageName()}</strong>
      </div>

      <div className="topbar-right">
        <span className="demo-pill">DEMO DATA</span>

        <div className="user-avatar">ॐ</div>

        <button
          type="button"
          className="topbar-signout"
          onClick={handleSignOut}
          title="Sign Out"
        >
          <span className="signout-icon">↪</span>
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
}

export default Topbar;
// import { useLocation } from "react-router-dom";
// import "../styles/Topbar.css";
// function Topbar() {
//   const location = useLocation();

//   const getPageName = () => {
//     if (location.pathname === "/") return "Dashboard";
//     if (location.pathname === "/zones") return "Crowd Zones";
//     if (location.pathname === "/guards") return "Security Guards";
//     if (location.pathname === "/devices") return "Guard Devices";
//     if (location.pathname === "/alerts") return "Crowd Alerts";

//     if (location.pathname.startsWith("/zones/")) {
//       return "Zone Details";
//     }

//     return "Sai Crowd";
//   };

//   return (
//     <header className="topbar">
//       <div className="breadcrumb">
//         <span>Shirdi Temple</span>
//         <span>/</span>
//         <strong>{getPageName()}</strong>
//       </div>

//       <div className="topbar-right">
//         <span className="demo-pill">DEMO DATA</span>
//         <div className="user-avatar">ॐ</div>
//       </div>
//     </header>
//   );
// }

// export default Topbar;