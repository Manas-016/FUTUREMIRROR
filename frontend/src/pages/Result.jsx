import "./Result.css";
import {
  FaBolt,
  FaSmile,
  FaDollarSign,
  FaChartBar,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./Home";

function Result() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimulation = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/details/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setSimulation(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimulation();
  }, [id]);

  if (loading) {
    return (
      <>
        <Home />
        <h2 style={{ textAlign: "center", marginTop: "100px" }}>
          Loading Simulation...
        </h2>
      </>
    );
  }

  if (!simulation) {
    return (
      <>
        <Home />
        <h2 style={{ textAlign: "center", marginTop: "100px" }}>
          Simulation Not Found
        </h2>
      </>
    );
  }

  const buy = simulation.result.ifBuy;
  const dont = simulation.result.ifDont;

  return (
    <>
      <Home />

      <div className="result-container">
        <h1 className="main-title">Simulation Complete</h1>
 

        <div className="cards-wrapper">

          {/* IF BUY */}
          <div className="card buy">
            <h2 className="card-title buy-title">IF YOU BUY</h2>

            <div className="stat green">
              <FaBolt />
              <span>Energy</span>
              <strong>{Math.round(buy.energy)}%</strong>
              <FaArrowUp />
            </div>

            <div className="stat green">
              <FaSmile />
              <span>Confidence</span>
              <strong>{Math.round(buy.confidence)}%</strong>
              <FaArrowUp />
            </div>

            <div className="stat red">
              <FaDollarSign />
              <span>Savings</span>
              <strong>₹{buy.savings}</strong>
              <FaArrowDown />
            </div>

            <div className="stat green">
              <FaChartBar />
              <span>Productivity</span>
              <strong>{Math.round(buy.productivity)}%</strong>
              <FaArrowUp />
            </div>
          </div>

          {/* IF DON'T BUY */}
          <div className="card dont">
            <h2 className="card-title dont-title">IF YOU DON'T</h2>

            <div className="stat red">
              <FaBolt />
              <span>Energy</span>
              <strong>{Math.round(dont.energy)}%</strong>
              <FaArrowDown />
            </div>

            <div className="stat neutral">
              <FaSmile />
              <span>Confidence</span>
              <strong>{Math.round(dont.confidence)}%</strong>
            </div>

            <div className="stat green">
              <FaDollarSign />
              <span>Savings</span>
              <strong>₹{dont.savings}</strong>
              <FaArrowUp />
            </div>

            <div className="stat red">
              <FaChartBar />
              <span>Productivity</span>
              <strong>{Math.round(dont.productivity)}%</strong>
              <FaArrowDown />
            </div>
          </div>

        </div>

        <button className="impact-btn">
          Regret Index: {simulation.result.regretIndex}
        </button>

        <p
          className="try-again"
          onClick={() => navigate("/ClickScan")}
        >
          Try Another Item
        </p>

      </div>
    </>
  );
}

export default Result;