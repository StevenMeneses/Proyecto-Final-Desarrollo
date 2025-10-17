import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/Auth.context";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }
    setErrorMessage("");

    register({
      username,
      password,
      cliente: {
        nombres,
        apellidos,
        direccion,
        fechaNacimiento,
        identificacion,
        correo,
        import React, { useContext, useState } from "react";
        import { Link } from "react-router-dom";
        import "../styles/Register.css";
        import Header from "../components/Header";
        import Footer from "../components/Footer";
        import { AuthContext } from "../contexts/Auth.context";

        export default function Register() {
          const { register } = useContext(AuthContext);
          const [username, setUserName] = useState("");
          const [password, setPassword] = useState("");
          const [confirmPassword, setConfirmPassword] = useState("");
          const [nombres, setNombres] = useState("");
          const [apellidos, setApellidos] = useState("");
          const [direccion, setDireccion] = useState("");
          const [fechaNacimiento, setFechaNacimiento] = useState("");
          const [identificacion, setIdentificacion] = useState("");
          const [correo, setCorreo] = useState("");
          const [telefono, setTelefono] = useState("");
          const [showPassword, setShowPassword] = useState(false);
          const [showConfirmPassword, setShowConfirmPassword] = useState(false);
          const [errorMessage, setErrorMessage] = useState("");

          const handleSubmit = (e) => {
            e.preventDefault();
            if (password !== confirmPassword) {
              setErrorMessage("Las contraseñas no coinciden.");
              return;
            }
            setErrorMessage("");

            register({
              username,
              password,
              cliente: {
                nombres,
                apellidos,
                direccion,
                fechaNacimiento,
                identificacion,
                correo,
                telefono,
              },
            });
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
                        placeholder="Usuario"
                        onChange={(e) => setUserName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group-register">
                      <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group-register">
                      <div className="input-wrapper-register">
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Contraseña"
                          onChange={(e) => setPassword(e.target.value)}
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
                        id="nombres"
                        type="text"
                        placeholder="Nombres"
                        onChange={(e) => setNombres(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group-register">
                      <input
                        id="apellidos"
                        type="text"
                        placeholder="Apellidos"
                        onChange={(e) => setApellidos(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group-register">
                      <input
                        id="direccion"
                        type="text"
                        placeholder="Dirección"
                        onChange={(e) => setDireccion(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group-register">
                      <input
                        id="fechaNacimiento"
                        type="date"
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group-register">
                      <input
                        id="identificacion"
                        type="text"
                        placeholder="Documento de identidad"
                        onChange={(e) => setIdentificacion(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group-register">
                      <input
                        id="telefono"
                        type="tel"
                        placeholder="Teléfono"
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-links">
                      <Link to="/login">¿Ya tienes cuenta? Iniciar sesión</Link>
                    </div>
                    <button type="submit" className="register-btn">
                      Crear cuenta
                    </button>
                  </form>
                </div>
              </div>
              <Footer />
            </>
          );
        }
      },
    });
  };

  return (
    <>
      <Header />
      <div className="register-container">
        <div className="register-box">
          <h2 className="register-title">Register</h2>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group-register">
              <input
                id="name"
                type="text"
                placeholder="Name"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                required
              />
            </div>
            <div className="form-group-register">
              <input
                id="email"
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setCorreo(e.target.value);
                }}
                required
              />
            </div>

            <div className="form-group-register">
              <div className="input-wrapper-register">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
              />
               <button type="button" className="toggle-password-register" onClick={() => setShowPassword(!showPassword)}>
               <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
              </button>
              </div>
            </div>
              <div className="form-group-register">
                <div className="input-wrapper-register">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-register"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    import React, { useContext, useState } from "react";
                    import { Link } from "react-router-dom";
                    import "../styles/Register.css";
                    import Header from "../components/Header";
                    import Footer from "../components/Footer";
                    import { AuthContext } from "../contexts/Auth.context";

                    export default function Register() {
                      const { register } = useContext(AuthContext);
                      const [username, setUserName] = useState("");
                      const [password, setPassword] = useState("");
                      const [nombres, setNombres] = useState("");
                      const [apellidos, setApellidos] = useState("");
                      const [direccion, setDireccion] = useState("");
                      const [fechaNacimiento, setFechaNacimiento] = useState("");
                      const [identificacion, setIdentificacion] = useState("");
                      const [correo, setCorreo] = useState("");
                      const [telefono, setTelefono] = useState("");

                      const [confirmPassword, setConfirmPassword] = useState("");
                      const [showPassword, setShowPassword] = useState(false);
                      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
                      const [errorMessage, setErrorMessage] = useState("");

                      const handleSubmit = (e) => {
                        e.preventDefault();
                        if (password !== confirmPassword) {
                          setErrorMessage("Las contraseñas no coinciden.");
                          return;
                        }
                        setErrorMessage("");

                        register({
                          username,
                          password,
                          cliente: {
                            nombres,
                            apellidos,
                            direccion,
                            fechaNacimiento,
                            identificacion,
                            correo,
                            telefono,
                          },
                        });
                      };

                      return (
                        <>
                          <Header />
                          <div className="register-container">
                            <div className="register-box">
                              <h2 className="register-title">Register</h2>

                              <form className="register-form" onSubmit={handleSubmit}>
                                <div className="form-group-register">
                                  <input
                                    id="name"
                                    type="text"
                                    placeholder="Name"
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                  />
                                </div>
                                <div className="form-group-register">
                                  <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={(e) => setCorreo(e.target.value)}
                                    required
                                  />
                                </div>

                                <div className="form-group-register">
                                  <div className="input-wrapper-register">
                                    <input
                                      id="password"
                                      type={showPassword ? "text" : "password"}
                                      placeholder="Password"
                                      onChange={(e) => setPassword(e.target.value)}
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
                                      placeholder="Confirm Password"
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
                                    id="nombres"
                                    type="text"
                                    placeholder="First Name(s)"
                                    onChange={(e) => setNombres(e.target.value)}
                                    required
                                  />
                                </div>
                                <div className="form-group-register">
                                  <input
                                    id="apellidos"
                                    type="text"
                                    placeholder="Last Name(s)"
                                    onChange={(e) => setApellidos(e.target.value)}
                                    required
                                  />
                                </div>
                                <div className="form-group-register">
                                  <input
                                    id="direccion"
                                    type="text"
                                    placeholder="Address"
                                    onChange={(e) => setDireccion(e.target.value)}
                                    required
                                  />
                                </div>
                                <div className="form-group-register">
                                  <input
                                    id="fechaNacimiento"
                                    type="date"
                                    onChange={(e) => setFechaNacimiento(e.target.value)}
                                    required
                                  />
                                </div>
                                <div className="form-group-register">
                                  <input
                                    id="identificacion"
                                    type="text"
                                    placeholder="ID Number"
                                    onChange={(e) => setIdentificacion(e.target.value)}
                                    required
                                  />
                                </div>
                                <div className="form-group-register">
                                  <input
                                    id="telefono"
                                    type="tel"
                                    placeholder="Phone Number"
                                    onChange={(e) => setTelefono(e.target.value)}
                                    required
                                  />
                                </div>
                                <div className="form-links">
                                  <Link to="/login">Already have an account? Sign In</Link>
                                </div>
                                <button type="submit" className="register-btn">
                                  Create Account
                                </button>
                              </form>
                            </div>
                          </div>
                          <Footer />
                        </>
                      );
                    }
        </div>
