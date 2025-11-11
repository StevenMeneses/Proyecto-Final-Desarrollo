export default function MostLoved() {
  const products = [
    {
      name: "Sea Conchitas",
      price: 62,
      image: "/SeaConchitas.png",
      link: "/product/sea-conchitas",
    },
    {
      name: "Wild Flowers",
      price: 80,
      image: "/WildFlowers.png",
      link: "/product/wild-flowers",
    },
    {
      name: "Interplanets",
      price: 52,
      image: "/Interplanets.png",
      link: "/product/interplanets",
    },
    {
      name: "Magenta Flower",
      price: 90,
      image: "/magentaFlower.jpg",
      link: "/product/magentaFlower",
    },
  ];

  return (
    <div className="px-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Most Loved</h2>
        <button className="mt-4 px-8 py-1 border-none bg-marlyBlue text-black font-bold cursor-pointer">
          View More
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.name}
            className="bg-white rounded-2xl shadow-md overflow-hidden transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out"
          >
            <a href={product.link} className="group block">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-medium group-hover:text-lightblue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 font-semibold">${product.price}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
