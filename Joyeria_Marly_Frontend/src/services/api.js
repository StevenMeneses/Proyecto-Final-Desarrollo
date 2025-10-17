// src/services/api.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

console.log('🔧 API Base URL configurada:', API_BASE_URL);

// Función genérica para hacer peticiones API
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  console.log(`🔄 Haciendo petición a: ${url}`, {
    method: options.method,
    body: options.body
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    
    console.log(`📡 Respuesta recibida: ${response.status} ${response.statusText}`);
    
    // Intentar leer el cuerpo de la respuesta incluso si hay error
    const data = await response.json();
    console.log('📦 Datos completos de la respuesta:', data);
    
    if (!response.ok) {
      console.error('❌ Error del servidor:', data);
      throw new Error(data.message || `Error HTTP! estado: ${response.status}`);
    }
    
    console.log('✅ Datos recibidos:', data);
    return data;
    
  } catch (error) {
    console.error('❌ Error en llamada API:', error);
    throw error;
  }
}

// Servicios de autenticación
export const authAPI = {
  login: async (email, password) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
  },

  register: async (userData) => {
    return apiCall('/users/register', {
      method: 'POST',
      body: userData,
    });
  },

  logout: async (token) => {
    return apiCall('/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  validateToken: async (token) => {
    return apiCall('/auth/validate', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

// Servicios de usuarios
export const userAPI = {
  register: async (userData) => {
    return apiCall('/users/register', {
      method: 'POST',
      body: userData,
    });
  },

  getProfile: async (userId, token) => {
    return apiCall(`/users/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

// Servicios de productos
export const productAPI = {
  getAll: async () => {
    return apiCall('/products', {
      method: 'GET',
    });
  },

  getById: async (productId) => {
    return apiCall(`/products/${productId}`, {
      method: 'GET',
    });
  },

  getByCategory: async (categoryId) => {
    return apiCall(`/products/category/${categoryId}`, {
      method: 'GET',
    });
  },

  search: async (name) => {
    return apiCall(`/products/search?name=${encodeURIComponent(name)}`, {
      method: 'GET',
    });
  },
};

// Servicios del carrito - VERSIÓN CORREGIDA
export const cartAPI = {
  getCart: async (token) => {
    return apiCall('/cart', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  addToCart: async (productId, quantity, token) => {
    return apiCall('/cart/add', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId, quantity }),
    });
  },

  updateCart: async (productId, quantity, token) => {
    return apiCall('/cart/update', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId, quantity }),
    });
  },

  removeFromCart: async (productId, token) => {
    return apiCall(`/cart/remove/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  clearCart: async (token) => {
    return apiCall('/cart/clear', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};