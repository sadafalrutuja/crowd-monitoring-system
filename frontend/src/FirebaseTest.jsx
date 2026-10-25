import { useState } from "react";
import { database } from "./firebase/firebase";
import { ref, set, get } from "firebase/database";

function FirebaseTest() {
  const [status, setStatus] = useState("Not tested");

  const testConnection = async () => {
    try {
      setStatus("Testing connection...");

      const testRef = ref(database, "connectionTest");

      await set(testRef, {
        message: "Firebase connected successfully!",
        timestamp: Date.now(),
      });

      const snapshot = await get(testRef);

      if (snapshot.exists()) {
        setStatus("SUCCESS: Firebase connected!");
      } else {
        setStatus("Data not found.");
      }
    } catch (error) {
      console.error("Firebase error:", error);
      setStatus(`FAILED: ${error.code || error.message}`);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>Firebase Connection Test</h2>

      <button onClick={testConnection}>
        Test Firebase Connection
      </button>

      <p>{status}</p>
    </div>
  );
}

export default FirebaseTest;