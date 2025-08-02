import { useEffect, useState } from 'react';
import { useAboutCart } from '../../context/AboutCartContext';
import ProductStudyCard from './ProductStudyCard';
import studiesData from '../../data/studies';
import CartModal from './CartModal';
import './styles/aboutMarket.css';

export default function AboutMarket() {
  const [studies, setStudies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);


  const { addToCart, cart } = useAboutCart();

  useEffect(() => {
    // Simulamos carga
    setTimeout(() => {
      setStudies(studiesData);
      setFiltered(studiesData);
      setLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    const result = studies.filter((item) => {
      const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
      return matchSearch && matchCategory;
    });
    setFiltered(result);
  }, [searchTerm, selectedCategories, studies]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const categories = ['Primario', 'Secundario', 'Universitario', 'Curso'];

  return (
    <div className="about-market">
      <button className="open-cart-btn" onClick={() => setShowCart(true)}>
        🛒 Ver carrito ({cart.reduce((sum, item) => sum + item.quantity, 0)})
      </button>


      <aside className="market-sidebar">
        <input
          type="text"
          placeholder="Buscar estudios..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="market-search"
        />

        <div className="market-filters">
          <h4>Filtrar por categoría</h4>
          {categories.map(cat => (
            <label key={cat} className="market-filter">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </aside>

      <section className="market-results">
        {loading ? (
          [...Array(4)].map((_, i) => <div key={i} className="product-skeleton" />)
        ) : filtered.length > 0 ? (
          filtered.map(product => (
            <ProductStudyCard key={product.id} product={product} onAddToCart={() => addToCart(product)} />
          ))
        ) : (
          <p className="market-empty">No se encontraron estudios.</p>
        )}
      </section>


    <CartModal isOpen={showCart} onClose={() => setShowCart(false)} />

    </div>
    
  );
}
