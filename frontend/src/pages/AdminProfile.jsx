
// import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase/firebase";
// import "../styles/AdminProfile.css";

// function AdminProfile() {
//   const [admin, setAdmin] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setAdmin({
//           name: user.displayName || "Admin",
//           email: user.email || "Not available",
//           uid: user.uid,
//           photo: user.photoURL,
//           emailVerified: user.emailVerified,
//           createdAt: user.metadata.creationTime,
//           lastLogin: user.metadata.lastSignInTime,
//           provider: user.providerData
//             .map((item) => item.providerId)
//             .join(", ") || "Not available",
//         });
//       } else {
//         setAdmin(null);
//       }

//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return <div className="admin-profile-page">Loading admin profile...</div>;
//   }

//   if (!admin) {
//     return <div className="admin-profile-page">Admin not logged in.</div>;
//   }

//   return (
//     <div className="admin-profile-page">

//       <div className="admin-profile-header">
//         <span className="profile-badge">ADMINISTRATION</span>
//         <h1>Admin Profile</h1>
//         <p>View your account information and authentication details.</p>
//       </div>

//       <div className="admin-profile-card">

//         <div className="profile-top">

//           <div className="profile-avatar">
//             {admin.photo ? (
//               <img src={admin.photo} alt="Admin" />
//             ) : (
//               admin.name.charAt(0).toUpperCase()
//             )}
//           </div>

//           <div>
//             <h2>{admin.name}</h2>
//             <p>{admin.email}</p>
//             <span className="profile-role">
//               ● Administrator
//             </span>
//           </div>

//         </div>

//         <div className="profile-divider"></div>

//         <h3 className="details-heading">Account Information</h3>

//         <div className="profile-details">

//           <div className="detail-item">
//             <label>Full Name</label>
//             <p>{admin.name}</p>
//           </div>

//           <div className="detail-item">
//             <label>Email Address</label>
//             <p>{admin.email}</p>
//           </div>

//           <div className="detail-item">
//             <label>User ID (UID)</label>
//             <p className="uid-text">{admin.uid}</p>
//           </div>

//           <div className="detail-item">
//             <label>Account Role</label>
//             <p>Administrator</p>
//           </div>

//           <div className="detail-item">
//             <label>Email Verification</label>
//             <p className={admin.emailVerified ? "verified" : "not-verified"}>
//               {admin.emailVerified ? "Verified" : "Not Verified"}
//             </p>
//           </div>

//           <div className="detail-item">
//             <label>Authentication Provider</label>
//             <p>{admin.provider}</p>
//           </div>

//           <div className="detail-item">
//             <label>Account Created</label>
//             <p>
//               {admin.createdAt
//                 ? new Date(admin.createdAt).toLocaleString()
//                 : "Not available"}
//             </p>
//           </div>

//           <div className="detail-item">
//             <label>Last Login</label>
//             <p>
//               {admin.lastLogin
//                 ? new Date(admin.lastLogin).toLocaleString()
//                 : "Not available"}
//             </p>
//           </div>

//         </div>

//       </div>

//       <div className="profile-security-card">
//         <span>🔒</span>
//         <div>
//           <h3>Account Security</h3>
//           <p>
//             Your account is authenticated securely using Firebase Authentication.
//             Keep your login credentials private.
//           </p>
//         </div>
//       </div>

//     </div>
//   );
// }

// export default AdminProfile

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { auth, functions } from "../firebase/firebase";
import "../styles/AdminProfile.css";

