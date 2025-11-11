export default function ProductCard({ product }) {
  return (
    <div className="group border rounded-xl bg-white p-3 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
      {/* Imagen */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="mt-3">
        <h3 className="text-gray-800 font-medium text-sm group-hover:text-brown-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mt-1">${product.price}</p>
      </div>
    </div>
  );
}
