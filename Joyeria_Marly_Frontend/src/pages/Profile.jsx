import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Auth.context";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { User, Mail, Phone, MapPin, Calendar, LogOut } from "lucide-react";
import "../styles/Profile.css";

export default function Profile() {
  const { user, logout, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirigir si no hay sesión activa
  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate("/login");
    }
  }, [isLoggedIn, user, navigate]);

  if (!isLoggedIn || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 profile-container">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden profile-card">
          {/* Header del perfil */}
          <div className="bg-gradient-to-r from-[#040F2E] to-[#1B2A40] text-white p-8">
            <div className="flex items-center space-x-6">
              <div className="bg-white rounded-full p-6">
                <User className="w-16 h-16 text-[#040F2E]" />
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold mb-2">
                  {user.name || "Usuario"}
                </h1>
                <p className="text-gray-200">Bienvenido a tu perfil</p>
              </div>
            </div>
          </div>

          {/* Información del usuario */}
          <div className="p-8">
            <h2 className="text-2xl font-serif font-semibold text-[#040F2E] mb-6">
              Información Personal
            </h2>
            
            <div className="space-y-6">
              {/* Nombre */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg info-item">
                <User className="w-6 h-6 text-[#040F2E] mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium">Nombre</p>
                  <p className="text-lg text-gray-900">{user.name || "No especificado"}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg info-item">
                <Mail className="w-6 h-6 text-[#040F2E] mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium">Correo Electrónico</p>
                  <p className="text-lg text-gray-900">{user.email || "No especificado"}</p>
                </div>
              </div>

              {/* Teléfono */}
              {user.phone && (
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg info-item">
                  <Phone className="w-6 h-6 text-[#040F2E] mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 font-medium">Teléfono</p>
                    <p className="text-lg text-gray-900">{user.phone}</p>
                  </div>
                </div>
              )}

              {/* Dirección */}
              {user.address && (
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg info-item">
                  <MapPin className="w-6 h-6 text-[#040F2E] mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 font-medium">Dirección</p>
                    <p className="text-lg text-gray-900">{user.address}</p>
                  </div>
                </div>
              )}

              {/* Fecha de registro */}
              {user.createdAt && (
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg info-item">
                  <Calendar className="w-6 h-6 text-[#040F2E] mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 font-medium">Miembro desde</p>
                    <p className="text-lg text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Botón de cerrar sesión */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="logout-button w-full sm:w-auto flex items-center justify-center space-x-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                <LogOut className="w-5 h-5" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sección adicional - Historial de pedidos (placeholder) */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-serif font-semibold text-[#040F2E] mb-4">
            Historial de Pedidos
          </h2>
          <p className="text-gray-600">
            Aún no tienes pedidos realizados. ¡Explora nuestra colección y encuentra tu joya perfecta!
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-[#040F2E] hover:bg-[#1B2A40] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Explorar Colecciones
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
