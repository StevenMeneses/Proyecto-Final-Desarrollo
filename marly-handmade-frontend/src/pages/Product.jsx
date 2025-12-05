import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MostLoved from "../components/MostLoved";
import SelectAmount from "../components/Amount";
import "../components/Product.css";
import "../components/ProductSelect.css";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useState, useContext, useEffect } from "react";

function DescriptionItem({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion-item">
      <p className="product-detail-accordion" onClick={() => setOpen(!open)}>
        {title}
        <span>
          <strong>{open ? "-" : "+"}</strong>
        </span>
      </p>
      {open && <div className="accordion-content">{children}</div>}
    </div>
  );
}

export default function Product() {
  const { slug } = useParams();
  const [producto, setProducto] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Estado de cantidad

  const { openCart, addToCart } = useCart();
  const { token, logout } = useContext(AuthContext);

  const API_URL = "https://proyecto-final-desarrollo.onrender.com/producto/all";

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error al obtener los productos");
        const data = await res.json();

        const formatted = data.map((item) => ({
          id: item.id,
          name: item.nombre,
          price: item.precio,
          img: item.fotoPrincipal,
          stock: item.stock,
          category: item.categoria,
          description: item.descripcion,
          details: item.details,
          care: item.care,
          shippingInfo: item.shipping_info,
          images: [
            item.fotoPrincipal,
            item.fotoSecundario,
            item.fotoTerciario,
          ].filter(Boolean),

          slug: item.nombre
            .replace(/\s+/g, " ")
            .trim()
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(""),
        }));

        const match = formatted.find((p) => p.slug === slug);
        if (!match) throw new Error("Producto no encontrado");
        setProducto(match);
        setSelectedImage(match.images?.[0] || match.img);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [slug]);

  if (loading) return <p className="text-center mt-10">Cargando producto...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">⚠️ {error}</p>;
  if (!producto)
    return <p className="text-center mt-10">Producto no encontrado</p>;

  return (
    <>
      <Header />

      <section className="productSection">
        <div className="gallery-container">
          <div className="thumbnail-column">
            {producto.images?.map((image, i) => (
              <img
                key={i}
                src={image}
                alt={`thumb-${i}`}
                className={`thumbnail ${
                  selectedImage === image ? "active" : ""
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>

          <div className="Img-Product">
            <img src={selectedImage || producto.img} alt={producto.name} />
          </div>
        </div>

        <div className="Content product-details-content">
          <p className="Sub-Name-Product">
            Home / <span>{producto.category}</span>
          </p>

          <h2 className="Name-Producto">{producto.name}</h2>
          <p className="product-price">${producto.price}</p>
          <h2 className="product-variant-name">Stock: {producto.stock}</h2>

          <div className="amaunt-select">
            <SelectAmount quantity={quantity} setQuantity={setQuantity} />
          </div>

          <div className="content">
            {token ? (
              <button
                className="button-add-to-cart"
                onClick={() => {
                  addToCart(producto, quantity);
                  openCart();
                }}
              >
                ADD TO CART
              </button>
            ) : (
              <button
                className="button-add-to-cart"
                onClick={() => {
                  // alert("Debes iniciar sesión para agregar al carrito");
                  openCart();
                }}
              >
                ADD TO CART
              </button>
            )}

            {token ? (
              <a href="/buy">
                <button
                  className="button-buy-now"
                  onClick={() => {
                    addToCart(producto, quantity);
                  }}
                >
                  BUY NOW
                </button>
              </a>
            ) : (
              <button
                className="button-buy-now"
                onClick={() => {
                  openCart();
                }}
              >
                BUY NOW
              </button>
            )}

            <DescriptionItem title="Description">
              <p>{producto.description || "No hay descripción disponible."}</p>
            </DescriptionItem>

            <DescriptionItem title="Product Details">
              <p>{producto.details || "No hay detalles adicionales."}</p>
            </DescriptionItem>

            <DescriptionItem title="Jewelry Care">
              <p>
                {producto.care || "Sin recomendaciones de cuidado disponibles."}
              </p>
            </DescriptionItem>

            <DescriptionItem title="Shipping Info">
              <p>
                {producto.shippingInfo ||
                  "No hay información de envío disponible."}
              </p>
            </DescriptionItem>
          </div>
        </div>
      </section>

      <MostLoved />
      <Footer />
    </>
  );
}
