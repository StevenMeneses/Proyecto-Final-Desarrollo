import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  return (
    <div className="w-3/4 p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
