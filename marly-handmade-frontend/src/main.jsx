import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ← CAMBIA HashRouter por BrowserRouter
import "./index.css";

import App from "./App.jsx";
import { AuthProviderWrapper } from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { ReclamacionesProvider } from "./contexts/ReclamacionesContext";
import { ProductoProvider } from "./contexts/ProductoContext";
import { AdminProvider } from "./contexts/AdminContext.jsx";
import { PedidoProviderWrapper } from "./contexts/PedidoContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviderWrapper>
      <ProductoProvider>
        <AdminProvider>
          <ReclamacionesProvider>
            <CartProvider>
              <PedidoProviderWrapper>
                <BrowserRouter> {/* ← CAMBIA A BrowserRouter */}
                  <App />
                </BrowserRouter> {/* ← CAMBIA A BrowserRouter */}
              </PedidoProviderWrapper>
            </CartProvider>
          </ReclamacionesProvider>
        </AdminProvider>
      </ProductoProvider>
    </AuthProviderWrapper>
  </StrictMode>
);