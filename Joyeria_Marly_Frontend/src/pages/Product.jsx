import Header from "../components/Header";
import Footer from "../components/Footer";
import MostLoved from "../components/MostLoved";
import ProductSelection from "../assets/image42.png";
import SelectAmount from "../components/Amount";
import "../components/Product.css";

export default function Product() {
  return (
    <>
      <Header />

      <section>
        <div className="Img-Product">
          <img src={ProductSelection} />
        </div>
        <div className="Content">
          <p>Home / SEA BREEZES</p>
          <br />
          <h2>SEA BREEZES</h2>

          <p>$21</p>
          <h2>Invisible Thread</h2>

          <SelectAmount />

          <button>ADD TO CART</button>
          <button>BUY NOW</button>

          <p>Description</p>
          <p>Product Details</p>
          <p>Jewelry Care</p>
          <p>Shipping Info</p>
        </div>
      </section>

      <MostLoved />

      <Footer />
    </>
  );
}
