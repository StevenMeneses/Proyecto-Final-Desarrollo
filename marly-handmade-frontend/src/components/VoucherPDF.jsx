import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const VoucherPDF = ({ compra, metodoPago }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Función para generar el PDF con mejor calidad
  const generarPDF = () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    
    // Mostrar el contenido temporalmente para capturarlo
    const voucherElement = document.getElementById("voucher-content");
    const originalDisplay = voucherElement.style.display;
    const originalPosition = voucherElement.style.position;
    
    // Mostrar temporalmente en pantalla (fuera de vista)
    voucherElement.style.display = "block";
    voucherElement.style.position = "fixed";
    voucherElement.style.left = "0";
    voucherElement.style.top = "0";
    voucherElement.style.width = "210mm";
    voucherElement.style.backgroundColor = "white";
    voucherElement.style.zIndex = "9999";
    
    // Esperar a que se renderice
    setTimeout(() => {
      html2canvas(voucherElement, {
        scale: 3, // Mayor calidad
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: voucherElement.offsetWidth,
        height: voucherElement.offsetHeight,
      })
        .then((canvas) => {
          // Restaurar estilos originales
          voucherElement.style.display = originalDisplay;
          voucherElement.style.position = originalPosition;
          
          const imgData = canvas.toDataURL("image/png", 1.0);
          const pdf = new jsPDF("p", "mm", "a4");
          
          const imgWidth = 190; // Ancho máximo en mm (A4 con márgenes)
          const pageHeight = 297; // Altura de página A4 en mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          let position = 10; // Margen superior
          
          // Agregar primera página
          pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
          
          // Si el contenido es más alto que la página, agregar páginas adicionales
          let heightLeft = imgHeight;
          heightLeft -= pageHeight - 20; // Restar margen superior e inferior
          
          while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight - 20;
          }
          
          // Guardar el PDF
          pdf.save(`comprobante-marly-${compra.id}.pdf`);
          setIsGenerating(false);
          
          // Mostrar mensaje de éxito
          alert("✅ Comprobante descargado exitosamente");
        })
        .catch((error) => {
          console.error("Error generando PDF:", error);
          voucherElement.style.display = originalDisplay;
          voucherElement.style.position = originalPosition;
          setIsGenerating(false);
          alert("❌ Error al generar el comprobante. Intenta nuevamente.");
        });
    }, 500);
  };

  // Generar automáticamente al cargar (opcional - descomentar si quieres)
  // useEffect(() => {
  //   generarPDF();
  // }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Contenido oculto para el PDF */}
      <div
        id="voucher-content"
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "210mm",
          minHeight: "297mm",
          padding: "20mm",
          backgroundColor: "white",
          fontFamily: "'Helvetica', 'Arial', sans-serif",
          color: "#333",
          boxSizing: "border-box",
        }}
      >
        {/* Encabezado */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
            borderBottom: "3px solid #997C71",
            paddingBottom: "20px",
          }}
        >
          <h1
            style={{
              color: "#997C71",
              fontSize: "32px",
              margin: "0 0 10px 0",
              fontWeight: "bold",
              fontFamily: "'Georgia', serif",
            }}
          >
            Marly Handmade
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#666",
              margin: "5px 0",
              fontStyle: "italic",
            }}
          >
            Joyería artesanal de alta calidad
          </p>
          <p style={{ fontSize: "13px", color: "#666", margin: "3px 0" }}>
            RUC: 20612345678 | Teléfono: +51 987 654 321
          </p>
          <p style={{ fontSize: "13px", color: "#666" }}>
            contacto@marlyhandmade.com | www.marlyhandmade.com
          </p>
        </div>

        {/* Título */}
        <h2
          style={{
            textAlign: "center",
            color: "#333",
            fontSize: "24px",
            marginBottom: "25px",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          COMPROBANTE DE COMPRA
        </h2>

        {/* Información de la compra */}
        <div
          style={{
            marginBottom: "25px",
            padding: "15px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p style={{ margin: "5px 0" }}>
                <strong>Fecha:</strong> {compra.fechaFormateada || new Date(compra.fecha).toLocaleDateString('es-PE')}
              </p>
              <p style={{ margin: "5px 0" }}>
                <strong>ID de compra:</strong>{" "}
                <span style={{ color: "#997C71", fontWeight: "bold" }}>
                  {compra.id}
                </span>
              </p>
            </div>
            <div>
              <p style={{ margin: "5px 0" }}>
                <strong>Cliente:</strong> {compra.cliente?.nombre}
              </p>
              <p style={{ margin: "5px 0" }}>
                <strong>Email:</strong> {compra.cliente?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Productos - Tabla mejorada */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "25px",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px 8px",
                  textAlign: "left",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                Producto
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px 8px",
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#333",
                  width: "80px",
                }}
              >
                Cantidad
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px 8px",
                  textAlign: "right",
                  fontWeight: "bold",
                  color: "#333",
                  width: "100px",
                }}
              >
                Precio Unit.
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px 8px",
                  textAlign: "right",
                  fontWeight: "bold",
                  color: "#333",
                  width: "100px",
                }}
              >
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {compra.productos?.map((producto, index) => (
              <tr key={index}>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px 8px",
                    verticalAlign: "top",
                  }}
                >
                  <div style={{ fontWeight: "500" }}>{producto.nombre}</div>
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px 8px",
                    textAlign: "center",
                    verticalAlign: "top",
                  }}
                >
                  {producto.cantidad}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px 8px",
                    textAlign: "right",
                    verticalAlign: "top",
                  }}
                >
                  S/ {producto.precio?.toFixed(2) || "0.00"}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px 8px",
                    textAlign: "right",
                    verticalAlign: "top",
                    fontWeight: "500",
                  }}
                >
                  S/{" "}
                  {((producto.precio || 0) * (producto.cantidad || 1)).toFixed(
                    2
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totales */}
        <div
          style={{
            textAlign: "right",
            marginBottom: "30px",
            paddingTop: "15px",
            borderTop: "2px solid #ddd",
          }}
        >
          <div style={{ marginBottom: "8px" }}>
            <span style={{ marginRight: "20px", fontSize: "16px" }}>
              Subtotal:
            </span>
            <span style={{ fontSize: "16px", fontWeight: "500" }}>
              S/ {compra.subtotal?.toFixed(2) || "0.00"}
            </span>
          </div>
          {compra.envio > 0 && (
            <div style={{ marginBottom: "8px" }}>
              <span style={{ marginRight: "20px", fontSize: "16px" }}>
                Envío:
              </span>
              <span style={{ fontSize: "16px", fontWeight: "500" }}>
                S/ {compra.envio?.toFixed(2) || "0.00"}
              </span>
            </div>
          )}
          <div
            style={{
              marginTop: "15px",
              paddingTop: "15px",
              borderTop: "1px solid #ddd",
            }}
          >
            <span
              style={{
                marginRight: "20px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              TOTAL:
            </span>
            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#997C71",
              }}
            >
              S/ {compra.total?.toFixed(2) || "0.00"}
            </span>
          </div>
        </div>

        {/* Método de pago */}
        <div
          style={{
            marginBottom: "25px",
            padding: "18px",
            backgroundColor: "#f8f5f2",
            borderRadius: "8px",
            border: "1px solid #e8e0d9",
          }}
        >
          <h3
            style={{
              color: "#333",
              marginBottom: "12px",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            <i
              className="fas fa-credit-card"
              style={{ marginRight: "10px", color: "#997C71" }}
            ></i>
            MÉTODO DE PAGO
          </h3>
          <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
            <div>
              <p style={{ margin: "8px 0" }}>
                <strong>Tipo:</strong> {metodoPago.tipo}
              </p>
              {metodoPago.referencia && (
                <p style={{ margin: "8px 0" }}>
                  <strong>Referencia:</strong> {metodoPago.referencia}
                </p>
              )}
            </div>
            {metodoPago.numeroTarjeta && (
              <div>
                <p style={{ margin: "8px 0" }}>
                  <strong>Tarjeta:</strong> {metodoPago.tipoTarjeta || "Tarjeta"}
                </p>
                <p style={{ margin: "8px 0" }}>
                  <strong>Terminada en:</strong> ****{" "}
                  {metodoPago.numeroTarjeta.replace(/\s+/g, "").slice(-4)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Mensaje de agradecimiento */}
        <div
          style={{
            textAlign: "center",
            marginTop: "35px",
            padding: "25px",
            borderTop: "3px solid #997C71",
            backgroundColor: "#fcfaf8",
            borderRadius: "8px",
          }}
        >
          <h3
            style={{
              color: "#997C71",
              fontSize: "20px",
              marginBottom: "15px",
              fontWeight: "bold",
              fontFamily: "'Georgia', serif",
            }}
          >
            ¡Gracias por su compra!
          </h3>
          <p
            style={{
              fontSize: "15px",
              color: "#666",
              lineHeight: "1.7",
              marginBottom: "15px",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Agradecemos su confianza en Marly Handmade. Cada pieza es elaborada
            artesanalmente con los mejores materiales y mucho cuidado. Su
            satisfacción es nuestra mayor prioridad.
          </p>
          <p
            style={{
              fontSize: "14px",
              color: "#666",
              marginTop: "20px",
              fontStyle: "italic",
            }}
          >
            Para consultas o reclamos: contacto@marlyhandmade.com
          </p>
        </div>

        {/* Pie de página */}
        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            fontSize: "12px",
            color: "#999",
            paddingTop: "20px",
            borderTop: "1px dashed #ddd",
          }}
        >
          <p style={{ margin: "5px 0" }}>
            Este comprobante es generado automáticamente por el sistema de Marly
            Handmade
          </p>
          <p style={{ margin: "5px 0" }}>
            Validez: 30 días desde la fecha de emisión
          </p>
          <p style={{ margin: "5px 0", fontWeight: "bold" }}>
            ¡Vuelva pronto!
          </p>
        </div>
      </div>

      {/* Botón para generar PDF */}
      <div className="flex flex-col items-center">
        <button
          onClick={generarPDF}
          disabled={isGenerating}
          className={`
            px-8 py-4 rounded-lg font-medium text-lg
            transition-all duration-300 ease-in-out
            flex items-center justify-center gap-3
            ${isGenerating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-[#997C71] to-[#7a6157] hover:from-[#7a6157] hover:to-[#997C71] shadow-lg hover:shadow-xl'
            }
            text-white
            min-w-[300px]
            transform hover:scale-[1.02] active:scale-[0.98]
          `}
        >
          {isGenerating ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Generando PDF...
            </>
          ) : (
            <>
              <i className="fas fa-download text-xl"></i>
              Descargar Comprobante (PDF)
            </>
          )}
        </button>
        
        {!isGenerating && (
          <p className="mt-4 text-sm text-gray-600 text-center max-w-md">
            <i className="fas fa-info-circle mr-2"></i>
            El comprobante incluye todos los detalles de tu compra y es válido
            para garantías y devoluciones.
          </p>
        )}
      </div>
    </div>
  );
};

export default VoucherPDF;