import "./Orders.css";

interface OrderCardProps {
  status?: string;
  image: string;
  title: string;
  subtitle: string;
  price: number;
  quantity?: number;
  onAdd: () => void;
  onDelete: () => void;
}

function OrderCard({
  status = "In progress",
  image,
  title,
  subtitle,
  price,
  quantity = 1,
  onAdd,
  onDelete,
}: OrderCardProps) {
  const total = price * quantity;

  return (
    <div className="card">
      <div className="card-header">
        <article>
          <p className="status">{status}</p>
          <a className="order-details">
            <p>ORDER DETAILS</p>
            <span className="material-symbols-outlined">chevron_right</span>
          </a>
        </article>

        <div className="line"></div>

        <div className="product-info">
          <div className="product-group">
            <img src={image} alt={title} />
            <div className="Dates">
              <div className="DatesTitles">
                <h2>{title}</h2>
                <h3>{subtitle}</h3>
              </div>

              <div className="prices">
                <h4>${price}</h4>
                <h5>x{quantity}</h5>
              </div>
            </div>
          </div>
          <div className="Total">
            <h4>Total: ${total}</h4>
            <button className="btn-1" onClick={onAdd}>
              ADD TO CART
            </button>
            <button className="btn-2" onClick={onDelete}>
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
