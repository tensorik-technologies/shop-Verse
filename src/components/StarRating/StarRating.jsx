import './StarRating.css';

export default function StarRating({ rating }) {
  const renderStar = (index) => {
    const fillPercentage = Math.max(0, Math.min(100, (rating - index) * 100));
    
    return (
      <div key={index} className="star-rating__star">
        <svg viewBox="0 0 24 24" className="star-rating__svg">
          <defs>
            <linearGradient id={`star-grad-${index}-${rating}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset={`${fillPercentage}%`} stopColor="currentColor" />
              <stop offset={`${fillPercentage}%`} stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={`url(#star-grad-${index}-${rating})`}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  };

  return (
    <div className="star-rating">
      {[0, 1, 2, 3, 4].map(index => renderStar(index))}
    </div>
  );
}
