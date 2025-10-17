import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth.context";

export default function WelcomeBanner() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Mostrar el banner si el usuario ha iniciado sesión
    if (isLoggedIn) {
      setShowBanner(true);
      // Limpiar el flag de justLoggedIn si existe
      sessionStorage.removeItem("justLoggedIn");
    } else {
      setShowBanner(false);
    }
  }, [isLoggedIn]);

  if (!showBanner || !user) return null;

  return (
    <div className="w-full bg-[#040F2E] text-white py-4 px-6 text-center animate-slideDown">
      <p className="text-lg md:text-xl font-serif">
        WELCOME TO MARLY, <span className="font-bold uppercase">{user.name || user.email}</span>
      </p>
    </div>
  );
}
