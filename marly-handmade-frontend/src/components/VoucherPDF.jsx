import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const VoucherPDF = ({ compra, metodoPago }) => {
  const generarPDF = () => {
    const input = document.getElementById('voucher-content');
    
    html2canvas(input, {
      scale: 2, // Mejor calidad
      useCORS: true,
      logging: false
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`voucher-marly-${compra.id || Date.now()}.pdf`);
    });
  };

  return (
    <div>
      {/* Contenido oculto para el PDF */}
      <div id="voucher-content" style={{ display: 'none' }}>
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          {/* Encabezado */}
          <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #997C71', paddingBottom: '20px' }}>
            <h1 style={{ color: '#997C71', fontSize: '28px', margin: 0 }}>Marly Handmade</h1>
            <p style={{ fontSize: '14px', color: '#666', margin: '5px 0' }}>
              Joyería artesanal de alta calidad
            </p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              RUC: 20612345678 | Teléfono: +51 987 654 321
            </p>
          </div>

          {/* Título */}
          <h2 style={{ textAlign: 'center', color: '#333', fontSize: '22px', marginBottom: '20px' }}>
            COMPROBANTE DE COMPRA
          </h2>

          {/* Información de la compra */}
          <div style={{ marginBottom: '20px' }}>
            <p><strong>Fecha:</strong> {new Date().toLocaleDateString('es-PE')}</p>
            <p><strong>Hora:</strong> {new Date().toLocaleTimeString('es-PE')}</p>
            <p><strong>ID de compra:</strong> {compra.id || `MRLY-${Date.now()}`}</p>
            <p><strong>Cliente:</strong> {compra.cliente?.nombre || 'Cliente'}</p>
            <p><strong>Email:</strong> {compra.cliente?.email || 'No especificado'}</p>
          </div>

          {/* Productos */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f5f2' }}>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Producto</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Cantidad</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Precio Unit.</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {compra.productos?.map((producto, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{producto.nombre}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{producto.cantidad}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>
                    S/ {producto.precio?.toFixed(2) || '0.00'}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>
                    S/ {((producto.precio || 0) * (producto.cantidad || 1)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totales */}
          <div style={{ textAlign: 'right', marginBottom: '30px' }}>
            <p style={{ fontSize: '16px' }}>
              <strong>Subtotal:</strong> S/ {compra.subtotal?.toFixed(2) || '0.00'}
            </p>
            {compra.envio && (
              <p style={{ fontSize: '16px' }}>
                <strong>Envío:</strong> S/ {compra.envio.toFixed(2)}
              </p>
            )}
            <p style={{ fontSize: '18px', color: '#997C71' }}>
              <strong>TOTAL:</strong> S/ {compra.total?.toFixed(2) || '0.00'}
            </p>
          </div>

          {/* Método de pago */}
          <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f5f2', borderRadius: '5px' }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>MÉTODO DE PAGO</h3>
            <p><strong>Tipo:</strong> {metodoPago.tipo}</p>
            {metodoPago.referencia && (
              <p><strong>Referencia:</strong> {metodoPago.referencia}</p>
            )}
            {metodoPago.numeroTarjeta && (
              <p><strong>Tarjeta terminada en:</strong> **** {metodoPago.numeroTarjeta.slice(-4)}</p>
            )}
          </div>

          {/* Mensaje de agradecimiento */}
          <div style={{ textAlign: 'center', marginTop: '30px', padding: '20px', borderTop: '2px solid #997C71' }}>
            <h3 style={{ color: '#997C71', fontSize: '18px', marginBottom: '10px' }}>
              ¡Gracias por su compra!
            </h3>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
              Agradecemos su confianza en Marly Handmade. Cada pieza es elaborada 
              artesanalmente con los mejores materiales y mucho cuidado. 
              Su satisfacción es nuestra mayor prioridad.
            </p>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '15px' }}>
              Para consultas o reclamos: contacto@marlyhandmade.com
            </p>
          </div>

          {/* Pie de página */}
          <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '12px', color: '#999' }}>
            <p>Este comprobante es generado automáticamente por el sistema de Marly Handmade</p>
            <p>Validez: 30 días desde la fecha de emisión</p>
          </div>
        </div>
      </div>

      {/* Botón para generar PDF */}
      <button
        onClick={generarPDF}
        style={{
          backgroundColor: '#997C71',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          margin: '20px auto'
        }}
      >
        <i className="fas fa-download"></i>
        Descargar Comprobante (PDF)
      </button>
    </div>
  );
};

export default VoucherPDF;