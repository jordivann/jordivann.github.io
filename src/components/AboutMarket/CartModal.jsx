import { useAboutCart } from '../../context/AboutCartContext';
import './styles/CartModal.css';

export default function CartModal({ isOpen, onClose }) {
  const { cart, removeFromCart, clearCart } = useAboutCart();

  const total = cart.reduce((acc, item) => acc + (item.discountedPrice || item.price), 0);

  if (!isOpen) return null;

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal-header">
          <h2>🛒 Tu Carrito de Estudios</h2>
          <button className="cart-close" onClick={onClose}>×</button>
        </div>

        {cart.length === 0 ? (
          <p className="cart-empty">Aún no agregaste ningún estudio.</p>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map(item => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} />
                  <div>
                    <strong>{item.title}</strong>
                    <p className="cart-meta">{item.category} • {item.year}</p>
                    <p className="cart-price">${item.discountedPrice || item.price}</p>
                  </div>
                  <button className="cart-remove" onClick={() => removeFromCart(item.id)}>✕</button>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <p>Total acumulado: <strong>${total}</strong></p>
              <button className="cart-clear" onClick={clearCart}>Vaciar carrito</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
