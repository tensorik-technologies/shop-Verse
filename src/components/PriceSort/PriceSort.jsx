import './PriceSort.css';

const SORT_OPTIONS = [
  { value: 'default', label: 'Sort by' },
  { value: 'low-high', label: 'Price: Low → High' },
  { value: 'high-low', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'Name: A → Z' },
];

export default function PriceSort({ value, onChange }) {
  return (
    <div className="price-sort">
      <select
        id="price-sort-select"
        className="price-sort__select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Sort products"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className="price-sort__arrow">▾</span>
    </div>
  );
}
