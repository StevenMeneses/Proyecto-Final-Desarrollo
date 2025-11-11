import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/Auth.context";

export default function Login() {
  const { login, isLoading } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const success = await login(formData);
    if (success) navigate("/");
    else {
      setErrorMessage("Email o contraseña incorrectos.");
      setFormData((prev) => ({ ...prev, password: "" }));
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Login</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group-login">
              <input
                id="username"
                type="text"
                placeholder="Email"
                required
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="form-group-login password-group">
              <div className="input-wrapper-login">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="toggle-password-login"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                </button>
              </div>
              <p className="error-message">{errorMessage || "\u00A0"}</p>
            </div>

            <div className="form-links">
              <Link to="/recover-password">Forgot your password?</Link>
            </div>

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? "CARGANDO..." : "SIGN IN"}
            </button>
          </form>

          <div className="login-links">
            <Link to="/register">Create account</Link>
            <Link to="/">Return to Store</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

