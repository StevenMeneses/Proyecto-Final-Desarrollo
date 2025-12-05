import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VoucherPDF from '../components/VoucherPDF';

function CheckoutSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Obtener datos de la compra desde la navegación
  const compraData = location.state?.compra || {
    id: `MRLY-${Date.now()}`,
    fecha: new Date().toISOString(),
    cliente: {
      nombre: 'Cliente Marly',
      email: 'cliente@email.com'
    },
    productos: [
      { nombre: 'Collar de plata 925', cantidad: 1, precio: 180.00 },
      { nombre: 'Anillo de oro 18k', cantidad: 1, precio: 350.00 }
    ],
    subtotal: 530.00,
    envio: 20.00,
    total: 550.00,
    metodoPago: {
      tipo: 'Tarjeta de Débito',
      referencia: 'PAGO-EXITOSO-123'
    }
  };

  // Verificar que el usuario venga del checkout
  useEffect(() => {
    if (!location.state?.fromCheckout) {
      navigate('/#/buy'); // Redirigir si no viene del checkout
    }
  }, [location, navigate]);

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Mensaje de éxito */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <i className="fas fa-check text-green-600 text-3xl"></i>
            </div>
            <h1 className="text-3xl font-serif text-[#040F2E] mb-4">
              ¡Compra Confirmada!
            </h1>
            <p className="text-gray-600 text-lg">
              Tu pedido ha sido procesado exitosamente. Te hemos enviado un correo con los detalles.
            </p>
            <p className="text-gray-600 mt-2">
              ID de compra: <strong>{compraData.id}</strong>
            </p>
          </div>

          {/* Resumen rápido */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-[#040F2E] mb-4">
              Resumen de tu compra
            </h2>
            <div className="space-y-3">
              {compraData.productos.map((producto, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-medium">{producto.nombre}</p>
                    <p className="text-sm text-gray-500">
                      Cantidad: {producto.cantidad} • 
                      S/ {producto.precio?.toFixed(2) || '0.00'} c/u
                    </p>
                  </div>
                  <p className="font-semibold">
                    S/ {((producto.precio || 0) * (producto.cantidad || 1)).toFixed(2)}
                  </p>
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>S/ {compraData.subtotal?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Envío</span>
                  <span>S/ {compraData.envio?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-[#997C71] mt-4">
                  <span>Total</span>
                  <span>S/ {compraData.total?.toFixed(2) || '0.00'}</span>
                </div>
              </div>

              {/* Método de pago */}
              <div className="mt-6 pt-4 border-t">
                <h3 className="font-semibold text-[#040F2E] mb-2">Método de pago:</h3>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <i className={`fas ${
                      compraData.metodoPago?.tipo?.includes('Tarjeta') ? 'fa-credit-card' :
                      compraData.metodoPago?.tipo === 'Yape' ? 'fa-mobile-alt' :
                      compraData.metodoPago?.tipo === 'Plin' ? 'fa-wallet' : 'fa-money-check-alt'
                    } text-[#997C71] text-xl`}></i>
                  </div>
                  <div>
                    <p className="font-medium">{compraData.metodoPago?.tipo || 'Tarjeta'}</p>
                    {compraData.metodoPago?.referencia && (
                      <p className="text-sm text-gray-500">
                        Ref: {compraData.metodoPago.referencia}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Componente PDF */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <VoucherPDF compra={compraData} metodoPago={compraData.metodoPago} />
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/#/shop')}
              className="px-6 py-3 bg-[#997C71] text-white rounded-lg hover:bg-[#7a6157] transition flex items-center justify-center"
            >
              <i className="fas fa-shopping-bag mr-2"></i>
              Seguir Comprando
            </button>
            
            <button
              onClick={() => navigate('/#/orders')}
              className="px-6 py-3 border border-[#997C71] text-[#997C71] rounded-lg hover:bg-gray-50 transition flex items-center justify-center"
            >
              <i className="fas fa-history mr-2"></i>
              Ver Mis Pedidos
            </button>
          </div>

          {/* Información adicional */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            <div className="max-w-2xl mx-auto">
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">
                  <i className="fas fa-info-circle mr-2"></i>
                  ¿Qué pasa después?
                </h3>
                <ul className="text-left text-gray-600 space-y-1">
                  <li><i className="fas fa-check-circle text-green-500 mr-2"></i>Recibirás un correo de confirmación</li>
                  <li><i className="fas fa-truck text-blue-500 mr-2"></i>Tu pedido será preparado en 24-48 horas</li>
                  <li><i className="fas fa-phone text-purple-500 mr-2"></i>Te contactaremos para coordinar la entrega</li>
                </ul>
              </div>
              
              <p>¿Tienes preguntas sobre tu pedido?</p>
              <p className="mt-1">
                Contáctanos a <a href="mailto:contacto@marlyhandmade.com" className="text-[#997C71] font-medium">contacto@marlyhandmade.com</a>
                <br />
                o al WhatsApp: <span className="text-[#997C71] font-medium">+51 987 654 321</span>
              </p>
              <p className="mt-4 text-xs">
                Marly Handmade • RUC: 20612345678 • Joyería artesanal de calidad
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