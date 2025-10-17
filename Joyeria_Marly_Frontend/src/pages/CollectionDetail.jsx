import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Sidebar from "../components/Sidebar";
import ProductGrid from "../components/ProductGrid";
import { products } from "../data/products";
import SeaCollection from "/src/assets/hero_sea_collection.png";

function CollectionDetail() {
  return (
    <>
      <Header />
      <Hero imagen={SeaCollection} texto={false} />

      <div className="flex min-h-screen">
        <Sidebar />
        <ProductGrid products={products} />
      </div>

      <Footer />
    </>
  );
}

export default CollectionDetail;
