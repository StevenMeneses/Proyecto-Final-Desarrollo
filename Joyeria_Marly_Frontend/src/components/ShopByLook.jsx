import { useState } from "react";
import { ShoppingBag } from "lucide-react";

export default function ShopByLook() {
  const products = [
    {
      id: 1,
      name: "Ocean Blue Monk Tree",
      price: 37,
      image: "/ShopByLook-tree.png",
      position: "top-[78%] left-[55%]",
    },
    {
      id: 2,
      name: "Golden Star Necklace",
      price: 35,
      image: "/ShopByLook-star.png",
      position: "top-[60%] left-[48%]",
    },
    {
      id: 3,
      name: "Golden Thin Necklace",
      price: 25,
      image: "/ShopByLook-thin.png",
      position: "top-[30%] left-[35%]",
    },
  ];

  const [selected, setSelected] = useState(null);

  return (
    <div className="px-6 py-10 flex justify-center">
      <div className="max-w-6xl w-full">
        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Shop by look
        </h2>

        {/* Imagen principal + lateral panel */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-center md:gap-16">
          {/* Principal image */}
          <div className="relative">
            <img
              src="/ShopByLook.png"
              alt="Shop by look"
              className="rounded-xl shadow-md max-w-140 h-auto"
            />
            {products.map((product) => (
              <button
                key={product.id}
                className={`absolute bg-white rounded-full p-1 shadow hover:scale-110 transition ${product.position}`}
                onClick={() => setSelected(product)}
              >
                <ShoppingBag className="w-5 h-5 text-gray-700" />
              </button>
            ))}
          </div>

          {/* Lateral panel */}
          <div className="w-full md:w-72 flex items-center justify-center">
            {selected ? (
              <div className="space-y-4 text-center">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="rounded-lg shadow mx-auto max-h-74 object-contain"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {selected.name}
                </h3>
                <p className="text-sm text-gray-600">from ${selected.price}</p>
              </div>
            ) : (
              <p className="text-gray-400 italic text-center">
                Click on a product icon to see details.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
