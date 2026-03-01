import "./Simulation.css";
import { useNavigate } from "react-router-dom";


function Simulation() {
    const navigate = useNavigate();

  return (
    <div className="container">

      <div className="top-section">
        <div className="circle left-circle">
          <img
            src="left_circle_image.png"
            alt="future"
          />
        </div>

        <div className="divider"></div>

        <div className="circle right-circle">
          <div className="question">?</div>
        </div>
      </div>

      <div className="text-section">
        <h1>Every purchase shapes your future.</h1>
        <p>
          We simulate two paths based on your choices:
        </p>
        <p className="highlight">
          If you buy and If you don’t.
        </p>
      </div>

      <button className="continue-btn" onClick={() => navigate("/scanner")}>Continue</button>

    </div>
  );
}

export default Simulation;