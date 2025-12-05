const API_URL = "https://proyecto-final-desarrollo.onrender.com/producto";

export const searchProducts = async (searchTerm) => {
  try {
    const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(searchTerm)}`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error del servidor:", response.status, errorText);
      throw new Error(`Error al buscar productos: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en searchProducts:", error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/all`);
    if (!response.ok) {
      throw new Error("Error al obtener productos");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getAllProducts:", error);
    throw error;
  }
};
