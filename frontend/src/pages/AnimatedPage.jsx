import "./AnimatedPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function AnimatedPage() {
  const navigate = useNavigate();

  useEffect(()=> {
    const timer = setTimeout(() => {
      navigate('/Result')
      
    }, 3000);
    return()=> clearTimeout(timer);

  }, [navigate]);

  return (
    <div className="sim-container">

      <div className="circle-wrapper">
        <div className="ring ring-outer"></div>
        <div className="ring ring-middle"></div>

        <div className="center-circle">
          <div className="logo">
            +
          </div>
        </div>
      </div>

      <h1 className="sim-title">Simulating Your Future</h1>

      <div className="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <p className="sim-subtitle">CALCULATING TIMELINES...</p>

    </div>
  );
}

export default AnimatedPage;