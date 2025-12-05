import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VoucherPDF from "../components/VoucherPDF";

function CheckoutSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Estado para los datos de la compra
  const [compraData, setCompraData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("📍 === CHECKOUT SUCCESS INICIADO ===");
    console.log("📍 location.state:", location.state);
    console.log("📍 location.state?.compra:", location.state?.compra);
    console.log("📍 location.state?.fromCheckout:", location.state?.fromCheckout);
    
    const loadPurchaseData = () => {
      try {
        // Opción 1: Intentar obtener de localStorage primero
        const storedPurchase = sessionStorage.getItem("lastPurchase");
        const storedTime = sessionStorage.getItem("lastPurchaseTime");
        
        console.log("💾 storedPurchase en localStorage:", storedPurchase ? "SÍ" : "NO");
        console.log("💾 storedTime en localStorage:", storedTime);
        
        if (storedPurchase && storedTime) {
          // Verificar que no sea muy viejo (menos de 5 minutos)
          const purchaseTime = parseInt(storedTime);
          const currentTime = Date.now();
          const fiveMinutes = 5 * 60 * 1000;
          
          if (currentTime - purchaseTime < fiveMinutes) {
            const parsedData = JSON.parse(storedPurchase);
            console.log("📦 Datos recuperados de localStorage:", parsedData);
            setCompraData(parsedData);
            
            // Limpiar localStorage después de usarlo
            sessionStorage.removeItem("lastPurchase");
            sessionStorage.removeItem("lastPurchaseTime");
            
            setLoading(false);
            window.scrollTo(0, 0);
            return;
          } else {
            console.log("⚠️ Datos en localStorage muy viejos, descartando");
            sessionStorage.removeItem("lastPurchase");
            sessionStorage.removeItem("lastPurchaseTime");
          }
        }
        
        // Opción 2: Intentar obtener de location.state
        const locationPurchase = location.state?.compra;
        const fromCheckout = location.state?.fromCheckout;
        
        if (locationPurchase && fromCheckout) {
          console.log("📦 Datos recuperados de location.state:", locationPurchase);
          setCompraData(locationPurchase);
          setLoading(false);
          window.scrollTo(0, 0);
          return;
        }
        
        // Opción 3: Si no hay datos en ningún lado, usar datos de ejemplo
        console.log("⚠️ No hay datos de compra, usando datos de ejemplo");
        const exampleData = {
          id: `MRLY-${Date.now()}`,
          fecha: new Date().toISOString(),
          fechaFormateada: new Date().toLocaleDateString("es-PE", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          cliente: {
            nombre: "Cliente Marly",
            email: "cliente@email.com",
            telefono: "No especificado",
          },
          productos: [
            { nombre: "Collar de plata 925", cantidad: 1, precio: 180.0 },
            { nombre: "Anillo de oro 18k", cantidad: 1, precio: 350.0 },
          ],
          subtotal: 530.0,
          envio: 10.0,
          total: 540.0,
          metodoPago: {
            tipo: "Tarjeta de Débito",
            referencia: "PAGO-EXITOSO-123",
            numeroTarjeta: "**** 3456",
          },
        };
        
        setCompraData(exampleData);
        setError("Nota: Se están mostrando datos de ejemplo porque no se encontró información de tu compra reciente.");
        setLoading(false);
        window.scrollTo(0, 0);
        
      } catch (err) {
        console.error("❌ Error cargando datos de compra:", err);
        setError("Error al cargar los datos de tu compra. Por favor, contacta a soporte.");
        setLoading(false);
      }
    };
    
    loadPurchaseData();
  }, [location, navigate]);

  // Mostrar loading mientras se cargan los datos
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#997C71] mx-auto mb-6"></div>
          <h2 className="text-2xl font-serif text-[#040F2E] mb-2">Cargando tu compra...</h2>
          <p className="text-gray-600">Estamos recuperando los detalles de tu pedido</p>
        </div>
      </div>
    );
  }

  // Si hay error pero tenemos datos de ejemplo, mostramos igual con advertencia
  if (error) {
    console.log("⚠️ Error pero tenemos datos:", compraData);
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Mensaje de error si existe */}
          {error && (
            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <div className="flex items-center">
                <i className="fas fa-exclamation-triangle text-yellow-600 mr-3"></i>
                <p className="text-yellow-700">{error}</p>
              </div>
            </div>
          )}

          {/* Mensaje de éxito */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-6 shadow-lg">
              <i className="fas fa-check-circle text-emerald-600 text-4xl"></i>
            </div>
            <h1 className="text-4xl font-serif font-bold text-[#040F2E] mb-4">
              ¡Compra Confirmada!
            </h1>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Tu pedido ha sido procesado exitosamente. Te hemos enviado un
              correo con todos los detalles de tu compra.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <i className="fas fa-receipt text-[#997C71]"></i>
              <p className="text-gray-700 font-medium">
                ID de compra: <strong className="text-[#997C71]">{compraData.id}</strong>
              </p>
            </div>
          </div>

          {/* Contenedor principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna izquierda - Resumen */}
            <div className="lg:col-span-2 space-y-8">
              {/* Resumen de compra */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-[#997C71] bg-opacity-10 rounded-lg">
                    <i className="fas fa-shopping-bag text-[#997C71] text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-[#040F2E]">
                    Resumen de tu compra
                  </h2>
                </div>

                {/* Lista de productos */}
                <div className="space-y-4 mb-6">
                  {compraData.productos.map((producto, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start py-4 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {producto.nombre}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Cantidad: {producto.cantidad} • S/{" "}
                          {producto.precio?.toFixed(2) || "0.00"} c/u
                        </p>
                      </div>
                      <p className="font-bold text-lg text-[#997C71]">
                        S/{" "}
                        {((producto.precio || 0) * (producto.cantidad || 1)).toFixed(
                          2
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totales */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        S/ {compraData.subtotal?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Costo de envío</span>
                      <span className="font-medium">
                        S/ {compraData.envio?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-[#997C71] pt-4 border-t border-gray-200">
                      <span>Total a pagar</span>
                      <span>S/ {compraData.total?.toFixed(2) || "0.00"}</span>
                    </div>
                  </div>
                </div>

                {/* Información del cliente */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-700 mb-4">
                    <i className="fas fa-user-circle mr-2"></i>
                    Información del cliente
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Nombre</p>
                      <p className="font-medium">{compraData.cliente?.nombre}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{compraData.cliente?.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Método de pago */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <i className="fas fa-credit-card text-blue-600 text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-[#040F2E]">
                    Método de pago
                  </h2>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <div className="p-3 bg-white rounded-lg shadow">
                    <i
                      className={`fas ${
                        compraData.metodoPago?.tipo?.includes("Tarjeta")
                          ? "fa-credit-card"
                          : compraData.metodoPago?.tipo === "Yape"
                          ? "fa-mobile-alt"
                          : compraData.metodoPago?.tipo === "Plin"
                          ? "fa-wallet"
                          : "fa-money-check-alt"
                      } text-2xl text-[#997C71]`}
                    ></i>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">
                      {compraData.metodoPago?.tipo || "Tarjeta"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {compraData.metodoPago?.referencia
                        ? `Referencia: ${compraData.metodoPago.referencia}`
                        : "Pago procesado exitosamente"}
                    </p>
                    {compraData.metodoPago?.numeroTarjeta && (
                      <p className="text-sm text-gray-500 mt-1">
                        Tarjeta terminada en: {compraData.metodoPago.numeroTarjeta}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha - Acciones y PDF */}
            <div className="space-y-8">
              {/* Comprobante PDF */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <i className="fas fa-file-pdf text-red-600 text-xl"></i>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-[#040F2E]">
                    Comprobante
                  </h2>
                </div>

                <p className="text-gray-600 mb-6">
                  Descarga tu comprobante en formato PDF. Válido para garantías,
                  devoluciones y registros.
                </p>

                <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-200 mb-6">
                  <VoucherPDF
                    compra={compraData}
                    metodoPago={compraData.metodoPago}
                  />
                </div>
              </div>

              {/* Acciones rápidas */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4">
                  <i className="fas fa-bolt mr-2 text-yellow-500"></i>
                  Acciones rápidas
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/shop")}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-[#997C71] to-[#7a6157] text-white rounded-lg hover:from-[#7a6157] hover:to-[#997C71] transition-all duration-300 shadow hover:shadow-lg"
                  >
                    <i className="fas fa-shopping-bag"></i>
                    Seguir Comprando
                  </button>

                  <button
                    onClick={() => navigate("/orders")}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-[#997C71] text-[#997C71] rounded-lg hover:bg-[#997C71] hover:text-white transition-all duration-300"
                  >
                    <i className="fas fa-history"></i>
                    Ver Mis Pedidos
                  </button>

                  <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                  >
                    <i className="fas fa-tachometer-alt"></i>
                    Ir al Dashboard
                  </button>
                </div>
              </div>

              {/* Información de contacto */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-bold text-blue-800 mb-4">
                  <i className="fas fa-headset mr-2"></i>
                  ¿Necesitas ayuda?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <i className="fas fa-envelope text-blue-600 mt-1"></i>
                    <div>
                      <p className="text-sm text-blue-900">Email</p>
                      <a
                        href="mailto:contacto@marlyhandmade.com"
                        className="text-blue-700 font-medium hover:underline"
                      >
                        contacto@marlyhandmade.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fab fa-whatsapp text-green-600 mt-1"></i>
                    <div>
                      <p className="text-sm text-blue-900">WhatsApp</p>
                      <span className="text-blue-700 font-medium">
                        +51 987 654 321
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-clock text-blue-600 mt-1"></i>
                    <div>
                      <p className="text-sm text-blue-900">Horario de atención</p>
                      <span className="text-blue-700">
                        Lunes a Viernes: 9am - 6pm
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Proceso de entrega */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-serif font-bold text-center text-[#040F2E] mb-8">
              <i className="fas fa-shipping-fast mr-3 text-[#997C71]"></i>
              Proceso de entrega
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  icon: "fa-box-check",
                  title: "Pedido confirmado",
                  desc: "Tu pedido ha sido registrado en nuestro sistema",
                  color: "text-green-600",
                  bg: "bg-green-50",
                },
                {
                  icon: "fa-box-open",
                  title: "Preparación",
                  desc: "Estamos preparando tu pedido con cuidado",
                  color: "text-blue-600",
                  bg: "bg-blue-50",
                },
                {
                  icon: "fa-shipping-fast",
                  title: "En camino",
                  desc: "Tu pedido está en camino a tu domicilio",
                  color: "text-orange-600",
                  bg: "bg-orange-50",
                },
                {
                  icon: "fa-home",
                  title: "Entregado",
                  desc: "¡Disfruta de tus productos Marly!",
                  color: "text-purple-600",
                  bg: "bg-purple-50",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="text-center p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${step.bg} ${step.color} rounded-full mb-4`}
                  >
                    <i className={`fas ${step.icon} text-2xl`}></i>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                  {index === 0 && (
                    <div className="mt-3">
                      <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        <i className="fas fa-check"></i> Completado
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-gray-50 rounded-xl">
              <p className="text-gray-700 text-center">
                <i className="fas fa-info-circle mr-2 text-blue-500"></i>
                Recibirás actualizaciones por email sobre el estado de tu pedido.
                Tiempo estimado de entrega:{" "}
                <strong className="text-[#997C71]">2-3 días hábiles</strong>
              </p>
            </div>
          </div>

          {/* Pie de página informativo */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            <div className="max-w-2xl mx-auto">
              <p className="mb-4">
                <i className="fas fa-gem text-[#997C71] mr-2"></i>
                Cada pieza Marly Handmade es elaborada artesanalmente con
                materiales de la más alta calidad.
              </p>
              <p className="text-xs">
                Marly Handmade • RUC: 20612345678 • Joyería artesanal desde 2020
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CheckoutSuccess;