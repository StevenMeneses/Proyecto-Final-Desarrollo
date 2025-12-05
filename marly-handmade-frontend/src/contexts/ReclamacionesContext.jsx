import React, { createContext, useContext, useState } from "react";

// Creamos el contexto
export const ReclamacionesContext = createContext();

// Hook para usar el contexto más fácil
export const useReclamaciones = () => useContext(ReclamacionesContext);

// Proveedor del contexto
export const ReclamacionesProvider = ({ children }) => {
  const [reclamaciones, setReclamaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "https://proyecto-final-desarrollo.onrender.com/reclamaciones"; // tu API Spring Boot

  // Crear una nueva reclamación
  const crearReclamacion = async (data) => {
  setLoading(true);
  setError(null);

  try {
    const tokenObj = JSON.parse(localStorage.getItem("token"));
    const token = tokenObj.token;

    // Imprimir en consola lo que vamos a enviar
    console.log("=== Enviando POST a /reclamaciones ===");
    console.log("Headers:", {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
    console.log("Body:", data);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al crear la reclamación");
    }

    const result = await response.json();
    setReclamaciones((prev) => [...prev, result]);
    return result;

  } catch (err) {
    console.error(err);
    setError(err.message);
    throw err;
  } finally {
    setLoading(false);
  }
};

  // Listar todas las reclamaciones (para admins)
  const listarReclamaciones = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // enviamos el token también al listar
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener reclamaciones");
      }

      const result = await response.json();
      setReclamaciones(result);
      return result;

    } catch (err) {
      console.error(err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReclamacionesContext.Provider
      value={{
        reclamaciones,
        loading,
        error,
        crearReclamacion,
        listarReclamaciones,
      }}
    >
      {children}
    </ReclamacionesContext.Provider>
  );
};
