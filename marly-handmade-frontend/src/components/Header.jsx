import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Globe, Search, User, ShoppingCart, Menu, X, ChevronRight, ExternalLink, Sparkles, Clock, TrendingUp, Package, HelpCircle, Settings, BookOpen, Mail, Shield, Truck, RefreshCw, FileText } from "lucide-react";
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
    return decoded.roles?.includes('ADMIN') || decoded.sub === "Maryen" || decoded.role === 1;
  } catch {
    return false;
  }
}

// Define all searchable pages
const PAGES = [
  // Main pages
  { 
    title: "Shop", 
    path: "/shop", 
    keywords: ["shop", "buy", "products", "jewelry", "rings", "necklaces", "bracelets", "earrings", "watches"],
    category: "Shopping",
    icon: "🛍️",
    color: "bg-blue-50 text-blue-700 border-blue-100"
  },
  { 
    title: "Our Story", 
    path: "/our-story", 
    keywords: ["story", "about", "about us", "mission", "vision", "values"],
    category: "Information",
    icon: "📖",
    color: "bg-purple-50 text-purple-700 border-purple-100"
  },
  { 
    title: "Contact", 
    path: "/contact", 
    keywords: ["contact", "contact us", "email", "help", "support", "message"],
    category: "Information",
    icon: "📞",
    color: "bg-green-50 text-green-700 border-green-100"
  },
  
  // Policy pages
  { 
    title: "Terms & Conditions", 
    path: "/terms-conditions", 
    keywords: ["terms", "conditions", "legal", "agreement", "use", "rules"],
    category: "Policies",
    icon: "⚖️",
    color: "bg-gray-50 text-gray-700 border-gray-100"
  },
  { 
    title: "Privacy Policy", 
    path: "/privacy", 
    keywords: ["privacy", "data", "protection", "confidentiality", "information"],
    category: "Policies",
    icon: "🔒",
    color: "bg-indigo-50 text-indigo-700 border-indigo-100"
  },
  { 
    title: "Shipping Policy", 
    path: "/shipping-policy", 
    keywords: ["shipping", "delivery", "shipping policy", "transport", "logistics", "timing"],
    category: "Policies",
    icon: "🚚",
    color: "bg-amber-50 text-amber-700 border-amber-100"
  },
  { 
    title: "Exchanges & Returns", 
    path: "/exchange", 
    keywords: ["exchanges", "returns", "refund", "warranty", "exchange"],
    category: "Policies",
    icon: "🔄",
    color: "bg-orange-50 text-orange-700 border-orange-100"
  },
  { 
    title: "Returns", 
    path: "/returns", 
    keywords: ["return", "refund", "warranty", "unsatisfied", "problem"],
    category: "Policies",
    icon: "📦",
    color: "bg-red-50 text-red-700 border-red-100"
  },
  
  // Help pages
  { 
    title: "FAQ", 
    path: "/faq", 
    keywords: ["faq", "questions", "frequent", "help", "doubts", "queries"],
    category: "Help",
    icon: "❓",
    color: "bg-cyan-50 text-cyan-700 border-cyan-100"
  },
  { 
    title: "Complaints Book", 
    path: "/complaints-book", 
    keywords: ["complaints", "complaints book", "complaint", "book", "suggestions"],
    category: "Help",
    icon: "📝",
    color: "bg-rose-50 text-rose-700 border-rose-100"
  },
  
  // Collections
  { 
    title: "Sea Collection", 
    path: "/product/sea-collection", 
    keywords: ["sea", "ocean", "collection", "beach", "summer", "blue"],
    category: "Collections",
    icon: "🌊",
    color: "bg-teal-50 text-teal-700 border-teal-100"
  },
  
  // Profile
  { 
    title: "My Profile", 
    path: "/perfil", 
    keywords: ["profile", "account", "user", "data", "my orders", "history"],
    category: "Account",
    icon: "👤",
    color: "bg-violet-50 text-violet-700 border-violet-100"
  },
];

