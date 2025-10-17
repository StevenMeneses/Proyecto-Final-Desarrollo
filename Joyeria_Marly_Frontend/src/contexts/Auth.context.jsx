import { useState, useEffect, createContext } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  // Verificar el token al cargar la aplicación
  useEffect(() => {
    if (token) {
      validateToken();
    }
  }, []);

  const validateToken = async () => {
    try {
      const data = await authAPI.validateToken(token);
      if (data.valid) {
        setUser(data.user);
        setIsLoggedIn(true);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error validating token:", error);
      logout();
    }
  };

  const login = async (loginData) => {
    setIsLoading(true);
    try {
      // El backend espera { email, password } pero el frontend manda { username, password }
      // Ajustamos para usar email como username
      const response = await authAPI.login(loginData.username, loginData.password);
      
      if (response.success) {
        setToken(response.token);
        setUser(response.user);
        setIsLoggedIn(true);
        localStorage.setItem("authToken", response.token);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (token) {
      authAPI.logout(token).catch(console.error);
    }
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");

  return (
    <AuthContext.Provider
  value={{
    isLoading,
    user,
    token,
    isLoggedIn,
    login,
    logout,
  }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };

};