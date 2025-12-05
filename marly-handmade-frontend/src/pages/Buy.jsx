import React, { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartItems from "../components/CartItems.jsx";
import { useCart } from "../contexts/CartContext.jsx";
import "../styles/Buy.css";
import yape from "../assets/yape.jfif";
import plin from "../assets/plin.jfif";
import { AuthContext } from "../contexts/AuthContext.jsx";

const Buy = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
    type: "",
  });
  const [errors, setErrors] = useState({});
  const [buttonState, setButtonState] = useState("idle"); // idle | loading | success | error
  const { token, logout } = useContext(AuthContext);

  // Detectar tipo de tarjeta
  const detectCardType = (number) => {
    const clean = number.replace(/\s+/g, "");
    if (/^4/.test(clean)) return "Visa";
    if (/^5[1-5]/.test(clean)) return "MasterCard";
    if (/^3[47]/.test(clean)) return "Amex";
    return "";
  };

  const createMultiplePedidos = async () => {
    if (cartItems.length === 0) return;

    // Construir todos los pedidos primero
    const pedidos = cartItems.map((item) => ({
      detallePedido: [
        {
          cantidad: item.quantity,
          idProducto: item.id,
        },
      ],
    }));

    // Imprimir todos los pedidos antes de enviarlos
    console.log("Pedidos a enviar:", pedidos);

    // Enviar los pedidos uno por uno
    for (let pedidoBody of pedidos) {
      try {
        const res = await fetch("https://proyecto-final-desarrollo.onrender.com/pedido", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
          body: JSON.stringify(pedidoBody),
        });

        if (!res.ok)
          throw new Error(
            "Error al crear pedido para producto " +
              pedidoBody.detallePedido[0].idProducto
          );

        const data = await res.json();
        console.log("Pedido creado:", data);
      } catch (err) {
        console.error(err);
      }
    }

    // Limpiar carrito después de crear todos los pedidos
    clearCart();
  };

  // Formateo de número y fecha
  const formatCardNumber = (value) =>
    value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (value) => {
    const clean = value.replace(/\D/g, "").slice(0, 4);
    if (clean.length >= 3) return clean.slice(0, 2) + "/" + clean.slice(2);
    return clean;
  };

  // Validación
  const validateCard = () => {
    const errs = {};

    const cleanNumber = cardData.number.replace(/\s+/g, "");
    if (cleanNumber.length !== 16)
      errs.number = "Debe tener 16 dígitos reales.";

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardData.expiry)) {
      errs.expiry = "Formato inválido (MM/AA).";
    }

    if (!/^\d{3,4}$/.test(cardData.cvv)) {
      errs.cvv = "Debe tener 3 o 4 dígitos.";
    }

    if (
      !/^[a-zA-Z\sáéíóúÁÉÍÓÚ]+$/.test(cardData.name) ||
      cardData.name.trim().length < 3
    ) {
      errs.name = "Solo letras y mínimo 3 caracteres.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Manejo de cambio en inputs
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;

    if (id === "card-cvv") {
      // Filtra solo números y limita a 4 dígitos
      newValue = value.replace(/\D/g, "").slice(0, 4);
    }

    if (id === "card-number") {
      newValue = formatCardNumber(value);
      const type = detectCardType(newValue);
      setCardData((prev) => ({ ...prev, number: newValue, type }));
      return;
    }

    if (id === "card-expiry") newValue = formatExpiry(value);

    setCardData((prev) => ({ ...prev, [id.split("-")[1]]: newValue }));
  };

  // Procesar pago
  // Antes de handleCheckout, agrega un chequeo rápido
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    if (paymentMethod === "card") {
      if (!validateCard()) {
        setButtonState("error");
        setTimeout(() => setButtonState("idle"), 1500);
        return;
      }
    }

    setButtonState("loading");

    setTimeout(async () => {
      await createMultiplePedidos(); // Llamada a la función que crea los pedidos
      setButtonState("success");
      setCardData({ number: "", expiry: "", cvv: "", name: "", type: "" });
      setTimeout(() => setButtonState("idle"), 2000);
    }, 1000);
  };

  return (
    <>
      <Header />
      <div className="buy-container">
        <div className="main-container">
          <h1 className="page-title">¿Listo para finalizar tu compra?</h1>
          <p className="page-subtitle">
            Revisa tus productos antes de finalizar la compra
          </p>

          <div className="cart-container">
            <div className="cart-items-section">
              <h2 className="section-title">
                <i className="fas fa-shopping-bag"></i> Productos en tu carrito
              </h2>
              <CartItems />
            </div>

            <div className="cart-summary">
              <h2 className="section-title">
                <i className="fas fa-receipt"></i> Resumen del pedido
              </h2>

              <div className="summary-row">
                <span>Subtotal:</span>
                <span>$ {getCartTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Envío:</span>
                <span>$ 10.00</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>$ {(getCartTotal() + 10).toFixed(2)}</span>
              </div>

              {/* Métodos de pago */}
              <div className="payment-methods">
                <h3 className="payment-title">Métodos de Pago</h3>

                {["card", "yape", "plin"].map((method) => (
                  <div
                    key={method}
                    className={`payment-method ${
                      paymentMethod === method ? "selected" : ""
                    }`}
                    onClick={() => setPaymentMethod(method)}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                    />
                    <div className="payment-info">
                      <div className="payment-brand">
                        {method === "card"
                          ? "Tarjeta de Crédito/Débito"
                          : method === "yape"
                          ? "Yape"
                          : "Plin"}
                      </div>
                      <div className="payment-desc">
                        {method === "card"
                          ? "Visa, MasterCard, American Express"
                          : "Billetera Digital"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tarjeta */}
              {paymentMethod === "card" && (
                <div className="card-form">
                  <h4 className="form-title">
                    <i className="fas fa-credit-card"></i> Información de la
                    Tarjeta
                  </h4>

                  <div className={`form-group ${errors.number ? "error" : ""}`}>
                    <label htmlFor="card-number">Número de Tarjeta</label>
                    <input
                      type="text"
                      id="card-number"
                      value={cardData.number}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                    />
                    <div className="card-icons">
                      {cardData.type && (
                        <i
                          className={`fab fa-cc-${cardData.type
                            .toLowerCase()
                            .replace(" ", "")}`}
                          title={cardData.type}
                        ></i>
                      )}
                    </div>
                    {errors.number && <small>{errors.number}</small>}
                  </div>

                  <div className="form-row">
                    <div
                      className={`form-group ${errors.expiry ? "error" : ""}`}
                    >
                      <label htmlFor="card-expiry">Fecha de Vencimiento</label>
                      <input
                        type="text"
                        id="card-expiry"
                        value={cardData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/AA"
                      />
                      {errors.expiry && <small>{errors.expiry}</small>}
                    </div>
                    <div className={`form-group ${errors.cvv ? "error" : ""}`}>
                      <label htmlFor="card-cvv">CVV</label>
                      <input
                        type="text"
                        id="card-cvv"
                        value={cardData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={4}
                      />
                      {errors.cvv && <small>{errors.cvv}</small>}
                    </div>
                  </div>

                  <div className={`form-group ${errors.name ? "error" : ""}`}>
                    <label htmlFor="card-name">Nombre del Titular</label>
                    <input
                      type="text"
                      id="card-name"
                      value={cardData.name}
                      onChange={handleInputChange}
                      placeholder="Nombre como aparece en la tarjeta"
                    />
                    {errors.name && <small>{errors.name}</small>}
                  </div>
                </div>
              )}

              {/* QR Yape / Plin */}
              {(paymentMethod === "yape" || paymentMethod === "plin") && (
                <div className="qr-section">
                  <h4 className="form-title">
                    <i className="fas fa-qrcode"></i> Escanea el código QR
                  </h4>
                  <div className="qr-container">
                    {paymentMethod === "yape" ? (
                      <div className="qr-code">
                        <img src={yape} alt="Código QR Yape" />
                        <p>Escanea con tu app Yape</p>
                      </div>
                    ) : (
                      <div className="qr-code">
                        <img src={plin} alt="Código QR Plin" />
                        <p>Escanea con tu app Plin</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Botón de pago */}
              <button
                className={`checkout-btn ${buttonState}`}
                onClick={handleCheckout}
                disabled={buttonState === "loading" || cartItems.length === 0} // deshabilitado si carrito vacío
              >
                {cartItems.length === 0 ? (
                  <>Carrito vacío</>
                ) : buttonState === "idle" ? (
                  <>
                    <i className="fas fa-lock"></i> Proceder al Pago
                  </>
                ) : buttonState === "loading" ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Procesando...
                  </>
                ) : buttonState === "success" ? (
                  <>
                    <i className="fas fa-check-circle"></i> Pago Exitoso
                  </>
                ) : (
                  <>
                    <i className="fas fa-exclamation-circle"></i> Corrige los
                    errores
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Buy;
