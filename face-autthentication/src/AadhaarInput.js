import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AadhaarInput() {
  const [aadhar, setAadharNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch user data from API
      const response = await axios.post("/api/v1/user", { aadhar });
      if (response.data && response.data.data) {
        // Navigate to FaceAuthentication with state
        navigate("/face-authentication", {
          state: { userData: response.data.data },
        });
      } else {
        window.alert(
          "The entered Aadhar number is invalid. Kindly re-enter your Aadhar number"
        );
      }
    } catch (err) {
      setError("Failed to fetch user data");
    }
  };

  return (
    <div>
      <h1>Aadhaar Input</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={aadhar}
          onChange={(e) => setAadharNumber(e.target.value)}
          placeholder="Enter Aadhaar Number"
          autoFocus
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default AadhaarInput;
