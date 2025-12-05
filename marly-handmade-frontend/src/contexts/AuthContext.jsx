import { useState, useEffect, createContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();
const API_URL = "https://proyecto-final-desarrollo.onrender.com/auth/";

export function AuthProviderWrapper({ children }) {
  const [token, setToken] = useState(() => {
    // Leer token guardado si ya había sesión
    const storedToken = localStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken) : null;
  });

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Decodificar token y extraer información del usuario
  useEffect(() => {
    if (token?.token) {
      try {
        const decoded = jwtDecode(token.token);
        setUser(decoded);
        // Verificar si es admin (rol = 0)
        setIsAdmin(decoded.sub == 'Maryen' || decoded.sub === 'Maryen');
        // console.log("Usuario decodificado:", decoded);
        // console.log("Es admin:",decoded.sub == 'Maryen' || decoded.sub === 'Maryen');
      } catch (error) {
        console.error("Error al decodificar token:", error);
        logout();
      }
    } else {
      setUser(null);
      setIsAdmin(false);
    }
  }, [token]);

  // Guardar token cada vez que cambie
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
      console.log("Token actualizado en contexto:", token.token);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("authToken");
    }
  }, [token]);

  const login = async (data) => {
    try {
      const response = await fetch(`${API_URL}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error("Error en el login:", response.status);
        return false;
      }

      const result = await response.json();

      // Guarda el token y retorna éxito
      setToken(result);
      localStorage.setItem("authToken", result.token);
      
      // Decodificar y verificar rol inmediatamente
      try {
        const decoded = jwtDecode(result.token);
        // console.log("Login exitoso. Usuario:", decoded);
        // console.log("Rol del usuario:", decoded.rol);
      } catch (e) {
        console.error("Error al decodificar token en login:", e);
      }
      
      return true;
    } catch (e) {
      console.error("Error al iniciar sesión:", e);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("authToken");
  };

  const register = async (data) => {
    try {
      const response = await fetch(`${API_URL}register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error en el registro");
      console.log(await response.json());
    } catch (e) {
      console.error(e);
    }
  };

  const forgotPassword = async (data) => {
    try {
      const response = await fetch(`${API_URL}forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error al recuperar contraseña");
      console.log(await response.json());
    } catch (e) {
      console.error(e);
    }
  };

  const updatePassword = async (data) => {
    try {
      const response = await fetch(`${API_URL}update-password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error al actualizar contraseña");
      console.log(await response.json());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ 
        token, 
        user, 
        isAdmin, 
        login, 
        logout, 
        register, 
        forgotPassword, 
        updatePassword 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}