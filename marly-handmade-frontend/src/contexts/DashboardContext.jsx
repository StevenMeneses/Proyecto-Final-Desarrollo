import { createContext } from "react";

export const DashboardContext = createContext();

// La URL de tu API base para todas las peticiones (productos, usuarios, pedidos)
export const API_BASE_URL = "https://proyecto-final-desarrollo.onrender.com/api"; 

export function DashboardProviderWrapper({ children }) {

  return (
    <DashboardContext.Provider
      value={{ 
        API_BASE_URL 
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}