import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useProductos } from "../contexts/ProductoContext";

export function useAuth() {
  return useContext(AuthContext);
}

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { listarProductos } = useProductos();


  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    details: "",
    care: "",
    shippingInfo: "",
    fotoPrincipal: null,
    fotoSecundario: null,
    fotoTerciario: null,
  });

  const API_URL = "https://proyecto-final-desarrollo.onrender.com/producto";

  useEffect(

    () => {
      const fetchProducto = async () => {
        try {
          const response = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${tokenValue}`,
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            console.error(await response.text());
            throw new Error("Error al actualizar el producto");
          }

          console.log("✅ Producto actualizado con éxito");

          await listarProductos();

          navigate("/admin/inventory");
        } catch (err) {
          console.error("❌ Error al actualizar el producto:", err);
        }

      };

      fetchProducto();
    }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      try {
        const url = await uploadImage(file);
        console.log("✅ URL subida:", url); // <-- verifica en consola
        setFormData((prev) => ({
          ...prev,
          [name]: url,
        }));
      } catch (err) {
        console.error(`❌ Error al subir ${name}:`, err);
      }
    }
  };

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "MarlyCloud");// reemplaza con tu preset

    const res = await fetch("https://api.cloudinary.com/v1_1/cloudjosue/image/upload", {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Cloudinary error: ${errorText}`);
    }

    const result = await res.json();
    return result.secure_url;
  };


  const getImageSrc = (image) => {
    if (!image) return null;
    if (typeof image === "string") return image;
    if (image instanceof File) return URL.createObjectURL(image);
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stored = localStorage.getItem("token");
    const parsed = stored ? JSON.parse(stored) : null;
    const tokenValue = parsed?.token || parsed;

    let urlPrincipal = formData.fotoPrincipal;
    let urlSecundario = formData.fotoSecundario;
    let urlTerciario = formData.fotoTerciario;




    const payload = {
      nombre: formData.name,
      descripcion: formData.description,
      precio: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      categoria: formData.category,
      details: formData.details,
      care: formData.care,
      shipping_info: formData.shippingInfo,
      fotoPrincipal: urlPrincipal,
      fotoSecundario: urlSecundario,
      fotoTerciario: urlTerciario,
    };

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenValue}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error(await response.text());
        throw new Error("Error al actualizar el producto");
      }

      console.log("✅ Producto actualizado con éxito");
      navigate("/admin/inventory");
    } catch (err) {
      console.error("❌ Error al actualizar el producto:", err);
    }
  };

  return (
    <main className="w-full px-10 py-8">
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Editar Producto
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Campos de texto */}
          <div className="col-span-2">
            <label className="block text-gray-700 mb-1">Nombre</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Precio</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Stock</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 mb-1">Categoría</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 mb-1">Descripción</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 mb-1">Detalles</label>
            <textarea name="details" value={formData.details} onChange={handleChange} rows="3" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 mb-1">Cuidado</label>
            <textarea name="care" value={formData.care} onChange={handleChange} rows="3" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 mb-1">Información de envío</label>
            <textarea name="shippingInfo" value={formData.shippingInfo} onChange={handleChange} rows="2" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          {/* Subida de imágenes con vista previa */}
          {/* Subida de imágenes con ícono y vista previa */}
          <div className="col-span-2 grid grid-cols-3 gap-4">
            {[
              { name: "fotoPrincipal", label: "Imagen principal" },
              { name: "fotoSecundario", label: "Imagen secundaria" },
              { name: "fotoTerciario", label: "Imagen terciaria" },
            ].map(({ name, label }) => (
              <label key={name} className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-[#997C71] transition-all h-48">
                <span className="text-sm text-gray-700 mb-2">{label}</span>
                <input
                  type="file"
                  name={name}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {formData[name] ? (
                  <img
                    src={formData[name]}
                    alt={`Vista previa ${name}`}
                    className="rounded-md object-cover w-full h-full"
                  />
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6 text-gray-400"
                    >
                      <path d="M3 16l4-4a3 3 0 014 0l4 4m0 0l4-4a3 3 0 014 0l4 4M3 10h18" />
                    </svg>
                    <span className="text-xs text-gray-500 mt-1">Subir imagen</span>
                  </>
                )}
              </label>
            ))}
          </div>

          <div className="col-span-2 text-right mt-4">
            <button
              type="submit"
              className="bg-[#997C71] hover:bg-[#85695F] text-[#F5E3C3] font-semibold py-3 px-6 rounded-lg shadow-sm transition-all"
            >
              Actualizar producto
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ProductEdit;
