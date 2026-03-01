import React from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-icon" onClick={() => navigate("/Scanner")}>
      <FaHome />
    </div>
  );
};

export default Home;