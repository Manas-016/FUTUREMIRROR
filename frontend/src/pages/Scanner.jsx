import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Scanner.css";
import { FaUser, FaLaptop, FaHeartbeat, FaCoffee } from "react-icons/fa";

function Scanner() {
  const navigate = useNavigate();

  const [simulations, setSimulations] = useState([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);

  const tokenHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  // ✅ Fetch Logged-in User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/me",
          tokenHeader
        );

        // Adjust if your backend wraps response in { data: {...} }
        const user = res.data;

        setUsername(user.name);
        setUserId(user._id);

      } catch (error) {
        console.error("Failed to fetch user:", error.response?.data || error.message);
      }
    };

    fetchUser();
  }, []);

  // ✅ Fetch Simulations After User Is Loaded
  useEffect(() => {
    if (!userId) return;

    const fetchSimulations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/simulations/${userId}`,
          tokenHeader
        );

        setSimulations(res.data);
      } catch (error) {
        console.error("Failed to fetch simulations:", error.response?.data || error.message);
      }
    };

    fetchSimulations();
  }, [userId]);

  return (
    <div className="dashboard">

      <div className="header">
        <div>
          <p className="welcome">Welcome back,</p>
          <h1 className="username">
            {username ? username.toUpperCase() : "USER"}
          </h1>
        </div>

        <div className="profile-icon">
          <FaUser />
        </div>
      </div>

      <div className="scan-section">
        <button
          className="scan-circle"
          onClick={() => navigate("/clickscan")}
        >
          <div>
            <div className="scan-icon">⌖</div>
            <p>SCAN ITEM</p>
          </div>
        </button>
      </div>

      <div className="recent-section">
        <div className="recent-header">
          <h3>Recent Simulations</h3>
          <span>SEE ALL</span>
        </div>

        <div className="cards">

          {simulations.length > 0 ? (
            simulations.map((sim) => (
              <div key={sim._id} className="card">
                <div className="icon blue">
                  <FaLaptop />
                </div>
                <h4>{sim.title}</h4>
                <p>Stored Result</p>
              </div>
            ))
          ) : (
            <>
              <div className="card">
                <div className="icon yellow">
                  <FaCoffee />
                </div>
                <h4>Espresso Machine</h4>
                <p>High Impact</p>
              </div>

              <div className="card">
                <div className="icon blue">
                  <FaLaptop />
                </div>
                <h4>New Laptop</h4>
                <p>Moderate</p>
              </div>

              <div className="card">
                <div className="icon green">
                  <FaHeartbeat />
                </div>
                <h4>Gym Membership</h4>
                <p>Positive</p>
              </div>
            </>
          )}

        </div>
      </div>

    </div>
  );
}

export default Scanner;