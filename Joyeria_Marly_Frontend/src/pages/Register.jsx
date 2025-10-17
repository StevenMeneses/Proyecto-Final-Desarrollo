import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/Auth.context";

export default function Register() {
  const { register, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    dni: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    birthDate: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }
    
    setErrorMessage("");

    try {
      // Enviar datos al backend
      const success = await register(formData);
      
      if (success) {
        navigate("/"); // Redirigir a la página principal después del registro exitoso
      } else {
        setErrorMessage("Error al crear la cuenta. Verifica los datos e intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error en registro:", error);
      setErrorMessage(error.message || "Error al crear la cuenta. Verifica los datos e intenta nuevamente.");
    }
  };

  return (
    <>
      <Header />
      <div className="register-container">
        <div className="register-box">
          <h2 className="register-title">Registrar</h2>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group-register">
              <input
                id="name"
                type="text"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group-register">
              <input
                id="lastName"
                type="text"
                placeholder="Apellidos"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-register">
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group-register">
              <input
                id="dni"
                type="text"
                placeholder="Documento de identidad"
                value={formData.dni}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-register">
              <div className="input-wrapper-register">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password-register"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                </button>
              </div>
            </div>

            <div className="form-group-register">
              <div className="input-wrapper-register">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password-register"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                </button>
              </div>
              <p className="error-message">{errorMessage || "\u00A0"}</p>
            </div>

            <div className="form-group-register">
              <input
                id="phone"
                type="tel"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group-register">
              <input
                id="address"
                type="text"
                placeholder="Dirección"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-links">
              <Link to="/login">¿Ya tienes cuenta? Iniciar sesión</Link>
            </div>
            <button type="submit" className="register-btn" disabled={isLoading}>
              {isLoading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
