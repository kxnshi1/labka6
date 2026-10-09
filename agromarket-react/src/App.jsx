import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import ContactForm from './components/ContactForm';

const API_URL = 'http://localhost:3000/api';

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const query = search.trim() ? `?search=${encodeURIComponent(search.trim())}` : '';

    fetch(`${API_URL}/products${query}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка загрузки товаров');
        return res.json();
      })
      .then(setProducts)
      .catch((error) => {
        if (error.name !== 'AbortError') setProducts([]);
      });

    return () => controller.abort();
  }, [search]);

  function handleAddToCart() {
    setCartCount((count) => count + 1);
  }

  return (
    <>
      <Header cartCount={cartCount} />
      <main className="page">
        <section id="catalog" className="catalog">
          <div className="catalog-toolbar">
            <div>
              <p className="eyebrow">Свежие продукты с фермы</p>
              <h1>Каталог</h1>
            </div>
            <label className="search-box">
              <span className="sr-only">Поиск товаров</span>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Найти продукт..."
              />
            </label>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAddToCart}
                featured={product.id === 1}
              />
            ))}
          </div>

          {products.length === 0 && (
            <p className="empty-state">Ничего не найдено. Попробуйте другой запрос.</p>
          )}
        </section>

        <aside id="delivery" className="sidebar">
          <h2>Доставка</h2>
          <p>Привезём фермерские продукты прямо к двери.</p>
          <ul>
            <li>Астана — на следующий день</li>
            <li>Акмолинская область — 2–3 дня</li>
            <li>Бесплатно от 20 000 тг</li>
          </ul>
        </aside>

        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

export default App;
