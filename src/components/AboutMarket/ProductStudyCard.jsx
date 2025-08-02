import './styles/ProductStudyCard.css';

export default function ProductStudyCard({ product, onAddToCart }) {
  const {
    title,
    description,
    category,
    year,
    price,
    discountedPrice,
    rating,
    image,
    inCart
  } = product;

  const renderStars = () => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;

    for (let i = 0; i < full; i++) stars.push(<span key={`s${i}`}>★</span>);
    if (half) stars.push(<span key="half">☆</span>);
    while (stars.length < 5) stars.push(<span key={`e${stars.length}`}>☆</span>);

    return stars;
  };

  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-img" />

      <div className="product-content">
        <h3>{title}</h3>
        <p className="product-desc">{description}</p>

        <div className="product-meta">
          <span className="product-category">{category}</span>
          <span className="product-year">{year}</span>
        </div>

        <div className="product-rating">{renderStars()}</div>

        <div className="product-pricing">
          {discountedPrice && discountedPrice < price ? (
            <>
              <span className="product-price discounted">${discountedPrice}</span>
              <span className="product-original">${price}</span>
            </>
          ) : (
            <span className="product-price">${price}</span>
          )}
        </div>

        <button
          className="product-btn"
          onClick={onAddToCart}
          disabled={inCart}
        >
          {inCart ? 'Agregado' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  );
}
