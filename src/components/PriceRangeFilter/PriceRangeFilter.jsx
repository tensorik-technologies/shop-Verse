import { useState, useEffect } from 'react';
import './PriceRangeFilter.css';

export default function PriceRangeFilter({ min, max, onRangeChange }) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const [activeThumb, setActiveThumb] = useState(null); // 'min' or 'max'

  useEffect(() => {
    setMinVal(min);
    setMaxVal(max);
  }, [min, max]);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxVal - 10);
    setMinVal(value);
    onRangeChange(value, maxVal);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minVal + 10);
    setMaxVal(value);
    onRangeChange(minVal, value);
  };

  const getPercent = (value) => ((value - min) / (max - min)) * 100;

  return (
    <div className="price-range" onMouseLeave={() => setActiveThumb(null)}>
      <div className="price-range__slider">
        <div className="price-range__track" />
        <div
          className="price-range__fill"
          style={{
            left: `${getPercent(minVal)}%`,
            width: `${getPercent(maxVal) - getPercent(minVal)}%`,
          }}
        />
        
        {/* Tooltips */}
        <div 
          className={`price-range__tooltip ${activeThumb === 'min' ? 'active' : ''}`}
          style={{ left: `${getPercent(minVal)}%` }}
        >
          ${minVal}
        </div>
        <div 
          className={`price-range__tooltip ${activeThumb === 'max' ? 'active' : ''}`}
          style={{ left: `${getPercent(maxVal)}%` }}
        >
          ${maxVal}
        </div>

        <input
          type="range"
          className="price-range__input price-range__input--min"
          min={min}
          max={max}
          value={minVal}
          onChange={handleMinChange}
          onMouseDown={() => setActiveThumb('min')}
          onMouseUp={() => setActiveThumb(null)}
          onTouchStart={() => setActiveThumb('min')}
          onTouchEnd={() => setActiveThumb(null)}
          aria-label="Minimum price"
        />
        <input
          type="range"
          className="price-range__input price-range__input--max"
          min={min}
          max={max}
          value={maxVal}
          onChange={handleMaxChange}
          onMouseDown={() => setActiveThumb('max')}
          onMouseUp={() => setActiveThumb(null)}
          onTouchStart={() => setActiveThumb('max')}
          onTouchEnd={() => setActiveThumb(null)}
          aria-label="Maximum price"
        />
      </div>
    </div>
  );
}
