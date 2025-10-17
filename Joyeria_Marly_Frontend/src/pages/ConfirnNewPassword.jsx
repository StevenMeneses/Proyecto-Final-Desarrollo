import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/Auth.context";

export default function RecoverPassword() {
  const { updatePassword } = useContext(AuthContext);
  const [newPassword, setNewPassword] = useState("");
  const [confirmarNewPassword, setConfirmarNewPassword] = useState("");
  const token = useParams().token;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword != confirmarNewPassword) return; //falta dar un aviso
    updatePassword({ token, newPassword });
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">New Password</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                id="password"
                type="password"
                placeholder="New Password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                required
              />
            </div>

            <div className="form-group">
              <input
                id="id-password"
                type="password"
                placeholder="Confirm New Password"
                onChange={(e) => {
                  setConfirmarNewPassword(e.target.value);
                }}
                required
              />
            </div>

            <button type="submit" className="login-btn">
              <Link to={"/login"}>UPDATE</Link>
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
