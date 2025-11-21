import { BrowserRouter } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Globe, Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../contexts/CartContext.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useFilters } from "../contexts/FilterContext.jsx";
import { useProductos } from "../contexts/ProductoContext.jsx";
import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";

function obtenerSubDesdeToken(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.sub || decoded.username || null;
  } catch {
    return null;
  }
}

function verificarAdmin(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.sub === "Maryen";
  } catch {
    return false;
  }
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [open, setOpen] = useState(false); // Dropdown del usuario
  const [searchOpen, setSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState("");

  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const { openCart } = useCart();
  const { token, logout } = useContext(AuthContext);
  const { setSearchTerm } = useFilters();
  const { buscarProductos } = useProductos();
  const navigate = useNavigate();

  // 🔹 Nombre de usuario (Memoizado)
  const userName = useMemo(() => {
    if (!token?.token) return null;
    const name = obtenerSubDesdeToken(token.token);
    return name
      ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
      : null;
  }, [token]);

  // Verificar si es admin (Memoizado)
  const isAdmin = useMemo(() => {
    if (!token?.token) return false;
    return verificarAdmin(token.token);
  }, [token]);

  // Cerrar dropdown del usuario al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchTerm(localSearch);
      // Llamar al backend para buscar productos
      await buscarProductos(localSearch);
      navigate('/shop');
      setSearchOpen(false);
      setLocalSearch("");
    }
  };

  // Menú móvil
  const toggleMenu = () => {
    setMenuOpen((v) => !v);
  };

  return (
    <header className="header py-2">
      <div className="header-container">
        {/* NAV DESKTOP */}
        <nav className="nav-desktop">
          <ul className="flex items-center space-x-10 font-serif font-medium">
            {/* SHOP */}
            <li className="relative group cursor-pointer">
              <a
                href="/shop"
                className="pb-2 border-b-2 border-transparent hover:border-[#040F2E] transition-colors duration-300"
              >
                Shop
              </a>
              <div className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow-lg rounded-lg py-6 px-4 z-[1000] max-w-[95vw] w-[700px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 text-[#1B2A40]">
                      Category
                    </h3>
                    <ul className="space-y-1 text-sm text-[#2C3E5E]">
                      <li>
                        <a href="/Bracelets" className="hover:text-[#040F2E]">
                          Bracelets
                        </a>
                      </li>
                      <li>
                        <a href="/Earrings" className="hover:text-[#040F2E]">
                          Earrings
                        </a>
                      </li>
                      <li>
                        <a href="/Necklaces" className="hover:text-[#040F2E]">
                          Necklaces
                        </a>
                      </li>
                      <li>
                        <a href="/Rings" className="hover:text-[#040F2E]">
                          Rings
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-[#1B2A40]">
                      Material
                    </h3>
                    <ul className="space-y-1 text-sm text-[#2C3E5E]">
                      <li>
                        <a
                          href="/Polymer Clay"
                          className="hover:text-[#040F2E]"
                        >
                          Polymer Clay
                        </a>
                      </li>
                      <li>
                        <a href="/Copper Wire" className="hover:text-[#040F2E]">
                          Copper Wire
                        </a>
                      </li>
                      <li>
                        <a href="/Resin" className="hover:text-[#040F2E]">
                          Resin
                        </a>
                      </li>
                      <li>
                        <a href="/Textile" className="hover:text-[#040F2E]">
                          Textile
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-[#1B2A40]">
                      Featured
                    </h3>
                    <ul className="space-y-1 text-sm text-[#2C3E5E]">
                      <li>
                        <a
                          href="/Best Sellers"
                          className="hover:text-[#040F2E]"
                        >
                          Best Sellers
                        </a>
                      </li>
                      <li>
                        <a
                          href="/Marly's Favorites"
                          className="hover:text-[#040F2E]"
                        >
                          Marly's Favorites
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="relative flex justify-center items-center">
                    <a href="/marly-favorites" className="block relative group">
                      <img
                        src="/nayblueear.jpg"
                        className="w-40 h-32 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                        alt="Marly's favorites"
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-[#F5E3C3] font-serif text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_3px_6px_rgba(0,0,0,1)]">
                        Marly's Favorites
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </li>

            {/* COLLECTIONS */}
            <li className="relative group cursor-pointer">
              <a
                href="/collections"
                className="pb-2 border-b-2 border-transparent hover:border-[#040F2E] transition-colors duration-300"
              >
                Collections
              </a>
              <div className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow-lg rounded-lg py-6 px-4 z-[1000] max-w-[95vw] w-[700px]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <ul className="space-y-1 text-sm text-[#2C3E5E]">
                      <li>
                        <a
                          href="/product/sea-collection"
                          className="hover:text-[#040F2E]"
                        >
                          SEA COLLECTION
                        </a>
                      </li>
                      <li>
                        <a
                          href="/MATARITA COLLECTION"
                          className="hover:text-[#040F2E]"
                        >
                          MATARITA COLLECTION
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-center">
                    <a
                      href="/product/sea-collection"
                      className="block text-center text-[#2C3E5E] hover:text-[#040F2E]"
                    >
                      <img
                        src="/sea-collection.jpg"
                        alt="Sea Collection"
                        className="w-40 h-32 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                      />
                      <span className="mt-2 text-sm font-medium">
                        SEA COLLECTION
                      </span>
                    </a>
                  </div>
                  <div className="flex flex-col items-center">
                    <a
                      href="/matarita-collection"
                      className="block text-center text-[#2C3E5E] hover:text-[#040F2E]"
                    >
                      <img
                        src="/matarita-collection.jpg"
                        alt="Matarita Collection"
                        className="w-40 h-32 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                      />
                      <span className="mt-2 text-sm font-medium">
                        MATARITA COLLECTION
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <a href="/our-story">Our Story</a>
            </li>

            {isAdmin && (
              <li>
                <Link
                  to="/admin/dashboard"
                  className="pb-2 border-b-2 border-transparent hover:border-[#997C71] text-[#997C71] font-semibold"
                >
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* LOGO */}
        <div className="logo">
          <a href="/" className="flex items-center">
            <img
              src="/logoMarly.png"
              alt="Marly logo"
              className="h-10 w-auto cursor-pointer flex-shrink-0"
            />
          </a>
        </div>

        {/* ICONOS */}
        <div className="icons">
          <div className="relative inline-block">
            <select className="w-5 h-5 opacity-0 absolute inset-0 cursor-pointer">
              <option>Spanish</option>
              <option>English</option>
            </select>
            <Globe className="w-5 h-5 text-[#040F2E] pointer-events-none cursor-pointer" />
          </div>

          {/* Búsqueda */}
          <div className="relative" ref={searchRef}>
            <Search 
              className="w-5 h-5 cursor-pointer text-[#040F2E]" 
              onClick={() => setSearchOpen(!searchOpen)}
            />
            
            {searchOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-5 z-50 border border-gray-100 w-96">
                <form onSubmit={handleSearch}>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Buscar productos..."
                      value={localSearch}
                      onChange={(e) => setLocalSearch(e.target.value)}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#040F2E] text-sm"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#040F2E] text-white rounded-md hover:bg-[#1B2A40] transition-colors text-sm font-medium whitespace-nowrap"
                    >
                      Buscar
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <select className="rounded px-2 py-1 text-sm hidden sm:block cursor-pointer">
            <option>USD</option>
            <option>PEN</option>
            <option>EUR</option>
          </select>

          {/* Usuario */}
          <div className="relative" ref={menuRef}>
            {token ? (
              <div
                className="flex items-center gap-2 cursor-pointer select-none"
                onClick={() => setOpen(!open)}
              >
                <User className="w-5 h-5 text-[#040F2E]" />
                <div className="text-sm text-[#040F2E] hidden sm:block">
                  <p>
                    Hello, <span className="font-medium">{userName}</span>
                  </p>
                  <p className="font-bold">My Account</p>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <User className="w-5 h-5 text-[#040F2E]" />
              </Link>
            )}

            {open && token && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 border border-gray-100">
                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                  <p className="font-medium">{userName}</p>
                  {isAdmin && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-[#997C71] text-white text-xs rounded">
                      Admin
                    </span>
                  )}
                </div>

                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    📊 Admin Dashboard
                  </Link>
                )}

                <Link
                  to="/perfil"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Mi Perfil
                </Link>

                <a href="/"><button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cerrar sesión
                </button>
                </a>
              </div>
            )}
          </div>

          {/* Carrito */}
          <button
            onClick={openCart}
            className="relative"
            aria-label="Abrir carrito"
          >
            <ShoppingCart className="w-5 h-5 cursor-pointer text-[#040F2E]" />
          </button>

          {/* Hamburguesa */}
          <button
            className="md:hidden p-2 text-[#040F2E]"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 font-serif">
          <button
            onClick={() => setShopOpen((v) => !v)}
            className="w-full flex justify-between items-center py-2 text-left hover:text-[#040F2E]"
          >
            <span>Shop</span>
            <span className="text-sm">{shopOpen ? "−" : "+"}</span>
          </button>

          {shopOpen && (
            <div className="mt-2 pl-4 border-l border-gray-200 space-y-3">
              <h4 className="font-semibold text-sm">Category</h4>
              <ul className="text-sm space-y-1">
                <li>Bracelets</li>
                <li>Earrings</li>
                <li>Necklaces</li>
                <li>Rings</li>
              </ul>
              <h4 className="font-semibold text-sm mt-2">Material</h4>
              <ul className="text-sm space-y-1">
                <li>Polymer Clay</li>
                <li>Copper Wire</li>
                <li>Resin</li>
                <li>Textile</li>
              </ul>
            </div>
          )}

          <button
            onClick={() => setCollectionsOpen((v) => !v)}
            className="w-full flex justify-between items-center py-2 text-left hover:text-[#040F2E]"
          >
            <span>Collections</span>
            <span className="text-sm">{collectionsOpen ? "−" : "+"}</span>
          </button>

          {collectionsOpen && (
            <div className="mt-2 pl-4 border-l border-gray-200 space-y-3">
              <a href="/product/sea-collection" className="block">
                Sea Collection
              </a>
              <a href="/matarita-collection" className="block">
                Matarita Collection
              </a>
            </div>
          )}

          <a href="/our-story" className="block py-2 hover:text-[#040F2E]">
            Our Story
          </a>
        </div>
      )}
    </header>
  );
}
