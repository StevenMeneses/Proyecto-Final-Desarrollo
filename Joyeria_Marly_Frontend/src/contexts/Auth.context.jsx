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
        
        // Marcar que el usuario acaba de iniciar sesión para mostrar el banner
        sessionStorage.setItem("justLoggedIn", "true");
        
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
  };

  const register = async (registerData) => {
    setIsLoading(true);
    try {
      console.log('📝 Datos enviados al registro:', registerData);
      const response = await authAPI.register(registerData);
      console.log('📥 Respuesta del registro:', response);
      
      if (response.success) {
        // El backend solo devuelve el usuario, no un token
        // Después del registro, hacer login automático
        sessionStorage.setItem("justLoggedIn", "true");
        const loginSuccess = await login({ username: registerData.email, password: registerData.password });
        return loginSuccess;
      }
      return false;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        token,
        isLoggedIn,
        login,
        logout,
        register,
        validateToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };