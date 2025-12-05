import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { User, Mail, Phone, MapPin, Edit2, Save, X } from "lucide-react";

function Profile() {
  const { token } = useContext(AuthContext);
  const [cliente, setCliente] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    telefono: "",
    direccion: "",
  });

  useEffect(() => {
    console.log("=== PROFILE COMPONENT ===");
    console.log("Token state:", token);
    console.log("Token existe:", !!token);
    console.log("Token.token existe:", !!token?.token);
    
    if (token?.token) {
      cargarDatosCliente();
      cargarPedidos();
    } else {
      console.warn("No hay token disponible");
      setLoading(false);
    }
  }, [token]);

  const cargarDatosCliente = async () => {
    try {
      console.log("=== CARGANDO PERFIL ===");
      console.log("Token disponible:", token);
      console.log("Token value:", token?.token);
      
      if (!token || !token.token) {
        console.error("No hay token disponible");
        return;
      }
      
      const response = await fetch("https://proyecto-final-desarrollo.onrender.com/clientes/perfil", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token.token}`,
          "Content-Type": "application/json"
        }
      });
      
      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);
      
      const responseText = await response.text();
      console.log("Response text:", responseText);
      
      if (!response.ok) {
        console.error("Error response:", responseText);
        throw new Error(`Error al cargar el perfil: ${response.status} - ${responseText}`);
      }
      
      let clienteActual;
      try {
        clienteActual = JSON.parse(responseText);
      } catch (e) {
        console.error("Error al parsear JSON:", e);
        console.error("Respuesta recibida:", responseText);
        throw new Error("Respuesta del servidor no es JSON válido");
      }
      
      console.log("Cliente recibido:", clienteActual);
      
      setCliente(clienteActual);
      setFormData({
        nombres: clienteActual.nombres || "",
        apellidos: clienteActual.apellidos || "",
        telefono: clienteActual.telefono || "",
        direccion: clienteActual.direccion || "",
      });
      
      // Si no hay datos de cliente, mostrar mensaje informativo
      if (!clienteActual.id) {
        console.warn("Este usuario no tiene datos de cliente registrados (posiblemente es administrador)");
      }
    } catch (error) {
      console.error("Error al cargar datos del cliente:", error);
      alert("Error al cargar el perfil: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const cargarPedidos = async () => {
    try {
      // Aquí deberías cargar los pedidos del cliente actual
      // Por ahora dejamos un array vacío
      setPedidos([]);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      // Aquí irá la llamada al API para actualizar los datos
      console.log("Guardando datos:", formData);
      setIsEditing(false);
      // Actualizar el estado local
      setCliente({ ...cliente, ...formData });
    } catch (error) {
      console.error("Error al guardar datos:", error);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg text-gray-600">Cargando perfil...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header del perfil */}
          <div className="bg-[#040F2E] rounded-t-lg p-8 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-[#040F2E]" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">
                  {cliente?.nombres || "Usuario"} {cliente?.apellidos || ""}
                </h1>
                <p className="text-gray-300 text-sm">Bienvenido a tu perfil</p>
              </div>
            </div>
          </div>

          {/* Información Personal */}
          <div className="bg-white rounded-b-lg shadow-md p-8 mb-6">
            {!cliente?.id && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-blue-800 text-sm">
                  <strong>Nota:</strong> Como usuario administrador, no tienes un perfil de cliente completo. 
                  Esta sección está disponible principalmente para clientes que realizan compras.
                </p>
              </div>
            )}
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Información Personal</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#040F2E] text-white rounded-md hover:bg-[#1B2A40] transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Editar</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        nombres: cliente?.nombres || "",
                        apellidos: cliente?.apellidos || "",
                        telefono: cliente?.telefono || "",
                        direccion: cliente?.direccion || "",
                      });
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancelar</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {/* Nombre */}
              <div className="flex items-center space-x-4">
                <User className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Nombre
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="nombres"
                      value={formData.nombres}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#040F2E]"
                    />
                  ) : (
                    <p className="text-gray-800">{cliente?.nombres || "No especificado"}</p>
                  )}
                </div>
              </div>

              {/* Apellidos */}
              <div className="flex items-center space-x-4">
                <User className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Apellidos
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="apellidos"
                      value={formData.apellidos}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#040F2E]"
                    />
                  ) : (
                    <p className="text-gray-800">{cliente?.apellidos || "No especificado"}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Correo
                  </label>
                  <p className="text-gray-800">{cliente?.correo || "No especificado"}</p>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-center space-x-4">
                <Phone className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Teléfono
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#040F2E]"
                    />
                  ) : (
                    <p className="text-gray-800">{cliente?.telefono || "No especificado"}</p>
                  )}
                </div>
              </div>

              {/* Dirección */}
              <div className="flex items-center space-x-4">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Dirección
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#040F2E]"
                    />
                  ) : (
                    <p className="text-gray-800">{cliente?.direccion || "jr Lima"}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Historial de Pedidos */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Historial de Pedidos</h2>
            {pedidos.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  Aún no tienes pedidos realizados. ¡Explora nuestro catálogo y encuentra algo que te encante!
                </p>
                <a
                  href="/shop"
                  className="inline-block px-6 py-3 bg-[#040F2E] text-white rounded-md hover:bg-[#1B2A40] transition-colors font-medium"
                >
                  Explorar Colecciones
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {pedidos.map((pedido) => (
                  <div
                    key={pedido.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-800">Pedido #{pedido.id}</p>
                        <p className="text-sm text-gray-500">{pedido.fecha}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">${pedido.total}</p>
                        <p className="text-sm text-green-600">{pedido.estado}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