// Popular search suggestions
const POPULAR_SEARCHES = [
  { term: "rings", icon: "💍", category: "Products" },
  { term: "necklaces", icon: "📿", category: "Products" },
  { term: "shipping", icon: "🚚", category: "Policies" },
  { term: "contact", icon: "📞", category: "Help" },
  { term: "returns", icon: "🔄", category: "Policies" },
  { term: "FAQ", icon: "❓", category: "Help" },
  { term: "jewelry", icon: "💎", category: "Products" },
  { term: "collections", icon: "🎨", category: "Products" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [open, setOpen] = useState(false); // User dropdown
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const { openCart } = useCart();
  const { token, logout } = useContext(AuthContext);
  const { searchTerm, updateSearchTerm } = useFilters();
  const { buscarProductos } = useProductos();
  const navigate = useNavigate();

  // 🔹 User name (Memoized)
  const userName = useMemo(() => {
    if (!token?.token) return null;
    const name = obtenerSubDesdeToken(token.token);
    return name
      ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
      : null;
  }, [token]);

  // Check if admin (Memoized)
  const isAdmin = useMemo(() => {
    if (!token?.token) return false;
    return verificarAdmin(token.token);
  }, [token]);

  // Filter pages based on permissions
  const filteredPages = useMemo(() => {
    const allPages = [...PAGES];
    
    // Add admin page if user is administrator
    if (isAdmin && !allPages.some(page => page.path === "/admin/dashboard")) {
      allPages.push({
        title: "Admin Dashboard",
        path: "/admin/dashboard",
        keywords: ["admin", "administration", "panel", "dashboard", "control", "management"],
        category: "Administration",
        icon: "⚙️",
        color: "bg-gray-800 text-white border-gray-700"
      });
    }
    
    return allPages;
  }, [isAdmin]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved).slice(0, 5));
    }
  }, []);

  // Save search to recent searches
  const saveToRecentSearches = (query) => {
    if (!query.trim()) return;
    
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  // Unified global search function
  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const lowercaseQuery = query.toLowerCase();
    
    // 1. Search site pages
    const pageResults = filteredPages.filter(page => {
      // Search in title
      if (page.title.toLowerCase().includes(lowercaseQuery)) return true;
      
      // Search in keywords
      if (page.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))) return true;
      
      // Search in category
      if (page.category.toLowerCase().includes(lowercaseQuery)) return true;
      
      return false;
    });

    // 2. Search products
    let productResults = [];
    let productosCount = 0;
    
    try {
      // Use FilterContext to search products
      updateSearchTerm(query);
      
      // Also search specific products
      const productosEncontrados = await buscarProductos(query);
      productosCount = productosEncontrados?.length || 0;
      
      // If products found, add special result
      if (productosCount > 0) {
        productResults = [{
          title: `Products: "${query}"`,
          path: `/shop?search=${encodeURIComponent(query)}`,
          keywords: ["products", "shop", "buy", ...query.split(' ')],
          category: "Products",
          isProductSearch: true,
          count: productosCount,
          icon: "🛍️",
          color: "bg-blue-50 text-blue-700 border-blue-100"
        }];
      }
    } catch (error) {
      console.error("Error searching products:", error);
      // If error, still add product search option
      productResults = [{
        title: `Search products: "${query}"`,
        path: `/shop?search=${encodeURIComponent(query)}`,
        keywords: [],
        category: "Products",
        isProductSearch: true,
        icon: "🔍",
        color: "bg-blue-50 text-blue-700 border-blue-100"
      }];
    }
    
    // 3. Combine results (products first, then pages)
    const combinedResults = [...productResults, ...pageResults];
    setSearchResults(combinedResults);
    setIsSearching(false);
  };

  // Debounce for search
  useEffect(() => {
    if (!searchOpen || !searchQuery) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery, searchOpen]);

  // Sync with FilterContext when there's a global search term
  useEffect(() => {
    if (searchTerm && !searchOpen) {
      setSearchQuery(searchTerm);
    }
  }, [searchTerm, searchOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveToRecentSearches(searchQuery);
      updateSearchTerm(searchQuery);
      
      if (searchResults.length > 0) {
        const firstResult = searchResults[0];
        navigate(firstResult.path);
      } else {
        navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      }
      setSearchOpen(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleResultClick = (path, isProductSearch = false, query = searchQuery) => {
    if (isProductSearch && query) {
      saveToRecentSearches(query);
      updateSearchTerm(query);
    }
    
    navigate(path);
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  // Mobile menu toggle
  const toggleMenu = () => {
    setMenuOpen((v) => !v);
  };

  // Get icon for category
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Shopping': return '🛍️';
      case 'Information': return '📖';
      case 'Policies': return '⚖️';
      case 'Help': return '❓';
      case 'Collections': return '🎨';
      case 'Account': return '👤';
      case 'Administration': return '⚙️';
      case 'Products': return '📦';
      default: return '📄';
    }
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

        {/* ICONS */}
        <div className="icons">
          <div className="relative inline-block">
            <select className="w-5 h-5 opacity-0 absolute inset-0 cursor-pointer">
              <option>Spanish</option>
              <option>English</option>
            </select>
            <Globe className="w-5 h-5 text-[#040F2E] pointer-events-none cursor-pointer" />
          </div>

          {/* IMPROVED GLOBAL SEARCHER */}
          <div className="relative" ref={searchRef}>
            <Search 
              className="w-5 h-5 cursor-pointer text-[#040F2E] transition-transform hover:scale-110" 
              onClick={() => setSearchOpen(!searchOpen)}
            />
            
            {searchOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-2xl rounded-xl p-0 z-[9999] border border-gray-200 w-[520px] max-h-[580px] overflow-hidden animate-fadeIn">
                {/* Search header */}
                <div className="bg-gradient-to-r from-[#040F2E] to-[#1B2A40] p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-white" />
                      <h3 className="text-white font-medium text-sm">Global Search</h3>
                    </div>
                    <button 
                      onClick={() => setSearchOpen(false)}
                      className="text-white/80 hover:text-white p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Search bar */}
                  <form onSubmit={handleSearchSubmit} className="mt-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="What are you looking for today? (pages, products, help...)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-24 py-3 bg-white/95 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-sm placeholder-gray-500 shadow-sm"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-[#040F2E] text-white rounded-md hover:bg-[#1B2A40] transition-colors text-xs font-medium whitespace-nowrap"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>

                {/* Search content */}
                <div className="max-h-[440px] overflow-y-auto">
                  {isSearching ? (
                    <div className="py-12 text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-[3px] border-[#040F2E] border-t-transparent"></div>
                      <p className="mt-3 text-sm text-gray-600 font-medium">Searching the entire site...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-3 px-1">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-gray-500" />
                          <span className="text-xs text-gray-500 font-medium">
                            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <button 
                          onClick={() => {
                            updateSearchTerm(searchQuery);
                            saveToRecentSearches(searchQuery);
                            navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
                            setSearchOpen(false);
                          }}
                          className="text-xs text-[#040F2E] hover:text-[#1B2A40] font-medium flex items-center gap-1"
                        >
                          <TrendingUp className="w-3 h-3" />
                          View products
                        </button>
                      </div>
                      
                      {/* Results list */}
                      <div className="space-y-2">
                        {searchResults.map((result, index) => (
                          <div 
                            key={`${result.path}-${index}`}
                            className="group p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-all duration-200 border border-transparent hover:border-gray-200 hover:shadow-sm"
                            onClick={() => handleResultClick(result.path, result.isProductSearch)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${result.color} text-lg`}>
                                {result.isProductSearch ? '🛍️' : result.icon || getCategoryIcon(result.category)}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium text-gray-900 group-hover:text-[#040F2E] truncate">
                                    {result.title}
                                  </h4>
                                  {result.isProductSearch && result.count && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      {result.count}
                                    </span>
                                  )}
                                </div>
                                
                                <div className="flex items-center gap-2 mt-1">
                                  <span className={`text-xs px-2 py-1 rounded ${result.color.split(' ')[0]} ${result.color.split(' ')[2] || 'text-gray-600'} font-medium`}>
                                    {result.category}
                                  </span>
                                  <p className="text-xs text-gray-500 truncate">
                                    {result.path}
                                  </p>
                                </div>
                                
                                {result.keywords && result.keywords.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {result.keywords.slice(0, 2).map((keyword, idx) => (
                                      <span 
                                        key={idx}
                                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
                                      >
                                        {keyword}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                              
                              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#040F2E] flex-shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : searchQuery ? (
                    <div className="p-6 text-center">
                      <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium">No results found</p>
                      <p className="text-sm text-gray-500 mt-1 mb-4">
                        Try different or less specific words
                      </p>
                      <button 
                        onClick={() => {
                          updateSearchTerm(searchQuery);
                          saveToRecentSearches(searchQuery);
                          navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
                          setSearchOpen(false);
                        }}
                        className="px-5 py-2.5 bg-gradient-to-r from-[#040F2E] to-[#1B2A40] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium shadow-sm"
                      >
                        Search products for "{searchQuery}"
                      </button>
                    </div>
                  ) : (
                    <div className="p-4">
                      {/* Recent searches */}
                      {recentSearches.length > 0 && (
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-3 px-1">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <h4 className="text-sm font-medium text-gray-700">Recent searches</h4>
                            </div>
                            <button 
                              onClick={clearRecentSearches}
                              className="text-xs text-gray-500 hover:text-gray-700"
                            >
                              Clear
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {recentSearches.map((search, idx) => (
                              <button
                                key={idx}
                                onClick={() => setSearchQuery(search)}
                                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 text-xs font-medium transition-colors flex items-center gap-1"
                              >
                                <Search className="w-3 h-3" />
                                {search}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Popular searches */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3 px-1">
                          <TrendingUp className="w-4 h-4 text-gray-500" />
                          <h4 className="text-sm font-medium text-gray-700">Popular searches</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {POPULAR_SEARCHES.map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSearchQuery(item.term)}
                              className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors group"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{item.icon}</span>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 group-hover:text-[#040F2E]">
                                    {item.term}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quick access pages */}
                      <div>
                        <div className="flex items-center gap-2 mb-3 px-1">
                          <ExternalLink className="w-4 h-4 text-gray-500" />
                          <h4 className="text-sm font-medium text-gray-700">Quick access</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {filteredPages.slice(0, 4).map((page) => (
                            <button
                              key={page.path}
                              onClick={() => handleResultClick(page.path)}
                              className="p-2.5 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 text-left transition-all hover:border-[#040F2E] group"
                            >
                              <div className="flex items-center gap-2">
                                <div className={`flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center ${page.color} text-sm`}>
                                  {page.icon}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 group-hover:text-[#040F2E] truncate">
                                    {page.title}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-0.5 truncate">{page.category}</p>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <select className="rounded px-2 py-1 text-sm hidden sm:block cursor-pointer border border-gray-300">
            <option>USD</option>
            <option>PEN</option>
            <option>EUR</option>
          </select>

          {/* User */}
          <div className="relative" ref={menuRef}>
            {token ? (
              <div
                className="flex items-center gap-2 cursor-pointer select-none group"
                onClick={() => setOpen(!open)}
              >
                <div className="relative">
                  <User className="w-5 h-5 text-[#040F2E] transition-transform group-hover:scale-110" />
                  {isAdmin && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#997C71] rounded-full"></div>
                  )}
                </div>
                <div className="text-sm text-[#040F2E] hidden sm:block">
                  <p className="transition-colors group-hover:text-[#1B2A40]">
                    Hello, <span className="font-medium">{userName}</span>
                  </p>
                  <p className="font-bold transition-colors group-hover:text-[#1B2A40]">My Account</p>
                </div>
              </div>
            ) : (
              <Link to="/login" className="group">
                <User className="w-5 h-5 text-[#040F2E] transition-transform group-hover:scale-110" />
              </Link>
            )}

            {open && token && (
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-lg py-2 z-50 border border-gray-200 animate-fadeIn">
                <div className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                  <p className="font-medium">{userName}</p>
                  {isAdmin && (
                    <span className="inline-flex items-center mt-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#997C71] to-[#b59386] text-white">
                      ⚙️ Administrator
                    </span>
                  )}
                </div>

                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Admin Dashboard
                  </Link>
                )}

                <Link
                  to="/perfil"
                  className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </Link>

                <a href="/">
                  <button
                    onClick={logout}
                    className="flex items-center w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Sign out
                  </button>
                </a>
              </div>
            )}
          </div>

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative group"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5 cursor-pointer text-[#040F2E] transition-transform group-hover:scale-110" />
          </button>

          {/* Hamburger menu */}
          <button
            className="md:hidden p-2 text-[#040F2E] hover:text-[#1B2A40] transition-colors"
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

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 font-serif animate-slideDown">
          <button
            onClick={() => setShopOpen((v) => !v)}
            className="w-full flex justify-between items-center py-3 text-left hover:text-[#040F2E] transition-colors"
          >
            <span className="font-medium">Shop</span>
            <span className="text-sm">{shopOpen ? "−" : "+"}</span>
          </button>

          {shopOpen && (
            <div className="mt-2 pl-4 border-l border-gray-200 space-y-3">
              <h4 className="font-semibold text-sm text-gray-700">Category</h4>
              <ul className="text-sm space-y-1">
                <li className="py-1 hover:text-[#040F2E]">Bracelets</li>
                <li className="py-1 hover:text-[#040F2E]">Earrings</li>
                <li className="py-1 hover:text-[#040F2E]">Necklaces</li>
                <li className="py-1 hover:text-[#040F2E]">Rings</li>
              </ul>
              <h4 className="font-semibold text-sm mt-3 text-gray-700">Material</h4>
              <ul className="text-sm space-y-1">
                <li className="py-1 hover:text-[#040F2E]">Polymer Clay</li>
                <li className="py-1 hover:text-[#040F2E]">Copper Wire</li>
                <li className="py-1 hover:text-[#040F2E]">Resin</li>
                <li className="py-1 hover:text-[#040F2E]">Textile</li>
              </ul>
            </div>
          )}

          <button
            onClick={() => setCollectionsOpen((v) => !v)}
            className="w-full flex justify-between items-center py-3 text-left hover:text-[#040F2E] transition-colors"
          >
            <span className="font-medium">Collections</span>
            <span className="text-sm">{collectionsOpen ? "−" : "+"}</span>
          </button>

          {collectionsOpen && (
            <div className="mt-2 pl-4 border-l border-gray-200 space-y-3">
              <a href="/product/sea-collection" className="block py-1 hover:text-[#040F2E]">
                Sea Collection
              </a>
              <a href="/matarita-collection" className="block py-1 hover:text-[#040F2E]">
                Matarita Collection
              </a>
            </div>
          )}

          <a href="/our-story" className="block py-3 hover:text-[#040F2E] transition-colors font-medium">
            Our Story
          </a>
        </div>
      )}
    </header>
  );
}