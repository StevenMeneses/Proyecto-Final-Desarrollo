import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/Auth.context";

export default function RecoverPassword() {
  const { forgotPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    forgotPassword({ email });
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Recover Password</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                id="email"
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>

            <button type="submit" className="login-btn">
              UPDATE
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
