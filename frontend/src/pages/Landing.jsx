import "./Landing.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";


function Landing() {
    useEffect(() => {
  axios.get("/api/test")
    .then((res) => {
      console.log("Backend says:", res.data);
    })
    .catch((err) => {
      console.log("Error:", err);
    });
}, []);
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="content">

                <div className="logo-circle">
                    <img src="cropped_circle_image.png" className="projlogo" alt="" />
                    <div className="logo-icon"></div>
                </div>

                <h1 className="title">FUTURE MIRROR</h1>
                <p className="subtitle">SEE WHO YOU BECOME.</p>

            </div>

            <button className="enter-btn" onClick={() => navigate("/simulate")}>Enter App</button>
        </div>
    );
}

export default Landing;