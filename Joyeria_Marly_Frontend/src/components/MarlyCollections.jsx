export default function MarlyCollections() {
  const products = [
    {
      name: "BEST SELLERS",
      image: "/BestSellers.png",
      link: "/product/best-sellers",
    },
    {
      name: "SEA COLLECTION",
      image: "/SeaCollection.png",
      link: "/product/wild-flowers",
    },
    {
      name: "MATARITA COLLECTION",
      image: "/MataritaCollection.png",
      link: "/product/interplanets",
    },
  ];

  return (
    <div className="px-6 py-6">
      {/* mt-16 = más espacio arriba del título */}
      <h2 className="text-2xl font-semibold text-center mt-16 mb-10">
        MARLY Collections
      </h2>

      {/* mt-8 = más espacio entre el título y las tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {products.map((product) => (
          <div
            key={product.name}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <a href={product.link}>
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-center">
                  {product.name}
                </h3>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
