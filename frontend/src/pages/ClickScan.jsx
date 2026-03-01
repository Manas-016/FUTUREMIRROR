import "./ClickScan.css";
import { FaCamera, FaSearch, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import Home from "./Home";

function ClickScan() {
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const [manualData, setManualData] = useState({
    product: "",
    price: "",
    category: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const tokenHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  // 🔹 Run Simulation
  const runSimulation = async (product, price, category) => {
    const res = await axios.post(
      "http://localhost:5001/api/simulate",
      { title: product, price, category },
      tokenHeader
    );

    const simulationId = res.data.data._id;
    navigate(`/result/${simulationId}`);
  };

  // 📸 CAMERA SCAN
  const handleScan = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        "http://localhost:5001/api/scan",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { product, estimatedPriceINR, category } = res.data;

      await runSimulation(product, estimatedPriceINR, category);
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Scan failed");
    }
  };

  // 🔎 SEARCH ITEM
  const handleSearch = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5001/api/search",
        { item: searchQuery },   // ✅ FIXED
        tokenHeader
      );

      const { product, estimatedPriceINR, category } = res.data;

      await runSimulation(product, estimatedPriceINR, category);
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Search failed");
    }
  };

  // ✍️ MANUAL ENTRY
  const handleManual = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5001/api/manual",
        manualData,   // ✅ Now matches backend
        tokenHeader
      );

      const { product, estimatedPriceINR, category } = res.data;

      await runSimulation(product, estimatedPriceINR, category);
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Manual entry failed");
    }
  };

  return (
    <>
      <Home />

      <div className="input-page">
        <div className="text-section">
          <h1>
            What are you <br />
            <span>considering buying?</span>
          </h1>
        </div>

        <div className="options">

          {/* CAMERA */}
          <div
            className="option-card"
            onClick={() => fileInputRef.current.click()}
          >
            <div className="icon purple">
              <FaCamera />
            </div>
            <span>Camera Scan</span>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleScan}
          />

          {/* SEARCH */}
          <div className="option-card">
            <div className="icon violet">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search item"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          {/* MANUAL */}
          <div className="option-card">
            <div className="icon green">
              <FaPen />
            </div>

            <input
              type="text"
              placeholder="Product"
              value={manualData.product}
              onChange={(e) =>
                setManualData({ ...manualData, product: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Price"
              value={manualData.price}
              onChange={(e) =>
                setManualData({ ...manualData, price: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Category (essential / luxury / work)"
              value={manualData.category}
              onChange={(e) =>
                setManualData({
                  ...manualData,
                  category: e.target.value.toLowerCase(),
                })
              }
            />

            <button onClick={handleManual}>Simulate</button>
          </div>

        </div>
      </div>
    </>
  );
}

export default ClickScan;