function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // NEW ADMIN FEATURE STATES
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAdmin({
          name: user.displayName || "Admin",
          email: user.email || "Not available",
          uid: user.uid,
          photo: user.photoURL,
          emailVerified: user.emailVerified,
          createdAt: user.metadata.creationTime,
          lastLogin: user.metadata.lastSignInTime,
          provider: user.providerData
            .map((item) => item.providerId)
            .join(", ") || "Not available",
        });
      } else {
        setAdmin(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // NEW ADMIN FORM INPUT HANDLER
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE NEW ADMIN
  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Password and Confirm Password do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage("Password must contain at least 8 characters.");
      return;
    }

    try {
      setSaving(true);

      const createAdmin = httpsCallable(functions, "createAdmin");

      await createAdmin({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        mobile: formData.mobile.trim(),
        password: formData.password,
      });

      setSuccessMessage("New Admin created successfully!");

      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      });

      setShowForm(false);

    } catch (error) {
      console.error("Admin creation error:", error);

      setErrorMessage(
        error.message || "Unable to create new Admin."
      );

    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="admin-profile-page">Loading admin profile...</div>;
  }

  if (!admin) {
    return <div className="admin-profile-page">Admin not logged in.</div>;
  }

  return (
    <div className="admin-profile-page">

      <div className="admin-profile-header">

        <span className="profile-badge">ADMINISTRATION</span>

        <h1>Admin Profile</h1>

        <p>View your account information and authentication details.</p>

        {/* NEW ADD ADMIN BUTTON */}
        <button
          className="add-admin-btn"
          onClick={() => {
            setShowForm(!showForm);
            setSuccessMessage("");
            setErrorMessage("");
          }}
        >
          {showForm ? "✕ Close Form" : "+ Add New Admin"}
        </button>

      </div>

      {/* SUCCESS MESSAGE */}
      {successMessage && (
        <div className="admin-success-message">
          ✓ {successMessage}
        </div>
      )}

      {/* ERROR MESSAGE */}
      {errorMessage && (
        <div className="admin-error-message">
          {errorMessage}
        </div>
      )}

      {/* NEW ADMIN REGISTRATION FORM */}
      {showForm && (

        <div className="new-admin-form-card">

          <div className="new-admin-form-heading">
            <h2>Register New Admin</h2>
            <p>Create a separate administrator account.</p>
          </div>

          <form onSubmit={handleCreateAdmin}>

            <div className="new-admin-form-grid">

              <div className="new-admin-input">
                <label>Full Name *</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="new-admin-input">
                <label>Email Address *</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="new-admin-input">
                <label>Mobile Number</label>

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
              </div>

              <div className="new-admin-input">
                <label>Password *</label>

                <input
                  type="password"
                  name="password"
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={handleInputChange}
                  minLength="8"
                  required
                />
              </div>

              <div className="new-admin-input">
                <label>Confirm Password *</label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>

            </div>

            <div className="new-admin-form-actions">

              <button
                type="button"
                className="cancel-admin-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="create-admin-btn"
                disabled={saving}
              >
                {saving ? "Creating..." : "Create Admin"}
              </button>

            </div>

          </form>

        </div>
      )}

      {/* EXISTING ADMIN PROFILE CARD - UNCHANGED */}

      <div className="admin-profile-card">

        <div className="profile-top">

          <div className="profile-avatar">
            {admin.photo ? (
              <img src={admin.photo} alt="Admin" />
            ) : (
              admin.name.charAt(0).toUpperCase()
            )}
          </div>

          <div>
            <h2>{admin.name}</h2>
            <p>{admin.email}</p>

            <span className="profile-role">
              ● Administrator
            </span>
          </div>

        </div>

        <div className="profile-divider"></div>

        <h3 className="details-heading">Account Information</h3>

        <div className="profile-details">

          <div className="detail-item">
            <label>Full Name</label>
            <p>{admin.name}</p>
          </div>

          <div className="detail-item">
            <label>Email Address</label>
            <p>{admin.email}</p>
          </div>

          <div className="detail-item">
            <label>User ID (UID)</label>
            <p className="uid-text">{admin.uid}</p>
          </div>

          <div className="detail-item">
            <label>Account Role</label>
            <p>Administrator</p>
          </div>

          <div className="detail-item">
            <label>Email Verification</label>
            <p className={admin.emailVerified ? "verified" : "not-verified"}>
              {admin.emailVerified ? "Verified" : "Not Verified"}
            </p>
          </div>

          <div className="detail-item">
            <label>Authentication Provider</label>
            <p>{admin.provider}</p>
          </div>

          <div className="detail-item">
            <label>Account Created</label>
            <p>
              {admin.createdAt
                ? new Date(admin.createdAt).toLocaleString()
                : "Not available"}
            </p>
          </div>

          <div className="detail-item">
            <label>Last Login</label>
            <p>
              {admin.lastLogin
                ? new Date(admin.lastLogin).toLocaleString()
                : "Not available"}
            </p>
          </div>

        </div>

      </div>

      {/* EXISTING SECURITY CARD - UNCHANGED */}

      <div className="profile-security-card">

        <span>🔒</span>

        <div>
          <h3>Account Security</h3>

          <p>
            Your account is authenticated securely using Firebase Authentication.
            Keep your login credentials private.
          </p>
        </div>

      </div>

    </div>
  );
}

export default AdminProfile;