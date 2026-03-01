import { useState } from "react";
import { MdLogin } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    monthlyIncome: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (isLogin) {
        // LOGIN
        response = await axios.post(
          "http://localhost:5001/api/auth/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );
      } else {
        // REGISTER
        response = await axios.post("http://localhost:5001/api/auth/register", {
  name: formData.username,   // 🔥 change here
  email: formData.email,
  password: formData.password,
  monthlyIncome: Number(formData.monthlyIncome),
});
      }

      // Save token
      localStorage.setItem("token", response.data.token);

      // Redirect after success
      navigate("/simulate");

    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Authentication failed. Try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="logo-text">FUTURE MIRROR</h1>

        <div className="tabs">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
            type="button"
          >
            <MdLogin /> Login
          </button>

          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
            type="button"
          >
            <FaUserPlus /> Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="monthlyIncome"
                placeholder="Monthly Income"
                value={formData.monthlyIncome}
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;