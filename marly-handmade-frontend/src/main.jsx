import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom"; // ← CAMBIADO: BrowserRouter → HashRouter
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
                <HashRouter>
                  <App />
                </HashRouter>
              </PedidoProviderWrapper>
            </CartProvider>
          </ReclamacionesProvider>
        </AdminProvider>
      </ProductoProvider>
    </AuthProviderWrapper>
  </StrictMode>
);