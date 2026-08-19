import { useState, useEffect, useMemo } from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import PriceSort from '../../components/PriceSort/PriceSort';
import PriceRangeFilter from '../../components/PriceRangeFilter/PriceRangeFilter';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import LoadingState from '../../components/LoadingState/LoadingState';
import productsData from '../../data/products.json';
import './Home.css';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 1500]);

  const priceMin = 0;
  const priceMax = 1500;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handlePriceRangeChange = (min, max) => {
    setPriceRange([min, max]);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (category !== 'All') {
      result = result.filter((p) => p.category === category);
    }

    // Price range filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sort) {
      case 'low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [products, search, category, sort, priceRange]);

  return (
    <div className="home">
      <HeroSection />

      <section id="products-section" className="home__container container">
        
        {/* Sticky Sidebar (Desktop) / Drawer (Mobile) */}
        <aside className="home__sidebar">
          <div className="home__sidebar-inner">
            <h3 className="home__sidebar-title">Filters</h3>
            <SearchBar value={search} onChange={setSearch} />
            
            <div className="home__sidebar-section">
              <h4 className="home__sidebar-label">Category</h4>
              <CategoryFilter selected={category} onChange={setCategory} />
            </div>

            <div className="home__sidebar-section">
              <h4 className="home__sidebar-label">Price Range</h4>
              <PriceRangeFilter
                min={priceMin}
                max={priceMax}
                onRangeChange={handlePriceRangeChange}
              />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="home__main">
          <div className="home__main-header">
            <div>
              <h2 className="home__section-title">Shop Collection</h2>
              <p className="home__section-subtitle">
                {loading
                  ? 'Loading our collection...'
                  : `Showing ${filteredProducts.length} of ${products.length} products`}
              </p>
            </div>
            <PriceSort value={sort} onChange={setSort} />
          </div>

          {loading ? (
            <LoadingState count={8} />
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </main>
        
      </section>
    </div>
  );
}
